import { FaChevronDown } from "react-icons/fa";
import Person from "./Person";
import { useState } from "react";
import CircleAvatar from "./CircleAvatar";

const Message = ({ message, username, time, isReply, id, deleteFxn }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };
  const handleClick = () => {
    setVisible(!visible);
  };
  const handleDeleteHover = () => {
    setVisible(false);
  };
  const handleDelete = () => {
    deleteFxn(id, username);
  };
  return (
    <div
      className={`p-3 font-semibold flex ${
        isReply && "flex-row-reverse"
      } justify-end items-end`}
    >
      <div
        className={`relative text-white text-opacity-60 flex ${
          isReply && "flex-row-reverse"
        } h-full items-end whitespace-pre-wrap
            gap-4 p-2 pb-0 mx-1 rounded-lg bg-blackhover`}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {/* message */}
        <div className="flex flex-col max-w-sm">
          {/* username
                    time */}
          <span className={`${isReply ? "self-start" : "self-end"}`}>
            {username}
          </span>
          <p
            className={`text-white text-opacity-90 break-words
          ${isReply ? "pr-3" : "pl-3"}`}
          >
            {message}
          </p>
          <span className={`${isReply ? "self-start" : "self-end"}`}>
            {time}
          </span>
        </div>
        {isHovering && !isReply && (
          <div className="absolute top-0 right-0">
            <div className="relative">
              <button
                className="hover:bg-white hover:bg-opacity-25
                rounded-tr-lg px-1 "
                onClick={handleClick}
              >
                <FaChevronDown />
              </button>
              {visible && (
                <button
                  className="absolute top-full right-0 w-max
                  bg-slate-700 rounded-md p-2
                    hover:bg-slate-500
                   active:bg-blackhover"
                  onMouseOut={handleDeleteHover}
                  onClick={handleDelete}
                >
                  Delete Message
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <CircleAvatar name={username} small={true}/>
    </div>
  );
};

export default Message;
