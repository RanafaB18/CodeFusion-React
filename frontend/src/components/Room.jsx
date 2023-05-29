import { useEffect, useState, useRef, useContext } from "react";
import Options from "./Options";
import AnimatedModal from "./AnimatedModal";
import Modal from "./Modal";
import axiosUtil from "../services";
import BottomNavigationBar from "./BottomNavigationBar";
import PeopleScreen from "./screens/PeopleScreen";
import TabScreen from "./screens/TabScreen";
import DefaultScreen from "./screens/DefaultScreen";
import ChatScreen from "./screens/ChatScreen";
import { RoomContext } from "../context/RoomContext";
import UserJoinedModal from "./UserJoinedModal";
import VideoScreen from "./screens/VideoScreen";
import Toast from "./Toast";
import { redirect } from "react-router-dom";
import MessageToast from "./MessageToast";
import Tab from "./Tab";

const Room = ({ room, username, showStream }) => {
  // let roomLink;
  const [visible, setVisible] = useState(false);
  const [showClipBoardModal, setShowClipBoardModal] = useState(false);
  // const [showUserJoined, setUserJoined] = useState(false)
  const [roomLink, setRoomLink] = useState("");
  const [participants, setParticipants] = useState([]);
  const [screenIndex, setScreenIndex] = useState(2);
  const { socket, me, stream, peers } = useContext(RoomContext);
  const [toast, setToast] = useState({ name: "", text: "" });
  const [showToast, setShowToast] = useState(false);
  const [showMessageToast, setShowMessageToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [tabs, setTabs] = useState({allTabs: [], numOfDocuments: 0, numOfCodes: 0});
  const addTab = ({icon, text, id}) => {
    if (text.includes("Document")) {
      text += tabs.numOfDocuments + 1
    } else {
      text += tabs.numOfCodes + 1
    }
    // If allTabs is empty then the first tab will be active
    const newTab = {tab: <Tab icon={icon} text={text}/>, active: tabs.allTabs.length === 0 ? true : false, id}
    setTabs((prevState) => ({
      allTabs: prevState.allTabs.concat(newTab),
      numOfDocuments: prevState.numOfDocuments + (text.includes("Document") ? 1 : 0),
      numOfCodes: prevState.numOfCodes + (text.includes("Code") ? 1 : 0)
    }))
  }
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
      username: username,
      room: room,
      peerId: me._id,
      viewStream: showStream,
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
    console.log("Back button was clicked");
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
  const handleUsers = ({ room, participants }) => {
    console.log("Participants", participants);
    setParticipants(participants);
  };
  const notifyUsers = ({ username, participants, joinedStatus }) => {
    if (joinedStatus === "joined") {
      setToast({ name: username.toUpperCase(), text: "has joined" });
    } else {
      setToast({ name: username.toUpperCase(), text: "has left" });
    }
    console.log(`${username} has joined the chat`);
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
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* <span className="text-white text-lg text-center">{windowWidth}</span> */}
      <Toast toast={toast} showToast={showToast} />
      {screenIndex !== 0 && !showModal && (
        <MessageToast
          toast={toast}
          showMessageToast={showMessageToast}
          setScreenIndex={setScreenIndex}
        />
      )}
      <RoomContext.Provider value={{ room, socket, peers }}>
        {screenIndex !== 2 && (
          <div className="hidden md:block">
            <DefaultScreen
              participants={participants}
              invite={invite}
              username={username}
              room={room}
              chatOpen={screenIndex === 0}
              closeButtonRef={closeButtonRef}
              closeInvite={closeInvite}
              copyLink={copyLink}
              inviteModalRef={inviteModalRef}
              roomLink={roomLink}
              showClipBoardModal={showClipBoardModal}
              visible={visible}
              showModal={showModal}
              setShowModal={setShowModal}
              tabs={tabs}
              setTabs={setTabs}
              addTab={addTab}
            />
          </div>
        )}
        <div className="flex-1 relative">
          <div className="md:hidden">
            {screenIndex === 0 && <ChatScreen username={username} />}
          </div>
          <div className="md:hidden">
            {screenIndex === 1 && (
              <VideoScreen
                showStream={showStream}
                username={username}
                stream={stream}
                peers={peers}
              />
            )}
          </div>
          {screenIndex === 2 && (
            <DefaultScreen
              participants={participants}
              invite={invite}
              username={username}
              room={room}
              closeButtonRef={closeButtonRef}
              closeInvite={closeInvite}
              copyLink={copyLink}
              inviteModalRef={inviteModalRef}
              roomLink={roomLink}
              showClipBoardModal={showClipBoardModal}
              visible={visible}
              showModal={showModal}
              setShowModal={setShowModal}
              tabs={tabs}
              setTabs={setTabs}
              addTab={addTab}
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
