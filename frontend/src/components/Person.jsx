import { useContext } from "react";
import { ProviderContext } from "../context/ProviderContext";
import util from "../services";
const Person = ({ name, showOnlyCircle, small }) => {
  const { color } = useContext(ProviderContext)
  return (
    <div
      className={`${small ? "mx-2" : "mx-4"} ${
        small ? "my-0" : "my-2"
      } flex items-center`}
    >
      <div
        style={{ borderColor: color }}
        className={`
        flex items-center justify-center
            bg-blacklike
            border-2
            text-white rounded-full shrink-0 grow-0 ${small ? "w-8" : "w-11"} ${
          small ? "h-8" : "h-11"
        }`}
      >
        {name[0].toUpperCase()}
      </div>
      {!showOnlyCircle && <div className="mx-2 text-white text-lg">{name}</div>}
    </div>
  );
};

export default Person;
