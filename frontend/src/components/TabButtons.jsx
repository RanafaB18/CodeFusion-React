import { forwardRef } from "react";
const TabButtons = forwardRef(({ icon, text, index }, ref) => {

  return (
    <button index={index} ref={ref} className="hover:bg-blacklike w-full px-4 py-2
    flex items-center opacity-90 rounded-md">
      {icon}
      <span className="ml-4 text-white text-lg">{text}</span>
    </button>
  );
});

export default TabButtons;
