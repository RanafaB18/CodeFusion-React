import Video from "./Video";

const FloatingVideos = ({ username, stream, peers, showStream, location }) => {
  return (
    <div className="h-fit hidden md:flex">
      <Video
        showStream={showStream}
        isMuted={true}
        stream={stream}
        username={username}
        location={location}
        isPeer={false}
      />
      {Object.values(peers).map((peer) => {
        return (
          <div key={peer.stream.id} className="absolute top-40">
            <Video
              showStream={peer.viewStream}
              isMuted={peer.isMuted}
              stream={peer.stream}
              username={peer.username}
              location={location}
              isPeer={true}
            />
          </div>
        );
      })}
    </div>
  );
};

export default FloatingVideos;
