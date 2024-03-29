import { FaCode, FaFileAlt } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { v4 as uuid } from "uuid";
import * as Y from "yjs";
import { useContextMenu } from "react-contexify";
import "react-contexify/ReactContexify.css";
import { ProviderContext } from "../context/ProviderContext";
import { useContext, useEffect } from "react";
import { RoomContext } from "../context/RoomContext";

const Tab = ({
  text,
  id,
  closeTab,
  index,
  switchTab,
  awarenessBars,
  active,
  newDoc,
}) => {
  const { show } = useContextMenu({
    id: "menu",
  });
  const { color, tabs, ydoc } = useContext(ProviderContext);
  const { socket, setAwarenessTabs } = useContext(RoomContext)
  function handleContextMenu(event) {
    show({
      event,
      props: { index, id },
    });
  }
  const handleCloseTab = (event) => {
    event.stopPropagation();
    closeTab(index);
  };
  useEffect(() => {
    socket.on('show-editors', () => {
      ydoc.transact(() => {
        const dummy = new Y.Text();
        const newMap = new Y.Map();
        newMap.set("newDoc", dummy);
        newMap.set("docId", "000");
        newMap.set("tabName", "Dummy");
        newMap.set("typeOftab", "code");
        tabs.push([newMap]);
        tabs.delete(tabs.length - 1, 1)
        setAwarenessTabs({})
      })
    })
  }, []);
  return (
    <div
      onContextMenu={handleContextMenu}
      index={index}
      onClick={switchTab}
      className={`flex items-center cursor-pointer pr-3 bg-[#353a41] h-full ${
        active ? `border-b-2` : ""
      }`}
      style={{ borderBottomColor: color }}
    >
      {awarenessBars[id]?.map((color) => {
        const key = uuid();
        return (
          <div
            key={key}
            style={{ backgroundColor: color }}
            className="h-full w-0.5"
          ></div>
        );
      })}
      <span className="opacity-50 mx-2">
        {text.includes("Document") ? <FaFileAlt /> : <FaCode />}
      </span>
      <span className="select-none text-white pr-3 w-32 whitespace-nowrap overflow-hidden text-ellipsis">
        {text}
      </span>
      <AiOutlineClose
        onClick={handleCloseTab}
        className="text-white hover:bg-red-500 hover:bg-opacity-30 rounded hover:text-red-600 text-opacity-40 text-lg cursor-pointer"
      />
    </div>
  );
};

export default Tab;
