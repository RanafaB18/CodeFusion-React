import React, { useContext, useState } from "react";
import Video from "./Video";
import { RoomContext } from "../context/RoomContext";
import { FaMicrophone, FaVideo } from "react-icons/fa";
import ToggleButton from "./ToggleButton";
import Room from "./Room";

const PermissionModal = ({ username, room, viewStream=true }) => {
  const { stream } = useContext(RoomContext);
  const [showStream, setShowStream] = useState(viewStream);
  const [isMuted, setIsMuted] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleVideo = (on) => {
    setShowStream(on);
  };

  const showRoom = () => {
    setClicked(true);
  };
  const handleVoice = (on) => {
    setIsMuted(!on)
  };
  if (!clicked) {
    return (
      <div className="w-screen h-screen pt-12">
        <div className="rounded-md p-4 max-w-lg mx-auto min-h-2/3 bg-white">
          <Video showStream={showStream} stream={stream} isMuted={true} username={username} location={"permission"}/>
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
    );
  }
  return <Room room={room} username={username} showStream={showStream} isMuted={isMuted} setIsMuted={setIsMuted} setShowStream={setShowStream}/>;
};

export default PermissionModal;
