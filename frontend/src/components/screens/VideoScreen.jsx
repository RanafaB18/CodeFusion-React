import Video from "../Video";
const VideoScreen = ({ username, stream, peers, showStream, location }) => {
  return (
    <div className="grid grid-flow-col gap-4">
      <Video showStream={showStream} stream={stream} username={username} location={location}/>
      {
        Object.values(peers).map((peer) => {
          return (
            <div key={peer.stream.id}>
              <Video showStream={peer.viewStream} stream={peer.stream} username={peer.username} location={location}/>
            </div>
          )
        }
        )
      }
    </div>
  )
};

export default VideoScreen;
