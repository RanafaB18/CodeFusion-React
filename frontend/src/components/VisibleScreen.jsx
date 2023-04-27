import AnimatedModal from "./AnimatedModal";
import Options from "./Options";
import Modal from "./Modal";
import PeopleScreen from "./screens/PeopleScreen";
import Bar from "./Bar";
const VisibleScreen = ({
  participants,
  invite,
  username,
  closeButtonRef,
  closeInvite,
  copyLink,
  inviteModalRef,
  roomLink,
  showOnClick,
  showClipOnClick,
}) => {
  return (
    <>
      {/* <Bar participants={participants} invite={invite} username={username} /> */}
      <PeopleScreen invite={invite} participants={participants}/>
      <div className="max-w-xs py-12 mx-auto">{/* <Options /> */}</div>
      {/* <Modal
        closeButtonRef={closeButtonRef}
        closeInvite={closeInvite}
        copyLink={copyLink}
        inviteModalRef={inviteModalRef}
        roomLink={roomLink}
        showOnClick={showOnClick}
      /> */}
      <AnimatedModal showClipOnClick={showClipOnClick} />
    </>
  );
};

export default VisibleScreen;
