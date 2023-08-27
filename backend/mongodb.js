require('dotenv').config()

const mongoose = require("mongoose")
console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to datatbase");
    })
    .catch((e) => {
        console.log("Error connecting to database");
    })

const userSchema = new mongoose.Schema({
    username: String,
    userId: String,
    viewStream: Boolean,
    isMuted: Boolean
});

const roomSchema = new mongoose.Schema({
    room: String,
    data: [userSchema]
});

const messageSchema = new mongoose.Schema({
    message: String,
    user: String,
    time: Date,
    id: Number,
})
const chatSchema = new mongoose.Schema({
    room: String,
    data: {
        messages: [messageSchema]
    }
})

const Room = mongoose.model('Room', roomSchema)
const Message = mongoose.model('Message', chatSchema)
module.exports = { Room, Message }
