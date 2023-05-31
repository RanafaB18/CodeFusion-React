import { forwardRef } from "react";
const TabButtons = forwardRef(({ icon, text, index, onClick }, ref) => {
  const handleClick = (event) => {
    let tabText
    if (text.includes("Document")) {
      tabText = "Document "
    } else {
      tabText = "Code "
    }
    onClick({icon, text: tabText})
  }
  return (
    <button index={index} ref={ref} onClick={handleClick} className="hover:bg-blacklike w-full px-4 py-2
    flex items-center opacity-90 rounded-md">
      {icon}
      <span className="ml-4 text-white text-lg">{text}</span>
    </button>
  );
});

export default TabButtons;
