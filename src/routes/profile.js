const express = require("express");
const { userAuth } = require("../middleware/auth");
const { validateEditProfileData } = require("../utils/validation");
const profileRouter = express.Router();
profileRouter.get("/profile/view",userAuth, async(req, res)=>{
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

profileRouter.patch("/profile/edit", userAuth, async(req,res)=>{
try {
        if(!validateEditProfileData(req)){
           throw new Error("invalid edit reqest");
        }
        const loggedInUser =req.user; 
        Object.keys(req.body).forEach((key)=>{
            loggedInUser[key] = req.body[key]
        })
        await loggedInUser.save() 
        res.json({message : `${loggedInUser.firstName}, profile updated successfull!!!`,
        data : loggedInUser})
        
        
} catch (error) {
    res.status(400).send("ERR : "+error.message )
}
})

module.exports = profileRouter