const express = require("express");
const { getActionMovies, getComedyMovies, getMovieDetails, getAnimeMovies, getHorrorMovies, getRomanceMovies, getPremiumVideos } = require("../Controller/MovieController");
const movieRouter = express.Router();


movieRouter.get("/action", getActionMovies);
movieRouter.get("/comedy", getComedyMovies);
movieRouter.get("/horror", getHorrorMovies);
movieRouter.get("/romance", getRomanceMovies);
movieRouter.get("/anime", getAnimeMovies);
movieRouter.get("/details",getMovieDetails);

    
module.exports=movieRouter;