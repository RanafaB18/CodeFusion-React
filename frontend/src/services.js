import axios from "axios"
const baseUrl = 'https://codefusion-react-production.up.railway.app/room'
const rootUrl = 'https://codefusion-react-production.up.railway.app'
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

const getTabName = async (room) => {
    const response = await axios.get(`${rootUrl}/${room}/tabs`)
    return response.data
}

export default {
    getRoomID,
    getMessages,
    updateUsers,
    getTabName
}
