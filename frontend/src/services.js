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

export default {
    getRoomID,
    getMessages,
}
