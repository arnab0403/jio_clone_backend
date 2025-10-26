const mongoose = require("mongoose");

const wishListItemSchema = new mongoose.Schema({
    poster_path:{type:String, required:true},
    name:{type:String, required:true},
    id:{type:String, required:true},
    media_type:{type:String, required:true}
})

const user ={
    name: {
        type: String, 
        required: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String,
    },
    avatar:{
        type:String
    },
    provider:{
        type:String,
        default:"jio",
        enum:["google","jio"],
    },
    isPremium:{
        type:Boolean,
        default:false
    },
    otp:{
        type:String,
    },
    wishList:[wishListItemSchema]
}


const userSchema = new mongoose.Schema(user);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
