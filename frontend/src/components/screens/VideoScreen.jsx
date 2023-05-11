import { useEffect } from "react"

const VideoScreen = ({username}) => {
    const getLocalStream = () => {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true})
          .then((stream) => {
            window.localStream = stream
            window.localAudio.srcObject = stream
            window.localAudio.autoplay = true
          })
          .catch((err) => {
            console.error(`You got an error: ${err}`)
          })
    }
    useEffect(() => {
        getLocalStream()
    }, [])
    return (
        <>
            <video autoPlay></video>
            <span className="text-2xl text-white text-center">{username}</span>
        </>
    )
}

export default VideoScreen
