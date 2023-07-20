import { useState } from "react";
import {
  FaComment,
  FaMicrophone,
  FaMicrophoneSlash,
  FaRegComment,
  FaVideo,
  FaVideoSlash,
} from "react-icons/fa";

const SideBar = ({ showModal, setShowModal }) => {
  const [off, setOff] = useState({ microphone: false, video: false });
  const handleClick = () => {
    setShowModal(!showModal);
  };
  const toggleMicrophone = () => {
    setOff((prevState) => ({
      ...prevState,
      microphone: !prevState.microphone,
    }));
  };
  const toggleVideo = () => {
    setOff((prevState) => ({
      ...prevState,
      video: !prevState.video,
    }));
  }
  return (
    <aside
      className="hidden relative border border-white border-opacity-25 p-3
    bg-[#16191d] md:flex md:flex-col md:justify-end"
    >
      <div
        before={`${off.microphone ? "Unmute Microphone" : "Mute Microphone"}`}
        className={`hover:before:content-[attr(before)] sidebar-icon ${
          off.microphone && "bg-red-700 hover:bg-red-900"
        }`}
        onClick={toggleMicrophone}
      >
        {off.microphone ? (
          <FaMicrophoneSlash className="bottom-nav-icon" />
        ) : (
          <FaMicrophone className="bottom-nav-icon" />
        )}
      </div>
      <div
        before={`${off.video ? "Resume Video" : "Stop Video"}`}
        className={`hover:before:content-[attr(before)] sidebar-icon ${
          off.video && "bg-red-700 hover:bg-red-900"
        }`}
        onClick={toggleVideo}
      >
        {off.video ? (
          <FaVideoSlash className="bottom-nav-icon" />
        ) : (
          <FaVideo className="bottom-nav-icon" />
        )}
      </div>
      <div
        className="sidebar-icon"
        onClick={handleClick}
      >
        {showModal ? (
          <FaRegComment className="bottom-nav-icon" />
        ) : (
          <FaComment className="bottom-nav-icon" />
        )}
      </div>
    </aside>
  );
};

export default SideBar;
