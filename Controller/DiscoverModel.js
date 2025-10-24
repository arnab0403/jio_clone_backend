const { TMDB_ENDPOINT, getMediaList } = require("../Services/tmdb");



async function getNowPlaying (req,res){
    try {
        const response =await getMediaList.get(TMDB_ENDPOINT.fetchNowPlaying);
        res.status(200).json({
            message:"Now Playing Movies",
            status:"success",
            nowPlaying:response
        })
    } catch (error) {
        res.status(400).json({
            message:"Internal Server Error",
            status:"failed"
        })
    }
}

async function getTrending (req,res){
    try {
        const response =await getMediaList.get(TMDB_ENDPOINT.fetchTrending);
        res.status(200).json({
            message:"Tranding Movies",
            status:"success",
            nowPlaying:response
        })
    } catch (error) {
        res.status(400).json({
            message:"Internal Server Error",
            status:"failed"
        })
    }
}


async function getPopular (req,res){
    try {
        const response =await getMediaList.get(TMDB_ENDPOINT.fetchPopular);
        res.status(200).json({
            message:"Popular Movies",
            status:"success",
            nowPlaying:response
        })
    } catch (error) {
        res.status(400).json({
            message:"Internal Server Error",
            status:"failed"
        })
    }
}


async function getUpcoming (req,res){
    try {
        const response =await getMediaList.get(TMDB_ENDPOINT.fetchUpcoming);
        res.status(200).json({
            message:"Popular Movies",
            status:"success",
            nowPlaying:response
        })
    } catch (error) {
        res.status(400).json({
            message:"Internal Server Error",
            status:"failed"
        })
    }
}


async function getToprated (req,res){
    try {
        const response =await getMediaList.get(TMDB_ENDPOINT.fetchTopRated);
        res.status(200).json({
            message:"Popular Movies",
            status:"success",
            nowPlaying:response
        })
    } catch (error) {
        res.status(400).json({
            message:"Internal Server Error",
            status:"failed"
        })
    }
}


module.exports={getNowPlaying,getPopular,getToprated,getTrending,getUpcoming}
