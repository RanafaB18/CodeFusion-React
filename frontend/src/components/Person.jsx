const Person = ({ name }) => {
  return (
    <div className="mx-4 my-2 flex items-center">
      <div
        className="
        flex items-center justify-center
            bg-blacklike
            border-2 border-red-600
            text-white rounded-full shrink-0 grow-0 w-11 h-11"
      >
        {name[0].toUpperCase()}
      </div>
      <div className="mx-2 text-white text-lg">
        {name}
      </div>
    </div>
  );
};

export default Person;
