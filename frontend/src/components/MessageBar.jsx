import { useState } from "react";
import { FaPaperPlane, FaPaperclip, FaPlane, FaSmile } from "react-icons/fa";

// message: {message: "What's up?", user: username, time}


const MessageBar = () => {
  const [message, setMessage] = useState("");

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };
  return (
    <div className="flex flex-col m-2">
      <div>
        <input
          type="text"
          className="w-full p-3 bg-blackhover border-b-2 border-b-gray-500 rounded-tr-md
          rounded-tl-md text-white text-lg focus:outline-none
          focus:border-b-bluish placeholder:tracking-wide"
          placeholder="Write a message..."
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
          <button className="hover:bg-white hover:bg-opacity-25 p-1 rounded-md">
            <FaPaperPlane className="bottom-nav-icon text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageBar;
