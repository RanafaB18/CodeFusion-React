import { useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Person from "./Person";

const SideModal = ({participants, showSideModal, closeSideModal }) => {
  const chatRef = useRef(null);
  const peopleRef = useRef(null);

  const chatClick = () => {
    chatRef.current.autofocus();
  };
  const peopleClick = () => {
    peopleRef.current.autofocus();
  };

  return (
    <div
      style={showSideModal}
      className="absolute w-1/4 top-full
      right-0"
    >
      <div className="border h-screen text-center pt-2">
        {/* <div className="flex justify-center p-2
        "> */}
        {/* <button ref={chatRef} onClick={chatClick} id="chat"
            type="button" className="
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
          </button> */}
        {/* </div> */}
        <button
          id="chat"
          type="button"
          className="peer/chat text-center px-4 py-2
            bg-white bg-opacity-5 rounded-tl-xl w-1/3
            rounded-bl-xl text-white focus:bg-white
            focus:bg-opacity-50"
          autoFocus
        >
          Chat
        </button>
        <button
          id="people"
          className="peer/people text-center px-4 py-2
            bg-white bg-opacity-5 rounded-tr-xl w-1/3
            rounded-br-xl text-white focus:bg-white focus:bg-opacity-50"
        >
          People
        </button>
        <button
          className="m-2 rounded-lg
             float-right"
          onClick={closeSideModal}
        >
          <AiOutlineClose
            className="hover:fill-red-400"
            size={"21px"}
            color="white"
          />
        </button>

        <div className="p-3 bg-white hidden peer-focus/chat:block"></div>
        <div className="hidden peer-focus/people:block">
          <div>
            {participants.map((peep, index) => (
              <Person name={peep}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideModal;
