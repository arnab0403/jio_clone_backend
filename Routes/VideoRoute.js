const express = require("express");
const { getAllPremiumVideos, getVideosThumbnail, getPremiumVideos } = require("../Controller/VideoController");
const videoRouter = express.Router();

videoRouter.get("/video",getAllPremiumVideos);
videoRouter.get("/video/stream",getPremiumVideos);
videoRouter.get("/video/thumbnail",getVideosThumbnail);

module.exports={videoRouter};