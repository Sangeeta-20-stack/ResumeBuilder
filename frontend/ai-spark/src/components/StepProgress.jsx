import React from "react";

const StepProgress = ({ progress }) => {
  return (
    <div className="w-full h-2 bg-white/40 backdrop-blur rounded-full overflow-hidden border border-pink-200">
      <div
        className="h-full rounded-full transition-all duration-500
        bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default StepProgress;

