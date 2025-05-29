const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter =express.Router();

//all panding status request
userRouter.get("/user/requests", userAuth, async(req,res)=>{
    try {
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            toUserId  : loggedInUser._id,
            status : "interested"
        }).populate("fromUserId", "firstName lastName photoUrl age gender skills")
        // .populate("fromUserId", ["firstName","lastName"])
          res.status(200).json({
            message:"connection request are",
            connectionRequest
        })

    } catch (error) {
          res.status(400).send("Err : "+error.message)
    }
})

userRouter.get("/user/connections", userAuth, async(req,res)=>{
const SAFE_USER_DATA = "firstName lastName gender photoUrl age about skills"
    try {
        const loggedInUser = req.user;        
        const connection = await ConnectionRequest.find({ 
            $or:[
                {toUserId : loggedInUser._id , status: "accepted" },
                {fromUserId : loggedInUser._id , status: "accepted" }

            ]
            }).populate("fromUserId",   SAFE_USER_DATA)
            .populate("toUserId",   SAFE_USER_DATA)
       const data = connection.map((row)=>{
        if(row.fromUserId._id.toString() == loggedInUser._id.toString()){
            return row.toUserId;
        }
        return row.fromUserId;
       })
        
        return res.status(200).json({data})
        
    } catch (error) {
        return res.status(400).send("ERR: "+ error.message)
    }
})
module.exports = userRouter