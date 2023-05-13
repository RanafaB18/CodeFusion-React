import { useContext, useEffect, useRef, useState } from "react";
import Video from "../Video";
import { RoomContext } from "../../context/RoomContext";

const VideoScreen = ({ username, stream }) => {
  console.log("Stream", stream)
  return (
    <div className="grid grid-flow-row">
      <Video stream={stream} />
      <span className="text-2xl text-white">{username}</span>
    </div>
  )
};

export default VideoScreen;
