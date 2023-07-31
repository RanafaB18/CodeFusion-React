import { FaUsers } from "react-icons/fa";
import Person from "../Person";
import Modal from "../Modal";
import AnimatedModal from "../AnimatedModal";
const PeopleScreen = ({
  invite,
  participants,
  closeButtonRef,
  closeInvite,
  copyLink,
  inviteModalRef,
  roomLink,
  visible,
  showClipBoardModal
}) => {
  return (
    <div>
      <div className="h-14 w-screen bg-blackhover px-4 flex justify-between items-center">
        <div className="flex items-center">
          <FaUsers className="bottom-nav-icon opacity-100" />
          <span className="pl-4 text-xl font-semibold text-white tracking-wide">
            People
          </span>
        </div>
        <div>
          <button
            className="bg-bluish
                text-white text-md
            font-semibold rounded-md px-4 py-2
            tracking-wide hover:bg-blue-500"
            onClick={invite}
          >
            Invite Others
          </button>
        </div>
      </div>
      <div className="py-4">
        {participants.map((peep, index) => (
          <Person key={index} name={peep.username} />
        ))}
      </div>
      <Modal
        closeButtonRef={closeButtonRef}
        closeInvite={closeInvite}
        copyLink={copyLink}
        inviteModalRef={inviteModalRef}
        roomLink={roomLink}
        visible={visible}
      />
      {showClipBoardModal && (<AnimatedModal />)}
    </div>
  );
};

export default PeopleScreen;
