import { FaBars, FaEllipsisV, FaPlus } from "react-icons/fa";
import { useState } from "react";
import SideModal from "./SideModal";

const Bar = ({ participants, showModal, setShowModal, invite, username }) => {

  const handleClick = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <div className="md:flex hidden flex-col relative w-full">
        <div className="text-white flex">
          <button className="px-4 py-2">
            <FaPlus className="opacity-80" />
          </button>
          <div className="border-r border-l opacity-25 w-full"></div>
          <button className="px-4">
            <FaBars className="opacity-80" />
          </button>
        </div>
        <div className="flex bg-blackhover p-2 min-w-screen ">
          <div role="tabs" className="flex-1"></div>
          <div className="flex w-52 justify-evenly">
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
        {/* <Editors room={room} /> */}
        {/* {showModal && (
          <SideModal
            participants={participants}
            closeSideModal={closeSideModal}
          />
        )} */}
      </div>
      {/* <div className="md:flex hidden flex-col relative w-full  md:visible">
      <div className="h-14 bg-blackhover">
        <div className="
        bg-white h-14 w-16 float-right
        bg-opacity-20 flex justify-center items-center">
          <FaEllipsisV className="text-white text-lg cursor-pointer"/>
        </div>
      </div>
    </div> */}
    </>
  );
};
export default Bar;
