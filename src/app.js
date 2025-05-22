const express = require('express');
const { adminAuth } = require('./middleware/adminAuth');
const connectDb = require("./config/database")
const User = require("./models/user.js")
const app = express();

app.use(express.json());
app.post("/singup", async(req, res)=>{
    const data  = req.body;
    console.log(data);
    
    const user = new User({
        firstName : data.firstName,
        lastName : data.lastName,
        emailId : data.emailId,
        password : data.password
    })
    try {
        await user.save()
        res.status(200).send("user created successfully")
        
    } catch (error) {
        res.status(400).send("user not created successfully")
        
    }
})


connectDb().then(
    () => {
        console.log("database connection stable");
        app.listen(3000);
        console.log('Server is running on port 3000');

    })
    .catch(() => {
        console.log("database connection disable");

    })

