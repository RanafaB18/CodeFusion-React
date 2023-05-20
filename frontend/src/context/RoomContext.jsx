import { uuidv4 } from "lib0/random";
import Peer from "peerjs";
import { createContext, useEffect, useState, useReducer } from "react";
import { io } from "socket.io-client";
import { peerReducer } from "./peerReducer";
import { addPeerAction, removePeerAction } from "./peerActions";

export const RoomContext = createContext(null);
const socket = io("http://localhost:3004");

export const RoomProvider = ({ children }) => {
  const [me, setMe] = useState();
  const [stream, setStream] = useState();
  const [peers, dispatch] = useReducer(peerReducer, {});
  const [allUsers, setAllUsers] = useState([])
  const removePeer = (peerId) => {
    dispatch(removePeerAction(peerId))
  }
  useEffect(() => {
    const meId = uuidv4();

    const peer = new Peer(meId);
    setMe(peer);


    socket.on("user-disconnected", removePeer)
  }, []);

  useEffect(() => {
    if (!me) return;
    if (!stream) return;

    socket.on('get-users', ({room, participants}) => {
      console.log("In RoomContext: ", room, participants)
      setAllUsers(participants)
    })

    socket.on("user-joined", ({ peerId, username, viewStream }) => {
      setAllUsers(allUsers.concat({userId: peerId, username: username, viewStream: viewStream}))
      const call = me.call(peerId, stream, {metadata: username});
      console.dir(call)
      call.on("stream", (peerStream) => {
        dispatch(addPeerAction(peerId, peerStream, username, viewStream));
      });
    });

    me.on("call", (call) => {
      call.answer(stream);
      call.on("stream", (peerStream) => {
        console.log("Peers", peers)
        console.dir(call)
        console.log("All Users: ", allUsers)
        const user = allUsers.find((user) => user.userId === call.peer)
        const username = user ? user.username : "unknown"
        const viewStream = user ? user.viewStream : null
        console.log("User", username)
        dispatch(addPeerAction(call.peer, peerStream, username, viewStream));
        console.log(call.peer);
      });
    });
  });
  return (
    <RoomContext.Provider value={{ socket, me, stream, peers, setStream }}>
      {children}
    </RoomContext.Provider>
  );
};
