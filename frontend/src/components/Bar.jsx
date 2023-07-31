import { FaBars, FaEllipsisV, FaFileAlt, FaPlus } from "react-icons/fa";
import { useContext, useEffect, useRef, useState } from "react";
import Tab from "./Tab";
import Options from "./Options";
import * as Y from "yjs";
import { YjsContext } from "../context/YjsContext";
import { v4 as uuid } from "uuid";
import axiosUtil from "../services";
import { RoomContext } from "../context/RoomContext";
import LowerBar from "./LowerBar";
import { ProviderContext } from "../context/ProviderContext";
const Bar = () => {
  const {
    tabs,
    docsDiv,
    setCurrentTab,
    setEditorYtext,
  } = useContext(YjsContext);
  const [copyTabs, setCopyTabs] = useState(tabs);
  const {
    socket,
    room,
    setDocs,
    docs,
    username,
    newDocTab,
    newCodeTab,
    setShowOptions,
    currentIndex,
    setCurrentIndex,
    showOptions,
    awarenessTabs,
    setAwarenessTabs
  } = useContext(RoomContext);
  const [once, setOnce] = useState(false);
  const optionRef = useRef();
  const { color } = useContext(ProviderContext)


  useEffect(() => {
    document.addEventListener("click", createNewTab);
    return () => {
      document.removeEventListener("click", createNewTab);
    };
  }, []);
  useEffect(() => {
    socket.on("get-active-tabs", ({ activeTabs }) => {
      console.log("Active tabs", activeTabs);
      setAwarenessTabs(activeTabs);
    });

    socket.on("removal", ({ username, color }) => {
      console.log("Remove this color of ", username, color);
      socket.emit("remove-color", { username, color, room });
    });
  }, []);

  const createNewTab = (event) => {
    event.stopPropagation();
    if (newCodeTab.current) {
      if (newCodeTab.current.contains(event.target)) {
        const id = uuid();
        const pressedButton = newCodeTab.current;
        const val = pressedButton.getAttribute("index");
        if (val === "code") {
          console.log("Code");
          const getTab = async () => {
            const response = await axiosUtil.getTabName(room);
            return response;
          };
          // Create Y.Map
          const newMap = new Y.Map();
          // Put newDoc in Y.Map

          // create a new document
          const newDoc = new Y.Text();
          let tabValue;
          getTab().then((data) => {
            tabValue = data.tabs[room].numOfTabs;
            let name = `Code ${tabValue}`;
            newDoc.applyDelta([{ insert: `Code ${tabValue}` }]);
            newMap.set("newDoc", newDoc);
            // Set initial content with the headline being the index of the documentList
            newMap.set("docId", id);
            newMap.set("tabName", name);
            newMap.set("typeOftab", "code");
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
        }
        setShowOptions(false);
      }
    }
    if (newDocTab.current) {
      if (newDocTab.current.contains(event.target)) {
        const id = uuid();
        const pressedButton = newDocTab.current;
        const val = pressedButton.getAttribute("index");
        console.log("Val", val);
        if (val === "document") {
          const getTab = async () => {
            const response = await axiosUtil.getTabName(room);
            return response;
          };
          // Create Y.Map
          const newMap = new Y.Map();
          // Put newDoc in Y.Map

          // create a new document
          const newDoc = new Y.Text();
          let tabValue;
          getTab().then((data) => {
            tabValue = data.tabs[room].numOfTabs;
            let name = `Document ${tabValue}`;
            newDoc.applyDelta([{ insert: `Document ${tabValue}` }]);
            newMap.set("newDoc", newDoc);
            // Set initial content with the headline being the index of the documentList
            newMap.set("docId", id);
            newMap.set("tabName", name);
            newMap.set("typeOftab", "document");
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
        }
        setShowOptions(false);
      }
    }
  };

  const closeTab = (id, index) => {
    console.log("Deleting ", id, copyTabs.length);
    copyTabs.delete(index, 1);
    socket.emit("delete-tab", { room, id, color });
  };

  const openOptions = () => {
    setShowOptions((prevState) => !prevState);
  };
  const switchTab = (index, id) => {
    socket.emit("tab-change", { id, room, color, username });
    setDocs((prevState) => {
      const currentTab = prevState[index];
      setCurrentTab(prevState[index].typeOfTab)
      if (currentTab.id === id) {
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
                  key={tab.id}
                  index={tab.index}
                  text={tab.text}
                  closeTab={() => closeTab(tab.id, tab.index)}
                  switchTab={() => switchTab(i, tab.id)}
                  active={currentIndex === tab.index}
                  name={username}
                  id={tab.id}
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
