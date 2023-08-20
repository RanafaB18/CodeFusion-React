import { FaCode, FaFileAlt } from "react-icons/fa";
import TabButtons from "./TabButtons";
import { IconContext } from "react-icons";
import { AiOutlineFileWord } from "react-icons/ai";
import { v4 as uuid } from "uuid";
import { YjsContext } from "../context/YjsContext";
import { useContext, useState } from "react";
import { RoomContext } from "../context/RoomContext";
import * as Y from "yjs";
import { ProviderContext } from "../context/ProviderContext";
import axiosUtil from "../services";
import { contextMenu } from "react-contexify";

const Options = () => {
  const { socket, setShowOptions, room } =
    useContext(RoomContext);
  const { color, tabs } = useContext(ProviderContext);
  const { setEditorYtext } = useContext(YjsContext);
  const [once, setOnce] = useState(false);

  const getTab = async () => {
    const response = await axiosUtil.getTabName(room);
    return response;
  };

  const createTab = (tabName) => {
    contextMenu.hideAll()
    const id = uuid();
    // Create Y.Map
    const newMap = new Y.Map();
    // Put newDoc in Y.Map

    // create a new document
    const newDoc = new Y.Text();
    let tabValue;
    getTab().then((data) => {
      tabValue = data.tabs[room].numOfTabs;
      let name = `${tabName === 'code' ? 'Code' : 'Document'} ${tabValue}`;
      newDoc.applyDelta([{ insert: `Document ${tabValue}` }]); //debugging purposes
      newMap.set("newDoc", newDoc);
      newMap.set("docId", id);
      newMap.set("tabName", name);
      newMap.set("typeOftab", tabName);
      setEditorYtext((prevText) => {
        return [...prevText, newDoc];
      });
      tabs.push([newMap]);
      if (once === false) {
        socket.emit("tab-change", { id, room, color });
      } else {
        socket.emit("tab-change", { id, room });
      }
      setOnce(true);
    });
    setShowOptions(false);
  }
  return (
    <div className="px-4 py-3 bg-[#22262a] rounded shadow-lg">
      <IconContext.Provider value={{ color: "gray", size: "20px" }}>
        <TabButtons
          icon={<FaFileAlt />}
          text={"New Document Tab"}
          clickHandler={() => createTab('document')}
        />
        <TabButtons
          icon={<FaCode />}
          text={"New Code Tab"}
          clickHandler={() => createTab('code')}
        />
        <hr className="my-2 h-px opacity-20" />
        <TabButtons
          icon={<AiOutlineFileWord />}
          text={"Import Word Document"}
        />
      </IconContext.Provider>
    </div>
  );
};

export default Options;
