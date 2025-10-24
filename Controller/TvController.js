const { getMediaList, TMDB_ENDPOINT } = require("../Services/tmdb")

async function getActionTvShows(req,res){
    try {
        const response = await getMediaList.get(TMDB_ENDPOINT.fetchActionTvShows);
        console.log(response)
        
        response.results.forEach(item => {
            item.media_type = "tv";
        });

        res.status(200).json({
            message:"Action Tv Shows",
            media:response,
            status:"failed"
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message:"Internal Server Error",
            status:"failed"
        })
    }
}


async function getComedyTvShows(req,res){
    try {
        console.log("debug");
        const response = await getMediaList.get(TMDB_ENDPOINT.fetchComedyTvShows);
        console.log(response)
        
        response.results.forEach(item => {
            item.media_type = "tv";
        });

        res.status(200).json({
            message:"Comedy Tv Shows",
            media:response,
            status:"failed"
        })
    } catch (error) {
        res.status(400).status({
            message:"Internal Server Error",
            status:"failed"
        })
    }
}

async function getCrimeTvShows(req,res){
    try {
        console.log("debug");
        const response = await getMediaList.get(TMDB_ENDPOINT.fetchCrimeTvShows);
        console.log(response)
        
        response.results.forEach(item => {
            item.media_type = "tv";
        });

        res.status(200).json({
            message:"Crime Tv Shows",
            media:response,
            status:"failed"
        })
    } catch (error) {
        res.status(400).status({
            message:"Internal Server Error",
            status:"failed"
        })
    }
}


async function getDramaTvShows(req,res){
    try {
        console.log("debug");
        const response = await getMediaList.get(TMDB_ENDPOINT.fetchDramaTvShows);
        console.log(response)
        
        response.results.forEach(item => {
            item.media_type = "tv";
        });

        res.status(200).json({
            message:"Drama Tv Shows",
            media:response,
            status:"failed"
        })
    } catch (error) {
        res.status(400).status({
            message:"Internal Server Error",
            status:"failed"
        })
    }
}

async function getMysteryTvShows(req,res){
    try {
        console.log("debug");
        const response = await getMediaList.get(TMDB_ENDPOINT.fetchMysteryTvShows);
        console.log(response)
        
        response.results.forEach(item => {
            item.media_type = "tv";
        });

        res.status(200).json({
            message:"Mystrey Tv Shows",
            media:response,
            status:"failed"
        })
    } catch (error) {
        res.status(400).status({
            message:"Internal Server Error",
            status:"failed"
        })
    }
}


async function getTvShowsDetails(req,res){
    try {
        const {id}=req.query;
        console.log("debug");
        const response = await getMediaList.get(TMDB_ENDPOINT.fetchTvShowVideos(id));
        console.log(response)
        
        response.results.forEach(item => {
            item.media_type = "tv";
        });

        res.status(200).json({
            message:"Mystrey Tv Shows",
            media:response,
            status:"failed"
        })
    } catch (error) {
        res.status(400).status({
            message:"Internal Server Error",
            status:"failed"
        })
    }
} 
module.exports={getActionTvShows, getComedyTvShows,getCrimeTvShows,getDramaTvShows,getMysteryTvShows, getTvShowsDetails};