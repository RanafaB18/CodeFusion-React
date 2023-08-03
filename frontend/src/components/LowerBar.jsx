import React, { useContext } from "react";
import { RoomContext } from "../context/RoomContext";
import CircleAvatar from "./CircleAvatar";
import LanguagesDropdown from "./LanguagesDropdown";

const LowerBar = () => {
  const { invite, username, showModal, setShowModal, docs, currentIndex } = useContext(RoomContext);
  const handleClick = () => {
    setShowModal(!showModal);
  };
  return (
    <div className={`flex ${docs[currentIndex]?.typeOfTab === "code" ? "justify-between" : "justify-end"}  items-center h-16 bg-[#353a41] p-2`}>
      {/* <div className="flex w-3/4 lg:w-10/12 items-center gap-3 whitespace-wrap">
        //{docs[currentIndex]?.typeOfTab === "document" && <CustomToolbar />}
      </div> */}
      {docs[currentIndex]?.typeOfTab === "code" && <LanguagesDropdown /> }
      <div className="flex justify-around w-1/4 md:2/12 lg:w-3/12">
        <button
          className="bg-bluish
          text-white text-md
      font-semibold rounded-md px-4
      tracking-wide hover:bg-blue-500"
          onClick={invite}
        >
          Invite Others
        </button>
        <div className="cursor-pointer" onClick={handleClick}>
          <CircleAvatar name={username} />
        </div>
      </div>
    </div>
  );
};

export default LowerBar;
