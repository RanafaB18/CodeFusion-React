import { FaComment, FaMicrophone, FaRegComment, FaVideo } from "react-icons/fa";

const SideBar = ({ showModal, setShowModal }) => {
    const handleClick = () => {
        setShowModal(!showModal);
      };
  return (
    <aside
      className="hidden border border-white border-opacity-25 p-3
    bg-blackish md:flex md:flex-col md:justify-end"
    >
      <div className="my-2 mx-auto hover:bg-blackhover rounded p-3">
        <FaMicrophone className="bottom-nav-icon" />
      </div>
      <div className="my-2 mx-auto hover:bg-blackhover rounded p-3">
        <FaVideo className="bottom-nav-icon" />
      </div>
      <div className="my-2 mx-auto hover:bg-blackhover rounded p-3" onClick={handleClick}>
        {showModal ? <FaRegComment className="bottom-nav-icon" /> : <FaComment className="bottom-nav-icon" />}
      </div>
    </aside>
  );
};

export default SideBar;
