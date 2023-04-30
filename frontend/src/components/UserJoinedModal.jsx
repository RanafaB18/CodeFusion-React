const UserJoinedModal = ({ newUser }) => {
  return (
    <div className="absolute bottom-full left-1/4 right-1/4">
      <div
        className="
        relative
        text-center text-xl p-3
        rounded-tr-lg rounded-tl-lg
        text-white
        bg-blackhover"
      >
        <p>{newUser} Joined</p>
        <div
          className="absolute w-full mr-4
          bottom-0 left-0
          bg-white border-2 rounded-b-lg
          animate-decrease"
        ></div>
      </div>
    </div>
  );
};

export default UserJoinedModal;
