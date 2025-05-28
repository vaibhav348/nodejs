const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId",userAuth, async(req,res)=>{

    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        const nonAllowdStatus = ['accepted', 'rejected'];

    if(nonAllowdStatus.includes(status)){
       return res.status(400).json({
            message : "invalid request"
        })
    }
    
    const toUser = await User.findById(toUserId)
    if(!toUser){
       return res.status(400).send("no user avalible")
    }

    const existingConnectionRequest = await ConnectionRequest.findOne({
        $or:[
            { fromUserId , toUserId},
            { fromUserId : toUserId, toUserId : fromUserId}  
        ]
    })
    if(existingConnectionRequest){
       return res.status(400).send("connection already exist!!!")
    }

        const connectionRequest  = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        }) 
        const data = await connectionRequest.save();
        
        res.json({
            message :  req.user.firstName + " is " +  status + " " + toUser.firstName,
        data});
    } catch (error) {
        res.status(400).send("ERR : "+ error.message)
    }
    
})
module.exports = requestRouter;