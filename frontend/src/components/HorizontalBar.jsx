import { useContext, useState } from "react";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
} from "react-icons/fa";

const HorizontalBar = ({ setIsMuted, setShowStream, showStream, isMuted, socket, room, me }) => {
  const [off, setOff] = useState({
    microphone: isMuted,
    video: !showStream,
  });
  const toggleMicrophone = () => {
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
        className={`sidebar-icon w-full h-full items-center flex justify-center rounded-none ${
          off.microphone && "bg-red-700"
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
        className={`sidebar-icon w-full h-full items-center flex justify-center rounded-none ${
          off.video && "bg-red-700"
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
