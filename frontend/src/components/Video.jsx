import { useRef, useEffect } from "react";

const Video = ({stream}) => {
    const videoRef = useRef(null);
    console.log("Stream", stream)

    useEffect(() => {
        if (videoRef.current){
            videoRef.current.srcObject = stream;
        }
    }, []);

    return (
        <video muted autoPlay ref={videoRef} />
    );
}

export default Video
