import {
  FaComment,
  FaPenSquare,
  FaTable,
  FaUserFriends,
  FaVideo,
} from "react-icons/fa";
import { useState } from "react";

const icons = [
  {id: 1, icon: <FaComment className="bottom-nav-icon"/>},
  {id: 2, icon: <FaVideo className="bottom-nav-icon" />},
  {id: 3, icon: <FaPenSquare className="bottom-nav-icon" />},
  {id: 4, icon: <FaUserFriends className="bottom-nav-icon" />},
  {id: 5, icon: <svg fill="#d2d4d9" width="24" height="24" viewBox="0 0 24 24" name="tab" size="24" className="icon"><path d="M21,3H3A2,2 0 0,0 1,5V19A2,2 0 0,0 3,21H21A2,2 0 0,0 23,19V5A2,2 0 0,0 21,3M21,19H3V5H13V9H21V19Z"></path></svg>},
]
const BottomNavigationBar = ({showScreen, screenIndex, setScreenIndex}) => {
  // const [activeIndex, setActiveIndex] = useState(2);
  const makeActive = (index) => {
    setScreenIndex(index)
    showScreen(index)
  }
  return (
    <div className="w-full">
      <div
        className="h-16 bg-blackhover"
      >
        <div className="flex justify-around h-full ">
          {icons.map((iconData, index) => {
            const {id, icon} = iconData
            return (
              <div
              className={`bottom-nav ${index == screenIndex ? 'bg-blacklike' : ''}`}
              key={id}
              onClick={() => makeActive(index)}
              >
                <button type="button">
                  {icon}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNavigationBar;
