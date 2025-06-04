const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth=async(req, res,next)=>{
    try {
        const {token} = req.cookies;
        if(!token){
            
       return res.status(401).send("Please Login")
        }
        const decodedObj = await jwt.verify(token, "hhshshhshshsh");
        console.log(decodedObj);
        
        const {_id} = decodedObj;
        const user = await User.findById(_id)

    if(!user){
        throw new Error("user not found");
    }
    req.user= user;
    next();
    } catch (error) {
        console.log("ERR");
        
        res.status(400).send("ERR: "+ error.message)
    }

}

module.exports={
    userAuth
}
