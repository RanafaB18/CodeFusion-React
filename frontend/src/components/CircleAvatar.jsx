import util from "../services"
const CircleAvatar = ({ name, small }) => {
  const color = util.getNameColorCode(name)
  return (
    <div
      style={{ borderColor: color }}
      className={`flex items-center justify-center ${small === true ? "w-8 h-8" : "w-10  h-10"} border-2 bg-blacklike rounded-full `}
    >
      <div className={`text-white`}>{name[0].toUpperCase()}</div>
    </div>
  );
};

export default CircleAvatar;
