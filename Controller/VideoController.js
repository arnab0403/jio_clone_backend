const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegInstaller =require("@ffmpeg-installer/ffmpeg");
const path = require("path");



function getAllPremiumVideos(req,res){
    try {
        fs.readdir("./Premium",(err,files)=>{
            if(err) throw err;
            const videos = files.map(file => ({
                name: file
            }));
            return res.status(200).json({
                message:"All videos",
                status:"success",
                videos:videos
            })
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal Sevrer Error",
            status:"failed"
        })
    }
}

function getVideosThumbnail(req,res){
    try {
        const { name }= req.query;
        const thumbnailName = name.split(".")[0] + ".jpg";
        
        
        const thumbnailPath = path.join("Thumbnails",thumbnailName);
        console.log("name",thumbnailPath);

        if(fs.existsSync(thumbnailPath)){
            return res.sendFile(path.join(__dirname,"..","Thumbnails",thumbnailName));
        }else{
            ffmpeg.setFfmpegPath(ffmpegInstaller.path);
            const xPath = path.join("Premium",name)
            ffmpeg(xPath)
            .screenshots({
                timestamps: ['00:00:04'],
                filename: thumbnailName,
                folder: "Thumbnails",
                size: '1020x720'
            })
            .on('end', () => console.log('Thumbnail created!'))
            .on('error', (err) => console.error('Error:', err));
        }



        res.sendFile(path.join(__dirname,"..","Thumbnails",thumbnailName));
        
    } catch (error) {
        console.log(error)
    }
}



function getPremiumVideos(req,res){

    try{
    // captureing the range ex: bytes=0-1000
    const {name}=req.query;
    console.log(name)
    const range = req.headers.range;
    if (range) {
        
        // reads information about your video file.
        const videoPath = path.join(__dirname,"..","Premium",name);
        const stat = fs.statSync(videoPath);
        const fileSize=stat.size;

        // just extracting the numbers from bytes=0-1000
        const parts = range.replace(/bytes=/,"").split("-");

        // converting to Integer
        const start = parseInt(parts[0],10);
        const end =parts[1]?parseInt(parts[1],10):fileSize-1;

        // calculateing chucnk size 
        const chunckSize=(end-start)+1;
        const header = {
            "Content-Type":"video/mp4",
            "Content-Length":chunckSize,
            "Accept-Ranges":"bytes",
            "Content-Range":`bytes ${start}-${end}/${fileSize}`
        }
        
        //seding header and status code
        res.writeHead(206,header);


        // streaming the video 
        const videoStreamInstance = fs.createReadStream(videoPath,{start,end});
        videoStreamInstance.pipe(res); 
    }else{
        res.status(400).json({
            message:"Invalid Request",

        })
    }
    }catch(err){
        console.log(err)
    }

   
}



module.exports={getPremiumVideos,getAllPremiumVideos, getVideosThumbnail}