const express = require("express");
const app = express();
const fetch = require('node-fetch');
const  cors = require('cors');

app.use(
    /*
    cors({
        origin: "*"
    }) */ cors())

const PORT = process.env.PORT || 3000

app.get("/",  async (req, res) => {
    const response = await fetch("https://serpapi.com/search.json?engine=google_events&q=Events+in+Austin&hl=en&gl=us&api_key=da7203eb879f74f5c81852618ca7a91c2d35a0c298af3ed1d11d14331eed437b");
    res.json(await response.json())
})

app.listen(3000, () => {
    console.log(`Listening on port ${PORT}` )
})
