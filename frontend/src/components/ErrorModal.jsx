import { FaVideoSlash } from "react-icons/fa";
import PermissionModal from "./PermissionModal";
import { useState } from "react";

function ErrorModal({ username, room }) {
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const handleContinueCLick = () => {
    setShowPermissionModal(true)
  }
  const handleReload = () => {
    window.location.reload()
  }
  if (!showPermissionModal) {
    return (
      <div className="w-screen h-screen pt-12">
        <div className="flex flex-col items-center gap-3 p-9 rounded-md  mx-auto max-w-lg bg-white">
          <div className="bg-[#fee2e2] p-4 rounded-md">
            <FaVideoSlash className="text-[#ef4444] text-lg" />
          </div>
          <span className="font-semibold tracking-wide">
            We couldn't access your camera.
          </span>
          <span className="text-center w-10/12 text-[#595f66] text-lg">
            You can reload the page to try again, or if you don't have or need a
            camera, you can continue without one.
          </span>
          <button onClick={handleReload} className="text-white rounded-lg hover:bg-[#4fa3e7] bg-[#4299e1] py-3 w-10/12">
            Reload
          </button>
          <button onClick={handleContinueCLick} className="w-10/12 py-3 rounded-lg hover:bg-[#f1f3f5] bg-[#eaedf0]">
            Continue Without Camera
          </button>
        </div>
      </div>
    );
  }
  return <PermissionModal room={room} username={username} viewStream={false} />;
}

export default ErrorModal;
