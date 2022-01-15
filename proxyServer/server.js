const express = require("express");
const app = express();
const fetch = require('node-fetch');
const  cors = require('cors');

app.use(

    cors({
        origin: "*"
    })
//cors()
)

const PORT = process.env.PORT || 3000

app.get("/",  async (req, res) => {
    const response = await fetch("https://reactnative.dev/movies.json");
    res.json(await response.json())
})

app.listen(3000, () => {
    console.log(`Listening on port ${PORT}` )
})
