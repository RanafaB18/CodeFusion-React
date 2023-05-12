import { FaEllipsisV } from "react-icons/fa";
import Options from "../Options";
import { socket } from "../../Home";
import { Link, redirect } from "react-router-dom";
import Bar from "../Bar";
import SideBar from "../SideBar";
import { useEffect, useState } from "react";
import SideModal from "../SideModal";
import Modal from "../Modal";
import AnimatedModal from "../AnimatedModal";

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
  showClipBoardModal
}) => {
  const [showModal, setShowModal] = useState(false);
  const closeSideModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    if (chatOpen) {
      setShowModal(true);
    }
  }, [chatOpen]);
  const handleLeave = () => {
    sessionStorage.clear("user_room_name");
    socket.emit("leave-room", { room, username });
    return redirect("/");
  };
  return (
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
        <div className="relative max-w-xs py-12 mx-auto">
          <Options />
        </div>
        <div className="hidden md:block">
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
  );
};

export default DefaultScreen;
