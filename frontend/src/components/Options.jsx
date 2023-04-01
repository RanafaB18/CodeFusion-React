import { FaCode, FaFileAlt } from "react-icons/fa";
import TabButtons from "./TabButtons";
import { IconContext } from "react-icons";
import { AiOutlineFileWord } from "react-icons/ai";
const Options = () => {
  return (
    <div className="px-4 py-3 bg-blackhover rounded shadow-lg dark:bg-ui-900">
      <IconContext.Provider value={{color: 'gray', size:"20px"}}>
        <TabButtons icon={<FaFileAlt />} text={"New Document Tab"}/>
        <TabButtons icon={<FaCode />} text={"New Code Tab"}/>
        <hr className="my-2 h-px opacity-20"/>
        <TabButtons icon={<AiOutlineFileWord />} text={"Import Word Document"}/>
      </IconContext.Provider>
    </div>
  );
};

export default Options;
