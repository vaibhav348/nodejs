const validator = require("validator")

const validateSingUpData = (req)=>{
    const {firstName, lastName, emailId, password} = req.body;
    if(!firstName || !lastName){
        throw new Error("name is invalide");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("emailId is invalide");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("use strong password");
    }
}

module.exports ={
    validateSingUpData
}