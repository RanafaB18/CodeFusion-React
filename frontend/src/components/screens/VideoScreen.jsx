import Video from "../Video";
const VideoScreen = ({ username, stream, peers, showStream }) => {
  console.log("VideoScren Peers", peers)
  return (
    <div className="grid grid-cols-2 gap-4">
      <Video showStream={showStream} stream={stream} username={username} />
      {
        Object.values(peers).map((peer) => {
          console.log("VideoScreen", peer)
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
