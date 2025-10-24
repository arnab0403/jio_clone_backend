const express = require("express");
const { protectedRouteMiddleware } = require("../Controller/AuthController");
const { getUser, getUserWishList, addToWishList } = require("../Controller/UserController");

const userRouter = express.Router();

userRouter.use(protectedRouteMiddleware);
userRouter.get("/",getUser);
userRouter.get("/wishlist",getUserWishList);
userRouter.post("/wishlist",addToWishList);


module.exports=userRouter;
