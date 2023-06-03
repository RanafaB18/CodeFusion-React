import { FaBars, FaEllipsisV, FaFileAlt, FaPlus } from "react-icons/fa";
import { useContext, useEffect, useRef, useState } from "react";
import SideModal from "./SideModal";
import Tab from "./Tab";
import Options from "./Options";
import * as Y from "yjs";
import { YjsContext } from "../context/YjsContext";
import { v4 as uuid } from "uuid";

const Bar = ({ participants, showModal, setShowModal, invite, username }) => {
  const [showOptions, setShowOptions] = useState(false);
  const { tabs, docsDiv, bindEditor, newDocTab, addTab } =
    useContext(YjsContext);
  const optionRef = useRef();
  const handleClick = () => {
    setShowModal(!showModal);
  };
  console.log("doscdiv bar", docsDiv);
  useEffect(() => {
    const switchTab = (event) => {
      const pressedButton = event.target;
      const val = pressedButton.getAttribute("index");
      console.log("Val", val, pressedButton, newDocTab.current);
      // The index is a number, render the $i-th document
      const index = Number.parseInt(val);
      bindEditor(tabs.get(index));
    };
    const createNewTab = (event) => {
      event.stopPropagation();
      if (newDocTab.current) {
        if (newDocTab.current.contains(event.target)) {
          const id = uuid();

          console.log("Clicked");
          const pressedButton = newDocTab.current;
          const val = pressedButton.getAttribute("index");
          console.log("Val", val, pressedButton, newDocTab.current);
          if (val === "new") {
            // create a new document
            const newDoc = new Y.Text();
            // Set initial content with the headline being the index of the documentList

            newDoc.applyDelta([
              { insert: `Document #${tabs.length}` },
              { insert: "\n", attributes: { header: 1 } },
              { insert: "\n" },
            ]);
            console.log("New Doc", newDoc);
            tabs.push([
              {text: `Document ${tabs.length + 1}`, id },
            ]);
            bindEditor(newDoc);
          }
          console.log("Bar Tabs", tabs);
        }
      }
    };
    document.addEventListener("click", createNewTab);
    // docsDiv.current.addEventListener("click", switchTab);
    return () => {
      document.removeEventListener("click", createNewTab);
      // docsDiv.current.removeEventListener("click", switchTab);
    };
  }, []);

  useEffect(() => {
    const closeOptions = (event) => {
      if (!optionRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("click", closeOptions);
    return () => {
      document.removeEventListener("click", closeOptions);
    };
  }, []);

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
  const closeTab = (id, text) => {};
  const openOptions = () => {
    console.log("Opens Options");
    setShowOptions(!showOptions);
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
            role="tabs"
            className="flex gap-1 items-center overflow-x-auto whitespace-nowrap w-full"
          >
            {docsDiv.map((tab) => (
              <Tab key={tab.id} text={tab.text} />
            ))}
          </div>
          <button className="px-4 border-l opacity-80">
            <FaBars />
          </button>
        </div>
        <div className="flex h-16 bg-[#353a41] p-2">
          <div
            role="tools"
            className="flex w-3/4 lg:w-10/12 items-center gap-3 overflow-x-auto whitespace-nowrap"
          ></div>
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
