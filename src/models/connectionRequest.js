const mongoose= require("mongoose")
const connectionRequestSchema = new mongoose.Schema({
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref :"User",
        required: true
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true

    },
    status : {
        type : String,
        required: true,
        enum: {
  values: ['ignore', 'interested', 'accepted', 'rejected'], // (btw: "accepeted" is a typo)
  message: '{VALUE} is not a valid status'
}

    }
},{
    timestamps : true
})

connectionRequestSchema.index({fromUserId : 1, toUserId : 1})

connectionRequestSchema.pre("save", function(next){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("you can't send request to yourself!!!")
    }
    next()
})

const ConnectionRequest = new mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
)

module.exports = ConnectionRequest