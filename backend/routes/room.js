const shortUUID = require('short-uuid')
const { Room, Message } = require('../mongodb')

const roomRouter = require('express').Router()
const Rooms = {}
const Tabs = {}

// Messages = {'room-name': {messages:[{message, username, time, id}], }}
// Deleted = {'room-name': [ids]}

const Messages = {}
roomRouter.post('/', async (request, response) => {
    const body = request.body
    const room = body.room
    const id = shortUUID.generate()
    const roomLink = `${room}-${id}`
    const newRoom = await Room.create({
        room: roomLink,
        data: []
    })
    const messageFound = await Message.findOne({ room: roomLink })
    if (messageFound === null) {
        await Message.create({
            room: roomLink,
            data: []
        })
    }
    response.json({roomLink: roomLink})
})



module.exports = { roomRouter, Rooms, Messages, Tabs }
