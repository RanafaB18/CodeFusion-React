import { FaEllipsisV } from "react-icons/fa";
import TabButtons from "./TabButtons";
import { AiOutlineClose } from "react-icons/ai";

const Tab = ({ icon, text }) => {
  return (
    <>
      <button className="flex gap-2 items-center opacity-50">
        {icon}
        <span className=" text-white">{text}</span>
      </button>
      <AiOutlineClose className="text-white text-opacity-30 text-lg cursor-pointer" />
    </>
  );
};

export default Tab;
