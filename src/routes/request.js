const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {

    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        const nonAllowdStatus = ['accepted', 'rejected'];

        if (nonAllowdStatus.includes(status)) {
            return res.status(400).json({
                message: "invalid request"
            })
        }

        const toUser = await User.findById(toUserId)
        if (!toUser) {
            return res.status(400).send("no user avalible")
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        })
        if (existingConnectionRequest) {
            return res.status(400).send("connection already exist!!!")
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })
        const data = await connectionRequest.save();

        res.json({
            message: req.user.firstName + " is " + status + " " + toUser.firstName,
            data
        });
    } catch (error) {
        return res.status(400).send("ERR : " + error.message)
    }

})

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try {
        const { status, requestId } = req.params
        // vaibhav -> chahat
        // loggedin = touserid
        //status = instrusted
        // request id should be valid
        const loggedInUser = req.user;
        const allowdStatus = ['accepted', 'rejected'];
        if (!allowdStatus.includes(status)) {
            throw new Error("status not allowed!!!")
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested"
        })

        if (!connectionRequest) {
            return res.status(404).send("connection request not found")
        }

        connectionRequest.status = status;
        const data = await connectionRequest.save()
        return res.json({ message: "connection request " + status, data })

    } catch (error) {
        res.status(400).send("ERR: " + error)
    }
})
module.exports = requestRouter;