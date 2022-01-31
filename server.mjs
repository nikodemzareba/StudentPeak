

import express from "express";

// Define "require"
import { createRequire } from "module";
import * as req from "express";
const require = createRequire(import.meta.url);



//const express = require("express");
const app = express();
//const fetch = require('node-fetch');
const  cors = require('cors');
const SerpApi = require("google-search-results-nodejs");
require('dotenv').config();




app.use(
    cors({
        origin: "*"
    })
)

const port = process.env.PORT || 3000;
const API_KEY = process.env.SerAPI_KEY;
const IP = process.env.IP;

app.get("/api",  (req, res) => {
     res.json({
         "hello": ["chris", "ben"]
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
        const txtSeparator = "\n#####################################################################################################################";
        console.log(`\n\n${txtSeparator} \nFetch Results \n${txtSeparator}\n\n`);
        console.log(data['events_results']);
        console.log(`\n\n${txtSeparator} \n\n`);

        res.json(data)
    };

    // Show result as JSON
    search.json(params, callback);
});

const txt_separator = "\n\n###################################################################\n";
const ip = require("ip");
const ip_Address = ip.address();
console.log(`\nSession IP: Client Ip ${ip_Address}`)




//When IP works switch to
/*
app.listen(port, ip_Address, () => {

    console.log(`\n\nListening on port ${port}`)
    console.log(`Server running at http://${ip_Address}:${port}/ \n${txt_separator}`);
})

 */

app.listen(port, IP, () => {
    console.log(`\n\nListening on port ${port}`)
    console.log(`Server running at HardCoded  http://${IP}:${port}/ \n${txt_separator}`);
})


