import { useEffect, useRef } from "react";
import Person from "./Person";
import CircleAvatar from "./CircleAvatar";

const FixedVideo = ({ stream, showStream, username, isMuted, location, videoType }) => {
  const videoRef = useRef(null);
  /*
    location could be [default, permission]
  */
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    handleVideo(stream, showStream);
  }, [showStream]);

  const handleVideo = (stream, showStream) => {
    if (showStream === false) {
      stream.getTracks().forEach(function (track) {
        if (track.readyState === "live" && track.kind === "video") {
          track.enabled = false;
        }
      });
    } else {
      stream.getTracks().forEach(function (track) {
        if (track.readyState === "live" && track.kind === "video") {
          track.enabled = true;
        }
      });
    }
  };

  return (
    <div className={`inline-block ${videoType === "grid" ? "" : "w-full"}`}>
      {showStream ? (
        <div className={`relative`}>
          <video
            muted={isMuted}
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
          <div className={`relative  bg-black ${
              location === "default" ? "h-full" : "h-64"
            } w-full rounded-lg`}
          >
            <video
              muted={isMuted}
              autoPlay
              ref={videoRef}
              className={`${videoType === "grid" ? "h-full" : "h-44"} w-full`}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <CircleAvatar name={username} />
            </div>
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
        )}
    </div>
  );
};

export default FixedVideo;
