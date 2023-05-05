import { FaEllipsisV } from "react-icons/fa";
import Options from "../Options";
import { socket } from "../..";
import { Link, redirect } from "react-router-dom";

const DefaultScreen = ({ username, room }) => {
  const handleLeave = () => {
    sessionStorage.clear("user_room_name");
    socket.emit("leave-room", { room, username });
    return redirect("/");
  };
  return (
    <>
      <div className="flex flex-col relative w-full">
        <div className="flex justify-between h-14 bg-blackhover">
          <Link
            to={"/"}
            className="bg-red-500
                text-white text-md
            font-semibold rounded-md px-4 py-2
            tracking-wide hover:bg-blue-500 m-2"
            onClick={handleLeave}
          >
            Leave
          </Link>
          <div
            className="bg-white h-14 w-16 float-right bg-opacity-20 flex justify-center items-center"
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

export default DefaultScreen;
