import React, { useState, useEffect } from "react";

const ResumeSummaryCard = ({ imageUrl, title, lastUpdated, onSelect }) => {
  const [bgColor, setBgColor] = useState("#ffffff");

  useEffect(() => {
    if (imageUrl) {
      getLightColorFromImage(imageUrl)
        .then((color) => setBgColor(color))
        .catch(() => setBgColor("#ffffff"));
    }
    // No else needed, initial state is already white
  }, [imageUrl]);

  return (
    <div
      className="h-[300px] flex flex-col items-center justify-between rounded-lg border border-gray-200 hover:border-purple-300 overflow-hidden cursor-pointer"
      style={{ backgroundColor: bgColor }}
      onClick={onSelect}
    >
      {/* Image */}
      <div className="w-full h-[200px]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover rounded"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400 text-sm">No Image</span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="w-full px-4 py-3">
        <h5 className="text-sm font-medium truncate overflow-hidden whitespace-nowrap">
          {title}
        </h5>
        <p className="text-xs font-medium text-gray-500 mt-0.5">
          Last Updated: {lastUpdated}
        </p>
      </div>
    </div>
  );
};

export default ResumeSummaryCard;

// Function to extract a light color from an image using canvas
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

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let r = 0, g = 0, b = 0, count = 0;

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

      if (count === 0) resolve("#ffffff");
      else {
        r = Math.round(r / count);
        g = Math.round(g / count);
        b = Math.round(b / count);
        resolve(`rgb(${r},${g},${b})`);
      }
    };

    img.onerror = (e) => {
      console.error("Failed to load image:", e);
      reject(new Error("Image could not be loaded or is blocked by CORS."));
    };
  });
}
