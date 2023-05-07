import Lottie from "lottie-react"
import loadingAnimation from "../assets/98288-loading.json"

const Loading = () => {
    return (
        <div className="bg-blackish w-screen h-screen">
            <Lottie animationData={loadingAnimation} loop={true} />
        </div>
    )
}


export default Loading
