import CircleAvatar from "./CircleAvatar";
const Person = ({ name }) => {
  return (
    <div
      className="mx-4 my-2 flex items-center"
    >
      <CircleAvatar name={name} />
      <div className="mx-2 text-white text-lg">{name}</div>
    </div>
  );
};

export default Person;
