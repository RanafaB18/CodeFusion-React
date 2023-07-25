import React, { useEffect, useRef } from "react";

const FixedVideo = ({ stream, showStream, username, location, videoType }) => {
  const videoRef = useRef(null);
  /*
    location could be [default, permission]
  */
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [showStream]);

  return (
    <div className={`inline-block ${videoType === "grid" ? "" : "w-full"}`}>
      {showStream ? (
        <div className={`relative`}>
          <video
            muted
            autoPlay
            ref={videoRef}
            className={`object-cover ${
              videoType === "sidebar" ? "h-44 w-full" : ""
            } rounded-lg`}
          />
          <div className="video-text">
            <span
              className={`${
                location === "default" ? "text-md" : "text-lg"
              } text-white`}
            >
              {username === undefined ? "Unknown" : username}
            </span>
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

export default FixedVideo;
