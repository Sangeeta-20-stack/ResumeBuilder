import React from "react";
import Input from "../../../components/Inputs/Input";
import { LuPlus, LuTrash2 } from "react-icons/lu";
import RatingInput from "../../../components/ResumeSections/RatingInput";

const SkillsInfoForm = ({ skillsInfo = [], updateArrayItem, addArrayItem, removeArrayItem }) => {
  if (!Array.isArray(skillsInfo)) skillsInfo = []; // safety fallback

  return (
    <div className="px-6 pt-6 pb-4">
      {/* HEADER */}
      <h2
        className="text-2xl font-extrabold mb-6
        bg-clip-text text-transparent
        bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500"
      >
        Skills
      </h2>

      {/* FORM CARD */}
      <div className="bg-white/30 backdrop-blur-xl border border-pink-300 rounded-3xl shadow-xl p-6 space-y-6">
        {skillsInfo.map((skill, index) => (
          <div
            key={index}
            className="relative bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Skill Name"
                placeholder="JavaScript"
                type="text"
                value={skill?.name || ""}
                onChange={({ target }) => updateArrayItem(index, "name", target.value)}
              />

              <div className="flex flex-col">
                <label className="font-medium mb-1">
                  Proficiency ({Math.round(skill?.progress / 20) || 0}/5)
                </label>
                <div className="mt-2">
                  <RatingInput
                    value={skill?.progress || 0}
                    total={5}
                    onChange={(newValue) => updateArrayItem(index, "progress", newValue)}
                  />
                </div>
              </div>
            </div>

            {skillsInfo.length > 1 && (
              <button
                type="button"
                className="absolute top-4 right-4 text-red-500 hover:text-red-600
                  bg-white/60 backdrop-blur-xl p-2 rounded-full shadow-md
                  hover:shadow-lg transition-all"
                onClick={() => removeArrayItem(index)}
              >
                <LuTrash2 size={18} />
              </button>
            )}
          </div>
        ))}

        {/* ADD BUTTON */}
        <button
          type="button"
          className="flex items-center gap-2 px-6 py-3 rounded-full
            bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500
            text-white font-bold shadow-lg hover:scale-105 transition-all duration-300"
          onClick={() => addArrayItem({ name: "", progress: 0 })}
        >
          <LuPlus size={18} /> Add Skill
        </button>
      </div>
    </div>
  );
};

export default SkillsInfoForm;
