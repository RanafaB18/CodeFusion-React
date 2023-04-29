import axios from "axios"
const baseUrl = 'http://localhost:3004/room'
const rootUrl = 'http://localhost:3004'
const getRoomID = async (id) => {
    const response = await axios.post(baseUrl, { room: id })
    return response.data
}
const getAllRooms = async () => {
    const response = await axios.get(`${baseUrl}/allRooms`)
    return response.data
}

const getUsers = async (room) => {
    const response = await axios.get(`${rootUrl}/${room}/users`)
    return response.data
}

const getMessages = async (room) => {
    const response = await axios.get(`${rootUrl}/${room}/messages`)
    return response.data
}

const deleteMessage = async (room, id) => {
    const response = await axios.delete(`${rootUrl}/${room}/messages/${id}`)
    return response.data
}

export default {
    getRoomID,
    getAllRooms,
    getUsers,
    getMessages,
    deleteMessage
}
