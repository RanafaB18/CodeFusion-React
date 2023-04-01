import { useState } from "react";
const JoinForm = ({ userRoomName, setUserRoomName, setCreatedUsername }) => {
  const handleSubmit = () => {
    setCreatedUsername(true);
  };
  return (
    <div className="pt-20">
      <div className="bg-white p-8 max-w-xs mx-auto rounded-md">
        <form className="" onSubmit={handleSubmit}>
          <p className="mb-6 text-center text-lg">
            Enter your name to join the room.
          </p>
          <input
            className="focus:outline-none focus:ring focus:ring-bluish mb-2 text-lg border px-3 py-2 rounded-lg w-full"
            type="text"
            placeholder="Your name"
            value={userRoomName}
            onChange={(event) => setUserRoomName(event.target.value)}
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
