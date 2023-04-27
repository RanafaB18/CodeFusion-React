import { FaPeopleArrows, FaUsers } from "react-icons/fa";
import Person from "../Person";

const PeopleScreen = ({ invite, participants }) => {
  return (
    <div>
      <div className="h-14 w-full bg-blackhover px-4 flex justify-between items-center">
        <div className="flex items-center">
          <FaUsers className="bottom-nav-icon opacity-100" />
          <span className="pl-4 text-xl font-semibold text-white tracking-wide">
            People
          </span>
        </div>
        <div>
          <button
            className="bg-bluish
                text-white text-md
            font-semibold rounded-md px-4 py-2
            tracking-wide hover:bg-blue-500"
            onClick={invite}
          >
            Invite Others
          </button>
        </div>
      </div>
      <div className="py-4">
        {participants.map((peep, index) => (
          <Person key={index} name={peep} />
        ))}
      </div>
    </div>
  );
};

export default PeopleScreen;
