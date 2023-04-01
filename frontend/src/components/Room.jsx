import { useEffect, useState, useRef } from "react";
import Button from "./Button";
import Editors from "./Editors";
import Options from "./Options";
import { FaBars, FaPlus } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const Room = ({ room, username }) => {
  // let roomLink;
  const [visible, setVisibile] = useState(false);
  const [roomLink, setRoomLink] = useState("")
  const showOnClick = {
    display: visible ? "" : "none",
  };
  useEffect(() => {
    setRoomLink(window.location.href)
  }, [])
  const inviteModalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const invite = () => {
    setVisibile(true);
  };
  const closeInvite = (event) => {
    if (
      inviteModalRef.current &&
      event.target !== inviteModalRef.current &&
      !closeButtonRef.current.contains(event.target)
    ) {
      console.log("You touched the form");
      return;
    }
    setVisibile(false);
  };
  return (
    <div>
      <div className="flex flex-col relative">
        <div className="text-white flex">
          <button className="px-4 py-2">
            <FaPlus className="opacity-80" />
          </button>
          <div className="border-r border-l opacity-25 w-full"></div>
          <button className="px-4">
            <FaBars className="opacity-80" />
          </button>
        </div>
        <div className="flex justify-between bg-blackhover p-2 w-full">
          <div role="tabs"></div>
          <div className="flex justify-around  w-1/3">
            <button
              className="bg-bluish
                text-white text-md
            font-semibold rounded-md px-4
            tracking-wide hover:bg-blue-500"
              onClick={invite}
            >
              Invite Others
            </button>
            <button
              className="
                bg-blacklike
                border-2 border-red-600
                text-white rounded-full
                py-2 px-4"
            >
              {username[0]}
            </button>
          </div>
        </div>
        {/* <Editors room={room} /> */}
      </div>
      <div className="max-w-xs py-12 mx-auto">
        <Options />
      </div>
      <div
        ref={inviteModalRef}
        style={showOnClick}
        onClick={closeInvite}
        className="absolute h-screen w-screen top-0 pt-12 backdrop-blur-sm"
      >
        <div className="z-10 top-0 max-w-sm mx-auto p-4 bg-white rounded">
          <div className="flex justify-between items-center pb-6">
            <p className="text-lg">Invite People To Join</p>
            <button ref={closeButtonRef} onClick={closeInvite}>
              <AiOutlineClose size={"21px"} />
            </button>
          </div>
          <div>
            <input
              className="
            border w-full py-2
             px-4 rounded-md active:border-bluish
             active:cursor-none"
              value={roomLink}
              readOnly
            />
            <button
              className="w-full bg-bluish py-2
            px-4 rounded-md mt-2 text-white
            font-semibold"
            >
              Copy Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
