import { AiOutlineClose } from "react-icons/ai";

const Modal = ({
  visible,
  roomLink,
  closeInvite,
  inviteModalRef,
  closeButtonRef,
  copyLink
}) => {
  if (!visible) {
    return
  }
  return (
    <div
      ref={inviteModalRef}
      onClick={closeInvite}
      className="absolute h-screen w-screen top-0 pt-12 backdrop-blur-sm"
    >
      <div className="z-10 top-0 max-w-sm mx-auto p-4 bg-white rounded">
        <div className="flex justify-between items-center pb-6">
          <p className="text-lg">Invite People To Join</p>
          <button className="hover:bg-gray-200 rounded-lg" ref={closeButtonRef} onClick={closeInvite}>
            <AiOutlineClose size={"21px"} />
          </button>
        </div>
        <div>
          <input
            className="
            border w-full py-2
             px-4 rounded-md
             focus:outline-none focus:ring
             focus:ring-activeblue
             "
            value={roomLink}
            readOnly
          />
          <button
            className="w-full bg-bluish py-2
            px-4 rounded-md mt-2 text-white
            font-semibold hover:bg-blue-500
            "
            onClick={copyLink}
          >
            Copy Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
