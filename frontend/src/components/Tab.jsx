import { FaFileAlt } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

const Tab = ({
  text,
  id,
  closeTab,
  index,
  switchTab,
  active,
  name,
  awarenessBars,
}) => {
  const handleCloseTab = (event) => {
    event.stopPropagation();
    closeTab(index);
  };
  console.log("Active awareness", awarenessBars);
  return (
    <>
      <div
        index={index}
        onClick={switchTab}
        className={`flex items-center cursor-pointer pr-3 bg-[#353a41] h-full`}
      >
          {awarenessBars[id]?.map((color) => {
            console.log("Active Id in tab", id);
            return (
              <div
                style={{ backgroundColor: color }}
                className="h-full w-1"
              ></div>
            );
          })}
          <div>

          </div>
        <span className="opacity-50 mx-2">
          {text.includes("Document") ? <FaFileAlt /> : <FaCode />}
        </span>
        <span className=" text-white pr-3">{text}</span>
        <AiOutlineClose
          onClick={handleCloseTab}
          className="text-white hover:bg-red-500 hover:bg-opacity-30 rounded hover:text-red-600 text-opacity-40 text-lg cursor-pointer"
        />
      </div>
    </>
  );
};

export default Tab;
