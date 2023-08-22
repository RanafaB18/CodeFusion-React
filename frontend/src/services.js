import axios from "axios"
// const baseUrl = 'http://localhost:3004/room'
// const rootUrl = 'http://localhost:3004'
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

const getNameColorCode = (name) => {
    let hashCode = 0;
    for (let i = 0; i < name.length; i++) {
      hashCode = name.charCodeAt(i) + ((hashCode << 5) - hashCode);
    }

    const colorCode = '#' + ((hashCode & 0x00FFFFFF) << 0).toString(16).padStart(6, '0');
    return colorCode;
}

export default {
    getRoomID,
    getMessages,
    updateUsers,
    getTabName,
    getNameColorCode
}
