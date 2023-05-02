require('dotenv').config()
const express = require('express')
const app = express()
const { roomRouter, roomLinks, Rooms, Messages } = require('./routes/room')
const http = require('http')
const server = http.createServer(app)
const cors = require('cors')
const { Server } = require('socket.io')
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
})
app.use(express.json())

app.use(cors())

console.log("roomLinks", roomLinks)
io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on("join_room", (room) => {
        console.log(room, "made")
        socket.join(room)
        console.log(`Number of people in ${room} is ${io.sockets.adapter.rooms.get(room).size}`)
    })
    socket.on("user_joined", (obj) => {
        if (!Rooms[obj.room]) {
            Rooms[obj.room] = [obj.username]
        } else {
            Rooms[obj.room].push(obj.username)
        }
        console.log("New user: ", Rooms)
        socket.broadcast.to(obj.room).emit("message", {username: obj.username})
    })
// Messages = {'room-name': {messages:[{message, username, time, id}],}}

    socket.on("send_message", (messageData) => {
        // console.log("Message Data: ", messageData)
        if (!Messages[messageData.room]) {
            Messages[messageData.room] = {messages: [messageData]}
        } else {
            Messages[messageData.room].messages.push(messageData)
        }
        socket.to(messageData.room).emit('chat-message', Messages[messageData.room])
    })

    socket.on("delete-message", (messageData) => {
        const id = messageData.id
        const room = messageData.room
        Messages[room].messages = Messages[room].messages.filter((obj) => obj.id !== id)
        socket.to(messageData.room).emit('chat-message', Messages[messageData.room])

    })

    socket.on('get-users', () => {
        io.sockets.emit("all_users", {rooms: Rooms})
    })
    socket.on("leave-room", ({ room, username }) => {
        console.log(`${username} has left the room`)
    })
    socket.on('disconnect', () => {
        // Tab was closed
        console.log(`${socket.id} has disconnected`)
    })
})



app.use('/room', roomRouter)


app.get('/:room/messages', (req, res) => {
    const room = req.params.room
    return res.json({messageData: Messages[room]})
})

const PORT = process.env.PORT
server.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})
