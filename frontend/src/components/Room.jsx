import { useEffect, useState, useRef } from "react";
import Options from "./Options";
import AnimatedModal from "./AnimatedModal";
import Modal from "./Modal";
import Bar from "./Bar";
import { socket } from "..";
import axiosUtil from "../services";
import BottomNavigationBar from "./BottomNavigationBar";
import PeopleScreen from "./screens/PeopleScreen";
import TabScreen from "./screens/TabScreen";
import DefaultScreen from "./screens/DefaultScreen";
import ChatScreen from "./screens/ChatScreen";
import { RoomContext } from "../context/RoomContext";

const Room = ({ room, username }) => {
  // let roomLink;
  const [visible, setVisible] = useState(false);
  const [showClipBoardModal, setShowClipBoardModal] = useState(false);
  const [roomLink, setRoomLink] = useState("");
  const [participants, setParticipants] = useState([]);
  const [screenIndex, setScreenIndex] = useState(0);
  const showOnClick = {
    display: visible ? "" : "none",
  };
  const showClipOnClick = {
    display: showClipBoardModal ? "" : "none",
  };
  // useEffect(() => {
  //   setRoomLink(window.location.href);
  //   console.log("Peeps", participants)
  //   socket.on('all_users', (users) => {
  //     setParticipants(users[room])
  //   })
  // }, []);
  useEffect(() => {
    setRoomLink(window.location.href);

    async function fetchUsers() {
      const usersInRoom = await axiosUtil.getUsers(room);
      return usersInRoom;
    }

    fetchUsers().then(() => {
      socket.on("all_users", handleUsers);
    });
    return () => {
      socket.off("all_users", handleUsers)
    }
  }, [room]);

  const handleUsers = (users) => {
    setParticipants(users.rooms[room]);
  }

  const inviteModalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const invite = () => {
    setVisible(true);
  };
  const closeInvite = (event) => {
    if (
      inviteModalRef.current &&
      event.target !== inviteModalRef.current &&
      !closeButtonRef.current.contains(event.target)
    ) {
      console.log("You touched the form");
      return;
    }
    setVisible(false);
    setShowClipBoardModal(false);
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
    <div className="flex flex-col min-h-screen">
      <RoomContext.Provider value={room} >
        <div className="flex-1 relative">
          {screenIndex === 0 && <ChatScreen username={username} />}
          {screenIndex === 2 && <DefaultScreen />}
          {screenIndex === 3 && (
            <PeopleScreen
              participants={participants}
              invite={invite}
              closeButtonRef={closeButtonRef}
              closeInvite={closeInvite}
              copyLink={copyLink}
              inviteModalRef={inviteModalRef}
              roomLink={roomLink}
              showOnClick={showOnClick}
              showClipOnClick={showClipOnClick}
            />
          )}
          {screenIndex === 4 && <TabScreen />}
        </div>
      </RoomContext.Provider>
      <div className="h-16">
        <BottomNavigationBar showScreen={showScreen} />
      </div>
    </div>
  );
};

export default Room;
