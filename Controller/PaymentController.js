const dotenv = require("dotenv");
const UserModel=require("../Model/UserModel");
// Razorpay Dependencies 
const Razorpay = require("razorpay");
const ShortId=require("short-unique-id");


dotenv.config();


const {RAZORPAY_PUBLIC_KEY,RAZORPAY_PRIVATE_KEY}=process.env;

const instance = new Razorpay({
    key_id:RAZORPAY_PUBLIC_KEY,
    key_secret:RAZORPAY_PRIVATE_KEY
})


async function createCheckout (req,res){
    try {
        const amount = req.body.amount;
        const currency = "INR";
        const uid = new ShortId( { length: 10} );
        const orderConfig={
            amount:amount*100,
            currency:currency,
            receipt:uid.rnd(),
        }

        const order =await instance.orders.create(orderConfig);

        res.status(202).json({
            message:"Checkout created",
            order: order
        })


    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error",
            status:"failed"
        })
    }
}


async function updatePremiumDetails(req,res) {
    try {
        const {email} = req.body;

        const user = await UserModel.findOne({email});

        if(!user){
            return res.status(404).json({
                message:"User not found",
                status:"failed"
            })
        }

        user.isPremium=true;

        await user.save();

        res.status(200).json({
            message:"User premium status updated",
            status:"success"
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error",
            status:"failed"
        })
    }
}


module.exports={createCheckout,updatePremiumDetails}