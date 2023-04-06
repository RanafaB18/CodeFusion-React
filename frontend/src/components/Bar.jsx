import { FaBars, FaPlus } from "react-icons/fa";
import { useState } from "react";
import SideModal from "./SideModal";

const Bar = ({ participants, invite, username }) => {
  const [showModal, setShowModal] = useState(false);
  const showSideModal = {
    display: showModal ? "" : "none",
  };
  const closeSideModal = () => {
    setShowModal(false)
  }
  const showParticipants = () => {
    setShowModal(!showModal)
  }
  return (
    <div className="flex flex-col relative w-full">
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
                py-2 px-4 hover:bg-blackhover"
            onClick={showParticipants}
          >
            {username[0].toUpperCase()}
          </button>
        </div>
      </div>
      {/* <Editors room={room} /> */}
      <SideModal participants={participants} showSideModal={showSideModal} closeSideModal={closeSideModal} />
    </div>
  );
};
export default Bar;
