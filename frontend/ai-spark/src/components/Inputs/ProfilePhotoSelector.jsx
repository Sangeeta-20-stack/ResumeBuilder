import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(preview || null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImage(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    if (setPreview) {
      setPreview(url);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);

    if (setPreview) {
      setPreview(null);
    }

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const onChooseFile = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center mb-8">
      {/* Hidden File Input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />

      {/* Avatar */}
      <div
        className="relative w-32 h-32 rounded-full
        bg-white/30 backdrop-blur-xl
        border border-pink-300
        shadow-xl flex items-center justify-center
        transition-all duration-300
        hover:scale-105 hover:shadow-2xl"
      >
        {/* Gradient Ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500 opacity-20 blur-md"></div>

        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Profile Preview"
            className="relative w-full h-full rounded-full object-cover"
          />
        ) : (
          <LuUser className="relative text-5xl text-purple-500" />
        )}

        {/* Remove Button */}
        {previewUrl && (
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2
            bg-red-500/90 backdrop-blur-md
            text-white p-1.5 rounded-full
            shadow-lg hover:scale-110
            transition"
          >
            <LuTrash size={14} />
          </button>
        )}
      </div>

      {/* Upload Button */}
      <button
        type="button"
        onClick={onChooseFile}
        className="mt-4 px-5 py-2 rounded-full
        flex items-center gap-2 text-sm font-semibold
        bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500
        text-white shadow-lg
        hover:scale-105 hover:shadow-xl
        transition-all duration-300"
      >
        <LuUpload />
        {previewUrl ? "Change Photo" : "Upload Photo"}
      </button>
    </div>
  );
};

export default ProfilePhotoSelector;
