import { uuidv4 } from "lib0/random";
import Peer from "peerjs";
import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const RoomContext = createContext(null);
const socket = io("http://localhost:3004");

export const RoomProvider = ({ children }) => {
  const [me, setMe] = useState();
  const [stream, setStream] = useState();
  useEffect(() => {
    const meId = uuidv4();

    const peer = new Peer(meId);
    setMe(peer);

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }, []);

  useEffect(() => {
    if (!me) return;
    if (!stream) return;

    socket.on('user-joined', ({peerId}) => {
      const call = me.call(peerId, stream)
    })

    me.on('call', (call) => {
      call.answer(stream)
    })

  })
  console.log("Stream", stream)
  console.log("socket", socket)
  return (
    <RoomContext.Provider value={{ socket, me, stream }}>
      {children}
    </RoomContext.Provider>
  );
};
