import { FaBars, FaEllipsisV, FaPlus } from "react-icons/fa";
import { useState } from "react";
import SideModal from "./SideModal";
import Tab from "./Tab";

const Bar = ({
  participants,
  showModal,
  setShowModal,
  invite,
  username,
  tabs,
  setTabs
}) => {
  const handleClick = () => {
    setShowModal(!showModal);
  };
  console.log("Tabs", tabs);
  const handleActive = (id) => {
    setTabs((prevState) => ({
      ...prevState,
      allTabs: prevState.allTabs.map((tab) => {
        if (tab.id === id) {
          if (tab.active) {
            return tab
          } else {
            return {...tab, active: true}
          }
        }
        return {...tab, active: false}
      })
    }))
  }
  const closeTab = (id, text) => {
    setTabs((prevState) => ({
      allTabs: prevState.allTabs.filter((tab) => (tab.id !== id)),
      numOfDocuments: prevState.numOfDocuments - (text.includes('Document') ? 1:0),
      numOfCodes: prevState.numOfCodes - (text.includes('Code') ? 1:0),
    }))
  }
  return (
    <>
      <div className="md:flex hidden flex-col relative w-full">
        <div className="text-white flex">
          <button className="px-4 py-2 border-r opacity-25">
            <FaPlus className="opacity-80" />
          </button>
          <div
            role="tabs"
            className="flex items-center overflow-x-auto whitespace-nowrap w-full"
          >
            {tabs.allTabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => {handleActive(tab.id)}}
                className={`px-3 flex h-full gap-3 items-center
                  ${tab.active ? "border-l-2 border-red-600 bg-blackhover" : "bg-blacklike"}`}
              >
                <Tab icon={tab.icon} text={tab.text} closeTab={() => {closeTab(tab.id, tab.text)}}/>
              </div>
            ))}
          </div>
          <button className="px-4 border-l opacity-25">
            <FaBars className="opacity-80" />
          </button>
        </div>
        <div className="flex h-16 bg-blackhover p-2">
          <div
            role="tools"
            className="flex w-10/12 items-center gap-3 overflow-x-auto whitespace-nowrap"
          ></div>
          <div className="flex justify-around w-2/12">
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
