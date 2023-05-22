import axios from "axios"
const baseUrl = 'http://localhost:3004/room'
const rootUrl = 'http://localhost:3004'
const getRoomID = async (id) => {
    const response = await axios.post(baseUrl, { room: id })
    return response.data
}

const getMessages = async (room) => {
    const response = await axios.get(`${rootUrl}/${room}/messages`)
    return response.data
}

const updateUsers = async (username, room) => {
    const response = await axios.post(`${rootUrl}/${room}/users`, { name: username, room: room })
    return response.data
}
export default {
    getRoomID,
    getMessages,
    updateUsers
}
