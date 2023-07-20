import { FaEllipsisV } from "react-icons/fa";
import Options from "../Options";
import { Link, redirect } from "react-router-dom";
import Bar from "../Bar";
import SideBar from "../SideBar";
import { useEffect, useState, useRef } from "react";
import SideModal from "../SideModal";
import Modal from "../Modal";
import AnimatedModal from "../AnimatedModal";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { YjsContext } from "../../context/YjsContext";
import "react-quill/dist/quill.snow.css";
import React from "react";
import QuillEditor from "../QuillEditor";
import { Quill } from "react-quill";
import QuillCursors from "quill-cursors";
import CodeEditor from "../CodeEditor";
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
  // Add sizes to whitelist and register them
  // const Size = Quill.import("formats/size");
  // Size.whitelist = ["extra-small", "small", "medium", "large"];
  // Quill.register(Size, true);

  // Add fonts to whitelist and register them
  // const Font = Quill.import("formats/font");
  // Font.whitelist = [
  //   "arial",
  //   "comic-sans",
  //   "courier-new",
  //   "georgia",
  //   "helvetica",
  //   "lucida",
  // ];
  // Quill.register(Font, true);

  const ydoc = new Y.Doc();
  const provider = new WebrtcProvider(room, ydoc);
  const awareness = provider.awareness;
  const docsDiv = useRef();
  const newDocTab = useRef();
  const newCodeTab = useRef()
  const tabs = ydoc.getArray("tabs");
  const [docs, setDocs] = useState([]);
  let quill = null;
  let binding = null;
  const [editors, setEditors] = useState([]);
  const [editorYtext, setEditorYtext] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderDocs = () => {
    console.log("Executed RenderDocs");
    // render documents to an HTML string (e.g. '<input type button index="0" value="Document 0" /><input ...')
    // insert the list of all docs. But the first one is a "create new document" button
    const editorTextArray = []
    setDocs(
      tabs.toArray().map((ymap, index) => {
        const id = ymap.get("docId");
        let tabName = ymap.get("tabName");
        const typeOfTab = ymap.get("typeOftab")
        editorTextArray.push(ymap.get("newDoc"))
        console.log("Tab list", tabs.toJSON());
        return { id, index, text: tabName, typeOfTab };
      })
    );
    setEditorYtext(editorTextArray)
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
    // renderDocs();
    tabs.observe(renderDocs);
  }, []);
  useEffect(() => {
    console.log("Editor ytext", editorYtext);
    // if (docs.length > 0) {
    //   console.log("Oh yh its here")
    // }
    console.log("Docs here", docs)
    if (editorYtext.length > 0) {
      const quillEditors = docs.map((doc) => {
        return (
          {
            tag: doc.typeOfTab === "document" ? <QuillEditor ytext={editorYtext[doc.index]} /> : <CodeEditor  ytext={editorYtext[doc.index]} />,
            id: doc.id,
            index: doc.index
          }
        )
      })
      setEditors(quillEditors)
    }
  }, [editorYtext]);

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
  console.log("CurrentIndex", currentIndex, "Editors", editors, editors[currentIndex]);
  return (
    <YjsContext.Provider
      value={{
        tabs,
        docsDiv,
        newDocTab,
        newCodeTab,
        docs,
        awareness,
        currentIndex,
        setDocs,
        setEditorYtext,
        setCurrentIndex,
      }}
    >
      <main className="flex flex-col md:h-screen">
        <div className="h-90">
          <span className="text-white">
            Current Index: {currentIndex} id: {docs[currentIndex]?.id} name: {username}
          </span>
          <Bar
            setShowModal={setShowModal}
            showModal={showModal}
            invite={invite}
            username={username}
            room={room}
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
          <div className="flex flex-col flex-1 overflow-auto">
            <div>
              {/* (

              ) */}

              {/* <Editors ref={quillRef} /> */}
              {docs.length === 0 ? (
                <div className="max-w-sm mx-auto py-12">
                  <Options />
                </div>
              ) : (
                editors.map((editor) => {
                  console.log("Editor", editor)
                  if (editor.id === docs[currentIndex]?.id) {
                    return (<div key={editor.id}>{editor.tag}</div>)
                  }
                })
              )
              }
            </div>
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
