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
  const removePeer = (peerId) => {
    dispatch(removePeerAction(peerId))
  }
  useEffect(() => {
    const meId = uuidv4();

    const peer = new Peer(meId);
    setMe(peer);

    socket.on('get-permissions', () => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setStream(stream);
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    })
    socket.on("user-disconnected", removePeer)
  }, []);

  useEffect(() => {
    if (!me) return;
    if (!stream) return;

    socket.on("user-joined", ({ peerId, username }) => {
      const call = me.call(peerId, stream, {metadata: username});
      console.dir(call)
      call.on("stream", (peerStream) => {
        dispatch(addPeerAction(peerId, peerStream, username));
      });
    });

    me.on("call", (call) => {
      call.answer(stream);
      call.on("stream", (peerStream) => {
        console.log("Peers", peers)
        console.dir(call)
        dispatch(addPeerAction(call.peer, peerStream, "Unknown"));
      });
    });
  });
  return (
    <RoomContext.Provider value={{ socket, me, stream, peers }}>
      {children}
    </RoomContext.Provider>
  );
};
