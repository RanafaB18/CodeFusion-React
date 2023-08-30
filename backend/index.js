require('dotenv').config()
const express = require('express')
const app = express()
const { roomRouter, Rooms, Messages, Tabs } = require('./routes/room')
const http = require('http')
const server = http.createServer(app)
const cors = require('cors')
const { Server } = require('socket.io')
const { Room, Message } = require('./mongodb')
const io = new Server(server, {
    cors: {
        origin: "https://code-fusion-react.vercel.app"
        // origin: "http://localhost:5173"
    }
})
app.use(express.json())

app.use(cors())


let deleteRoomsInterval; // Holds the reference to the setInterval timer

function deleteEmptyRooms() {
    for (const roomName in Rooms) {
        if (Rooms.hasOwnProperty(roomName) && Rooms[roomName].length === 0) {
            // Delete room, messages, and tabs associated with the empty room
            delete Rooms[roomName];
            delete Messages[roomName];
            delete Tabs[roomName];
            console.log(`Room '${roomName}' and its associated data deleted.`);
        }
    }
}
function startRoomCleanup() {
    // Clear any previous interval to avoid multiple timers running
    clearInterval(deleteRoomsInterval);

    // Start checking and deleting empty rooms every 10 minutes
    deleteRoomsInterval = setInterval(deleteEmptyRooms, 60000);
    console.log('Room cleanup process started.');
}

function stopRoomCleanup() {
    // Clear the interval to stop the room cleanup process
    clearInterval(deleteRoomsInterval);
    console.log('Room cleanup process stopped.');
}
function getNameColorCode(name) {
    let hashCode = 0;
    for (let i = 0; i < name.length; i++) {
        hashCode = name.charCodeAt(i) + ((hashCode << 5) - hashCode);
    }

    const colorCode = '#' + ((hashCode & 0x00FFFFFF) << 0).toString(16).padStart(6, '0');
    return colorCode;
}
io.on('connection', (socket) => {
    // console.log('a user connected', socket.id);

    socket.on("join_room", async (room) => {
        const foundRoom = await Room.findOne({ room: room })
        if (foundRoom) {
            socket.join(room)
        }
    })
    socket.on("is-valid-room", async (room) => {
        const foundRoom = await Room.findOne({ room: room })
        if (foundRoom) {
            socket.emit("valid-room", true)
        } else {
            socket.emit("valid-room", false)
        }

    })
    socket.on("toggle-video-audio", ({ room, id, viewStream, isMuted }) => {
        // console.log("Peer", {id, viewStream, isMuted })
        io.to(room).emit('updated-peers', { id, viewStream, isMuted })
    })
    socket.on('request-permissions', () => {
        socket.emit('get-permissions')
    })
    socket.on("user_joined", async ({ username, room, peerId, viewStream, isMuted }) => {
        const foundRoom = await Room.findOne({ room: room })
        if (foundRoom) {
            const updatedRoom = await Room.findOneAndUpdate({ room: room }, { $push: { data: { username, userId: peerId, viewStream, isMuted }}}, { new: true })
            if (Tabs[room] === undefined) {
                Tabs[room] = { numOfTabs: 0, tabs: {}, numOfUsers: [username] }
            }
            if (!Tabs[room].numOfUsers.includes(username)) {
                Tabs[room].numOfUsers.push(username)
            }
            const firstID = Object.keys(Tabs[room].tabs)[0]
            const userColor = getNameColorCode(username)
            if (Tabs[room].numOfTabs > 0 && !Tabs[room].tabs[firstID]?.includes(userColor)) {
                Tabs[room].tabs[firstID]?.push(userColor)
                io.to(room).emit('get-active-tabs', { activeTabs: Tabs[room].tabs })
            }

            socket.join(room)
            socket.to(room).emit("user-joined", { peerId, username, viewStream, isMuted })
            socket.to(room).emit("message", { username: username, participants: updatedRoom.data, joinedStatus: "joined" })
            socket.emit('get-users', { participants: updatedRoom.data })
            socket.emit('show-editors')

            // io.to(room).emit("message", { username: username, participants: Rooms[room] })
            socket.on('disconnect', async () => {
                const removeUser = await Room.findOneAndUpdate({ room: room }, { $pull: { data: { userId: peerId }}}, { new: true })
                Tabs[room].numOfUsers = Tabs[room].numOfUsers.filter(name => name !== username)
                const removedUserColor = getNameColorCode(username)
                socket.to(room).emit('removal', { username, color: removedUserColor })
                socket.to(room).emit('message', { username: username, participants: removeUser.data, joinedStatus: "left" })
                // Might change
                socket.to(room).emit('user-disconnected', peerId)
                socket.leave(room) //testing
            })
        }
    })
    socket.on('message-sent', (message) => {
        socket.to(message.room).emit('show-message-toast', message)
    })
    socket.on('leave-room', async ({ username, room, userId }) => {
        socket.leave(room)
        const removedUser = await Room.findOneAndUpdate({ room: room }, { $pull: { data: { userId: userId }}})
        Tabs[room].numOfUsers = Tabs[room].numOfUsers.filter(name => name !== username)
        socket.to(room).emit('message', { username: username, participants: removedUser.data, joinedStatus: "left" })
        // Might change
        socket.to(room).emit('user-disconnected', userId)
    })

    socket.on("send_message", async (messageData) => {
        const { message, user, time, id, room } = messageData
        const updatedMessages = await Message.findOneAndUpdate({ room: room }, { $push: { data:  { message, user, time, id } }}, { new: true })
        console.log("Send messages", updatedMessages)
        socket.to(room).emit('chat-message', updatedMessages.data)
    })

    socket.on("tab-change", (tabObj) => {
        const room = tabObj.room
        const id = tabObj.id
        const color = tabObj.color
        // const name = tabObj.username
        // console.log("Tab change", id, room, color)
        // if (Tabs[room].numOfUsers.length === 2){
        //     // console.log("Color", color)
        // }

        if (Tabs[room].tabs[id] === undefined) {
            // console.log("Keys", Object.values(Tabs[room]))
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
                if (ID !== id) {
                    Tabs[room].tabs[ID] = Tabs[room].tabs[ID].filter(colorInArray => colorInArray !== color)
                }
            }
        }
        io.to(room).emit('get-active-tabs', { activeTabs: Tabs[room].tabs })
    })
    socket.on('delete-tab', (tabObj) => {
        const id = tabObj.id
        const room = tabObj.room

        delete Tabs[room].tabs[id]
    })

    socket.on('remove-color', obj => {
        const color = obj.color
        const room = obj.room
        const ids = Object.keys(Tabs[room].tabs)
        for (const id of ids) {
            Tabs[room].tabs[id] = Tabs[room].tabs[id].filter((colorsInArray) => colorsInArray != color)
        }
        io.to(room).emit('get-active-tabs', { activeTabs: Tabs[room].tabs })
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
app.get('/:room/messages', async (req, res) => {
    const room = req.params.room
    const allMessages = await Message.findOne({ room: room })
    return res.json({ messageData: allMessages.data })
})

app.get('/:room/tabs', (req, res) => {
    const room = req.params.room
    Tabs[room].numOfTabs++
    return res.json({ tabs: Tabs })
})

app.get('/start-cleanup', (req, res) => {
    startRoomCleanup();
    res.send('Room cleanup process started.');
});

// HTTP endpoint to stop the room cleanup process
app.get('/stop-cleanup', (req, res) => {
    stopRoomCleanup();
    res.send('Room cleanup process stopped.');
});

const PORT = process.env.PORT || 3004
server.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})
