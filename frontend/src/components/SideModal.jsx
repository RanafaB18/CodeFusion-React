import { useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Person from "./Person";

const SideModal = ({ participants, showSideModal, closeSideModal }) => {
  return (
    <div
      style={showSideModal}
      className="absolute w-1/4 top-full
      right-0"
    >
      <div className="border h-screen text-center pt-4">
        <input
          id="chat"
          className="peer/chat hidden"
          type="radio"
          name="status"
          defaultChecked
        />
        <label htmlFor="chat" className="cursor-pointer px-4 py-2
            bg-white bg-opacity-5 rounded-tl-xl
            rounded-bl-xl text-white peer-checked/chat:bg-white
            peer-checked/chat:bg-opacity-50">
          Chat
        </label>

        <input
          id="people"
          className="peer/people hidden"
          type="radio"
          name="status"
        />
        <label htmlFor="people" className="cursor-pointer px-4 py-2
            bg-white bg-opacity-5 rounded-tr-xl
            rounded-br-xl text-white peer-checked/people:bg-white peer-checked/people:bg-opacity-50">
          People
        </label>
        <button
          className="float-right my-1 mx-3 "
          onClick={closeSideModal}
        >
          <AiOutlineClose
            className="hover:fill-red-400"
            size={"21px"}
            color="white"
          />
        </button>
        <hr className="my-4 opacity-25
        "></hr>
        <div className="p-3 bg-white hidden peer-checked/chat:block"></div>
        <div className="hidden peer-checked/people:block">
          <div>
            {participants.map((peep, index) => (
              <Person key={index} name={peep} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideModal;
