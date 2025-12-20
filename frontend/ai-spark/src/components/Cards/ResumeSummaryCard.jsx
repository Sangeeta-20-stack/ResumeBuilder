import React, { useState, useEffect } from "react";

const ResumeSummaryCard = ({ imageUrl, title, lastUpdated, onSelect }) => {
  const [bgColor, setBgColor] = useState("#f9fafb"); // slightly off-white

  useEffect(() => {
    if (imageUrl) {
      getLightColorFromImage(imageUrl)
        .then((color) => setBgColor(color))
        .catch(() => setBgColor("#f9fafb"));
    }
  }, [imageUrl]);

  return (
    <div
      onClick={onSelect}
      className="
        h-[300px] flex flex-col justify-between
        rounded-3xl overflow-hidden cursor-pointer
        border-2 border-purple-300/60
        ring-1 ring-black/5
        transition-all duration-300
        hover:scale-[1.04]
        hover:border-purple-500
        hover:ring-purple-300/40
        hover:shadow-[0_20px_40px_-15px_rgba(124,58,237,0.45)]
        relative
        bg-white
      "
      style={{ backgroundColor: bgColor }}
    >
      {/* soft contrast overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-black/10 pointer-events-none" />

      {/* IMAGE */}
      <div className="w-full h-[190px] relative z-10">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="
              w-full h-full object-cover
              transition-transform duration-500
              hover:scale-105
            "
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
            <span className="text-gray-500 text-sm font-medium">
              No Preview
            </span>
          </div>
        )}
      </div>

      {/* DETAILS */}
      <div className="relative z-10 px-4 py-4 bg-white/70 backdrop-blur-md">
        <h5
          className="text-sm font-semibold text-gray-800 truncate"
          title={title}
        >
          {title}
        </h5>

        <p className="text-xs text-gray-600 mt-1">
          Last updated · {lastUpdated}
        </p>
      </div>
    </div>
  );
};

export default ResumeSummaryCard;

/* ================= COLOR EXTRACTION LOGIC (UNCHANGED) ================= */

function getLightColorFromImage(imageUrl) {
  return new Promise((resolve, reject) => {
    if (!imageUrl || typeof imageUrl !== "string") {
      return reject(new Error("Invalid image URL"));
    }

    const img = new Image();
    if (!imageUrl.startsWith("data")) img.crossOrigin = "anonymous";
    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      ).data;

      let r = 0,
        g = 0,
        b = 0,
        count = 0;

      for (let i = 0; i < imageData.length; i += 4) {
        const red = imageData[i];
        const green = imageData[i + 1];
        const blue = imageData[i + 2];
        const brightness = (red + green + blue) / 3;

        if (brightness > 180) {
          r += red;
          g += green;
          b += blue;
          count++;
        }
      }

      if (count === 0) resolve("#f9fafb");
      else {
        r = Math.round(r / count);
        g = Math.round(g / count);
        b = Math.round(b / count);
        resolve(`rgb(${r},${g},${b})`);
      }
    };

    img.onerror = () => {
      reject(new Error("Image could not be loaded or is blocked by CORS."));
    };
  });
}
