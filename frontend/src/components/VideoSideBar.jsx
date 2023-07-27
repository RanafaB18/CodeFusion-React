import Video from "./Video";
import FixedVideo from "./FixedVideo";

const VideoSideBar = ({ username, stream, peers, showStream, location }) => {
  return (
    <div className="min-h-screen max-w-xs w-80 bg-blackBackground py-1 px-2 border-l border-white border-opacity-25">
      <FixedVideo
        showStream={showStream}
        isMuted={true}
        stream={stream}
        username={username}
        location={location}
        videoType={"sidebar"}
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
            />
          </div>
        );
      })}
    </div>
  );
};

export default VideoSideBar;
