import { useRef, useEffect, useState } from "react";
import Person from "./Person";
import Draggable, { DraggableCore } from "react-draggable";
import { data } from "autoprefixer";

const Video = ({ stream, showStream, username, location }) => {
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
      console.log("Y", screenPosition.top, screenPosition.left);
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
      console.log(
        screenPosition.bottom,
        screenPosition.bottom - nodePosition.height
      );
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
                muted
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
    </DraggableCore>
  );
};

export default Video;
