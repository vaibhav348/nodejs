const mongoose = require("mongoose");

const dbConnection = async()=>{
   try {
     await mongoose.connect(
     "mongodb+srv://vaibhav:vaibhav@first.dnkqnht.mongodb.net/nooo")
   } catch (error) {
    console.log("ERR : "+ error.message);
    
   }

}
module.exports = dbConnection;
