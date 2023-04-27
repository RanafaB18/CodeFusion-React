import { FaCode, FaFileAlt, FaTable } from "react-icons/fa";
import Tab from "../Tab";
import TabButtons from "../TabButtons";

const TabScreen = ({createTab, tabs}) => {
  return (
    <div>
      <div className="h-14 w-full bg-blackhover px-4 flex justify-between items-center">
        <div className="flex items-center">
          <FaTable className="bottom-nav-icon opacity-100" />
          <span className="pl-4 text-xl font-semibold text-white tracking-wide">
            Tabs
          </span>
        </div>
        <div>
          <button
            className="bg-bluish
                text-white text-md
            font-semibold rounded-md px-4 py-2
            tracking-wide hover:bg-blue-500"
            onClick={() => {}}
          >
            New Tab
          </button>
        </div>
      </div>
      <div className="py-4">
        {/* {tabs.map((peep, index) => (
          <Tab icon={} text={} key={index} />
        ))} */}
      </div>
    </div>
  );
};

export default TabScreen
