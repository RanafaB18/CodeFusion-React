import { FaEllipsisV } from "react-icons/fa";
import Options from "../Options";

const DefaultScreen = () => {
  return (
    <>
      <div className="flex flex-col relative w-full">
        <div className="h-14 bg-blackhover">
          <div
            className="
        bg-white h-14 w-16 float-right
        bg-opacity-20 flex justify-center items-center"
          >
            <FaEllipsisV className="text-white text-lg cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="max-w-xs py-12 mx-auto">
        <Options />
      </div>
    </>
  );
};

export default DefaultScreen
