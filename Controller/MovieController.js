const { TMDB_ENDPOINT, getMediaList } = require("../Services/tmdb");

async function getActionMovies(req,res) {
    const response = await getMediaList.get(TMDB_ENDPOINT.fetchActionMovies);

    res.status(200).json({
        message:"Action Movies",
        status:"success",
        media:response
    })
}

async function getComedyMovies(req,res) {
    const response = await getMediaList.get(TMDB_ENDPOINT.fetchComedyMovies);

    res.status(200).json({
        message:"Comedy Movies",
        status:"success",
        media:response
    })
}

async function getHorrorMovies(req,res) {
    const response = await getMediaList.get(TMDB_ENDPOINT.fetchHorrorMovies);

    res.status(200).json({
        message:"Horror Movies",
        status:"success",
        media:response
    })
}

async function getRomanceMovies(req,res) {
    const response = await getMediaList.get(TMDB_ENDPOINT.fetchRomanceMovies);

    res.status(200).json({
        message:"Romance Movies",
        status:"success",
        media:response
    })
}

async function getAnimeMovies(req,res) {
    const response = await getMediaList.get(TMDB_ENDPOINT.fetchAnimeMovies);

    res.status(200).json({
        message:"Anime Movies",
        status:"success",
        media:response
    })
}

async function getMovieDetails(req,res) {

    try {
        const {id} = req.query;
        const response = await getMediaList.get(TMDB_ENDPOINT.fetchMovieVideos(id));

        res.status(200).json({
            message:"Movies Details",
            status:"success",
            media:response
        }) 
    } catch (error) {
        res.status(400).json({
            message:"Internal Server Error",
            status:"failed",
            media:response
        }) 
    }

    
}





module.exports={getActionMovies, getAnimeMovies, getComedyMovies, getHorrorMovies, getRomanceMovies, getMovieDetails}