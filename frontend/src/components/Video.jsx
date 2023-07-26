import { useRef, useEffect, useState } from "react";
import Person from "./Person";
import Draggable, { DraggableCore } from "react-draggable";
import { data } from "autoprefixer";
import CircleAvatar from "./CircleAvatar";

const Video = ({ stream, showStream, username, isMuted, location }) => {
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
