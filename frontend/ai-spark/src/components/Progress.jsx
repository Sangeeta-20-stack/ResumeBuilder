import React from "react";

const Progress = ({ progress = 0, total = 5, color, bgColor }) => {
  return (
    <div className="flex items-center gap-1.5">
      {[...Array(total)].map((_, index) => (
        <div
          key={index}
          className="w-3 h-3 rounded-full transition-all duration-300"
          style={{
            backgroundColor:
              index < progress
                ? color || "#06b6d4"
                : bgColor || "#cfeff6",
          }}
        />
      ))}
    </div>
  );
};

export default Progress;
