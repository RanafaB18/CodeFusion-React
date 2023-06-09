export const ACTIONS = {
    ADD_PEER: 'ADD_PEER',
    REMOVE_PEER: 'REMOVE_PEER'
}

export const addPeerAction = (peerId, stream, username, viewStream) => ({
    type: ACTIONS.ADD_PEER,
    payload: { peerId, stream, username, viewStream }
})

export const removePeerAction = (peerId) => ({
    type: ACTIONS.REMOVE_PEER,
    payload: { peerId }
})
