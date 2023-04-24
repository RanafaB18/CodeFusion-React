import {
  FaComment,
  FaPenSquare,
  FaTable,
  FaUserFriends,
  FaVideo,
} from "react-icons/fa";
import { useState } from "react";

const BottomNavigationBar = () => {
  const [index, setIndex] = useState(2);
  return (
    <div className="absolute w-full bottom-0">
      <div
        className="h-16 bg-blackhover
            "
      >
        <div className="flex justify-around h-full ">
          <div className="btm-nav">
            <button>
              <FaComment className="btm-icons" />
            </button>
          </div>
          <div className="btm-nav">
            <button>
              <FaVideo className="btm-icons" />
            </button>
          </div>
          <div className="btm-nav">
            <button>
              <FaPenSquare className="btm-icons" />
            </button>
          </div>
          <div className="btm-nav">
            <button>
              <FaUserFriends className="btm-icons" />
            </button>
          </div>
          <div className="btm-nav">
            <button>
              <FaTable className="btm-icons" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNavigationBar;
