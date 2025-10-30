const express = require("express");
const dotenv=require("dotenv");
const authRouter = require("./Routes/AuthRouter");
const movieRouter = require("./Routes/MovieRouter");
const mongoose = require("mongoose");
const cors = require("cors");
const discoverRouter = require("./Routes/DiscoverRoute");
const userRouter = require("./Routes/UserRoute");
const tvRouter = require("./Routes/TvRouter");
const cookieParser = require('cookie-parser');
const { videoRouter } = require("./Routes/VideoRoute");
const { paymentRouter } = require("./Routes/PaymentRoute");
const googleRouter = require("./Routes/GoogelAuthRouter");
require("./Utility/passport");
const app = express();
dotenv.config();

const dbLink = `mongodb+srv://${process.env.db_user}:${process.env.password}@bookres.uiel5v2.mongodb.net/?retryWrites=true&w=majority&appName=BookRes`
const {PORT}=process.env;

mongoose.connect(dbLink)
.then(function(){
    console.log("DB Connected");
});

app.use(cors({
  origin: "https://project-jio-clone-frontend.vercel.app", // frontend URL
  credentials: true                // 👈 allow cookies
}));

app.use(cookieParser());
app.use(express.json());

// routes
app.use("/api/auth/",authRouter);
app.use("/api/user/",userRouter);
app.use("/api/discover/",discoverRouter);
app.use("/api/tv/",tvRouter);
app.use("/api/movies/",movieRouter);
app.use("/api/premium/",videoRouter);
app.use("/api/payment",paymentRouter);
app.use("/api/auth/google/",googleRouter);


app.listen(PORT,function(){
    console.log("Server Started At PORT NO: ",PORT);
});