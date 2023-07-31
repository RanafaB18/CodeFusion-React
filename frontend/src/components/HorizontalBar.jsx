import { useContext, useState } from "react";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
} from "react-icons/fa";

const HorizontalBar = ({ setIsMuted, setShowStream, showStream, isMuted, socket, room, me, off, setOff }) => {
  const toggleMicrophone = () => {
    console.log("Off.mic", off)
    setOff((prevState) => ({
      ...prevState,
      microphone: !prevState.microphone,
    }));
    setIsMuted((prevState) => !prevState);
    socket.emit("toggle-video-audio", {
      room,
      id: me.id,
      viewStream: showStream,
      isMuted: !isMuted,
    });
  };
  const toggleVideo = () => {
    console.log("Off.video", off)
    setOff((prevState) => ({
      ...prevState,
      video: !prevState.video,
    }));
    setShowStream((prevState) => !prevState);
    socket.emit("toggle-video-audio", {
      room,
      id: me.id,
      viewStream: off.video,
      isMuted: isMuted,
    });
  };
  return (
    <div className="flex items-center h-16">
      <div
        className={`w-full h-full items-center flex justify-center rounded-none ${
          off.microphone === true && "bg-red-700"
        }`}
        onClick={toggleMicrophone}
      >
        {off.microphone ? (
          <FaMicrophoneSlash className="bottom-nav-icon opacity-100 text-xl" />
        ) : (
          <FaMicrophone className="bottom-nav-icon opacity-100 text-xl" />
        )}
      </div>
      <div
        className={`w-full h-full items-center flex justify-center rounded-none ${
          off.video === true && "bg-red-700"
        }`}
        onClick={toggleVideo}
      >
        {off.video ? (
          <FaVideoSlash className="bottom-nav-icon opacity-100 text-xl" />
        ) : (
          <FaVideo className="bottom-nav-icon opacity-100 text-xl" />
        )}
      </div>
    </div>
  );
};

export default HorizontalBar;
