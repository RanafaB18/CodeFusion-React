import FixedVideo from "./FixedVideo";
import { ProviderContext } from "../context/ProviderContext";
import { useContext } from "react";

const VideoSideBar = ({ username, stream, peers, showStream, location }) => {
  const { color } = useContext(ProviderContext);
  return (
    <div className="min-h-screen lg:flex max-w-xs w-80 bg-blackBackground py-1 px-2 border-l border-white border-opacity-25">
      <FixedVideo
        showStream={showStream}
        isMuted={true}
        stream={stream}
        username={username}
        location={location}
        videoType={"sidebar"}
        color={color}
        isPeer={false}
      />
      {Object.values(peers).map((peer) => {
        return (
          <div key={peer.stream.id}>
            <FixedVideo
              showStream={peer.viewStream}
              isMuted={peer.isMuted}
              stream={peer.stream}
              username={peer.username}
              location={location}
              videoType={"sidebar"}
              color={peer.color}
              isPeer={true}
            />
          </div>
        );
      })}
    </div>
  );
};

export default VideoSideBar;
