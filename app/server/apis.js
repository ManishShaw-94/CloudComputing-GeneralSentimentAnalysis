/*

"express" for creating a routing middleware for the requests starting with "/api"
"dotenv" for loading environment variable from the .env file in the node environment
"nano" is the official CouchDB client for Node.js

*/

const express = require("express");
const router = express.Router();
require("dotenv").config();
const nano = require("nano")(process.env.COUCHDB_REMOTE_HOST);


/*

"/api/summary" is a POST API and is the only API currently used to 
extract data from CouchDB, preprocess it and send the response to the frontend

Request body: { screen_name: <twitter_username_of_any_of_the_9_politicians>  }
Response body: {

  lga_wise: {
    "Ballarat": 0.3443,
    "Melbourne": -0.054434,
    ...
  },
  state_wise: {
    "VIC": 0.256,
    "NSW": 0.352,
    ...
  }

} 

*/

router.post("/summary", (req, res) => {
  let { screen_name } = req.body;
  let merged_db_handle = nano.db.use("merged");
  let all_lga_db_handle = nano.db.use("all_lga");
  merged_db_handle.list({ include_docs: true }).then((summary) => {
    let summary_lgas = null;
    summary.rows.forEach((row) => {
      if (row.doc.premier == screen_name.toLowerCase())
        summary_lgas = row.doc.all_lga;
    });
    let lga_wise = {};
    let state_wise = {
      NT: { score: 0, count: 0 },
      SA: { score: 0, count: 0 },
      WA: { score: 0, count: 0 },
      QLD: { score: 0, count: 0 },
      NSW: { score: 0, count: 0 },
      VIC: { score: 0, count: 0 },
      ACT: { score: 0, count: 0 },
      TAS: { score: 0, count: 0 },
    };
    all_lga_db_handle.list({ include_docs: true }).then((lgas) => {
      lgas.rows.forEach((row) => {
        let fitered_lga_name = row.doc.lga_name16.substr(
          0,
          row.doc.lga_name16.indexOf("(")
        );
        if (summary_lgas[fitered_lga_name]) {
          lga_wise[row.doc.lga_name16] =
            summary_lgas[fitered_lga_name].compound /
            summary_lgas[fitered_lga_name].count;
          state_wise[row.doc.state_territory].score +=
            summary_lgas[fitered_lga_name].compound;
          state_wise[row.doc.state_territory].count +=
            summary_lgas[fitered_lga_name].count;
        } else {
          lga_wise[row.doc.lga_name16] = 0;
        }
      });
      Object.keys(state_wise).forEach((state) => {
        state_wise[state] = state_wise[state].count
          ? state_wise[state].score / state_wise[state].count
          : 0;
      });
      res.send({ lga_wise, state_wise });
    });
  });
});

router.get("/getMapData", (req, res) => {
  let mapData = {};
  ["VIC", "NSW", "ACT", "WA", "SA", "NT", "QLD", "TAS"].forEach((st) => {
    let lga_data = require(`../data/lga/${st}.json`);
    mapData[st] = lga_data;
  });
  res.send(mapData);
});

router.post("/getSentimentScores", (req, res) => {
  let { screen_name } = req.body;
  let mp_db_handle = nano.db.use(screen_name.toLowerCase());
  let all_lga_db_handle = nano.db.use("all_lga");
  let state_wise = {
    NT: 0,
    SA: 0,
    WA: 0,
    QLD: 0,
    NSW: 0,
    VIC: 0,
    ACT: 0,
    TAS: 0,
  };
  let state_wise_count = {
    NT: 0,
    SA: 0,
    WA: 0,
    QLD: 0,
    NSW: 0,
    VIC: 0,
    ACT: 0,
    TAS: 0,
  };

  all_lga_db_handle.list({ include_docs: true }).then((all_lgas) => {
    // initialise result object with lga names as key with value 0
    let result = {};
    all_lgas.rows.forEach((ele) => {
      result[ele.doc.lga_name16] = 0;
    });
    // calculate sentiment score for all lgas
    mp_db_handle.list({ include_docs: true }).then((tweets) => {
      Object.keys(result).forEach((lga_name16) => {
        tweet_count = 0;
        tweets.rows.forEach((tweet, index) => {
          if (
            tweet.doc.state_territory &&
            tweet.doc.sentiment_score &&
            tweet.doc.sentiment_score.compound
          ) {
            state_wise[tweet.doc.state_territory] =
              state_wise[tweet.doc.state_territory] +
              tweet.doc.sentiment_score.compound;
            state_wise_count[tweet.doc.state_territory] =
              state_wise_count[tweet.doc.state_territory] + 1;
          }
          tweet.doc.near &&
            tweet.doc.near.forEach((loc, loci) => {
              if (
                lga_name16.substr(0, loc.length) == loc &&
                tweet.doc.sentiment_score &&
                tweet.doc.sentiment_score.compound
              ) {
                tweet_count++;
                result[lga_name16] =
                  result[lga_name16] + tweet.doc.sentiment_score.compound;
              }
            });
        });
        if (tweet_count > 0)
          result[lga_name16] = result[lga_name16] / tweet_count;
      });
      Object.keys(state_wise).forEach((ele) => {
        if (state_wise_count[ele] > 0)
          state_wise[ele] = state_wise[ele] / state_wise_count[ele];
      });
      res.send({ lga_wise: result, state_wise });
    });
  });
});

module.exports = router;
