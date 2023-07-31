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
  const [showClipBoardModal, setShowClipBoardModal] = useState(false);
  // const [showUserJoined, setUserJoined] = useState(false)
  const newDocTab = useRef();
  const newCodeTab = useRef();
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
  const [docs, setDocs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editors, setEditors] = useState([]);
  const [editorYtext, setEditorYtext] = useState([]);
  const [awarenessTabs, setAwarenessTabs] = useState({});


  useEffect(() => {
    const resize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", resize);

    if (windowWidth >= 768) {
      if (screenIndex === 0) {
        setScreenIndex(2);
        showScreen(2);
      }
    }
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [windowWidth]);
  useEffect(() => {
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

    return () => {
      socket.off("show-message-toast", handleMessageToast);
      socket.off("get-users", handleUsers);
      socket.off("message", notifyUsers);
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
        setShowClipBoardModal(true);
        setTimeout(() => {
          setShowClipBoardModal(false);
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
  console.log("Screen Index", screenIndex)
  return (
    <div className="flex flex-col min-h-screen relative bg-blackBackground">
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
          newDocTab,
          newCodeTab,
          setShowStream,
          editors,
          awarenessTabs,
          setAwarenessTabs,
          setEditors,
          editorYtext,
          setEditorYtext,
          setIsMuted,
          currentIndex,
          setCurrentIndex,
          showOptions,
          setShowModal,
          setShowOptions,
          setDocs,
          invite,
        }}
      >
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
        <div className="flex-1 relative">
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
