import { FaBars, FaEllipsisV, FaFileAlt, FaPlus } from "react-icons/fa";
import { useContext, useEffect, useRef, useState } from "react";
import SideModal from "./SideModal";
import Tab from "./Tab";
import Options from "./Options";
import * as Y from "yjs";
import { YjsContext } from "../context/YjsContext";
import { v4 as uuid } from "uuid";
import QuillToolbar from "./QuillToolbar";

const Bar = ({ participants, showModal, setShowModal, invite, username }) => {
  // const toolBarId = uuid()
  const [showOptions, setShowOptions] = useState(false);
  const { tabs, docsDiv, bindEditor, newDocTab, docs, setDocs } =
    useContext(YjsContext);
  const [copyTabs, setCopyTabs] = useState(tabs);
  const optionRef = useRef();
  const handleClick = () => {
    setShowModal(!showModal);
  };
  useEffect(() => {
    // const switchTab = (event) => {
    //   const pressedButton = event.target;
    //   const val = pressedButton.getAttribute("index");
    //   console.log("Val", val, pressedButton, newDocTab.current);
    //   // The index is a number, render the $i-th document
    //   const index = Number.parseInt(val);
    //   console.log("Index", index)
    //   // bindEditor(tabs.get(index));
    // };

    document.addEventListener("click", createNewTab);
    // docsDiv.current.addEventListener("click", switchTab);
    return () => {
      document.removeEventListener("click", createNewTab);
      // docsDiv.current.removeEventListener("click", switchTab);
    };
  }, []);
  const createNewTab = (event) => {
    event.stopPropagation();
    if (newDocTab.current) {
      if (newDocTab.current.contains(event.target)) {
        const id = uuid();

        console.log("Clicked");
        const pressedButton = newDocTab.current;
        const val = pressedButton.getAttribute("index");
        if (val === "new") {
          // Create Y.Map
          const newMap = new Y.Map();
          // Put newDoc in Y.Map

          // create a new document
          const newDoc = new Y.Text();
          const number = new Y.Array();
          let name = `Document ${id.substring(0,2)}`;
          number.push([name]);

          newMap.set("newDoc", newDoc);
          // Set initial content with the headline being the index of the documentList
          newMap.set("docId", id);
          newMap.set("tabName", name);
          console.log("All tabs", number);

          newDoc.applyDelta([
            { insert: `Document ${tabs.length}` },
          ]);
          tabs.push([newMap]);
          bindEditor(newMap);
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
    // setDocs((prevTabs) => {
    //   if (prevTabs)
    // })
    // console.log(index, "removed")
    // copyTabs.delete(index, 1);
    console.log("Close", id, "at index", index);
    console.log(docs);
    copyTabs.delete(index, 1);
  };
  const openOptions = () => {
    setShowOptions(!showOptions);
  };
  const switchTab = (index, id) => {
    console.log("My id", id, "index", index, copyTabs.toJSON());
    setDocs((prevState) => {
      const currentTab = prevState[index];
      if (currentTab.id === id) {
        console.log("Switching", copyTabs.toJSON());
        bindEditor(copyTabs.get(index));
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
            {/* {docsDiv.map((tab, i) => (
              <Tab key={tab.id} text={tab.text} closeTab={() => closeTab(i)}/>
            ))} */}
            {docs.map((tab, i) => {
              console.log("Tab", tab);
              return (
                <Tab
                  key={tab.id}
                  index={tab.index}
                  text={tab.text}
                  closeTab={() => closeTab(tab.id, tab.index)}
                  switchTab={() => switchTab(i, tab.id)}
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
            {/* <QuillToolbar id={toolBarId}/> */}
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
        {/* <Editors room={room} /> */}
        {/* {showModal && (
          <SideModal
            participants={participants}
            closeSideModal={closeSideModal}
          />
        )} */}
      </div>
      {/* <div className="md:flex hidden flex-col relative w-full  md:visible">
      <div className="h-14 bg-blackhover">
        <div className="
        bg-white h-14 w-16 float-right
        bg-opacity-20 flex justify-center items-center">
          <FaEllipsisV className="text-white text-lg cursor-pointer"/>
        </div>
      </div>
    </div> */}
    </>
  );
};
export default Bar;
