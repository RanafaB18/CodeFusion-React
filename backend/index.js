require('dotenv').config()
const express = require('express')
const app = express()
const { roomRouter, roomLinks, Rooms, Messages, Tabs } = require('./routes/room')
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
let deleteInterval = 0
setInterval(() => {
    deleteInterval = deleteInterval + 1000
    if (deleteInterval === 600000) {
        if (Rooms !== {}) {
            for (let room in Rooms) {
                if (Rooms[room].length === 0) {
                    console.log("Deleting", room);
                    delete Rooms[room]
                    delete Messages[room]
                    delete Tabs[room]
                }
            }
        }
        deleteInterval = 0
    }
}, 1000)
function getNameColorCode(name) {
    let hashCode = 0;
    for (let i = 0; i < name.length; i++) {
      hashCode = name.charCodeAt(i) + ((hashCode << 5) - hashCode);
    }

    const colorCode = '#' + ((hashCode & 0x00FFFFFF) << 0).toString(16).padStart(6, '0');
    return colorCode;
  }
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
    socket.on("toggle-video-audio", ({room, id, viewStream, isMuted }) => {
        console.log("Peer", {id, viewStream, isMuted })
        io.to(room).emit('updated-peers', {id, viewStream, isMuted})
    })
    socket.on('request-permissions', () => {
        socket.emit('get-permissions')
    })
    socket.on("user_joined", ({ username, room, peerId, viewStream, isMuted }) => {
        if (Rooms[room]) {
            Rooms[room].push({ username: username, userId: peerId, viewStream: viewStream, isMuted })
            if (Tabs[room] === undefined) {
                Tabs[room] = { numOfTabs: 0, tabs: {}, numOfUsers: [username]}
            }
            if (!Tabs[room].numOfUsers.includes(username)){
                Tabs[room].numOfUsers.push(username)
            }
            const firstID = Object.keys(Tabs[room].tabs)[0]
            const userColor = getNameColorCode(username)
            if (Tabs[room].numOfTabs > 0 && !Tabs[room].tabs[firstID]?.includes(userColor)) {
                Tabs[room].tabs[firstID]?.push(userColor)
                io.to(room).emit('get-active-tabs',{activeTabs: Tabs[room].tabs})
            }

            socket.join(room)
            console.log("View stream ?", viewStream)
            socket.to(room).emit("user-joined", { peerId, username, viewStream, isMuted })
            console.log("New user: ", username, peerId)
            socket.to(room).emit("message", { username: username, participants: Rooms[room], joinedStatus: "joined" })
            socket.emit('get-users', { room: room, participants: Rooms[room] })
            console.log("Specific Rooms", Rooms[room])
            console.log("Rooms", Rooms)
            deleteInterval = 0
            // io.to(room).emit("message", { username: username, participants: Rooms[room] })
            socket.on('disconnect', () => {
                console.log(`${username} left the room`)
                Rooms[room] = Rooms[room].filter((user) => user.userId !== peerId)
                Tabs[room].numOfUsers = Tabs[room].numOfUsers.filter(name => name !== username)
                const removedUserColor = getNameColorCode(username)
                socket.to(room).emit('removal', {username, color: removedUserColor})
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
        Tabs[room].numOfUsers = Tabs[room].numOfUsers.filter(name => name !== username)
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

    socket.on("tab-change", (tabObj) => {
        const room = tabObj.room
        const id = tabObj.id
        const color = tabObj.color
        const name = tabObj.username
        console.log("Tab change", id, room, color)
        if (Tabs[room].numOfUsers.length === 2){
            console.log("Color", color)
        }
        if (Tabs[room].tabs[id] === undefined) {
            console.log("Keys", Object.values(Tabs[room]))
            if (Tabs[room].numOfTabs === 1) {
                Tabs[room].tabs[id] = [color]
            } else {
                Tabs[room].tabs[id] = []
            }
        } else {
            // if (Tabs[room].numOfUsers.length > 1 ) {
            //     Tabs[room].tabs[id].push(color)
            // }
            if (!Tabs[room].tabs[id].includes(color)) {
                Tabs[room].tabs[id].push(color)
            }
            const ids = Object.keys(Tabs[room].tabs)
            for (const ID of ids) {
                if (ID !== id){
                    Tabs[room].tabs[ID] = Tabs[room].tabs[ID].filter(colorInArray => colorInArray !== color)
                }
            }
        }
        console.log(Tabs[room].tabs)
        io.to(room).emit('get-active-tabs',{activeTabs: Tabs[room].tabs})
    })
    socket.on('delete-tab', (tabObj) => {
        const id = tabObj.id
        const room = tabObj.room

        delete Tabs[room].tabs[id]
        console.log(Tabs[room].tabs)
    })

    socket.on('remove-color', obj => {
        const color = obj.color
        const room = obj.room
        const ids = Object.keys(Tabs[room].tabs)
        for (const id of ids){
            Tabs[room].tabs[id] = Tabs[room].tabs[id].filter((colorsInArray) => colorsInArray != color)
        }
        io.to(room).emit('get-active-tabs',{activeTabs: Tabs[room].tabs})
    })
    socket.on("delete-message", (messageData) => {
        const id = messageData.id
        const room = messageData.room
        Messages[room].messages = Messages[room].messages.filter((obj) => obj.id !== id)
        socket.to(messageData.room).emit('chat-message', Messages[messageData.room])
    })
})



app.use('/room', roomRouter)

// Sends the messages to the frontend
app.get('/:room/messages', (req, res) => {
    const room = req.params.room
    return res.json({ messageData: Messages[room] })
})

app.get('/:room/tabs', (req, res) => {
    const room = req.params.room
    Tabs[room].numOfTabs++
    return res.json({ tabs: Tabs })
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
            delete Tabs[room]
            console.log("New Rooms after deletion", Rooms)
            console.log("New Messages after deletion", Messages)
            console.log("Tabs", Tabs)
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
