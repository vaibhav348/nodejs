const express = require('express');
const { userAuth } = require('./middleware/auth.js');
const connectDb = require("./config/database")
const bcrypt = require("bcrypt")
const User = require("./models/user.js")
const { validateSingUpData } = require("./utils/validation.js");
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken")

const app = express();

app.use(express.json());
app.use(cookieParser())
app.post("/singup", async (req, res) => {
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

app.post("/login", async (req, res) => {


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

app.get("/profile",userAuth, async(req, res)=>{
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

app.post("/sendConnectionRequest",userAuth, (req,res)=>{

    console.log("Sending a connection reqest");

    res.send("send connection reqset successfully!!!");
    
})
app.get("/user", async (req, res) => {
    const userEmail = req.query.emailId;
    console.log(userEmail);

    try {
        const users = await User.find({ emailId: userEmail });
        if (users.length == 0) {
            res.status(401).send("dont recive any match")
        } else {
            res.status(200).send(users)
        }

    } catch (error) {
        res.status(400);

    }
})

app.get("/oneuser", async (req, res) => {
    const userEmail = req.query.emailId;
    console.log(userEmail);

    try {
        const user = await User.findOne({ emailId: userEmail });

        res.status(200).send(user)


    } catch (error) {
        res.status(400);

    }
})

app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        console.log(users);
        res.status(200).send(users)


    } catch (error) {
        res.status(200).send(users)

    }
})

app.delete("/user", async (req, res) => {
    const userId = req.query.Id;

    try {
        const user = await User.findByIdAndDelete(userId);
        console.log(userId, user);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).send("User deleted successfully");

    } catch (error) {
        res.status(401).send("error while deleting")
    }
})

app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;


    try {
        const ALLOWED_UPDATES = ["userId", "photoUrl", "about", "gender", "age", "skills"];

        const isUpdateAllowed = Object.keys(data).every((k) =>
            ALLOWED_UPDATES.includes(k)
        )
        if (!isUpdateAllowed) {
            throw new Error("update not allowed")
        }
        if (data?.skills.length > 10) {
            throw new Error("skills can not more then 10")
        }
        const user = await User.findByIdAndUpdate({ _id: userId }, data, {
            returnDocument: "before",
            runValidators: true

        })
        console.log(user);
        res.send("update data successfuly")

    } catch (error) {
        res.status(400).send("problem while update" + error.message)
    }
})

app.put("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;

    try {
        const user = await User.findByIdAndUpdate({ _id: userId }, data, {
            returnDocument: "before"

        })
        console.log(user);
        res.send("update data successfuly")

    } catch (error) {
        res.status(400).send("problem while update")
    }
})

connectDb().then(() => {
    console.log("database connection stable");
    app.listen(3000);
    console.log('Server is running on port 3000');
}).catch(() => {
    console.log("database connection disable");
}
)

