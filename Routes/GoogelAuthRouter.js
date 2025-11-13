const passport = require("passport");
const jwt = require("jsonwebtoken");
const express=require("express");
require("dotenv").config();
const googleRouter=express.Router();


googleRouter.get('/',
  passport.authenticate('google', { scope:[ 'email', 'profile' ] }
));

googleRouter.get( '/callback',passport.authenticate( 'google',{session:false}),
    (req,res)=> {
        try {
            // user is attached to req.user by passport verify callback
            const user = req.user;
            
            const FRONT_END_URL=process.env.FRONT_END_URL;
            if(user.provider==="jio"){
                return res.redirect(`${FRONT_END_URL}/login?error=manual_account`)
            }
            
            // Create JWT access token
            const jwtToken = jwt.sign({id:user._id},process.env.SECRECT_KEY,{expiresIn:"7d"});

            // attatching it to the 
            res.cookie("jwt",jwtToken,{
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly:true,
                secure: true,    
                sameSite:"none",
                domain:"https://project-jio-clone-frontend.vercel.app"
            });

            // redirecting to desiganted page
            console.log("Cookie Updated");
            res.redirect(`${FRONT_END_URL}/`);

        } catch (error) {
            console.log(error);
            const FRONT_END_URL=process.env.FRONT_END_URL
            res.redirect(`${FRONT_END_URL}/login?error=google_failed`);
        }
    }
);


module.exports=googleRouter