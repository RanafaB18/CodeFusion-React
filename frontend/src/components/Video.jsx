import { useRef, useEffect } from "react";
import Person from "./Person";

const Video = ({ stream, showStream, username }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [showStream]);

  return (
    <div className="relative">
      {showStream ? (
        <div className="relative">
          <video
            muted
            autoPlay
            ref={videoRef}
            className="object-cover h-64 w-full rounded-lg"
          />
          <div className="video-text">
            <span className="text-lg text-white">
              {username === undefined ? "Unknown" : username}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-2 w-4
          bg-green-400 mx-auto">

          </div>
        </div>
      ) : (
        <div className="relative  bg-[#22262a] p-3 h-64 flex flex-col items-center justify-center rounded-lg">
          <Person name={username} showOnlyCircle />
          <div className="video-text">
            <span className="text-lg text-white">
              {username === undefined ? "Unknown" : username}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;
