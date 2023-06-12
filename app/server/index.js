/*

"express" for creating a http server
"path" for working with file and directory paths
"body-parser" is a middleware for parsing incoming request bodies
DIST_DIR is the path of the bundles React code with respect to this file
The APIs are imported from "apis.js"
"cors" is a middleware that can be used to enable CORS with various options
"dotenv" for loading environment variable from the .env file in the node environment
"nano" is the official CouchDB client for Node.js

*/

const express = require("express");
const path = require("path");
var bodyParser = require("body-parser");
const DIST_DIR = path.join(__dirname, "../dist");
const apis = require("./apis");
const cors = require("cors");
require("dotenv").config();
const nano = require("nano")(process.env.COUCHDB_REMOTE_HOST);

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(express.static(DIST_DIR));

const HTML_FILE = path.join(DIST_DIR, "index.html");

// All requests starting with "/api" are routed to "apis.js"
app.use("/api", apis);


/* 
All other routes are served with a blank HTML file attached 
with the bundled React code which has its own route handling library 
*/
app.get("*", (req, res) => {
  res.sendFile(HTML_FILE);
});

// Checks if the 'all_lga' database exists. If not, creates it and adds the data 
nano.db.list().then((dblist) => {
  if (!dblist.includes(`all_lga`)) {
    nano.db.create(`all_lga`).then(() => {
      const db_handle = nano.db.use(`all_lga`);
      ["VIC", "NSW", "ACT", "WA", "SA", "NT", "QLD", "TAS"].forEach((st) => {
        let lga_data = require(`../data/lga/${st}.json`);
        lga_data.features.forEach((ele) => {
          db_handle.insert({
            state_territory: st,
            lga_name16: ele.properties.lga_name16,
            lga_code16: ele.properties.lga_code16,
          });
        });
      });
    });
  }
});

// Server listens for requests on port 7000. PORT is defined in .env file.
app.listen(
  process.env.PORT,
  console.log(`Server started on port ${process.env.PORT}`)
);
