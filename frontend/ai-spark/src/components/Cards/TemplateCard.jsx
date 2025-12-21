import React from "react";

const TemplateCard = ({ thumbnailImg, isSelected, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className={`h-auto md:h-[300px] flex flex-col items-center justify-between 
        bg-white rounded-lg border overflow-hidden cursor-pointer transition-all
        ${
          isSelected
            ? "border-purple-500 border-2 shadow-lg"
            : "border-gray-200 hover:border-purple-300"
        }`}
    >
      {thumbnailImg ? (
        <img
          src={thumbnailImg}
          alt="Template preview"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
          No Preview
        </div>
      )}
    </div>
  );
};

export default TemplateCard;
