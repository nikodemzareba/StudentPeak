

import express, {request} from "express";

// Define "require"
import { createRequire } from "module";
import * as req from "express";
import {useState} from "react";
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
const hostname_hardCoded = process.env.IP;


app.get("/api",  (req, res) => {
     res.json({
         "hello": ["chriss", "ben"]
     })
});


app.get("/IP_Address",  (req, res) => {
     require('dns').lookup(require('os').hostname(), function (err, add, fam) {

         res.json({
             "IP": add
         })
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

const ip = require("ip");
const ip_Address = ip.address();
console.dir (ip_Address );

let hostname = "Nothing";
await require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    hostname = add;
    console.log('addr: ' + add);
})

const ip2 = "192.168.0.31";
app.listen(port, hostname_hardCoded, () => {
    console.log(`Listening on port ${port}`)
    console.log(`Server running at http://${hostname_hardCoded}:${port}/`);

})