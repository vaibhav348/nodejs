const adminAuth=(req, res,next)=>{
    const token = "xyz";
    if(token === "xyz"){
        res.send("auth")
        next();
    }else{
        res.status(400).send("unauth")
    }
}

module.exports={
    adminAuth
}
