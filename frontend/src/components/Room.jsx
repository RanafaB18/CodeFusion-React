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

const Room = ({ room, username, showStream }) => {
  // let roomLink;
  const [visible, setVisible] = useState(false);
  const [showClipBoardModal, setShowClipBoardModal] = useState(false);
  // const [showUserJoined, setUserJoined] = useState(false)
  const [roomLink, setRoomLink] = useState("");
  const [participants, setParticipants] = useState([]);
  const [screenIndex, setScreenIndex] = useState(2);
  const { socket, me, stream, peers } = useContext(RoomContext);
  const [toast, setToast] = useState({name: "", text: ""});
  const [showToast, setShowToast] = useState(false);

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
    socket.on("get-users", handleUsers);

    // socket.on("left-room", handleUsers);

    return () => {
      // socket.off("get-users", handleUsers);
      socket.off("message", notifyUsers);
      // socket.off("left-room", handleUsers);
    };
  }, [room]);
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
      setToast({name: username.toUpperCase(), text: "has joined"});
    } else {
      setToast({name: username.toUpperCase(), text: "has left"});
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
    const permission = await navigator.permissions.query({
      name: "clipboard-write",
    });
    if (permission.state === "granted" || permission.state === "prompt") {
      navigator.clipboard.writeText(roomLink).then(
        () => {
          setShowClipBoardModal(true);
          setTimeout(() => {
            setShowClipBoardModal(false);
            setVisible(false)
          }, 3000);
        },
        () => {
          console.log("Permission errors, Mozilla");
        }
      );
    }
  };
  const showScreen = (index) => {
    setScreenIndex(index);
  };
  return (
    <div className="flex flex-col min-h-screen relative">
      <Toast toast={toast} showToast={showToast}/>
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
        <BottomNavigationBar showScreen={showScreen} />
        {/* {showUserJoined && (<UserJoinedModal newUser={newUser} />)} */}
      </div>
    </div>
  );
};

export default Room;
