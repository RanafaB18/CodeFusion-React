import { useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";

const SideModal = ({showSideModal, closeSideModal}) => {
  const chatRef = useRef(null)
  const peopleRef = useRef(null)

  const chatClick = () => {
    chatRef.current.autofocus()
  }
  const peopleClick = () => {
    peopleRef.current.autofocus()
  }

  return (
    <div
    style={showSideModal}
      className="absolute w-1/4 top-full
      right-0"
    >
      <div className="border h-screen">
        <div className="flex justify-center p-2
        ">
            <button ref={chatRef} onClick={chatClick} id="chat" type="button" className="
            grow text-center px-4 py-2
            bg-white bg-opacity-5 rounded-tl-xl
            rounded-bl-xl text-white focus:bg-white focus:bg-opacity-50">
                Chat
            </button>
            <button onClick={peopleClick} ref={peopleRef} type="button" id="people"
            className="
            grow text-center px-4 py-2
            bg-white bg-opacity-5 rounded-tr-xl
            rounded-br-xl text-white focus:bg-white focus:bg-opacity-50">
                People
            </button>
            <button
            className="mx-2 rounded-lg p-2
            hover:bg-blackhover"
            onClick={closeSideModal}
            >
            <AiOutlineClose size={"21px"} color="white" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default SideModal
