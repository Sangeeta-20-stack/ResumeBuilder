import React from "react";

const Title = ({ text, color }) => {
  return (
    <div className="inline-block mb-3">
      <h3
        className="text-[16px] font-bold px-4 py-2 rounded-md"
        style={{
          backgroundColor: color,
          color: "#000",
        }}
      >
        {text || "-"}
      </h3>
    </div>
  );
};

export default Title;
