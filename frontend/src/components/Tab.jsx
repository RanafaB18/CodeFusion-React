import { FaCode, FaFileAlt } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { v4 as uuid } from "uuid";
import {
  useContextMenu,
} from "react-contexify";
import "react-contexify/ReactContexify.css";

const Tab = ({
  text,
  id,
  closeTab,
  index,
  switchTab,
  awarenessBars,
}) => {
  const { show } = useContextMenu({
    id: "menu",
  });

  function handleContextMenu(event) {
    show({
      event,
      props: { index, id }
    });
  }
  const handleCloseTab = (event) => {
    event.stopPropagation();
    closeTab(index);
  };
  return (
    <div
      onContextMenu={handleContextMenu}
      index={index}
      onClick={switchTab}
      className={`flex items-center cursor-pointer pr-3 bg-[#353a41] h-full`}
    >
      {awarenessBars[id]?.map((color) => {
        const key = uuid();
        return (
          <div
            key={key}
            style={{ backgroundColor: color }}
            className="h-full w-1"
          ></div>
        );
      })}
      <span className="opacity-50 mx-2">
        {text.includes("Document") ? <FaFileAlt /> : <FaCode />}
      </span>
      <span className="select-none text-white pr-3 w-32 whitespace-nowrap overflow-hidden text-ellipsis">{text}</span>
      <AiOutlineClose
        onClick={handleCloseTab}
        className="text-white hover:bg-red-500 hover:bg-opacity-30 rounded hover:text-red-600 text-opacity-40 text-lg cursor-pointer"
      />
    </div>
  );
};

export default Tab;
