import { AiOutlineClose } from "react-icons/ai";
import Person from "./Person";
import ChatScreen from "./screens/ChatScreen";
import { useState } from "react";
import VideoSideBar from "./VideoSideBar";

const SideModal = ({
  participants,
  username,
  closeSideModal,
  peers,
  showStream,
  stream,
  location,
  showModal,
  toggled,
  setToggled
}) => {
  console.log("Side modal", showModal, "toggled", toggled);
  if (showModal.videoSidebar === true) {
    return (
      <VideoSideBar
        peers={peers}
        showStream={showStream}
        stream={stream}
        username={username}
        location={location}
      />
    );
  }
  return (
    <div className="flex flex-col h-full border border-r-0 border-t-0 border-white border-opacity-25">
      <div className="flex gap-4 pt-4 px-2 items-center">
        <div className="flex">
          <div
            onClick={() => setToggled({ chatScreen: true, people: false })}
            className={`cursor-pointer px-12 py-3
             bg-white bg-opacity-5 rounded-tl-md
             rounded-bl-md text-white ml-2 ${
               toggled.chatScreen && "bg-white bg-opacity-50"
             }`}
          >
            <span>Chat</span>
          </div>
          <div
            onClick={() => setToggled({ chatScreen: false, people: true })}
            className={`cursor-pointer px-12 py-3
            bg-white bg-opacity-5 rounded-tr-md
            rounded-br-md text-white ${
              toggled.people && "bg-white bg-opacity-50"
            }`}
          >
            <span>People</span>
          </div>
        </div>
        <div
          className="flex items-center cursor-pointer justify-center w-10 h-10 hover:bg-blackhover rounded"
          onClick={closeSideModal}
        >
          <AiOutlineClose size={"21px"} color="white" />
        </div>
      </div>
      <hr
        className="my-4 opacity-25
        "
      ></hr>
      <div className="relative flex-1">
        {toggled.chatScreen ? (
          <ChatScreen username={username} />
        ) : (
          <div>
            {participants.map((peep, index) => (
              <Person key={index} name={peep.username} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SideModal;
