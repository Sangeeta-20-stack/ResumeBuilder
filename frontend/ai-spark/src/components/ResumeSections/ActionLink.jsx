import React from "react";

const ActionLink = ({ icon, link, bgColor }) => {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-[30px] h-[30px] flex items-center justify-center rounded-full"
        style={{ backgroundColor: bgColor }}
      >
        {icon}
      </div>

      <p className="text-[15px] font-medium underline cursor-pointer break-all">
        {link}
      </p>
    </div>
  );
};

export default ActionLink;
