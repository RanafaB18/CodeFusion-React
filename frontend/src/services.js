import axios from "axios"
const baseUrl = 'http://localhost:3004/room'

const getRoomID = async (id) => {
    const response = await axios.post(baseUrl, {room: id})
    return response.data
}
const getAllRooms = async () => {
    const response = await axios.get(`${baseUrl}/allRooms`)
    return response.data
}

const getUsers = async (room) => {
    const response = await axios.get(`http://localhost:3004/${room}/users`)
    return response.data
}

const getMessages = async (room) => {
    const response = await axios.get(`http://localhost:3004/${room}/messages`)
    return response.data
}

export default { getRoomID, getAllRooms, getUsers, getMessages }
