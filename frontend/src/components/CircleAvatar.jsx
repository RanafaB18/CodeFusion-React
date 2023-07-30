import { useContext } from "react";
import { ProviderContext } from "../context/ProviderContext";

const CircleAvatar = ({ name }) => {
  const { color } = useContext(ProviderContext)
  return (
    <div
      style={{ borderColor: color }}
      className={`flex items-center justify-center h-10 w-10 border-2 bg-blacklike rounded-full `}
    >
      <div className={`text-white`}>{name[0].toUpperCase()}</div>
    </div>
  );
};

export default CircleAvatar;
