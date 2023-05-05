import { FaFrown, FaRegFrown } from "react-icons/fa"

const ErrorPage = ({room}) => {
    return (
        <div className="flex flex-col gap-6 text-xl justify-center items-center w-screen h-screen bg-brandBackground">
            <div className="flex flex-col items-center justify-center gap-6">
                <FaRegFrown className="bottom-nav-icon text-iconColor text-5xl"/>
                <span className="text-center text-gray-700 max-w-sm mx-auto">
                Oops! Something went wrong while trying to load your room.
                 Here's an explanation:
                </span>
            </div>
            <span className="text-center max-w-md mx-auto text-white">
            There doesn't appear to be a room with the name "{room}". Are you sure the URL is correct?
            </span>
            
        </div>
    )
}

export default ErrorPage
