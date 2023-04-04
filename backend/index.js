require('dotenv').config()
const express = require('express')
const app = express()
const { roomRouter, roomLinks, Rooms } = require('./routes/room')
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
        io.sockets.emit("all_users", Rooms)
    })



})

app.use('/room', roomRouter)


const PORT = process.env.PORT
server.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})
