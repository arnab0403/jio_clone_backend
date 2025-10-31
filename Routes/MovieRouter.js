const express = require("express");
const { getActionMovies, getComedyMovies, getMovieDetails, getAnimeMovies, getHorrorMovies, getRomanceMovies, getPremiumVideos, getMovieDetailsByName } = require("../Controller/MovieController");
const movieRouter = express.Router();


movieRouter.get("/action", getActionMovies);
movieRouter.get("/comedy", getComedyMovies);
movieRouter.get("/horror", getHorrorMovies);
movieRouter.get("/romance", getRomanceMovies);
movieRouter.get("/anime", getAnimeMovies);
movieRouter.get("/details",getMovieDetails);
movieRouter.get("/search",getMovieDetailsByName);

    
module.exports=movieRouter;