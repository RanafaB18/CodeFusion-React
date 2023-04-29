import { FaChevronDown } from "react-icons/fa";
import Person from "./Person";
import { useState } from "react";

const Message = ({ message, username, time, isReply, id, deleteFxn }) => {
  // console.log(username)
  const [isHovering, setIsHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
    // setVisible(false);
  };
  const handleClick = () => {
    setVisible(!visible);
  };
  const handleDeleteHover = () => {
    setVisible(false);
  };
  const handleDelete = () => {
    deleteFxn(id)
  }
  return (
    <div
      className={`p-3 font-semibold flex ${
        isReply && "flex-row-reverse"
      } justify-end items-end`}
    >
      <div
        className={`relative text-white text-opacity-60 flex ${
          isReply && "flex-row-reverse"
        } h-full items-end
            gap-4 p-2 pb-0 rounded-lg bg-blackhover`}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {/* message */}
        <div className="flex flex-col">
          {/* username
                    time */}
          <span className={`${isReply ? "self-start" : "self-end"}`}>
            {username}
          </span>
          <p className="text-white text-opacity-90">{message}</p>
          <span className="self-end">{time}</span>
        </div>
        {isHovering && (
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
                  className="absolute right-0 w-max
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
      {/* Should be on current message */}
      <Person name={username} showOnlyCircle color="white" small />
    </div>
  );
};

export default Message;
