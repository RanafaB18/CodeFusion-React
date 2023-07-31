import React, { useContext, useEffect, useState } from "react";
import Video from "./Video";
import { RoomContext } from "../context/RoomContext";
import { FaMicrophone, FaVideo } from "react-icons/fa";
import ToggleButton from "./ToggleButton";
import Room from "./Room";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { WebrtcProvider } from "y-webrtc";
import { ProviderContext } from "../context/ProviderContext";
import util from "../services";
import FixedVideo from "./FixedVideo";

const ydoc = new Y.Doc();
let provider
let awareness
const PermissionModal = ({ username, room, viewStream = true }) => {
  const { stream } = useContext(RoomContext);
  const [showStream, setShowStream] = useState(viewStream);
  const [isMuted, setIsMuted] = useState(false);
  const [clicked, setClicked] = useState(false);
  console.log("Permissions Modal", room);
  const color = util.getNameColorCode(username);
  useEffect(() => {
    provider = new WebrtcProvider(room, ydoc, { signaling: ['wss://clumsy-group-production.up.railway.app'] })
    awareness = provider.awareness;
  }, [])
  const tabs = ydoc.getArray("tabs");

  const handleVideo = (on) => {
    setShowStream(on);
  };

  const showRoom = () => {
    setClicked(true);
  };
  const handleVoice = (on) => {
    setIsMuted(!on);
  };
  if (!clicked) {
    return (
      <ProviderContext.Provider
        value={{ ydoc, provider, awareness, tabs, color }}
      >
        <div className="w-screen h-screen pt-12">
          <div className="rounded-md p-4 max-w-xs sm:max-w-lg mx-auto min-h-2/3 bg-white">
            <FixedVideo
              showStream={showStream}
              stream={stream}
              isMuted={true}
              username={username}
              location={"permission"}
              isPeer={false}
            />
            <div className="flex gap-2 items-center mt-4 ml-1">
              <FaVideo className="w-4 h-4 text-[#353a41]" />
              <ToggleButton handleState={handleVideo} />
              <FaMicrophone className="w-4 h-4 text-[#353a41]" />
              <ToggleButton handleState={handleVoice} />
            </div>
            <button
              onClick={showRoom}
              className="w-full bg-[#4299e1] mt-4 p-3 rounded-md"
            >
              <span className="text-lg text-white">Join →</span>
            </button>
          </div>
        </div>
      </ProviderContext.Provider>
    );
  }
  return (
    <ProviderContext.Provider
      value={{ ydoc, provider, awareness, tabs, color }}
    >
      <Room
        room={room}
        username={username}
        showStream={showStream}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        setShowStream={setShowStream}
      />
    </ProviderContext.Provider>
  );
};

export default PermissionModal;
