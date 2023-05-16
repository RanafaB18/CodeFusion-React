import { useRef, useEffect } from "react";

const Video = ({stream, username}) => {
    const videoRef = useRef(null);
    console.log("Stream", stream)

    useEffect(() => {
        if (videoRef.current){
            videoRef.current.srcObject = stream;
        }
    }, []);

    return (
        <div className="relative">
            <video muted autoPlay ref={videoRef} />
            <div className="absolute bottom-0">
                <span className="text-2xl text-white">{username === undefined ? "Unknown" : username}</span>
            </div>

        </div>
    );
}

export default Video
