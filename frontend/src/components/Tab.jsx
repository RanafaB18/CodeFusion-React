import { FaEllipsisV } from "react-icons/fa";
import TabButtons from "./TabButtons";

const Tab = ({ icon, text }) => {
  return (
    <div className="flex items-center mx-4 p-4 hover:bg-blacklike justify-between rounded-md">
      <button className="flex items-center">
        {icon}
        <span className="ml-4 text-white text-lg">{text}</span>
      </button>
      <FaEllipsisV className="text-white text-opacity-30 text-lg cursor-pointer" />
    </div>
  );
};

export default Tab;
