import { FaFileAlt } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const Tab = ({ text, closeTab, index, switchTab }) => {
  const handleCloseTab = (event) => {
    event.stopPropagation()
    closeTab(index)
  }
  return (
    <>
      <div index={index} onClick={switchTab} className="flex gap-2 items-center cursor-pointer px-3 bg-[#353a41] h-full">
        <span className="opacity-50">{text.includes("Document") ? <FaFileAlt /> : <FaCode />}</span>
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
