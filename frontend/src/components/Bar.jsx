import { FaBars, FaEllipsisV, FaFileAlt, FaPlus } from "react-icons/fa";
import { useContext, useEffect, useRef, useState } from "react";
import SideModal from "./SideModal";
import Tab from "./Tab";
import Options from "./Options";
import * as Y from "yjs";
import { YjsContext } from "../context/YjsContext";
import { v4 as uuid } from "uuid";
import axiosUtil from "../services"
import { Socket } from "socket.io-client";
import { RoomContext } from "../context/RoomContext";
const Bar = ({ showModal, setShowModal, invite, username, room }) => {
  const [showOptions, setShowOptions] = useState(false);
  const {
    tabs,
    docsDiv,
    newDocTab,
    newCodeTab,
    docs,
    awareness,
    currentIndex,
    setDocs,
    setCurrentIndex,
    setEditorYtext,
  } = useContext(YjsContext);
  const [copyTabs, setCopyTabs] = useState(tabs);
  const {socket} = useContext(RoomContext)
  const [once, setOnce] = useState(false)
  const [awarenessTabs, setAwarenessTabs] = useState({})
  const optionRef = useRef();
  const color = getNameColorCode(username)
  const handleClick = () => {
    setShowModal(!showModal);
  };
  useEffect(() => {

    document.addEventListener("click", createNewTab);
    return () => {
      document.removeEventListener("click", createNewTab);
    };
  }, []);
  useEffect(() => {
    socket.on('get-active-tabs', ({activeTabs}) => {
      console.log("Active tabs",activeTabs);
      setAwarenessTabs(activeTabs)
    })

    socket.on('removal', ({username, color}) => {
      console.log("Remove this color of ", username, color)
      socket.emit('remove-color', { username, color, room})
    })
  }, [])

  const createNewTab = (event) => {
    event.stopPropagation();
    if (newCodeTab.current.contains(event.target)) {
      const id = uuid();
      const pressedButton = newCodeTab.current;
      const val = pressedButton.getAttribute("index");
      if (val === "code") {
        console.log("Code")
        const getTab = async () => {
          const response = await axiosUtil.getTabName(room)
          return response
        }
        // Create Y.Map
        const newMap = new Y.Map();
        // Put newDoc in Y.Map

        // create a new document
        const newDoc = new Y.Text();
        let tabValue
        getTab().then((data) => {
          tabValue = data.tabs[room].numOfTabs
          let name = `Code ${tabValue}`;
          newDoc.applyDelta([{ insert: `Code ${tabValue}` }]);
          newMap.set("newDoc", newDoc);
          // Set initial content with the headline being the index of the documentList
          newMap.set("docId", id);
          newMap.set("tabName", name);
          newMap.set("typeOftab", "code")
          setEditorYtext((prevText) => {
            return [...prevText, newDoc];
          });
          tabs.push([newMap]);
          if (once === false) {
            socket.emit("tab-change", {id, room, color})
          } else {
            socket.emit("tab-change", {id, room})

          }
          setOnce(true)
        })
      }
      setShowOptions(false);
    }
    if (newDocTab.current) {
      if (newDocTab.current.contains(event.target)) {
        const id = uuid();
        const pressedButton = newDocTab.current;
        const val = pressedButton.getAttribute("index");
        console.log("Val", val)
        if (val === "document") {
          const getTab = async () => {
            const response = await axiosUtil.getTabName(room)
            return response
          }
          // Create Y.Map
          const newMap = new Y.Map();
          // Put newDoc in Y.Map

          // create a new document
          const newDoc = new Y.Text();
          let tabValue
          getTab().then((data) => {
            tabValue = data.tabs[room].numOfTabs
            let name = `Document ${tabValue}`;
            newDoc.applyDelta([{ insert: `Document ${tabValue}` }]);
            newMap.set("newDoc", newDoc);
            // Set initial content with the headline being the index of the documentList
            newMap.set("docId", id);
            newMap.set("tabName", name);
            newMap.set("typeOftab", "document")
            setEditorYtext((prevText) => {
              return [...prevText, newDoc];
            });
            tabs.push([newMap]);
            if (once === false) {
              socket.emit("tab-change", {id, room, color})
            } else {
              socket.emit("tab-change", {id, room})

            }
            setOnce(true)
          })
        }
        setShowOptions(false);
      }
    }
  };

  const handleActive = (id) => {
    setTabs((prevState) => ({
      ...prevState,
      allTabs: prevState.allTabs.map((tab) => {
        if (tab.id === id) {
          if (tab.active) {
            return tab;
          } else {
            return { ...tab, active: true };
          }
        }
        return { ...tab, active: false };
      }),
    }));
  };
  const closeTab = (id, index) => {
    console.log("Deleting ", id, copyTabs.length);
    copyTabs.delete(index, 1);
    socket.emit('delete-tab', {room, id, color})
  };

  const openOptions = () => {
    setShowOptions(!showOptions);
  };
  function getNameColorCode(name) {
    let hashCode = 0;
    for (let i = 0; i < name.length; i++) {
      hashCode = name.charCodeAt(i) + ((hashCode << 5) - hashCode);
    }

    const colorCode = '#' + ((hashCode & 0x00FFFFFF) << 0).toString(16).padStart(6, '0');
    return colorCode;
  }
  const switchTab = (index, id) => {
    socket.emit("tab-change", {id, room, color, username})
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
              <div className="absolute mt-1 left-1 w-80 z-20">
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
        <div className="flex h-16 bg-[#353a41] p-2">
          <div className="flex w-3/4 lg:w-10/12 items-center gap-3 overflow-x-auto whitespace-nowrap">
          </div>
          <div className="flex justify-around w-1/4 lg:w-2/12">
            <button
              className="bg-bluish
                text-white text-md
            font-semibold rounded-md px-4
            tracking-wide hover:bg-blue-500"
              onClick={invite}
            >
              Invite Others
            </button>
            <button
              className="
                bg-blacklike
                border-2 border-red-600
                text-white rounded-full
                py-2 px-4 hover:bg-blackhover"
              onClick={handleClick}
            >
              {username[0].toUpperCase()}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Bar;
