import Lottie from "lottie-react";
import loadingAnimation from "../assets/98288-loading.json";
import miniLoadingAnimation from "../assets/loading.json";

const Loading = () => {
  return (
    <div className="bg-blackish w-screen h-screen relative">
      <Lottie
        animationData={loadingAnimation}
        className="absolute inset-0 m-auto"
        loop={true}
      />
    </div>
  );
};

const MiniLoad = () => {
  return (
    <div>
      <Lottie
        className="w-20 mx-auto text-white"
        animationData={miniLoadingAnimation}
      />
    </div>
  );
};

export { Loading, MiniLoad };
