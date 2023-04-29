const Person = ({ name, showOnlyCircle, color="red", small }) => {
  return (
    <div className={`mx-${small ? 2:4} my-${small ? 0:2} flex items-center`}>
      <div
        className={`
        flex items-center justify-center
            bg-blacklike
            border-2 border-${color}-600
            text-white rounded-full shrink-0 grow-0 w-${small ? 8:11} h-${small ? 8:11}`}
      >
        {name[0].toUpperCase()}
      </div>
      { !showOnlyCircle &&
      <div className="mx-2 text-white text-lg">
        {name}
      </div>
      }
    </div>
  );
};

export default Person;
