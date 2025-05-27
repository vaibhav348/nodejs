const express = require("express");
const { userAuth } = require("../middleware/auth");
const profileRouter = express.Router();
profileRouter.get("/profile",userAuth, async(req, res)=>{
    try {
       
        const user = req.query;
        if(!user){
            throw new Error("user not found")
        }
        console.log(user);
    
        res.send(user)
    } catch (error) {
        res.status(400).send("error while fectcing profile "+error.message)
    }
    
    
})

module.exports = profileRouter