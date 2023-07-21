import React, { useContext } from "react";
import { RoomContext } from "../context/RoomContext";

const LowerBar = () => {
  const { invite, username, showModal, setShowModal } = useContext(RoomContext);
  const handleClick = () => {
    setShowModal(!showModal);
  };
  return (
    <div className="flex h-16 bg-[#353a41] p-2">
      <div className="flex w-3/4 lg:w-10/12 items-center gap-3 whitespace-wrap">
        {/* {docs[currentIndex]?.typeOfTab === "document" && <CustomToolbar />} */}
      </div>
      <div className="flex justify-around w-1/4 lg:w-2/12">
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
          py-2 px-4 hover:bg-blackhover"
          onClick={handleClick}
        >
          {username[0].toUpperCase()}
        </button>
      </div>
    </div>
  );
};

export default LowerBar;
