import React, { useState } from "react";

const ToggleButton = ({handleState}) => {
  const [checked, setChecked] = useState(true);
  const handleChange= () => {
    setChecked(!checked)
    handleState(!checked)
  }
  // red looks pretty cool...use #dfe2e7 if you change your mind
  return (
    <div onClick={handleChange} className={`relative w-[40px] h-[20px] rounded-2xl transition duration-300 ${checked ? 'bg-[#4299e1]': 'bg-red-500'}`}>
        <input onChange={handleChange} checked={checked} type="checkbox" className="sr-only"/>
        <span className={`absolute h-3 w-3 bg-white rounded-full
        m-1 transition duration-300 ${checked ? 'translate-x-5' : 'left-0'}`}></span>
    </div>
  );
};

export default ToggleButton;
