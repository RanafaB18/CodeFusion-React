import Options from "../Options";
import { redirect } from "react-router-dom";
import Bar from "../Bar";
import SideBar from "../SideBar";
import { useEffect, useState, useRef, useContext } from "react";
import SideModal from "../SideModal";
import Modal from "../Modal";
import AnimatedModal from "../AnimatedModal";
import { YjsContext } from "../../context/YjsContext";
import React from "react";
import "react-quill/dist/quill.snow.css";
import CodeEditor from "../CodeEditor";
import { RoomContext } from "../../context/RoomContext";
import TextEditor from "../TextEditor";
import VideoSideBar from "../VideoSideBar";
import VideoGrid from "../VideoGrid";
import FloatingVideos from "../FloatingVideos";
import { ProviderContext } from "../../context/ProviderContext";
import { languageOptions } from "../../constants/langDropdown";

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
    docs,
    setDocs,
    username,
    showModal,
    setShowModal,
    showStream,
    stream,
    peers,
    editors,
    setEditors,
    editorYtext,
    setEditorYtext,
    currentIndex,
    setCurrentIndex,
    me
  } = useContext(RoomContext);
  const { tabs } = useContext(ProviderContext);
  const docsDiv = useRef();
  const [videoStructure, setVideoStructure] = useState(2);
  const [currentTab, setCurrentTab] = useState("");
  const [toggled, setToggled] = useState({ chatScreen: true, people: false });
  const [language, setLanguage] = useState(languageOptions[0]);

  const renderDocs = () => {
    const editorTextArray = [];
    setDocs(
      tabs.toArray().map((ymap) => {
        const docId = ymap.get("docId");
        let tabName = ymap.get("tabName");
        const typeOfTab = ymap.get("typeOftab");
        const newDoc = ymap.get("newDoc")
        editorTextArray.push(newDoc);
        return { docId, tabName, newDoc, typeOfTab };
      })
    );
    setEditorYtext(editorTextArray);
  };

  useEffect(() => {
    tabs.observeDeep(renderDocs);
  }, []);
  useEffect(() => {
    if (editorYtext.length > 0) {
      setCurrentTab(docs[currentIndex]?.typeOfTab);
      const quillEditors = docs.map((doc, index) => {
        return {
          tag:
            doc.typeOfTab === "document" ? (
              <TextEditor ytext={editorYtext[index]} username={username} />
            ) : (
              <CodeEditor ytext={editorYtext[index]} />
            ),
          id: doc.docId,
        };
      });
      setEditors(quillEditors);
    }
  }, [editorYtext]);

  useEffect(() => {
    if (chatOpen) {
      setShowModal((prevState) => !prevState);
    }
  }, [chatOpen]);
  const closeSideModal = () => {
    setShowModal((prevState) => !prevState);
  };
  const handleLeave = () => {
    sessionStorage.clear("user_room_name");
    socket.emit("leave-room", { room, username });
    return redirect("/");
  };
  return (
    <YjsContext.Provider
      value={{
        docsDiv,
        currentTab,
        setCurrentTab,
        invite,
        setVideoStructure,
        toggled,
        setToggled,
        language,
        setLanguage
      }}
    >
      <main className="flex flex-col w-full md:h-screen overflow-clip select-none">
        <>
          {/* <span className="text-white">
            Current Index: {currentIndex} id: {docs[currentIndex]?.id} name:{" "}
            {username} myID: {me.id} tab: {currentTab}
          </span> */}
          <Bar />
        </>

        {/* Hidden */}
        {/* <div className="flex flex-col relative w-full md:hidden">
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
        </div> */}

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
                    if (editor.id === docs[currentIndex]?.docId) {
                      return (
                        <div
                          key={editor.id}
                          className={`h-full transition-all ease-in ${
                            showModal === true || videoStructure === 1
                              ? "lg:w-[97%] md:w-[45vw]"
                              : ""
                          }  bg-[#eaedf0]`}
                        >
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
                  <div className="hidden lg:flex">
                    <VideoSideBar
                      peers={peers}
                      showStream={showStream}
                      stream={stream}
                      username={username}
                      location={"default"}
                    />
                  </div>
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
              {videoStructure === 3 && <div></div>}
            </div>
          </div>

          <div className={`hidden md:inline-block relative`}>
            <div
              className={`transition-all ease-in h-full ${
                showModal ? "mr-0" : "-mr-96"
              }`}
            >
              <SideModal
                participants={participants}
                closeSideModal={closeSideModal}
                username={username}
                peers={peers}
                showStream={showStream}
                stream={stream}
                location={"default"}
                videoStructureIndex={videoStructure}
              />
            </div>
          </div>
          <SideBar />
        </div>
        <Modal
          closeButtonRef={closeButtonRef}
          closeInvite={closeInvite}
          copyLink={copyLink}
          inviteModalRef={inviteModalRef}
          roomLink={roomLink}
          visible={visible}
        />
        {showClipBoardModal.show && <AnimatedModal />}
      </main>
    </YjsContext.Provider>
  );
};

export default DefaultScreen;
