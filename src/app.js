const express = require('express');
const { adminAuth } = require('./adminAuth');
const app = express();
 
app.use("/admin", adminAuth);

app.use(
    "/user",
    (req, res,next)=>{
    // res.send({
    //     "first name":"vaibhav",
    //     "last name":"pandey"
    // })
    next();
},
(req, res)=>{
    console.log("hi 2");
    
        res.send("hii 2")

    })

// app.post("/user",(req, res)=>{
//     console.log("saving data to bakend");
//     res.send("use backend")
    
// })
// app.use("/",(req, res)=>{
//     res.send('Hello World');
// })
app.use("/test",(req, res)=>{
    res.send('Hello World from test!');
})
app.listen(3000);
console.log('Server is running on port 3000');
