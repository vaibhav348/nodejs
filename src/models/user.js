const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken");
const userSchema = mongoose.Schema({
       firstName: {
            type: String,
            required : true,
            minlength: 4,
            maxlength : 30
        },
        lastName: {
            type: String
        },
        emailId: {
            type: String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true ,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("Invalid Email address"+ value);
                }
            }
        },
        password: {
            type: String,
            required : true

        },
        age: {
            type: Number
        },
       gender: {
  type: String,
  validate: {
    validator: function (value) {
      return ["male", "female", "others"].includes(value);
    },
    message: props => `${props.value} is not a valid gender. Choose male, female, or others.`
  }
},

        photoUrl:{
            type : String,
            default:"https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png",
             validate(value){
                if(!validator.isURL(value)){
                    throw new Error("Invalid photo  url"+ value);
                }
            }
        },
        about :{
            type : String,
            default : "this is defualt about"
        },
        skills : {
            type : [String]
        }
},{
    timestamps : true
})

userSchema.index({ firstName : 1, lastName : 1})

userSchema.methods.getJWT = async function(){
    const user = this;
    const token  = JWT.sign({_id : user._id}, "hhshshhshshsh", {
        expiresIn : "1d"
    })
    return token
}

userSchema.methods.validatePassword = async function (password) {
    const user = this;
    const hashedpassword = user.password;
    const isPasswordValid = await bcrypt.compare(password, hashedpassword)
    return isPasswordValid
}
const User = mongoose.model("User", userSchema) 
module.exports = User
