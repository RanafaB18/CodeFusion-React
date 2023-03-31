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

export default { getRoomID, getAllRooms }
