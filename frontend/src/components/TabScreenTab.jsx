import { AiOutlineClose } from "react-icons/ai";
import { FaFileAlt, FaCode } from "react-icons/fa";
import { v4 as uuid } from "uuid";
import { useContextMenu } from "react-contexify";
import "react-contexify/ReactContexify.css";

const TabScreenTab = ({
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
      className={`flex text-white items-center justify-between rounded-md cursor-pointer pr-3 bg-[#353a41]`}
    >
      <div className="flex h-14 items-center">
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
        <span className="opacity-50 mx-2 ml-3">
          {text.includes("Document") ? <FaFileAlt /> : <FaCode />}
        </span>
        <span className="select-none text-white pr-3 w-96 whitespace-nowrap overflow-hidden text-ellipsis">{text}</span>
      </div>
      <AiOutlineClose
        onClick={handleCloseTab}
        className="text-white hover:bg-red-500 hover:bg-opacity-30 rounded hover:text-red-600 text-opacity-40 text-lg cursor-pointer"
      />
    </div>
  );
};

export default TabScreenTab;
