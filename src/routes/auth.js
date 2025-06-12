const express = require("express");
const { validateSingUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt")

const authRouter = express.Router();

authRouter.post("/singup", async (req, res) => {
    try {
        validateSingUpData(req);
        const { firstName, lastName, emailId, password , skills, gender} = req.body;
        
        
        if(firstName.length > 20){
            throw new Error("Firstname should be smaller then 20 char");
        }
        if(lastName.length > 20){
            throw new Error("Lastname should be smaller then 20 char");
        }
        if(await User.findOne({ emailId })){
             throw new Error("Email is already present");
        }
      

        
        const hashedPassword = await bcrypt.hash(password, 10);


        const user =await new User({
            firstName,
            lastName,
            emailId,
            password: hashedPassword,
            skills,
            gender
        })

       const savedUser = await user.save()
       const token =  await user.getJWT()
        
            res.cookie("token",token,{
                expires : new Date(Date.now() + 8 * 3600000)
            })
    res
      .status(200)
      .json({ message: "User added successfully", data: savedUser });
        

            } catch (error) {
        res.status(400).send( error.message +"!!!")

    }
})
authRouter.post("/login", async (req, res) => {


    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId })
        if (!user) {
            throw new Error("User is not present in DB!!!")
        }
        const isPasswordValid = await user.validatePassword(password);
        if(!isPasswordValid){
            throw new Error("Password in Wronge!!!")
        }
        if (isPasswordValid) {
            const token =  await user.getJWT()
        
            res.cookie("token",token,{
                expires : new Date(Date.now() + 8 * 3600000)
            })
             res.status(200).json({ user });
        } else {
            res.status(400).send("Invalid Vredentials!!!")
        }
    } catch (error) {
        res.status(400).json({message :  error.message})
    }
})

authRouter.post("/logout", async(req,res)=>{
    try {
     res.cookie("token", null, {
        expires : new Date(Date.now())
     })   
     res.send("Logout Successfully!!!")
    } catch (error) {
        res.status(400).send("ERR : "+ error.message)
    }
})

module.exports = authRouter;