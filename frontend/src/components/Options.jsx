import { FaCode, FaFileAlt } from "react-icons/fa";
import TabButtons from "./TabButtons";
import { IconContext } from "react-icons";
import { AiOutlineFileWord } from "react-icons/ai";
import {v4 as uuid } from 'uuid'
import { YjsContext } from "../context/YjsContext";
import { useContext } from "react";
const Options = () => {
  const { newDocTab, newCodeTab } = useContext(YjsContext)
  return (
    <div className="px-4 py-3 bg-[#22262a] rounded shadow-lg dark:bg-ui-900">
      <IconContext.Provider value={{color: 'gray', size:"20px"}}>
        <TabButtons index={"document"} ref={newDocTab} icon={<FaFileAlt />} text={"New Document Tab"}/>
        <TabButtons index={"code"} ref={newCodeTab} icon={<FaCode />} text={"New Code Tab"}/>
        <hr className="my-2 h-px opacity-20"/>
        <TabButtons icon={<AiOutlineFileWord />} text={"Import Word Document"}/>
      </IconContext.Provider>
    </div>
  );
};

export default Options;
