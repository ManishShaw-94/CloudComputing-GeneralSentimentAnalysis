import threading
import twint
import couchdb
import json
import re
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
import copy
import traceback
import time

nltk.download('vader_lexicon')

sia = nltk.sentiment.SentimentIntensityAnalyzer()

# Connect to Couch DB Server
couch = couchdb.Server('http://admin:admin@172.26.130.177:5984/')

# From all_lga DB get All Documents
db = couch['all_lga']
all_docs = db.view('_all_docs', include_docs=True)


# Harvest Function is triggered for every new thread.
def harvest(place,screen_name,full_name,this_premier_db,since,until):
    formatted_lga_name = re.sub("\(.*", "", place["doc"]["lga_name16"])
    print(f'-------------------------{place["doc"]["lga_name16"].upper()}-------------------------')
    # Configure
    c = twint.Config()
    c.To = screen_name
    c.Store_json = True
    c.Since = since
    c.Until = until
    # Proxy settings for Twint Package
    c.Proxy_host = "wwwproxy.unimelb.edu.au"
    c.Proxy_port = 8000
    c.Proxy_type = "http"
    
    c.Near = formatted_lga_name
    c.Store_object = True
    c.Custom["tweet"] = ["id", "tweet", "date", "geo", "near", "language", "user_id", "place"]

    # Run
    twint.run.Search(c)

    print("---------Printing stored json----------")
    print('No of Tweets Extracted::'+str(len(twint.output.tweets_list)))
    try:
        for extracted in twint.output.tweets_list:
            try:
                # For every Tweet extracted check if present in DB
                existing = this_premier_db.view(f'{full_name.lower().replace(" ", "_")}_info/tweet_ids', group=True, key=getattr(extracted, 'id_str'))
                updated_tweet = {}
                if existing:
                    for existing_tweet in existing:
                        # If new LGA append in Near key
                        if formatted_lga_name not in existing_tweet["value"][0][0]["near"]:
                            updated_tweet = copy.deepcopy(existing_tweet["value"][0][0])
                        
                            updated_near = updated_tweet["near"].copy()
                            updated_near.append(formatted_lga_name)
                            updated_tweet["near"] = updated_near
                            this_premier_db.save(updated_tweet)
                else:
                    # If new Tweet then Save it to Database
                    filtered = {
                        'tweet_id': getattr(extracted, 'id_str'),
                        'tweet': getattr(extracted, 'tweet'),
                        'user_id': getattr(extracted, 'user_id_str'),
                        'date': getattr(extracted, 'datestamp'),
                        'place': getattr(extracted, 'place'),
                        'geo': getattr(extracted, 'geo'),
                        'near': [getattr(extracted, 'near')],
                        'language': getattr(extracted, 'lang'),
                        'sentiment_score': sia.polarity_scores(getattr(extracted, 'tweet')),
                        'state_territory': place["doc"]["state_territory"]
                        }
                    this_premier_db.save(filtered)
            except Exception as e:
                traceback.print_exc()
                continue
            # Setting output array as null
        twint.output.tweets_list=[]
    except Exception as e:
        traceback.print_exc()

if __name__ == "__main__":
    
    screen_name = 'gladysb'
    full_name = 'gladys_berejiklian'
    this_premier_db = couch[screen_name]
    
    month_range=["2020-01-01","2020-02-01","2020-03-01","2020-04-01","2020-05-01","2020-06-01","2020-07-01","2020-08-01","2020-09-01","2020-10-01","2020-11-01","2020-12-01","2021-01-01","2021-02-01","2021-03-01","2021-04-01","2021-05-01"]
    for i in range(len(month_range)-1):
        for place in all_docs:
            threading.Thread(target=harvest, args=(place,screen_name,full_name,this_premier_db,month_range[i], month_range[i+1])).start()
        #    To run thread every 30 seconds 
            time.sleep(30)
        time.sleep(180)
