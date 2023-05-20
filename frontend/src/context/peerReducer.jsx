import { ACTIONS } from "./peerActions";


export const peerReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.ADD_PEER:
            return {
                ...state,
                [action.payload.peerId]: {
                    stream: action.payload.stream,
                    username: action.payload.username,
                    viewStream: action.payload.viewStream
                }
            }
        case ACTIONS.REMOVE_PEER:
            const { [action.payload.peerId]: deleted, ...rest } = state
            return rest
        default:
            return {
                ...state
            }
    }
}
