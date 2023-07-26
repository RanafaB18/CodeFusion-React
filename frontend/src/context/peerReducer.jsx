import { ACTIONS } from "./peerActions";

export const peerReducer = (state, action) => {
  console.log("State", state);
  console.log(Object.keys(state));
  switch (action.type) {
    case ACTIONS.ADD_PEER:
      return {
        ...state,
        [action.payload.peerId]: {
          stream: action.payload.stream,
          username: action.payload.username,
          viewStream: action.payload.viewStream,
        },
      };
    case ACTIONS.REMOVE_PEER:
      const { [action.payload.peerId]: deleted, ...rest } = state;
      return rest;
    case ACTIONS.UPDATE_PEER:
      const updatedPeerId = action.payload.peerId;
      if (state[updatedPeerId] === undefined) {
        return {
          ...state,
        };
      }
      const updatedPeer = {
        ...state[updatedPeerId],
        stream: state[updatedPeerId].stream,
        username: action.payload.username,
        viewStream: action.payload.viewStream,
      };
      return {
        ...state,
        [updatedPeerId]: updatedPeer,
      };
    default:
      return {
        ...state,
      };
  }
};
