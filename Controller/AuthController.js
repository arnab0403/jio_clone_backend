const UserModel = require("../Model/UserModel");
const bcrypt = require("bcrypt");
const jswonwebtoken=require("jsonwebtoken");
const util = require("util");

const promisify = util.promisify;
const jswtSign = promisify(jswonwebtoken.sign);
const jwtVerify = promisify(jswonwebtoken.verify);

const otpSend = require("../Utility/DynamicMail");

// password hashing 
async function hashPassword(password) {
  const saltRounds = 10; // higher = more secure, but slower
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}


// signup 
const signUp = async (req, res) =>{
    try {
        const user = req.body;

        // Error handle
        if (!user) {
            res.status(400).json(
                {
                    message:"User object needed",
                    status:"failed"
                }
            );
        }

        const email = user.email;
        const isExist=await UserModel.findOne({email});

        if(isExist){
            return res.status(400).json({
                message:"User already exist",
                status:"failed"
            })
        }
        // password hashing
        const password=user.password;
        const hashedPassword = await hashPassword(password);

        // attach the hashed password to the user
        user.password = hashedPassword;

        // insert the user to the DB
        const userRes = await UserModel.create(user);

        // sending Response
        res.status(202).json({
            message:"User created sucsessfully",
            status:"success",
            user:userRes
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message:"Internal Server Error",
            status:"failed"
        })
    }
}

// login 
const login = async (req,res)=>{
    try {
        const body = req.body;
        const {email,password} = body;
        console.log(email, password)


        if (!email || !password) {
           return res.status(401).json({
                message:"all fileds are required",
                status:"failed"
            })
        }

        const userRes =await UserModel.findOne({email});


        // edge case when user signed up with google auth
        if (userRes?.provider === "google") {
            return res.status(404).json({
                message:"Please Use Google Sign in",
                status:"failed"
            })
        }

        // when user not found
        if (!userRes) {
            console.log("notfound");
            return res.status(404).json({
                message:"Email ID or Password is wrong",
                status:"failed"
            })
        }

        const userPassword = userRes.password;

        const isVerified = await bcrypt.compare(password, userPassword);

        // when password not matched 
        if (!isVerified) {
            return res.status(401).json({
                message:"Email ID or Password is Wrong",
                status:"failed"
            })
        }

        const token = await jswtSign({"id":userRes["_id"]},process.env.SECRECT_KEY);

        res.cookie("jwt", token, {
        maxAge: 1000 * 60 * 60 *24,
        httpOnly:true, // it can only be accessed by the server
        secure: true, // 👈 cookie only sent over HTTPS
        sameSite: "none" // 👈 required for cross-site cookies
        });

        res.status(200).json({
            message:"user sucsessfully logged in",
            status:"success",
            user:userRes
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal Server Error",
            status:"failed"
        });
    }
}

// logout
const logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      path: "/"
    });
    res.status(200).json({
      message: "Logged out successfully",
      status: "success"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      status: "failed"
    });
  }
};


// forgot password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "No user found",
        status: "failed"
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000); 

    user.otp = otp;
    await user.save();

    otpSend(user.email, user.name, otp);

    return res.status(200).json({
      message: "OTP sent",
      status: "success"
    });

  } catch (error) {
    console.log("Error in line Number 139", error);
    return res.status(500).json({
      message: "Internal Server Error",
      status: "failed"
    });
  }
};

// rest password
const resetPassword = async (req,res)=>{
    try {
        console.log(req.body);
        const {email,otp,password}=req.body;
        const userRes = await UserModel.findOne({email});
        if(!userRes){
            return res.status(404).json({
                message:"Email ID not found",
                status:"failed"
            });
        }
        const userOtp = userRes.otp;

        if (userOtp!==otp) {
            return res.status(404).json({
                message:"Wrong otp",
                status:"failed"
            });
        }

        const hashedPassword = await hashPassword(password);
        userRes.password=hashedPassword;
        userRes.otp=undefined;

        userRes.save();

        res.status(200).json({
            message:"otp confirmed, user verified",
            status:"success"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
        message: "Internal Server Error",
        status: "failed"
        });
    }
}



async function protectedRouteMiddleware (req,res,next){
    try {

        if (req.cookies && req.cookies?.jwt) {
            const jwtToken = req.cookies.jwt;
            const jwt = await jwtVerify(jwtToken,process.env.SECRECT_KEY);
            const id = jwt.id;
            req.userId = id;
            next();
        }else{
            console.log("No Cookies here")
            return res.status(400).json({
            message:"No Cookies Found",
            status:"failed"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal Server Error",
            status:"failed"
        });
    }
}

module.exports={signUp,login,logout,resetPassword,forgotPassword,protectedRouteMiddleware};