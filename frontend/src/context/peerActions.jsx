export const ACTIONS = {
    ADD_PEER: 'ADD_PEER',
    REMOVE_PEER: 'REMOVE_PEER',
    UPDATE_PEER: 'UPDATE_PEER'
}

export const addPeerAction = (peerId, stream, username, viewStream, isMuted) => ({
    type: ACTIONS.ADD_PEER,
    payload: { peerId, stream, username, viewStream, isMuted }
})

export const updatePeerAction = (peerId, stream, username, viewStream, isMuted) => ({
    type: ACTIONS.UPDATE_PEER,
    payload: { peerId, stream, username, viewStream, isMuted }
})

export const removePeerAction = (peerId) => ({
    type: ACTIONS.REMOVE_PEER,
    payload: { peerId }
})
