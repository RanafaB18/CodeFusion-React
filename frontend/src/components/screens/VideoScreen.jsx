import { useContext, useEffect, useRef, useState } from "react";
import { socket } from "../../Home";
import Peer from "peerjs";
import { RoomContext } from "../../context/RoomContext";
import Video from "../Video";

const VideoScreen = ({ username }) => {
  const [peers, setPeers] = useState([]);
  const userVideo = useRef();
  const peersRef = useRef([]);
  const room = useContext(RoomContext);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        socket.emit("join-video", room);
        socket.on("all_participants", (users) => {
          const peers = [];
          console.log("Users", users);
          console.log("Socket id", socket.id)
          users.forEach((user) => {
            console.log("user", user)
            const peer = createPeer(user.userId, socket.id, stream);
            peersRef.current.push({
              peerID: user.userId,
              peer,
            });
            peers.push(peer);
          });
          setPeers(peers);
        });
        socket.on("user joined", (payload) => {
          console.log("payload", payload)
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });

          setPeers((users) => [...users, peer]);
        });

        socket.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });
      })
      .catch((err) => {
        console.error(`You got an error: ${err}`);
      }
    );
  }, []);
  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("sending-signal", { userToSignal, callerID, signal });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }
  console.log("Peers", peers);
  return (
    <div>
      <video muted autoPlay playsInline ref={userVideo}></video>
      {peers.map((peer, index) => {
        return <Video key={index} peer={peer} />;
      })}
    </div>
  );
};

export default VideoScreen;
