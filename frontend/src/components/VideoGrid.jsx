import { useContext } from "react";
import FixedVideo from "./FixedVideo";
import { ProviderContext } from "../context/ProviderContext";

const VideoGrid = ({ username, stream, peers, showStream, location }) => {
  const { color } = useContext(ProviderContext);
  return (
    <div className="flex justify-center flex-wrap gap-4 m-1">
      <FixedVideo
        showStream={showStream}
        isMuted={true}
        stream={stream}
        username={username}
        location={location}
        videoType={"grid"}
        isPeer={false}
        color={color}
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
              videoType={"grid"}
              isPeer={true}
              color={peer.color}
            />
          </div>
        );
      })}
    </div>
  );
};

export default VideoGrid;
