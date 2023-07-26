import React from "react";

const CircleAvatar = ({ name, color = "red" }) => {
  return (
    <div
      className={`flex items-center justify-center h-10 w-10 border-2 border-${color}-600 bg-blacklike rounded-full `}
    >
      <div className={`text-white`}>{name[0].toUpperCase()}</div>
    </div>
  );
};

export default CircleAvatar;
