const express = require('express');
const app = express();

app.get("/user",(req, res)=>{
    res.send({
        "first name":"vaibhav",
        "last name":"pandey"
    })
})

app.post("/user",(req, res)=>{
    console.log("saving data to bakend");
    res.send("use backend")
    
})
// app.use("/",(req, res)=>{
//     res.send('Hello World');
// })
app.use("/test",(req, res)=>{
    res.send('Hello World from test!');
})
app.listen(3000);
console.log('Server is running on port 3000');
