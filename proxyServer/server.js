const express = require("express");
const app = express();
const fetch = require('node-fetch');
const  cors = require('cors');

let queryParam = "Clubbing In Cantebury";
let locationParam = "United Kingdom";

app.use(

    cors({
        origin: "*"
    })
//cors()
)

//http://localhost:3000/api/googleEvents/Clubbing In Canterbury/United Kingdom
app.get("/api/googleEvents/:query/:location",  async (req, res) => {
    /*
    const response = await fetch("https://raw.githubusercontent.com/adhithiravi/React-Hooks-Examples/master/testAPI.json");
    res.json(await response.json())

     */

    //#######################################################

    queryParam = req.params.query;
    locationParam = req.params.location;//

    const SerpApi = require('google-search-results-nodejs');
    const search = new SerpApi.GoogleSearch("da7203eb879f74f5c81852618ca7a91c2d35a0c298af3ed1d11d14331eed437b");

    const params = {
        engine: "google_events",
        q: `${queryParam}`,
        hl: "en",
        gl: "uk",
        location:`${locationParam}`,
        num:"100"
    };
    const callback = function(data) {
       console.log(data['events_results']);
        res.json(data['events_results'])
       // res.json(data)
    };

    // Show result as JSON
    search.json(params, callback);


})
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}` )
})
