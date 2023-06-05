import { FaEllipsisV } from "react-icons/fa";
import Options from "../Options";
import { Link, redirect } from "react-router-dom";
import Bar from "../Bar";
import SideBar from "../SideBar";
import { useEffect, useState, useRef } from "react";
import SideModal from "../SideModal";
import Modal from "../Modal";
import AnimatedModal from "../AnimatedModal";
import Editors from "../Editors";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { QuillBinding } from "y-quill";
import Quill from "quill";
import QuillCursors from "quill-cursors";
import { YjsContext } from "../../context/YjsContext";
import Tab from "../Tab";
import { v4 as uuid } from "uuid"
const DefaultScreen = ({
  username,
  room,
  participants,
  invite,
  chatOpen,
  visible,
  roomLink,
  closeInvite,
  inviteModalRef,
  closeButtonRef,
  copyLink,
  showClipBoardModal,
  showModal,
  setShowModal,
}) => {
  Quill.register("modules/cursors", QuillCursors);

  const ydoc = new Y.Doc();
  const provider = new WebrtcProvider(room, ydoc);
  const awareness = provider.awareness;
  const docsDiv = useRef();
  const newDocTab = useRef();
  const tabs = ydoc.getArray("tabs");
  const [docs, setDocs] = useState([])
  let quill = null;
  let binding = null;
  const bindEditor = (ytext) => {
    if (binding) {
      // We can reuse the existing editor. But we need to remove all event handlers
      // that we registered for collaborative editing before binding to a new editor binding
      binding.destroy();
    }
    if (quill === null) {
      // This is the first time a user opens a document.
      // The editor has not been initialized yet.
      // Create an editor instance.
      quill = new Quill(document.querySelector("#editor"), {
        modules: {
          cursors: true,
          toolbar: [
            // adding some basic Quill content features
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            ["image", "code-block"],
          ],
          history: {
            // Local undo shouldn't undo changes
            // from remote users
            userOnly: true,
          },
        },
        placeholder: "Start collaborating...",
        theme: "snow",
        // 'bubble' is also great,
      });
    }
    // "Bind" the quill editor to a Yjs text type.
    // The QuillBinding uses the awareness instance to propagate your cursor location.
    console.log("binder ytext", ytext);
    binding = new QuillBinding(ytext, quill, awareness);
  };
  const renderDocs = () => {
    console.log("Executed RenderDocs");
    // render documents to an HTML string (e.g. '<input type button index="0" value="Document 0" /><input ...')
    // insert the list of all docs. But the first one is a "create new document" button
    setDocs(tabs
      .toArray()
      .map(
        (ytext, i) => {
          const id = uuid()
          console.log("Ytext id", ytext)
          return ({id, index: i, text: `Document ${i}`})
        }
    ))

    // insert the list of all docs. But the first one is a "create new document" button
    // docsDiv.current.innerHTML = docs;
    if (tabs.length === 0) {
      // A user deleted all documents. Clear the editor content & binding.
      if (binding) {
        binding.destroy();
      }
      if (quill) {
        quill.setContents("");
      }
    }
  };
  useEffect(() => {
    renderDocs();
  }, []);

  tabs.observe(renderDocs);

  useEffect(() => {
    if (chatOpen) {
      setShowModal(true);
    }
  }, [chatOpen]);

  const closeSideModal = () => {
    setShowModal(false);
  };
  const handleLeave = () => {
    sessionStorage.clear("user_room_name");
    socket.emit("leave-room", { room, username });
    return redirect("/");
  };
  return (
    <YjsContext.Provider value={{ tabs, docsDiv, bindEditor, Y, newDocTab, docs, setDocs}}>
      <main className="flex flex-col md:h-screen">
        <div className="h-90">
          <Bar
            participants={participants}
            setShowModal={setShowModal}
            showModal={showModal}
            invite={invite}
            username={username}
          />
        </div>

        {/* Hidden */}
        <div className="flex flex-col relative w-full md:hidden">
          <div className="flex justify-between h-14 bg-blackhover">
            <Link
              to={"/"}
              className="bg-red-500
                text-white text-md
            font-semibold rounded-md px-4 py-2
            tracking-wide hover:bg-blue-500 m-2"
              onClick={handleLeave}
            >
              Leave
            </Link>
            <div className="bg-white h-14 w-16 float-right bg-opacity-20 flex justify-center items-center">
              <FaEllipsisV className="text-white text-lg cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="flex h-full">
          <div id="editor" className="flex-1 overflow-auto">
            {tabs.length === 0 ? (
              <div className="max-w-sm mx-auto py-12">
                <Options />
              </div>
            ) : (
              <div></div>
            )}
          </div>

          <div className={`hidden md:block`}>
            {showModal && (
              <SideModal
                participants={participants}
                closeSideModal={closeSideModal}
                username={username}
              />
            )}
          </div>
          <SideBar setShowModal={setShowModal} showModal={showModal} />
        </div>
        <Modal
          closeButtonRef={closeButtonRef}
          closeInvite={closeInvite}
          copyLink={copyLink}
          inviteModalRef={inviteModalRef}
          roomLink={roomLink}
          visible={visible}
        />
        {showClipBoardModal && <AnimatedModal />}
      </main>
    </YjsContext.Provider>
  );
};

export default DefaultScreen;
