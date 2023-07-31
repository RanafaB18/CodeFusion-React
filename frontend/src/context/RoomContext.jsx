import {v4 as uuid } from 'uuid'
import Peer from "peerjs";
import { createContext, useEffect, useState, useReducer } from "react";
import { io } from "socket.io-client";
import { peerReducer } from "./peerReducer";
import { addPeerAction, removePeerAction, updatePeerAction } from "./peerActions";

export const RoomContext = createContext(null);
const socket = io('https://codefusion-react-production.up.railway.app/');

export const RoomProvider = ({ children }) => {
  const [me, setMe] = useState();
  const [stream, setStream] = useState();
  const [peers, dispatch] = useReducer(peerReducer, {});
  const [allUsers, setAllUsers] = useState([])
  const removePeer = (peerId) => {
    dispatch(removePeerAction(peerId))
  }
  useEffect(() => {
    const meId = uuid();

    const peer = new Peer(meId);
    setMe(peer);


    socket.on("user-disconnected", removePeer)
    socket.on("updated-peers", ({id, stream, username, viewStream, isMuted}) => {
      dispatch(updatePeerAction(id, stream, username, viewStream, isMuted))
    })
  }, []);

  useEffect(() => {
    if (!me) return;
    if (!stream) return;

    socket.on('get-users', ({room, participants}) => {
      setAllUsers(participants)
    })

    socket.on("user-joined", ({ peerId, username, viewStream, isMuted }) => {
      setAllUsers(allUsers.concat({userId: peerId, username, viewStream, isMuted}))
      const call = me.call(peerId, stream, {metadata: username});
      call.on("stream", (peerStream) => {
        dispatch(addPeerAction(peerId, peerStream, username, viewStream, isMuted));
      });
    });

    me.on("call", (call) => {
      call.answer(stream);
      call.on("stream", (peerStream) => {
        const user = allUsers.find((user) => user.userId === call.peer)
        const username = user ? user.username : "unknown"
        const viewStream = user ? user.viewStream : null
        const isMuted = user ? user.isMuted : null
        dispatch(addPeerAction(call.peer, peerStream, username, viewStream, isMuted));
      });
    });
  });
  return (
    <RoomContext.Provider value={{ socket, me, stream, peers, setStream }}>
      {children}
    </RoomContext.Provider>
  );
};
