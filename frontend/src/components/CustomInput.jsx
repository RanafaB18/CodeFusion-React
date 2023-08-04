import { useContext } from "react";
import { YjsContext } from "../context/YjsContext";

const CustomInput = ({ setCustomInput, customInput }) => {
  const handleChange = (event) => {
    setCustomInput(event.target.value);
  };
  return (
    <textarea
      value={customInput}
      placeholder="Enter your input"
      className="p-3 text-black row-span-1 rounded-lg drop-shadow resize-none"
      onChange={handleChange}
    ></textarea>
  );
};

export default CustomInput;
