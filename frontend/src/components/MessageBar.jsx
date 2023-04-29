import { useState } from "react";
import { FaPaperPlane, FaPaperclip, FaPlane, FaSmile } from "react-icons/fa";
import { socket } from "..";
import { useContext } from "react";
import { RoomContext } from "../context/RoomContext";
// message: {message: "What's up?", user: username, time}


const MessageBar = ({username, addMessages}) => {
  const [message, setMessage] = useState("");
  const room = useContext(RoomContext)
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = (event) => {
    event.preventDefault()
    if (message === "") {
      return
    }
    const date = new Date()
    const minutes = date.getMinutes()
    const hours = date.getHours()
    const time = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`
    const messageData = {
      message: message,
      user: username,
      time: time,
      id: Date.now(),
      room: room
    }
    addMessages(messageData)
    setMessage("")
  }
  return (
    <form className="flex flex-col m-2" onSubmit={sendMessage}>
      <div>
        <input
          type="text"
          className="w-full p-3 bg-blackhover border-b-2 border-b-gray-500 rounded-tr-md
          rounded-tl-md text-white text-lg focus:outline-none
          focus:border-b-bluish placeholder:tracking-wide"
          placeholder={`Write a message...${username}`}
          value={message}
          onChange={handleMessageChange}
        />
      </div>
      <div
        className="flex justify-between px-4 py-2 bg-blacklike rounded-bl-md
       rounded-br-md"
      >
        <button className="hover:bg-white hover:bg-opacity-25 p-1 rounded-md">
          <FaPaperclip className="bottom-nav-icon -rotate-90 text-xl" />
        </button>
        <div className="flex gap-2">
          <button className="hover:bg-white hover:bg-opacity-25 p-1 rounded-md">
            <FaSmile className="bottom-nav-icon text-xl" />
          </button>
          <button disabled={message === ""} type="submit" className="enabled:hover:bg-white enabled:hover:bg-opacity-25 p-1 rounded-md">
            <FaPaperPlane className={`${message === "" ? "text-opacity-10" : ""} bottom-nav-icon text-xl`} />
          </button>
        </div>
      </div>
    </form>
  );
};

export default MessageBar;
