const mongoose = require("mongoose");

const dbConnection = async()=>{
    await mongoose.connect(
    "mongodb+srv://vaibhav:vaibhav@first.dnkqnht.mongodb.net/nooo"
)
}
module.exports = dbConnection;
