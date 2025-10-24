const express = require("express");
const { getNowPlaying, getPopular, getToprated, getTrending, getUpcoming} = require("../Controller/DiscoverModel");
const discoverRouter = express.Router();


discoverRouter
    .get("/now-playing",getNowPlaying)
    .get("/trending",getTrending)
    .get("/top-rated",getToprated)
    .get("/upcoming",getUpcoming)
    .get("/popular",getPopular)

    
module.exports=discoverRouter;