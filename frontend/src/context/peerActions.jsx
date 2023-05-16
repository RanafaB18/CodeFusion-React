export const ACTIONS = {
    ADD_PEER: 'ADD_PEER',
    REMOVE_PEER: 'REMOVE_PEER'
}

export const addPeerAction = (peerId, stream, username) => ({
    type: ACTIONS.ADD_PEER,
    payload: { peerId, stream, username }
})

export const removePeerAction = (peerId) => ({
    type: ACTIONS.REMOVE_PEER,
    payload: { peerId }
})
