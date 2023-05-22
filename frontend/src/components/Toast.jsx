import { FaUser } from "react-icons/fa";
const Toast = ({ toast, showToast }) => {
  console.log("Toast", showToast);
  return (
    <div
      className={`absolute left-0 top-[80%] right-0
          transition duration-300 ${
            showToast ? "-translate-y-5" : "opacity-0"
          }  z-20
       mx-auto w-64 h-4 `}
    >
      <div className="flex items-center gap-3 rounded-lg bg-[#16191d] bg-opacity-50">
        <div className="bg-gray-300 rounded-l-lg p-2 pb-0">
          <FaUser className="text-5xl text-gray-400" />
        </div>
        <p className="text-white">
          <span className="text-green-600 font-semibold">{toast.name}</span>{" "}
          {toast.text}
        </p>
      </div>
    </div>
  );
};

export default Toast;
