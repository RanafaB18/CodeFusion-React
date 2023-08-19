import { FaBars, FaPlus } from "react-icons/fa";
import { useContext, useEffect, useRef, useState } from "react";
import Tab from "./Tab";
import Options from "./Options";
import { YjsContext } from "../context/YjsContext";
import { RoomContext } from "../context/RoomContext";
import LowerBar from "./LowerBar";
import { ProviderContext } from "../context/ProviderContext";
const Bar = () => {
  const { docsDiv, setCurrentTab } = useContext(YjsContext);
  const { color, tabs } = useContext(ProviderContext);
  const [copyTabs, setCopyTabs] = useState(tabs);
  const {
    socket,
    room,
    setDocs,
    docs,
    username,
    setShowOptions,
    currentIndex,
    setCurrentIndex,
    showOptions,
    awarenessTabs,
    setAwarenessTabs,
  } = useContext(RoomContext);
  const optionRef = useRef();


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

  const openOptions = () => {
    setShowOptions((prevState) => !prevState);
  };
  const switchTab = (index, id) => {
    socket.emit("tab-change", { id, room, color, username });
    setCurrentTab(docs[index].typeOfTab);
    setDocs((prevState) => {
      const currentTab = prevState[index];
      if (currentTab.docId === id) {
        setCurrentIndex(index);
      }
      return prevState;
    });
  };
  return (
    <>
      <div className="md:flex hidden flex-col relative w-full">
        <div className="text-white flex">
          <div className="relative">
            <button
              ref={optionRef}
              onClick={openOptions}
              className="px-4 py-2 border-r opacity-75"
            >
              <FaPlus className="" />
            </button>
            {showOptions && (
              <div className="absolute mt-1 left-1 w-80 z-30">
                <Options />
              </div>
            )}
          </div>
          <div
            ref={docsDiv}
            role="tabs"
            className="flex gap-1 items-center overflow-x-auto whitespace-nowrap w-full"
          >
            {docs.map((tab, i) => {
              return (
                <Tab
                  key={tab.docId}
                  index={tab.index}
                  text={tab.tabName}
                  closeTab={() => closeTab(tab.docId, i)}
                  switchTab={() => switchTab(i, tab.docId)}
                  active={currentIndex === tab.index}
                  name={username}
                  id={tab.docId}
                  awarenessBars={awarenessTabs}
                />
              );
            })}
          </div>
          <button className="px-4 border-l opacity-80">
            <FaBars />
          </button>
        </div>
        {docs[currentIndex]?.typeOfTab !== "document" && <LowerBar />}
      </div>
    </>
  );
};
export default Bar;
