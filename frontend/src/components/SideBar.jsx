import { useContext, useState } from "react";
import floatingVideo from "/floating-video.svg";
import {
  FaComment,
  FaMicrophone,
  FaMicrophoneSlash,
  FaRegComment,
  FaVideo,
  FaVideoSlash,
} from "react-icons/fa";
import { YjsContext } from "../context/YjsContext";
import { RoomContext } from "../context/RoomContext";
import { updatePeerAction } from "../context/peerActions";

const SideBar = ({ showModal, setShowModal }) => {
  const { setShowStream, socket, room, me, peers, stream, username } = useContext(RoomContext)
  const [off, setOff] = useState({
    microphone: false,
    video: false,
    videoGrid: false,
    videoSidebar: false,
    videoFloat: true,
  });
  const { setVideoStructure } = useContext(YjsContext);
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
    setShowStream(prevState => !prevState)
    socket.emit('turn-off-video', ({room, id: me.id, stream, username, viewStream: off.video}))
    console.log("Turning off user with id: ", me.id, "in room", room);
    console.log("Give my Peers", peers)
    console.log("This", {id: me.id, stream, username, viewStream: off.video})
  };

  const toggleSidebar = () => {
    setVideoStructure(1);
    setOff((prevState) => ({
      ...prevState,
      videoSidebar: true,
      videoGrid: false,
      videoFloat: false
    }));
  };

  const toggleGrid = () => {
    setVideoStructure(0);
    setOff((prevState) => ({
      ...prevState,
      videoSidebar: false,
      videoGrid: true,
      videoFloat: false
    }));
  };

  const toggleFloat = () => {
    setVideoStructure(2)
    setOff((prevState) => ({
      ...prevState,
      videoSidebar: false,
      videoGrid: false,
      videoFloat: true
    }));
  }
  return (
    <aside
      className="hidden relative border border-white border-opacity-25 p-3
    bg-[#16191d] md:flex md:flex-col md:justify-between"
    >
      <div>
        <div
          onClick={toggleGrid}
          before={"Video Grid"}
          className={`hover:before:content-[attr(before)] sidebar-icon ${
            off.videoGrid && "bg-blacklike"
          }`}
        >
          <svg
            fill="white"
            width="24"
            height="20"
            viewBox="0 0 24 24"
            name="video-mode-grid"
            size="20"
            className="icon"
          >
            <path d="M21 3H3C2.46957 3 1.96086 3.21071 1.58579 3.58579C1.21071 3.96086 1 4.46957 1 5V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H21C21.5304 21 22.0391 20.7893 22.4142 20.4142C22.7893 20.0391 23 19.5304 23 19V5C23 4.46957 22.7893 3.96086 22.4142 3.58579C22.0391 3.21071 21.5304 3 21 3ZM11 19H3V13H13V11H3V5H11V13H13V5H21V11H11V19Z"></path>
          </svg>
        </div>
        <div
          onClick={toggleSidebar}
          before={"Video Sidebar"}
          className={`hover:before:content-[attr(before)] sidebar-icon ${
            off.videoSidebar && "bg-blacklike"
          }`}
        >
          <svg
            fill="white"
            width="24"
            height="20"
            viewBox="0 0 24 24"
            name="video-mode-sidebar"
            size="20"
            className="icon"
          >
            {" "}
            <path d="M21 3H3C2.46957 3 1.96086 3.21071 1.58579 3.58579C1.21071 3.96086 1 4.46957 1 5V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H21C21.5304 21 22.0391 20.7893 22.4142 20.4142C22.7893 20.0391 23 19.5304 23 19V5C23 4.46957 22.7893 3.96086 22.4142 3.58579C22.0391 3.21071 21.5304 3 21 3ZM15 19H3V5H15V19Z"></path>
          </svg>
        </div>
        <div
          onClick={toggleFloat}
          before={"Floating Videos"}
          className={`hover:before:content-[attr(before)] sidebar-icon ${
            off.videoFloat && "bg-blacklike"
          }`}
        >
          <svg
            fill="white"
            width="24"
            height="20"
            viewBox="0 0 24 24"
            name="video-mode-floating"
            size="20"
            className="icon"
          >
            <path d="M19,7L11,7L11,13L19,13L19,7M21,3L3,3C1.903,3 1,3.903 1,5L1,19C1,20.097 1.903,21 3,21L21,21C22.097,21 23,20.097 23,19L23,5C23,3.903 22.097,3 21,3M21,19L3,19L3,5L21,5L21,19Z"></path>
          </svg>
        </div>
      </div>
      <div>
        <div
          before={`${off.microphone ? "Unmute Microphone" : "Mute Microphone"}`}
          className={`hover:before:content-[attr(before)] sidebar-icon ${
            off.microphone && "bg-red-700 hover:bg-red-900"
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
          before={`${off.video ? "Resume Video" : "Stop Video"}`}
          className={`hover:before:content-[attr(before)] sidebar-icon ${
            off.video && "bg-red-700 hover:bg-red-900"
          }`}
          onClick={toggleVideo}
        >
          {off.video ? (
            <FaVideoSlash className="bottom-nav-icon opacity-100 text-xl" />
          ) : (
            <FaVideo className="bottom-nav-icon opacity-100 text-xl" />
          )}
        </div>
        <div
          className="my-2 mx-auto hover:bg-blackhover rounded p-3 cursor-pointer"
          onClick={handleClick}
        >
          {showModal ? (
            <FaRegComment className="bottom-nav-icon opacity-100 text-xl" />
          ) : (
            <FaComment className="bottom-nav-icon opacity-100 text-xl" />
          )}
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
