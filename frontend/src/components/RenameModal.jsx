import { useContext, useEffect, useRef, useState } from "react";
import { ProviderContext } from "../context/ProviderContext";
import { RoomContext } from "../context/RoomContext";

const RenameModal = () => {
  const [tabname, setTabname] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const { setShowRenameModal } = useContext(RoomContext);
  const { tabs } = useContext(ProviderContext);
  const modalRef = useRef();

  useEffect(() => {
    function outerClickEvent(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowRenameModal({ visible: false, index: null });
      }
    }
    document.addEventListener("click", outerClickEvent);
    return () => {
      document.removeEventListener("click", outerClickEvent);
    };
  }, []);
  const renameHandler = () => {
    if (!/\S/.test(tabname)) {
      setShowWarning(true);
      setTimeout(() => {
        setShowWarning(false);
      }, 1500);
      return;
    }
    setShowRenameModal((prevState) => {
      const { index } = prevState;
      const tabToUpdate = tabs.get(index);
      tabToUpdate.set("tabName", tabname);
      return {
        visible: false,
        index: null,
      };
    });
  };
  return (
    <div
      ref={modalRef}
      className="flex flex-col gap-1 max-w-sm h-24 justify-around items-center absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 p-3 bg-[#353a41] rounded"
    >
      <input
        type="text"
        placeholder="Enter name for the tab"
        className={`p-1 ${
          showWarning === true && "outline outline-red-500"
        } rounded focus:outline-none`}
        value={tabname}
        onChange={(e) => setTabname(e.target.value)}
      />
      <button
        className="rounded transition-all duration-200 px-4"
        onClick={renameHandler}
      >
        <span className="text-white hover:border">Rename</span>
      </button>
    </div>
  );
};

export default RenameModal;
