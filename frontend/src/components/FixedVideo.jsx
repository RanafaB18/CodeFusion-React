import { useContext, useEffect, useRef } from "react";
import Person from "./Person";
import CircleAvatar from "./CircleAvatar";
import util from "../services";
import { Tooltip } from "react-tooltip";
import { ProviderContext } from "../context/ProviderContext";
const FixedVideo = ({
  stream,
  showStream,
  username,
  isMuted,
  isPeer,
  location,
  videoType,
}) => {
  const { color } = useContext(ProviderContext);
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
    if (stream !== undefined) {
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
          <div style={{ borderLeftColor: color }} className="video-text">
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
        <div
          className={`relative  bg-black ${
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
          <div style={{ borderLeftColor: color }} className="video-text">
            <span
              className={`${
                location === "default" ? "text-md" : "text-lg"
              } text-white`}
            >
              {username === undefined ? "Unknown" : username}
            </span>
          </div>
          {isPeer && isMuted && (
            <div
              data-tooltip-id="mic-muted"
              data-tooltip-content={"Microphone is muted"}
              className="absolute flex justify-center items-center w-7 h-7 p-1
                rounded-full  bg-black bg-opacity-30 top-1 right-2"
            >
              <Tooltip id="mic-muted" className="z-20" />
              <svg
                fill="white"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                name="microphone-off"
                size="20"
                className="icon"
              >
                <path d="M19,11C19,12.19 18.66,13.3 18.1,14.28L16.87,13.05C17.14,12.43 17.3,11.74 17.3,11H19M15,11.16L9,5.18V5A3,3 0 0,1 12,2A3,3 0 0,1 15,5V11L15,11.16M4.27,3L21,19.73L19.73,21L15.54,16.81C14.77,17.27 13.91,17.58 13,17.72V21H11V17.72C7.72,17.23 5,14.41 5,11H6.7C6.7,14 9.24,16.1 12,16.1C12.81,16.1 13.6,15.91 14.31,15.58L12.65,13.92L12,14A3,3 0 0,1 9,11V10.28L3,4.27L4.27,3Z"></path>
              </svg>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FixedVideo;
