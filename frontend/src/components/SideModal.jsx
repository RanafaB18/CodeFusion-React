import { AiOutlineClose } from "react-icons/ai";
import Person from "./Person";
import ChatScreen from "./screens/ChatScreen";
import { useState } from "react";

const SideModal = ({ participants, username, closeSideModal }) => {
  const [toggled, setToggled] = useState({ first: true, second: false });
  return (
    // <div className="h-full">
    //   <div className="border border-r-0 text-center pt-4 h-full">
    //     <input
    //       id="chat"
    //       className="peer/chat hidden"
    //       type="radio"
    //       name="status"
    //       defaultChecked
    //     />
    //     <label
    //       htmlFor="chat"
    //       className="cursor-pointer px-12 py-3
    //         bg-white bg-opacity-5 rounded-tl-md
    //         rounded-bl-md text-white peer-checked/chat:bg-white
    //         peer-checked/chat:bg-opacity-50 ml-2"
    //     >
    //       Chat
    //     </label>

    //     <input
    //       id="people"
    //       className="peer/people hidden"
    //       type="radio"
    //       name="status"
    //     />
    //     <label
    //       htmlFor="people"
    //       className="cursor-pointer px-12 py-3
    //         bg-white bg-opacity-5 rounded-tr-md
    //         rounded-br-md text-white peer-checked/people:bg-white peer-checked/people:bg-opacity-50"
    //     >
    //       People
    //     </label>
    //     <button
    //       className="float-right mx-2 pr-2 px-1 "
    //       onClick={closeSideModal}
    //     >
    //       <AiOutlineClose
    //         className="hover:fill-red-400"
    //         size={"21px"}
    //         color="white"
    //       />
    //     </button>
    //     <hr
    //       className="my-4 opacity-25
    //     "
    //     ></hr>
    //     <div className="bg-white hidden peer-checked/chat:block relative">
    //       <div className="flex flex-col relative bg-red-500">
    //         <ChatScreen username={username}/>
    //       </div>
    //     </div>
    //     <div className="hidden peer-checked/people:block">
    //       <div>
    //         {participants.map((peep, index) => (
    //           <Person key={index} name={peep} />
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="flex flex-col h-full border border-r-0 border-t-0 border-white border-opacity-25">
      <div className="flex gap-4 pt-4 px-2 items-center">
        <div className="flex">
          <div
            onClick={() => setToggled({ first: true, second: false })}
            className={`cursor-pointer px-12 py-3
             bg-white bg-opacity-5 rounded-tl-md
             rounded-bl-md text-white ml-2 ${
               toggled.first && "bg-white bg-opacity-50"
             }`}
          >
            <span>Chat</span>
          </div>
          <div
            onClick={() => setToggled({ first: false, second: true })}
            className={`cursor-pointer px-12 py-3
            bg-white bg-opacity-5 rounded-tr-md
            rounded-br-md text-white ${
              toggled.second && "bg-white bg-opacity-50"
            }`}
          >
            <span>People</span>
          </div>
        </div>
        <div
          className="flex items-center cursor-pointer justify-center w-10 h-10 hover:bg-blackhover rounded"
          onClick={closeSideModal}
        >
          <AiOutlineClose
            size={"21px"}
            color="white"
          />
        </div>
      </div>
      <hr
        className="my-4 opacity-25
        "
      ></hr>
      <div className="relative flex-1">
        {
          toggled.first ? <ChatScreen username={username}/> : (
            <div>
             {participants.map((peep, index) => (
              <Person key={index} name={peep} />
            ))}
          </div>
          )
        }
      </div>
    </div>
  );
};

export default SideModal;
