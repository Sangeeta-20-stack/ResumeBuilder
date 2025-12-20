import React, { useState } from "react";
import { LuCheck, LuPencil } from "react-icons/lu";

const TitleInput = ({ title, setTitle }) => {
  const [showInput, setShowInput] = useState(false);

  return (
    <div className="flex items-center gap-3 group">
      {showInput ? (
        <>
          {/* Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Resume Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="
                bg-white/40 backdrop-blur-md
                px-3 py-1.5 rounded-md
                text-sm md:text-[17px] font-semibold text-gray-900
                outline-none
                border border-transparent
                focus:border-purple-400
                shadow-sm focus:shadow-md
                transition-all duration-300
              "
            />

            {/* Gradient underline */}
            <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500 rounded-full" />
          </div>

          {/* Confirm */}
          <button
            onClick={() => setShowInput(false)}
            className="
              p-1.5 rounded-full
              bg-gradient-to-r from-purple-500 to-pink-500
              text-white
              shadow-md
              hover:scale-110 hover:shadow-lg
              transition
            "
          >
            <LuCheck size={16} />
          </button>
        </>
      ) : (
        <>
          {/* Title */}
          <h2
            className="
              text-sm md:text-[17px] font-semibold text-gray-900
              transition-all duration-300
              group-hover:text-purple-600
            "
          >
            {title}
          </h2>

          {/* Edit */}
          <button
            onClick={() => setShowInput(true)}
            className="
              p-1.5 rounded-full
              bg-purple-100
              text-purple-600
              hover:bg-purple-500 hover:text-white
              shadow-sm hover:shadow-md
              transition-all duration-300
            "
          >
            <LuPencil size={14} />
          </button>
        </>
      )}
    </div>
  );
};

export default TitleInput;
