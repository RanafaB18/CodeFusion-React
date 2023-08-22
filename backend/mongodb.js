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
    key: String,
    data: [userSchema]
});

const Room = mongoose.model('Room', roomSchema)

module.exports = { Room }
