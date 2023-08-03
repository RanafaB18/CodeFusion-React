import { useContext } from "react";
import { YjsContext } from "../context/YjsContext";

const CustomInput = () => {
  const { setCustomInput, customInput } = useContext(YjsContext);
  const handleChange = (event) => {
    setCustomInput(event.target.value);
  };
  return (
    <textarea
      value={customInput}
      placeholder="Enter your input"
      className="p-3 row-span-1 rounded-lg drop-shadow resize-none"
      onChange={handleChange}
    ></textarea>
  );
};

export default CustomInput;
