import Video from "./Video"

const FloatingVideos = ({ username, stream, peers, showStream, location }) => {
  console.log("Rerendering peers", peers)
  return (
    <div className="min-h-screen">
      <Video showStream={showStream} stream={stream} username={username} location={location}/>
      {
        Object.values(peers).map((peer) => {
          return (
            <div key={peer.stream.id} className="absolute top-40">
              <Video showStream={peer.viewStream} stream={peer.stream} username={peer.username} location={location}/>
            </div>
          )
        }
        )
      }
    </div>
  )
}

export default FloatingVideos
