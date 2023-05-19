import { useContext, useEffect, useRef, useState } from "react";
import { FaLock, FaMicrophone, FaMousePointer, FaVideo } from "react-icons/fa";
import { RoomContext } from "../../context/RoomContext";

const PermissionScreen = ({ setPermissionReceived }) => {
  const mouseRef = useRef();
  const buttonRef = useRef();
  const { socket, setStream } = useContext(RoomContext);
  useEffect(() => {
    const animateMouse = () => {
      mouseRef.current.classList.add("move-down", "animate-moveDown");
      setTimeout(() => {
        buttonRef.current.classList.remove('scale-75')
        mouseRef.current.classList.remove("move-down", "animate-moveDown");
        mouseRef.current.classList.add("move-up", "animate-moveUp");
      }, 2000);
      setTimeout(() => {
        mouseRef.current.classList.remove("move-up", "animate-moveUp");
        mouseRef.current.classList.add("reset", "animate-reset");
      }, 4000);
      setTimeout(() => {
        mouseRef.current.classList.remove("reset", "animate-reset");
      }, 6000);
    };

    animateMouse();
    const intervalId = setInterval(animateMouse, 6000);

    return () => {
      clearInterval(intervalId);
    }
  }, []);
  const handlePermissions = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setPermissionReceived(true);
        setStream(stream);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };
  return (
    <div className="w-screen h-screen">
      <div className="p-6 flex flex-col bg-white h-full max-w-lg mx-auto">
        <div className="bg-[#E5E7EB] p-4 rounded-t-md">
          <div className="flex bg-[#F3F4F6] p-4 rounded-md gap-6 items-center">
            <FaLock className="text-[#D1D5DB] w-5 h-5" />
            <div className="bg-[#D1D5DB] p-2 w-44 rounded-xl"></div>
          </div>
        </div>
        <div className="bg-[#22262A] py-9 rounded-b-md relative">
          <div
            className="absolute w-56 h-32 bg-white -top-[5%] left-[5%]
          z-10 drop-shadow-md rounded-md p-3 flex flex-col gap-3"
          >
            <div className="bg-[#9ca3af] h-3 w-5/6 rounded-xl"></div>
            <div className="flex items-center gap-3">
              <FaMicrophone className="text-[#9ca3af]" />
              <div className="bg-[#9ca3af] h-3 w-2/4 rounded-xl"></div>
            </div>
            <div className="flex items-center gap-3">
              <FaVideo className="text-[#9ca3af]" />
              <div className="bg-[#9ca3af] h-3 w-2/4 rounded-xl"></div>
            </div>
            <div className="flex items-center justify-around">
              <button className="border px-6 text-[#9ca3af]">Block</button>
              <button className="font-bold border px-6">Allow</button>
            </div>
          </div>
          <div className="flex flex-col max-w-xs mx-auto p-3 bg-white gap-3 rounded-md">
            <div className="bg-[#4B5563] w-full h-44 rounded-md relative">
              <div
                ref={mouseRef}
                className="absolute top-[75%] right-[10%]
               z-20"
              >
                <svg
                  id="cursor"
                  viewBox="0 0 24 24"
                  className="absolute z-50 w-6 h-6 text-white"
                  data-v-53e52c9e=""
                >
                  <path
                    fill="black"
                    d="M13.64,21.97C13.14,22.21 12.54,22 12.31,21.5L10.13,16.76L7.62,18.78C7.45,18.92 7.24,19 7,19A1,1 0 0,1 6,18V3A1,1 0 0,1 7,2C7.24,2 7.47,2.09 7.64,2.23L7.65,2.22L19.14,11.86C19.57,12.22 19.62,12.85 19.27,13.27C19.12,13.45 18.91,13.57 18.7,13.61L15.54,14.23L17.74,18.96C18,19.46 17.76,20.05 17.26,20.28L13.64,21.97Z"
                    data-v-53e52c9e=""
                  ></path>
                  <path
                    fill="white"
                    d="M10.07,14.27C10.57,14.03 11.16,14.25 11.4,14.75L13.7,19.74L15.5,18.89L13.19,13.91C12.95,13.41 13.17,12.81 13.67,12.58L13.95,12.5L16.25,12.05L8,5.12V15.9L9.82,14.43L10.07,14.27M13.64,21.97C13.14,22.21 12.54,22 12.31,21.5L10.13,16.76L7.62,18.78C7.45,18.92 7.24,19 7,19A1,1 0 0,1 6,18V3A1,1 0 0,1 7,2C7.24,2 7.47,2.09 7.64,2.23L7.65,2.22L19.14,11.86C19.57,12.22 19.62,12.85 19.27,13.27C19.12,13.45 18.91,13.57 18.7,13.61L15.54,14.23L17.74,18.96C18,19.46 17.76,20.05 17.26,20.28L13.64,21.97Z"
                    data-v-53e52c9e=""
                  ></path>
                </svg>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="bg-[#9CA3AF] p-2 w-56 rounded-xl"></div>
              <div className="bg-[#9CA3AF] p-2 w-44 rounded-xl"></div>
            </div>
            <div ref={buttonRef} className="bg-[#4299E1] py-4 rounded-md">
              <div className="bg-[#A1CCF0] w-24 h-3 rounded-xl mx-auto"></div>
            </div>
          </div>
        </div>
        <div className="p-2 text-center text-lg">
          <span className="text-[#9aa0a7]">
            Your browser will ask for permission to access your camera and
            microphone.
          </span>
          <p className="mt-4">Please click "Allow" on the prompt.</p>
        </div>
        <button
          onClick={handlePermissions}
          className="bg-[#4299E1] text-lg text-white py-4 rounded-md mt-6"
        >
          Request Permission
        </button>
      </div>
    </div>
  );
};

export default PermissionScreen;
