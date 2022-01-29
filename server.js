const express = require("express");
const app = express();
//const fetch = require('node-fetch');
const  cors = require('cors');
const SerpApi = require("google-search-results-nodejs");
require('dotenv').config();

//console.log(process.env.PORT);
//console.log(process.env.API_KEY);

app.use(

    cors({
        origin: "*"
    })
)

const port = process.env.PORT || 3000;
const API_KEY = process.env.SerAPI_KEY;

app.get("/api",  (req, res) => {
     res.json({
         "hello": ["chriss", "ben"]
     })
});





// http://localhost:3001/api/googleEvents/Clubbing/Kent
app.get("/api/googleEvents/:query/:location",  async (req, res) => {

    //#######################################################

    const queryParam = req.params.query;
    const locationParam = req.params.location;//

    const SerpApi = require('google-search-results-nodejs');
    const search = new SerpApi.GoogleSearch(API_KEY);

    const params = {
        engine: "google_events",
        q: `${queryParam} in ${locationParam}`,
        hl: "en",
        gl: "uk",
        location: `United Kingdom`,
        num: "100"
    };
    const callback = function (data) {
        const txtSeperator = "\n#####################################################################################################################";
        console.log(`\n\n${txtSeperator} \nFetch Results \n${txtSeperator}\n\n`);
        console.log(data['events_results']);
        console.log(`\n\n${txtSeperator} \n\n`);

        res.json(data)
    };

    // Show result as JSON
    search.json(params, callback);
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})