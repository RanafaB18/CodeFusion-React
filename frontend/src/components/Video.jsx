import { useRef, useEffect, useState } from "react";
import Person from "./Person";
import Draggable, { DraggableCore } from "react-draggable";
import { data } from "autoprefixer";
import CircleAvatar from "./CircleAvatar";
import { Tooltip } from "react-tooltip";

const Video = ({ stream, showStream, username, isMuted, isPeer, location }) => {
  const videoRef = useRef(null);
  const [position, setPosition] = useState({
    node: "",
    x: 0,
    y: 0,
    deltaX: 0,
    deltaY: 0,
  });
  const [transition, setTransition] = useState(false);
  /*
    location could be [default, permission]
  */
  const screenRef = useRef();
  const nodeRef = useRef();
  const verticalOffset = 72;
  const horizontalOffset = 128;
  useEffect(() => {
    screenRef.current = document.querySelector("#screen");
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    handleVideo(stream, showStream);
    // handleAudio(stream, isMuted)
    const resetPosition = () => {
      setTransition(true);
      setPosition({ ...data, x: 0, y: 0 });
      setTimeout(() => {
        setTransition(false);
      }, 400);
    };
    window.addEventListener("resize", resetPosition);
    return () => {
      window.removeEventListener("resize", resetPosition);
    };
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
  const trackPosition = (data) => {
    setPosition({
      ...data,
      x: data.x - horizontalOffset,
      y: data.y - verticalOffset,
    });
  };
  const rePosition = (data) => {
    const screenPosition = screenRef.current.getBoundingClientRect();
    const nodePosition = data.node.getBoundingClientRect();
    setTransition(true);
    if (
      nodePosition.top < screenPosition.top &&
      nodePosition.right > screenPosition.right
    ) {
      setPosition({ ...data, y: 0, x: 0 });
    } else if (
      nodePosition.top < screenPosition.top &&
      nodePosition.left < screenPosition.left
    ) {
      setPosition({
        ...data,
        y: 0,
        x: -screenPosition.right + nodePosition.width,
      });
    } else if (
      (nodePosition.bottom > screenPosition.bottom &&
        nodePosition.right > screenPosition.right) ||
      (nodePosition.bottom > screenPosition.bottom &&
        nodePosition.left < screenPosition.left)
    ) {
      setPosition({ ...data, x: 0, y: 0 });
    } else if (nodePosition.top < screenPosition.top) {
      setPosition({ ...data, y: 0, x: position.x });
    } else if (nodePosition.right > screenPosition.right) {
      setPosition({ ...data, x: 0, y: position.y });
    } else if (nodePosition.left < screenPosition.left) {
      setPosition({
        ...data,
        x: -screenPosition.right + nodePosition.width,
        y: position.y,
      });
    } else if (nodePosition.bottom > screenPosition.bottom) {
      setPosition({ ...data, x: 0, y: 0 });
    }
    setTimeout(() => {
      setTransition(false);
    }, 500);
  };
  return (
    <DraggableCore
      onDrag={(e, data) => trackPosition(data)}
      onStop={(e, data) => rePosition(data)}
      onStart={(e, data) => trackPosition(data)}
      nodeRef={nodeRef}
    >
      <div
        className={`inline-block ${
          location === "permission" ? "w-full" : "w-64 cursor-move"
        }`}
      >
        {showStream ? (
          <div
            ref={nodeRef}
            style={
              location === "permission"
                ? {}
                : {
                    transition: transition === true ? "all 0.5s" : "",
                    position: "absolute",
                    top: position.y,
                    left: position.x,
                  }
            }
            className="w-full"
          >
            <div className="relative">
              <video
                muted={isMuted}
                autoPlay
                ref={videoRef}
                className={`object-cover ${
                  location === "default" ? "h-36" : "h-64"
                } w-full rounded-lg`}
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
              {isPeer && isMuted && (
                <div
                  data-tooltip-id="mic-muted"
                  data-tooltip-content={"Microphone is muted"}
                  className="absolute flex justify-center items-center w-7 h-7 p-1
                rounded-full  bg-black bg-opacity-30 top-1 right-2"
                >
                  <Tooltip id="mic-muted" className="z-20"/>
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
          </div>
        ) : (
          <div
            style={
              location === "permission"
                ? {}
                : {
                    transition: transition === true ? "all 0.5s" : "",
                    position: "absolute",
                    top: position.y,
                    left: position.x,
                  }
            }
            ref={nodeRef}
            className={`relative  bg-black ${
              location === "default" ? "h-36" : "h-64"
            } w-full rounded-lg`}
          >
            <video
              muted={isMuted}
              autoPlay
              ref={videoRef}
              className="h-32 w-full"
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
    </DraggableCore>
  );
};

export default Video;
