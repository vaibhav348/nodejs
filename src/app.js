const express = require('express');
const { userAuth } = require('./middleware/auth.js');
const connectDb = require("./config/database")
const User = require("./models/user.js")
const { validateSingUpData } = require("./utils/validation.js");
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken")
const cors = require("cors")


const app = express();
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))
app.use(express.json());
app.use(cookieParser())

const authRouter = require("./routes/auth.js")
const profileRouter = require("./routes/profile.js")
const requestRouter = require("./routes/request.js")
const userRouter = require("./routes/user.js")

app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)
app.use("/",userRouter)

// app.get("/user", async (req, res) => {
//     const userEmail = req.query.emailId;
//     console.log(userEmail);

//     try {
//         const users = await User.find({ emailId: userEmail });
//         if (users.length == 0) {
//             res.status(401).send("dont recive any match")
//         } else {
//             res.status(200).send(users)
//         }

//     } catch (error) {
//         res.status(400);

//     }
// })

// app.get("/oneuser", async (req, res) => {
//     const userEmail = req.query.emailId;
//     console.log(userEmail);

//     try {
//         const user = await User.findOne({ emailId: userEmail });

//         res.status(200).send(user)


//     } catch (error) {
//         res.status(400);

//     }
// })

// app.get("/feed", async (req, res) => {
//     try {
//         const users = await User.find({});
//         console.log(users);
//         res.status(200).send(users)


//     } catch (error) {
//         res.status(200).send(users)

//     }
// })

// app.delete("/user", async (req, res) => {
//     const userId = req.query.Id;

//     try {
//         const user = await User.findByIdAndDelete(userId);
//         console.log(userId, user);
//         if (!user) {
//             return res.status(404).send("User not found");
//         }
//         res.status(200).send("User deleted successfully");

//     } catch (error) {
//         res.status(401).send("error while deleting")
//     }
// })

// app.patch("/user/:userId", async (req, res) => {
//     const userId = req.params?.userId;
//     const data = req.body;


//     try {
//         const ALLOWED_UPDATES = ["userId", "photoUrl", "about", "gender", "age", "skills"];

//         const isUpdateAllowed = Object.keys(data).every((k) =>
//             ALLOWED_UPDATES.includes(k)
//         )
//         if (!isUpdateAllowed) {
//             throw new Error("update not allowed")
//         }
//         if (data?.skills.length > 10) {
//             throw new Error("skills can not more then 10")
//         }
//         const user = await User.findByIdAndUpdate({ _id: userId }, data, {
//             returnDocument: "before",
//             runValidators: true

//         })
//         console.log(user);
//         res.send("update data successfuly")

//     } catch (error) {
//         res.status(400).send("problem while update" + error.message)
//     }
// })

// app.put("/user", async (req, res) => {
//     const userId = req.body.userId;
//     const data = req.body;

//     try {
//         const user = await User.findByIdAndUpdate({ _id: userId }, data, {
//             returnDocument: "before"

//         })
//         console.log(user);
//         res.send("update data successfuly")

//     } catch (error) {
//         res.status(400).send("problem while update")
//     }
// })

connectDb().then(() => {
    console.log("database connection stable");
    app.listen(3000);
    console.log('Server is running on port 3000');
}).catch(() => {
    console.log("database connection disable");
}
)

