import twint
import couchdb
import json
import re
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
import copy

nltk.download('vader_lexicon')

sia = nltk.sentiment.SentimentIntensityAnalyzer()

premier_names = None
with open("names.json", encoding="utf-8") as f:
    premier_names = json.load(f)
    # print(premier_names)

couch = couchdb.Server('http://admin:admin@172.26.130.177:5984/')
db = couch['all_lga']

all_docs = db.view('_all_docs', include_docs=True)

# existing = db.view("lga_info/states", group=True, key="VIC") 
# if existing:
#     print(existing)
#     for e in existing:
#         print(e)
#         for ele in e:
#             print(ele, e[ele])

# for doc in all_docs:
#     # print(doc["doc"]["state_territory"], doc["doc"]["lga_name16"])
#     print(doc["doc"]["state_territory"], doc["doc"]["lga_name16"], re.sub("\(.*", "", doc["doc"]["lga_name16"]))

# for premier in premier_names:
#     screen_name = premier["screen_name"]
#     for doc in all_docs:
#         lga = doc["doc"]["lga_name16"]
#         state_territory = doc["doc"]["state_territory"]

# location = [{"search_term": "ballarat", "alias": "ballarat"}]

map_fun = '''function(doc) {
    emit(doc.tweet_id, doc);
}'''

reduce_fun = '''function(keys, values, rereduce) {
  if (rereduce) {
    return sum(values);
  } else {
    return values.length;
  }
}'''

for premier in premier_names:
    screen_name = premier["screen_name"]
    full_name = premier["full_name"]
    print(f"-------------------------{full_name.upper()}-------------------------")
    this_premier_db = couch[screen_name.lower()]
    for place in all_docs:
        formatted_lga_name = re.sub("\(.*", "", place["doc"]["lga_name16"])
        print(f'-------------------------{place["doc"]["lga_name16"].upper()}-------------------------')
        # Configure
        c = twint.Config()
        c.To = screen_name
        # c.Search = "@ScottMorrisonMP"
        # c.Output = f'{place["alias"]}.json'
        c.Store_json = True
        c.Since = "2021-04-01"
        c.Until = "2021-04-29"
        c.Proxy_host = "wwwproxy.unimelb.edu.au"
        c.Proxy_port = 8000
        c.Proxy_type = "http"
        c.Near = formatted_lga_name
        c.Store_object = True
        c.Custom["tweet"] = ["id", "tweet", "date", "geo", "near", "language", "user_id", "place"]

        # Run
        twint.run.Search(c)

        print("---------Printing stored json----------")
        # print(twint.output.tweets_list)
        for extracted in twint.output.tweets_list:
            existing = this_premier_db.view(f'{full_name.lower().replace(" ", "_")}_info/tweet_ids', group=True, key=getattr(extracted, 'id_str'))
            updated_tweet = {}
            if existing:
                for existing_tweet in existing:
                    # print(existing_tweet)
                    if formatted_lga_name not in existing_tweet["value"][0][0]["near"]:
                        updated_tweet = copy.deepcopy(existing_tweet["value"][0][0])
                        # for existing_tweet_key in existing_tweet["value"][0]:
                        #     if existing_tweet_key != "_rev":
                        #         updated_tweet[existing_tweet_key] = existing_tweet["value"][0][existing_tweet_key]
                        # del updated_tweet["_rev"]
                        
                        updated_near = updated_tweet["near"].copy()
                        updated_near.append(formatted_lga_name)
                        updated_tweet["near"] = updated_near
                        # print(updated_tweet)
                        this_premier_db.save(updated_tweet)
            else:
                # print(extracted.__dict__)
                # print(type(extracted))
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