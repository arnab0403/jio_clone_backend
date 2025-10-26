const UserModel = require("../Model/UserModel");
const { getMediaList, TMDB_ENDPOINT } = require("../Services/tmdb");


async function getUser(req,res) {
    try {
        const userId = req.userId;

        const {name,email,wishList,isPremium,avatar} = await UserModel.findById(userId);

        res.status(200).json({
            user:{
                name:name,
                email:email,
                avatar:avatar,
                wishList:wishList,
                isPremium:isPremium
            },
            status:"success"
        });

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message:"Internal Server Error",
            status:"failed"
        });
    }
}

async function addToWishList(req,res){
    try {
        const userId=req.userId;
        const {id,media_type}=req.body;

        const user = await UserModel.findById(userId);

        if(!user){
            return res.status(404).json({
                message:"No user found",
                status:"failed"
            })
        }

        if(user.wishList.find(item => item.id===id)){
            return res.status(400).json({
                status:"failed",
                message:"Already Exist in Your Watchlist"
            })
        }

        let postItem;   

        if (media_type === "tv" ){
            postItem = (await getMediaList.get(TMDB_ENDPOINT.fetchTvShowDetails(id)));   
        }else{
            postItem = (await getMediaList.get(TMDB_ENDPOINT.fetchMovieDetails(id)));
        }

        console.log(postItem);
        const wishListItem = {
            poster_path:postItem.poster_path,
            name:postItem.name || postItem.title,
            id:postItem.id,
            media_type:media_type
        }

        await user.wishList.push(wishListItem);
        await user.save();
        

        res.status(200).json({
            status:"success",
            message:"Item added to wishlist"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message:"Internal Server Error",
            status:"failed"
        });
    }
}

async function getUserWishList(req,res) {
    try {
        const userId = req.userId;

        const {wishList}=await UserModel.findById(userId);
        
        if (wishList.length === 0) {
            return res.status(200).json({
                message:"No wishlist found",
                status:"success",
                wishList:[]
            })
        }

        res.status(200).json({
            message:"User wishlist",
            status:"success",
            wishList:wishList
        })
    } catch (error) {
        console.log("Error in getUserList: ",error);
        res.status(400).json({
            message:"Internal Server Error",
            status:"failed"
        });
    }
}
module.exports={getUser,addToWishList,getUserWishList}