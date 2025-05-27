const express = require("express");
const { validateSingUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt")

const authRouter = express.Router();

authRouter.post("/singup", async (req, res) => {
    try {
        validateSingUpData(req);
        const { firstName, lastName, emailId, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: hashedPassword
        })

        await user.save()
        res.status(200).send("user created successfully")

    } catch (error) {
        res.status(400).send("user not created successfully " + error.message)

    }
})
authRouter.post("/login", async (req, res) => {


    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId })
        if (!user) {
            throw new Error("User is not present in DB")
        }
        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid) {
            const token =  await user.getJWT();
            res.cookie("token",token,{
                expires : new Date(Date.now() + 8 * 3600000)
            })
            res.status(200).send("Login Successfull!!!");
        } else {
            res.status(400).send("password not Match!!!")
        }
    } catch (error) {
        res.status(400).send("problem while login " + error.message)
    }
})

module.exports = authRouter;