import { useEffect, useState, useRef, useContext } from "react";
import {
  FaInfoCircle,
  FaPaperPlane,
  FaPaperclip,
  FaSmile,
} from "react-icons/fa";
import { RoomContext } from "../context/RoomContext";
// message: {message: "What's up?", user: username, time}

const MessageBar = ({ username, addMessages }) => {
  const [message, setMessage] = useState("");
  const { room, socket } = useContext(RoomContext);
  const textAreaRef = useRef();
  const formRef = useRef();
  const animateRef = useRef()

  useEffect(() => {
    const textArea = textAreaRef.current;
    const animator = animateRef.current
    textArea.addEventListener("keydown", handleEnterKeyPress);
    animator.addEventListener('mouseover', handleHover, {once: true})
    return () => {
      textArea.removeEventListener("keydown", handleEnterKeyPress);
      animator.removeEventListener('mouseover', handleHover)
    };
  }, []);
  const handleEnterKeyPress = (event) => {
    if (event.shiftKey === false && event.key === "Enter") {
      event.preventDefault();
      formRef.current.requestSubmit();
    }
  };
  const handleHover = (event) => {
    animateRef.current.classList.remove("animate-ping")
  }
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = (event) => {
    event.preventDefault();
    if (message === "") {
      return;
    }
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const time = `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }`;
    const messageData = {
      message: message,
      user: username,
      time: time,
      id: Date.now(),
      room: room,
    };
    addMessages(messageData);
    socket.emit('message-sent', messageData)
    setMessage("");
  };
  return (
    <form className="flex flex-col m-2" onSubmit={sendMessage} ref={formRef}>
      <textarea
        ref={textAreaRef}
        rows={1}
        type="text"
        className="resize-none w-full p-3 bg-blackhover border-b-2 border-b-gray-500
          rounded-t-md text-white text-lg focus:outline-none
          focus:border-b-bluish placeholder:tracking-wide"
        placeholder={`Write a message...`}
        value={message}
        onChange={handleMessageChange}
      />
      <div
        className="flex justify-between px-2 py-2 bg-blacklike rounded-bl-md
       rounded-br-md"
      >
        <div className="flex items-center gap-2 relative">
          <button type="button" className="hover:bg-white hover:bg-opacity-25 p-1 rounded-md">
            <FaPaperclip className="bottom-nav-icon -rotate-90 text-xl" />
          </button>
          <div
            after="Shift + Enter for a newline"
            className="hover:bg-white after:absolute
            after:left-full after:top-0 after:pl-2 after:bottom-0 whitespace-nowrap
            hover:after:content-[attr(after)]
            text-white hover:bg-opacity-25 p-1 rounded-md "
          >
            <span className="relative flex cursor-pointer">
              <FaInfoCircle className=" inline-flex bottom-nav-icon text-bluish text-sm" />
              <span ref={animateRef} className="absolute bottom-nav-icon animate-ping text-bluish text-sm">
                <FaInfoCircle />
              </span>
            </span>
          </div>
        </div>
        <div className="flex gap-1">
          <button className="hover:bg-white hover:bg-opacity-25 p-1 rounded-md">
            <FaSmile className="bottom-nav-icon text-xl" />
          </button>
          <button
            disabled={message === ""}
            type="submit"
            className="enabled:hover:bg-white enabled:hover:bg-opacity-25 p-1 rounded-md"
          >
            <FaPaperPlane
              className={`${
                message === "" && "text-opacity-10"
              } bottom-nav-icon text-xl`}
            />
          </button>
        </div>
      </div>
    </form>
  );
};

export default MessageBar;
