const AnimatedModal = () => {
  return (
    <div className="absolute w-full top-24 z-40">
      <div
        className="relative max-w-xl mx-auto bg-blackhover py-4 px-5
        rounded-lg"
      >
        <p className="text-white">
          <span className="text-white font-semibold">
            Link copied to clipboard.
          </span>
          <span className="opacity-90 pl-2">
            Paste and send anywhere to invite others to join!
          </span>
        </p>
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

export default AnimatedModal
