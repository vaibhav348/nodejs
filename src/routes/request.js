const express = require("express");
const { userAuth } = require("../middleware/auth");
const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest",userAuth, (req,res)=>{

    console.log("Sending a connection reqest");

    res.send("send connection reqset successfully!!!");
    
})
module.exports = requestRouter;