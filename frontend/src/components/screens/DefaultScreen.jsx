import { FaEllipsisV } from "react-icons/fa";
import Options from "../Options";
import { Link, redirect } from "react-router-dom";
import Bar from "../Bar";
import SideBar from "../SideBar";
import { useEffect, useState, useRef, useContext } from "react";
import SideModal from "../SideModal";
import Modal from "../Modal";
import AnimatedModal from "../AnimatedModal";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { YjsContext } from "../../context/YjsContext";
import "react-quill/dist/quill.snow.css";
import React from "react";
import CodeEditor from "../CodeEditor";
import { RoomContext } from "../../context/RoomContext";
import TextEditor from "../TextEditor";
import VideoScreen from "./VideoScreen";
import VideoSideBar from "../VideoSideBar";
import VideoGrid from "../VideoGrid";
import FloatingVideos from "../FloatingVideos";
const DefaultScreen = ({
  participants,
  chatOpen,
  visible,
  roomLink,
  closeInvite,
  inviteModalRef,
  closeButtonRef,
  copyLink,
  showClipBoardModal,
}) => {
  const {
    invite,
    room,
    username,
    showModal,
    setShowModal,
    showStream,
    stream,
    peers,
    me
  } = useContext(RoomContext);
  const ydoc = new Y.Doc();
  const provider = new WebrtcProvider(room, ydoc, { signaling: "wss://demos.yjs.dev" });
  const awareness = provider.awareness;
  const docsDiv = useRef();
  const newDocTab = useRef();
  const newCodeTab = useRef();
  const tabs = ydoc.getArray("tabs");
  const [docs, setDocs] = useState([]);
  let quill = null;
  let binding = null;
  const [editors, setEditors] = useState([]);
  const [editorYtext, setEditorYtext] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoStructure, setVideoStructure] = useState(2);

  const renderDocs = () => {
    // render documents to an HTML string (e.g. '<input type button index="0" value="Document 0" /><input ...')
    // insert the list of all docs. But the first one is a "create new document" button
    const editorTextArray = [];
    setDocs(
      tabs.toArray().map((ymap, index) => {
        const id = ymap.get("docId");
        let tabName = ymap.get("tabName");
        const typeOfTab = ymap.get("typeOftab");
        editorTextArray.push(ymap.get("newDoc"));
        return { id, index, text: tabName, typeOfTab };
      })
    );
    setEditorYtext(editorTextArray);
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
    tabs.observe(renderDocs);
  }, []);
  useEffect(() => {
    if (editorYtext.length > 0) {
      const quillEditors = docs.map((doc) => {
        return {
          tag:
            doc.typeOfTab === "document" ? (
              <TextEditor ytext={editorYtext[doc.index]} />
            ) : (
              <CodeEditor ytext={editorYtext[doc.index]} />
            ),
          id: doc.id,
          index: doc.index,
        };
      });
      setEditors(quillEditors);
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
        invite,
        setDocs,
        setEditorYtext,
        setCurrentIndex,
        setVideoStructure,
      }}
    >
      <main className="flex flex-col md:h-screen overflow-clip select-none">
        <div className="h-90">
          <span className="text-white">
            Current Index: {currentIndex} id: {docs[currentIndex]?.id} name:{" "}
            {username} myID: {me.id}
          </span>
          <Bar setShowModal={setShowModal} showModal={showModal} />
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

        <div className="flex h-full overflow-clip">
          <div className="flex flex-col flex-1">
            {videoStructure !== 0 && (
              <div id="screen" className="h-full">
                {docs.length === 0 ? (
                  <div className="max-w-sm mx-auto py-12">
                    <Options />
                  </div>
                ) : (
                  editors.map((editor) => {
                    if (editor.id === docs[currentIndex]?.id) {
                      return (
                        <div key={editor.id} className="h-full">
                          {editor.tag}
                        </div>
                      );
                    }
                  })
                )}
              </div>
            )}
            {videoStructure === 0 && (
              <div className="overflow-auto m-2">
                <VideoGrid
                  peers={peers}
                  showStream={showStream}
                  stream={stream}
                  username={username}
                  location={"default"}
                />
              </div>
            )}
          </div>
          <div className="relative">
            <div className="rounded inline-block">
              {
                /* 1 === video sidebar */
                videoStructure === 1 && (
                  <VideoSideBar
                    peers={peers}
                    showStream={showStream}
                    stream={stream}
                    username={username}
                    location={"default"}
                  />
                )
              }
              {videoStructure === 2 && (
                <div className="absolute top-0 right-0">
                  <FloatingVideos
                    peers={peers}
                    showStream={showStream}
                    stream={stream}
                    username={username}
                    location={"default"}
                  />
                </div>
              )}
            </div>
          </div>

          <div className={`hidden md:block relative`}>
            <div
              className={`transition-all ease-in h-full ${
                showModal ? "mr-0" : "-mr-96"
              }`}
            >
              <SideModal
                participants={participants}
                closeSideModal={closeSideModal}
                username={username}
              />
            </div>
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
