import FixedVideo from "./FixedVideo";

const VideoGrid = ({ username, stream, peers, showStream, location }) => {
  return (
    <div className="flex justify-center flex-wrap gap-4">
      <FixedVideo
        showStream={showStream}
        stream={stream}
        username={username}
        location={location}
        videoType={"grid"}
      />
      {Object.values(peers).map((peer) => {
        return (
          <div key={peer.stream.id}>
            <FixedVideo
              showStream={peer.viewStream}
              stream={peer.stream}
              username={peer.username}
              location={location}
              videoType={"grid"}
            />
          </div>
        );
      })}
    </div>
  );
};

export default VideoGrid;
