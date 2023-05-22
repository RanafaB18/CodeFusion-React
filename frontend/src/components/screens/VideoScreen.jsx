import Video from "../Video";
const VideoScreen = ({ username, stream, peers, showStream }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Video showStream={showStream} stream={stream} username={username} />
      {
        Object.values(peers).map((peer) => {
          return (
            <div key={peer.stream.id}>
              <Video showStream={peer.viewStream} stream={peer.stream} username={peer.username} />
            </div>
          )
        }
        )
      }
    </div>
  )
};

export default VideoScreen;
