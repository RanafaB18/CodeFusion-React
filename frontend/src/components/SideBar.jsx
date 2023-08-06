import { useContext } from "react";
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
import { Tooltip } from "react-tooltip";

const SideBar = () => {
  const {
    setShowStream,
    showModal,
    setShowModal,
    setIsMuted,
    showStream,
    isMuted,
    socket,
    room,
    off,
    setOff,
    windowWidth,
    me,
  } = useContext(RoomContext);
  const { setVideoStructure, setToggled, toggled } = useContext(YjsContext);
  const handleClick = () => {
    if (windowWidth <= 1024) {
      setVideoStructure(prevState => {
        if (prevState !== 1) {
          return prevState
        }
        return null
      });
    }
    switch (showModal) {
      case true:
        if (toggled.chatScreen) {
          setShowModal(false);
        }
        break;
      case false:
        setShowModal(true);
        break;
    }
    setToggled({ people: false, chatScreen: true });
  };
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

  const toggleSidebar = () => {
    setVideoStructure(1);
    setOff((prevState) => ({
      ...prevState,
      videoSidebar: true,
      videoGrid: false,
      videoFloat: false,
      noVideo: false,
    }));
  };

  const toggleGrid = () => {
    setVideoStructure(0);
    setOff((prevState) => ({
      ...prevState,
      videoSidebar: false,
      videoGrid: true,
      videoFloat: false,
      noVideo: false,
    }));
  };

  const toggleFloat = () => {
    setVideoStructure(2);
    setOff((prevState) => ({
      ...prevState,
      videoSidebar: false,
      videoGrid: false,
      videoFloat: true,
      noVideo: false,
    }));
  };

  const toggleNoVideo = () => {
    setVideoStructure(3);
    setOff((prevState) => ({
      ...prevState,
      videoSidebar: false,
      videoGrid: false,
      videoFloat: false,
      noVideo: true,
    }));
  };
  return (
    <aside
      className="hidden relative border border-white border-opacity-25 p-3
    bg-[#16191d] md:flex md:flex-col md:justify-between"
    >
      <div>
        <div
          onClick={toggleGrid}
          data-tooltip-id="grid"
          data-tooltip-content={"Video Grid"}
          className={`sidebar-icon ${off.videoGrid && "bg-blacklike"}`}
        >
          <Tooltip id="grid" place="left" />
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
          data-tooltip-content={"Video Sidebar"}
          data-tooltip-id="sidebar"
          className={`sidebar-icon ${off.videoSidebar && "bg-blacklike"}`}
        >
          <Tooltip id="sidebar" place="left" />
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
          data-tooltip-content={"Floating Videos"}
          data-tooltip-id="float"
          className={`sidebar-icon ${off.videoFloat && "bg-blacklike"}`}
        >
          <Tooltip id="float" place="left" />
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
        <div
          data-tooltip-id="no-video"
          data-tooltip-content={"Hide videos"}
          className={`sidebar-icon ${off.noVideo && "bg-blacklike"}`}
          onClick={toggleNoVideo}
        >
          <Tooltip id="no-video" place="left" />
          <FaVideoSlash className="bottom-nav-icon opacity-100 text-xl" />
        </div>
      </div>
      <div>
        <div
          data-tooltip-content={
            off.microphone ? "Unmute Microphone" : "Mute Microphone"
          }
          data-tooltip-id="microphone-tooltip"
          className={`sidebar-icon ${
            off.microphone && "bg-red-700 hover:bg-red-900"
          }`}
          onClick={toggleMicrophone}
        >
          <Tooltip id="microphone-tooltip" place="left" />
          {off.microphone ? (
            <FaMicrophoneSlash className="bottom-nav-icon opacity-100 text-xl" />
          ) : (
            <FaMicrophone className="bottom-nav-icon opacity-100 text-xl" />
          )}
        </div>
        <div
          data-tooltip-content={off.video ? "Resume Video" : "Stop Video"}
          data-tooltip-id="video-tooltip"
          className={`sidebar-icon ${
            off.video && "bg-red-700 hover:bg-red-900"
          }`}
          onClick={toggleVideo}
        >
          <Tooltip id="video-tooltip" place="left" />
          {off.video ? (
            <FaVideoSlash className="bottom-nav-icon opacity-100 text-xl" />
          ) : (
            <FaVideo className="bottom-nav-icon opacity-100 text-xl" />
          )}
        </div>
        <div
          data-tooltip-content={"Chat"}
          data-tooltip-id="chat"
          className="my-2 mx-auto hover:bg-blackhover rounded p-3 cursor-pointer"
          onClick={handleClick}
        >
          <Tooltip id="chat" place="left" />
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
