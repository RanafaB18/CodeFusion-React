require('dotenv').config()
const express = require('express')
const app = express()
const { roomRouter, roomLinks, Rooms, Messages } = require('./routes/room')
const http = require('http')
const server = http.createServer(app)
const cors = require('cors')
const { Server } = require('socket.io')
const io = new Server(server, {
    cors: { origin : '*',}}
)

app.use(express.json())
app.use(cors())

console.log("roomLinks", roomLinks)
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
    socket.on("user_joined", ({ username, room, peerId}) => {
        if (Rooms[room]){
            Rooms[room].push({ username: username, userId: peerId })
            socket.join(room)
            socket.to(room).emit("user-joined", { peerId, username })
            console.log("New user: ", username, peerId)
            socket.emit('get-users', {room: room, participants: Rooms[room]})
            console.log("Specific Rooms", Rooms[room])
            console.log("Rooms", Rooms)

            io.to(room).emit("message", { username: username, participants: Rooms[room] })
            socket.on('disconnect', () => {
                console.log(`${username} left the room`)
                Rooms[room] = Rooms[room].filter((user) => user.userId !== peerId)
                io.to(room).emit('message', {username: username, participants: Rooms[room]})

                // Might change
                socket.to(room).emit('user-disconnected', peerId)
            })
        }
    })

    socket.on('sending-signal', payload => {
        console.log("Payload", payload)
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload })
    })

    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });
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

    // socket.on('get-users', ({ room }) => {
    //     console.log("Informing all clients in the room")
    //     io.to(room).emit("all_users", { users: Rooms[room] })
    // })
    socket.on("close-tab", () => {
        console.log("Tab is closing")
    })

    socket.on("leave-room", ({ room, username }) => {
        console.log(`${username} has left the meeting`)
        Rooms[room] = Rooms[room].filter((name) => name.username !== username)
        if (Rooms[room].length === 0) {
            delete Rooms[room]
            delete Messages[room]
            console.log("New Rooms after deletion", Rooms)
            console.log("New Messages after deletion", Messages)
        }
        io.to(room).emit("left-room", { rooms: Rooms })
        console.log("Peeps left", Rooms)
        socket.leave(room)
    })

    // socket.on('disconnect', () => {
    //     // Tab was closed
    //     console.log(`${socket.id} has disconnected`)
    // })
})



app.use('/room', roomRouter)


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

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})
