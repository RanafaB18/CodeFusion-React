import { useEffect, useState, useRef, useContext } from "react";
import BottomNavigationBar from "./BottomNavigationBar";
import PeopleScreen from "./screens/PeopleScreen";
import TabScreen from "./screens/TabScreen";
import DefaultScreen from "./screens/DefaultScreen";
import ChatScreen from "./screens/ChatScreen";
import { RoomContext } from "../context/RoomContext";
import Toast from "./Toast";
import MessageToast from "./MessageToast";
import VideoGrid from "./VideoGrid";
import HorizontalBar from "./HorizontalBar";
import { ProviderContext } from "../context/ProviderContext";
import { Item, Menu } from "react-contexify";
import { FaEdit, FaTrash } from "react-icons/fa";
import RenameModal from "./RenameModal";

const Room = ({
  room,
  username,
  showStream,
  isMuted,
  setIsMuted,
  setShowStream,
}) => {
  // let roomLink;
  const [visible, setVisible] = useState(false);
  const [showClipBoardModal, setShowClipBoardModal] = useState({ text:"Paste and send anywhere to invite others to join!", show: false});
  // const [showUserJoined, setUserJoined] = useState(false)
  const [roomLink, setRoomLink] = useState("");
  const [participants, setParticipants] = useState([]);
  const [screenIndex, setScreenIndex] = useState(2);
  const { socket, me, stream, peers } = useContext(RoomContext);
  const [toast, setToast] = useState({ name: "", text: "" });
  const [showToast, setShowToast] = useState(false);
  const [showMessageToast, setShowMessageToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { tabs } = useContext(ProviderContext);
  const [docs, setDocs] = useState(tabs.toJSON());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editors, setEditors] = useState([]);
  const [editorYtext, setEditorYtext] = useState([]);
  const [awarenessTabs, setAwarenessTabs] = useState({});
  const [codeText, setCodeText] = useState("")
  const [copy, setCopy] = useState(false)
  const [off, setOff] = useState({
    microphone: isMuted,
    video: !showStream,
    videoGrid: false,
    videoSidebar: false,
    videoFloat: true,
    noVideo: false,
  });
  const [showRenameModal, setShowRenameModal] = useState({
    visible: false,
    index: null,
  });

  useEffect(() => {
    const resize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", resize);

    if (windowWidth >= 768) {
      if (screenIndex === 0) {
        setScreenIndex(2);
        showScreen(2);
        setShowModal((prevState) => !prevState);
      }
    }
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [windowWidth]);
  useEffect(() => {
    // function windowUnload(event) {
    //   event.preventDefault()
    //   return (event.returnValue = "")
    // }
    setRoomLink(window.location.href);
    document.title = `${getRoomName(room)} | codefusion meeting`;

    socket.on("message", notifyUsers);
    socket.emit("user_joined", {
      username,
      room,
      peerId: me._id,
      viewStream: showStream,
      isMuted: isMuted,
    });
    socket.on("show-message-toast", handleMessageToast);
    socket.on("get-users", handleUsers);
    window.addEventListener("popstate", leaveRoomViaBackButton, { once: true });
    // window.addEventListener('beforeunload', windowUnload)
    return () => {
      socket.off("show-message-toast", handleMessageToast);
      socket.off("get-users", handleUsers);
      socket.off("message", notifyUsers);
      // window.removeEventListener('beforeunload', windowUnload)
      // window.removeEventListener('popstate', leaveRoomViaBackButton)
    };
  }, [room]);
  const handleMessageToast = (messageData) => {
    setShowMessageToast(true);
    const first = messageData.user.charAt(0).toUpperCase();
    const messageName = first + messageData.user.slice(1);
    setToast({ name: messageName, text: messageData.message });
    setTimeout(() => {
      setShowMessageToast(false);
    }, 4000);
  };
  const leaveRoomViaBackButton = (event) => {
    socket.emit("leave-room", {
      username: username,
      room: room,
      userId: me._id,
    });
  };
  const getRoomName = (roomString) => {
    const roomName = roomString.replace(/-(?:[^-]*)$/, "");
    return roomName;
  };
  const handleUsers = ({ participants }) => {
    setParticipants(participants);
  };
  const notifyUsers = ({ username, participants, joinedStatus }) => {
    if (joinedStatus === "joined") {
      setToast({ name: username.toUpperCase(), text: "has joined" });
    } else {
      setToast({ name: username.toUpperCase(), text: "has left" });
    }
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
    setParticipants(participants);
  };

  const inviteModalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const invite = () => {
    setVisible(true);
  };
  const closeInvite = (event) => {
    event.stopPropagation(); // Stops parent from running closeInvite
    if (
      event.target === event.currentTarget ||
      event.currentTarget.tagName === "BUTTON"
    ) {
      setVisible(false);
      // Comment the below line of code when implementing the "stop-animation-on-hover" thingie
      // setShowClipBoardModal(false);
    }
  };
  const copyLink = async () => {
    navigator.clipboard.writeText(roomLink).then(
      () => {
        setShowClipBoardModal({text:"Paste and send anywhere to invite others to join!", show:true});
        setTimeout(() => {
          setShowClipBoardModal({text:"Paste and send anywhere to invite others to join!", show:false});
          setVisible(false);
        }, 3000);
      },
      () => {
        console.log("Error copying to clipboard");
      }
    );
  };
  const showScreen = (index) => {
    setScreenIndex(index);
  };
  const renameHandler = ({ props }) => {
    const { index } = props;
    setShowRenameModal({ visible: true, index });
  };

  const deleteHandler = ({ props }) => {
    const { index, id } = props
    tabs.delete(index, 1);
    socket.emit("delete-tab", { room, id, color });
  }
  return (
    <div className="flex flex-col min-h-screen w-full relative bg-blackBackground">
      {/* <span className="text-white text-lg text-center">{windowWidth}</span> */}
      <Toast toast={toast} showToast={showToast} />
      {screenIndex !== 0 && !showModal && (
        <MessageToast
          toast={toast}
          showMessageToast={showMessageToast}
          setScreenIndex={setScreenIndex}
        />
      )}
      <RoomContext.Provider
        value={{
          me,
          room,
          socket,
          peers,
          username,
          docs,
          showModal,
          showStream,
          isMuted,
          stream,
          setShowStream,
          editors,
          awarenessTabs,
          off,
          setOff,
          setAwarenessTabs,
          setEditors,
          setCopy,
          copy,
          setCodeText,
          editorYtext,
          setEditorYtext,
          windowWidth,
          setIsMuted,
          currentIndex,
          setCurrentIndex,
          showOptions,
          setShowModal,
          setShowOptions,
          setDocs,
          invite,
          showRenameModal,
          setShowRenameModal,
          showClipBoardModal,
          setShowClipBoardModal,
          setVisible,
        }}
      >
        <Menu theme="dark" id={"menu"}>
          <Item onClick={renameHandler}>
            <div className="flex items-center gap-2">
              <FaEdit />
              <p>Rename</p>
            </div>
          </Item>
          <Item onClick={deleteHandler}>
            <div className="flex items-center gap-2">
              <FaTrash />
              <p>Delete</p>
            </div>
          </Item>
        </Menu>
        {showRenameModal.visible === true && <RenameModal />}
        {screenIndex !== 2 && (
          <div className="hidden md:block">
            <DefaultScreen
              participants={participants}
              chatOpen={screenIndex === 0}
              closeButtonRef={closeButtonRef}
              closeInvite={closeInvite}
              copyLink={copyLink}
              inviteModalRef={inviteModalRef}
              roomLink={roomLink}
              showClipBoardModal={showClipBoardModal}
              visible={visible}
            />
          </div>
        )}
        <div className="flex flex-1 relative overflow-auto">
          <div className="md:hidden">
            {screenIndex === 0 && <ChatScreen username={username} />}
          </div>
          <div className="md:hidden">
            {screenIndex === 1 && (
              <VideoGrid
                peers={peers}
                showStream={showStream}
                stream={stream}
                username={username}
                location={"default"}
              />
            )}
          </div>
          {screenIndex === 2 && (
            <DefaultScreen
              participants={participants}
              closeButtonRef={closeButtonRef}
              closeInvite={closeInvite}
              copyLink={copyLink}
              inviteModalRef={inviteModalRef}
              roomLink={roomLink}
              showClipBoardModal={showClipBoardModal}
              visible={visible}
            />
          )}
          <div className="md:hidden">
            {screenIndex === 3 && (
              <PeopleScreen
                participants={participants}
                invite={invite}
                closeButtonRef={closeButtonRef}
                closeInvite={closeInvite}
                copyLink={copyLink}
                inviteModalRef={inviteModalRef}
                roomLink={roomLink}
                visible={visible}
                showClipBoardModal={showClipBoardModal}
              />
            )}
          </div>
          <div className="md:hidden">{screenIndex === 4 && <TabScreen />}</div>
        </div>
      </RoomContext.Provider>
      {screenIndex === 1 && (
        <HorizontalBar
          setIsMuted={setIsMuted}
          setShowStream={setShowStream}
          showStream={showStream}
          isMuted={isMuted}
          me={me}
          room={room}
          socket={socket}
          off={off}
          setOff={setOff}
        />
      )}
      <div className="relative h-16 md:hidden">
        <BottomNavigationBar
          showScreen={showScreen}
          screenIndex={screenIndex}
          setScreenIndex={setScreenIndex}
        />
        {/* {showUserJoined && (<UserJoinedModal newUser={newUser} />)} */}
      </div>
    </div>
  );
};

export default Room;
