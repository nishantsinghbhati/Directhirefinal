import React from "react";
import loadingGif from "../src/assets/loading.gif";  // adjust path accordingly

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900">
      <img
        src={loadingGif}
        alt="Loading..."
        className="w-24 h-24"
        style={{ imageRendering: "pixelated" }}
      />
      <div className="absolute text-pink-500 text-3xl font-bold tracking-wider animate-pulse mt-32">
        Loading...
      </div>
    </div>
  );
};

export default Loading;
