import axios from "axios"
// const baseUrl = 'https://code-fusion-react.vercel.app/room'
// const rootUrl = 'https://code-fusion-react.vercel.app'
const rootUrl = 'http://localhost:3004'
const baseUrl = 'http://localhost:3004/room'
const getRoomID = async (id) => {
    const response = await axios.post(baseUrl, { room: id })
    return response.data
}

const getMessages = async (room) => {
    const response = await axios.get(`${rootUrl}/${room}/messages`)
    return response.data
}

const updateUsers = async (username, room) => {
    console.log("Request sent")
    const response = await axios.post(`${rootUrl}/${room}/users`, { name: username, room: room })
    return response.data
}
export default {
    getRoomID,
    getMessages,
    updateUsers
}
