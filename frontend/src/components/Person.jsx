const Person = ({ name, showOnlyCircle, color="red", small }) => {
  return (
    <div className={`mx-${small ? 2:4} my-${small ? 0:2} flex items-center`}>
      <div
        className={`
        flex items-center justify-center
            bg-blacklike
            border-2 border-${color}-600
            text-white rounded-full shrink-0 grow-0 ${small ? "w-8" : "w-11"} ${small ? "h-8" : "h-11"}`}
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
