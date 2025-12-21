import React from "react";

// Utility to check brightness and return black or white for contrast
const getContrastColor = (bgColor) => {
  if (!bgColor) return "#000";
  // Remove '#' if present
  const c = bgColor.startsWith("#") ? bgColor.slice(1) : bgColor;
  const r = parseInt(c.substr(0, 2), 16);
  const g = parseInt(c.substr(2, 2), 16);
  const b = parseInt(c.substr(4, 2), 16);
  // Perceived brightness formula
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 125 ? "#000" : "#fff";
};

const Title = ({ text, color }) => {
  const textColor = getContrastColor(color);
  return (
    <h3 className="text-lg font-bold mb-2" style={{ color: textColor }}>
      {text || "-"}
    </h3>
  );
};

export default Title;
