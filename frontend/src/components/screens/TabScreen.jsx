import { FaCode, FaFileAlt, FaTable } from "react-icons/fa";
import Tab from "../Tab";
import TabButtons from "../TabButtons";
import { useContext, useEffect, useState } from "react";
import Options from "../Options";
import { RoomContext } from "../../context/RoomContext";
import { ProviderContext } from "../../context/ProviderContext";
import TabScreenTab from "../TabScreenTab";

const TabScreen = () => {
  const {
    showOptions,
    setShowOptions,
    docs,
    setDocs,
    socket,
    username,
    currentIndex,
    setCurrentIndex,
    room,
    awarenessTabs,
    setAwarenessTabs
  } = useContext(RoomContext);
  const { tabs, color } = useContext(ProviderContext);
  const [copyTabs, setCopyTabs] = useState(tabs);
  useEffect(() => {
    socket.on("get-active-tabs", ({ activeTabs }) => {
      setAwarenessTabs(activeTabs);
    });

    socket.on("removal", ({ username, color }) => {
      socket.emit("remove-color", { username, color, room });
    });
  }, []);
  const closeTab = (id, index) => {
    copyTabs.delete(index, 1);
    socket.emit("delete-tab", { room, id, color });
  };
  const switchTab = (index, id) => {
    socket.emit("tab-change", { id, room, color, username });
    setDocs((prevState) => {
      const currentTab = prevState[index];
      if (currentTab.id === id) {
        setCurrentIndex(index);
      }
      return prevState;
    });
  };
  return (
    <>
      <div className="relative h-14 w-screen bg-blackhover px-4 flex justify-between items-center overflow-hidden">
        <div className="flex items-center">
          <svg
            fill="#d2d4d9"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            name="tab"
            size="24"
            className="icon"
          >
            <path d="M21,3H3A2,2 0 0,0 1,5V19A2,2 0 0,0 3,21H21A2,2 0 0,0 23,19V5A2,2 0 0,0 21,3M21,19H3V5H13V9H21V19Z"></path>
          </svg>
          <span className="pl-4 text-xl font-semibold text-white tracking-wide">
            Tabs
          </span>
        </div>
        <div>
          <button
            className="bg-bluish
                text-white text-md
            font-semibold rounded-md px-4 py-2
            tracking-wide hover:bg-blue-500"
            onClick={() => {
              setShowOptions(!showOptions);
            }}
          >
            New Tab
          </button>
        </div>
      </div>
      <div className="flex flex-col p-2 gap-1 overflow-hidden">
        {docs.map((tab, i) => {
          return (
            <TabScreenTab
              key={tab.docId}
              index={tab.index}
              text={tab.tabName}
              closeTab={() => closeTab(tab.docId, tab.index)}
              switchTab={() => switchTab(i, tab.docId)}
              id={tab.docId}
              awarenessBars={awarenessTabs}
            />
          );
        })}
      </div>
      {showOptions && (
        <div className="absolute top-32 inset-0 m-auto w-80 z-20">
          <Options />
        </div>
      )}
    </>
  );
};

export default TabScreen;
