const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const passport = require("passport");
require("dotenv").config();

const UserModel = require("../Model/UserModel");


passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://jio-clone-backend-2.onrender.com/api/auth/google/callback",
  },
  async function(request, accessToken, refreshToken, profile, done) {
    try {
         // checking the user is already present in the database or not
        let user = await UserModel.findOne({ email: profile.emails[0].value });

      
        // creating the user if not present
        if (!user) {
              const newUser = {
                googleId: profile.id,
                email:profile.emails[0].value,
                name: profile.displayName,
                avatar: profile.photos[0].value,
                provider: 'google'
            };
            user = await UserModel.create(newUser);
        }

        // passing the user object to req for -> auth/google/callback
        return done(null,user);
    } catch (error) {
        return done(error,null);   
    }
  }
));