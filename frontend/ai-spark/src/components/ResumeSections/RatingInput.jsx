import React from "react";

const RatingInput = ({
  value = 0,
  total = 5,
  onChange = () => {},
  activeColor = "bg-purple-700",
  inactiveColor = "bg-purple-200",
}) => {
  const displayValue = Math.round((value / 100) * total);

  const handleClick = (index) => {
    const newValue = Math.round(((index + 1) / total) * 100);
    onChange(newValue);
  };

  return (
    <div className="flex gap-2">
      {[...Array(total)].map((_, index) => {
        const isActive = index < displayValue;
        return (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={`w-6 h-6 cursor-pointer transition-colors rounded-md ${isActive ? activeColor : inactiveColor}`}
          />
        );
      })}
    </div>
  );
};

export default RatingInput;
