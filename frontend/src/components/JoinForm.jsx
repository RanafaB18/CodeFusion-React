import { useContext, useState, useEffect } from "react";
import axiosUtil from "../services";
import { RoomContext } from "../context/RoomContext";
import { useLoaderData } from "react-router";
export async function loader({ params }) {
  console.log("Params", params);
  return params.id;
}
const JoinForm = ({
  userRoomName,
  setUserRoomName,
  setCreatedUsername,
}) => {
  const { socket } = useContext(RoomContext);
  const roomLink = useLoaderData();
  const handleSubmit = () => {
    socket.emit("join_room", roomLink);
    setCreatedUsername(true);
    sessionStorage.setItem("user_room_name", userRoomName);
  };

  return (
    <div className="pt-20">
      <div className="bg-white p-8 max-w-sm mx-auto rounded-md">
        <form className="" onSubmit={handleSubmit} method="post">
          <p className="mb-6 text-center text-lg">
            Enter your name to join the room
          </p>
          <input
            className="focus:outline-none focus:ring focus:ring-bluish mb-2 text-lg border px-3 py-2 rounded-lg w-full"
            type="text"
            placeholder="Your name"
            value={userRoomName}
            onChange={(event) => setUserRoomName(event.target.value)}
            required
          />
          <button
            className="bg-bluish text-white text-lg
            font-semibold py-2 mt-2 rounded-md w-full"
            type="submit"
          >
            Join
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinForm;
