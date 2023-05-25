const MessageToast = ({ toast, showMessageToast, setScreenIndex }) => {
    const handleClick = () => {
        setScreenIndex(0)
    }
  return (
    <div
      className={`absolute left-0 top-[80%] right-0
          transition duration-300 ${
            showMessageToast ? "-translate-y-5" : "opacity-0"
          }  z-20
       mx-auto max-w-sm h-4 `}
    >
      <div className="flex items-center justify-evenly gap-3 rounded-lg bg-[#16191d] py-3 bg-opacity-50">
        <span className="text-white font-semibold">{toast.name}</span>
        <span className="text-white w-1/2 overflow-hidden">{toast.text}</span>
        <button onClick={handleClick} className="hover:bg-opacity-80 hover:text-[#4a5567] text-white p-2 bg-white bg-opacity-60 rounded-md">
          View
        </button>
      </div>
    </div>
  );
};

export default MessageToast;
