import FixedVideo from "./FixedVideo";

const VideoGrid = ({ username, stream, peers, showStream, location }) => {
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
            />
          </div>
        );
      })}
    </div>
  );
};

export default VideoGrid;
