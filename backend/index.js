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
// Delete empty rooms every 10 mins
setInterval(() => {
    if (Rooms !== {}) {
        for (let key in Rooms) {
            if (Rooms[key].length === 0) {
                console.log("Deleting", key);
                delete Rooms[key]
                delete Messages[key]
            }
        }
    }
}, 600000)
io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on("join_room", (room) => {
        if (Rooms[room]) {
            console.log(room, "made")
            socket.join(room)
            console.log(`Number of people in ${room} is ${io.sockets.adapter.rooms.get(room).size}`)
        }
    })
    socket.on("join-video", (room) => {
        socket.emit("all_participants", Rooms[room])
    })
    socket.on("is-valid-room", (room) => {
        if (Rooms[room]) {
            socket.emit("valid-room", true)
        } else {
            socket.emit("valid-room", false)
        }
    })
    socket.on('request-permissions', () => {
        socket.emit('get-permissions')
    })
    socket.on("user_joined", ({ username, room, peerId, viewStream }) => {
        if (Rooms[room]) {
            Rooms[room].push({ username: username, userId: peerId, viewStream: viewStream })
            socket.join(room)
            console.log("View stream ?", viewStream)
            socket.to(room).emit("user-joined", { peerId, username, viewStream })
            console.log("New user: ", username, peerId)
            socket.to(room).emit("message", { username: username, participants: Rooms[room], joinedStatus: "joined" })
            socket.emit('get-users', { room: room, participants: Rooms[room] })
            console.log("Specific Rooms", Rooms[room])
            console.log("Rooms", Rooms)
            // io.to(room).emit("message", { username: username, participants: Rooms[room] })
            socket.on('disconnect', () => {
                console.log(`${username} left the room`)
                Rooms[room] = Rooms[room].filter((user) => user.userId !== peerId)
                socket.to(room).emit('message', { username: username, participants: Rooms[room], joinedStatus: "left" })
                console.log(Rooms)
                // Might change
                socket.to(room).emit('user-disconnected', peerId)
                socket.leave(room) //testing
            })
        }
    })
    socket.on('message-sent', (message) => {
        console.log("Receiving message: ", message)
        socket.to(message.room).emit('show-message-toast', message)
    })
    socket.on('leave-room', ({ username, room, userId }) => {
        socket.leave(room)
        Rooms[room] = Rooms[room].filter((user) => user.userId !== userId)
        socket.to(room).emit('message', { username: username, participants: Rooms[room], joinedStatus: "left" })
        console.log(Rooms)
        // Might change
        socket.to(room).emit('user-disconnected', userId)
    })
    // Messages = {'room-name': {messages:[{message, username, time, id}],}}

    socket.on("send_message", (messageData) => {
        // console.log("Message Data: ", messageData)
        if (!Messages[messageData.room]) {
            Messages[messageData.room] = { messages: [messageData] }
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

    socket.on("close-tab", () => {
        console.log("Tab is closing")
    })
})



app.use('/room', roomRouter)

// Sends the messages to the frontend
app.get('/:room/messages', (req, res) => {
    const room = req.params.room
    return res.json({ messageData: Messages[room] })
})

app.post('/:room/users', (req, res) => {
    const name = req.body.name
    const room = req.body.room
    console.log(`${name} is either leaving`)
    // Check if it's a refresh
    if (Rooms[room]) {
        Rooms[room] = Rooms[room].filter((user) => user.username != name)
        if (Rooms[room].length === 0) {
            delete Rooms[room]
            delete Messages[room]
            console.log("New Rooms after deletion", Rooms)
            console.log("New Messages after deletion", Messages)
            io.local.socketsLeave(room)
        }
        io.to(room).emit("all_users", { rooms: Rooms })
    }
    return res.end()
})

const PORT = process.env.PORT
server.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})
