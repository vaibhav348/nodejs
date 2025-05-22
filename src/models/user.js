const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
       firstName: {
            type: String,
            required : true
        },
        lastName: {
            type: String
        },
        emailId: {
            type: String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true 
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
            default:"https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
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

const User = mongoose.model("User", userSchema) 
module.exports = User
