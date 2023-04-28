const shortUUID = require('short-uuid')

const roomRouter = require('express').Router()
const roomLinks = []
const Rooms = {}

// Messages = {'room-name': {messages:[{message, username, time, id}],}}
const Messages = {}

roomRouter.post('/', async (request, response) => {
    const body = request.body
    const room = body.room
    const id = shortUUID.generate()
    const roomLink = `${room}-${id}`
    roomLinks.push(roomLink)
    response.json({roomLink: roomLink})
})


roomRouter.get('/allRooms', (request, response) => {
    response.json({ rooms: roomLinks})
})



module.exports = { roomRouter, roomLinks, Rooms, Messages }
