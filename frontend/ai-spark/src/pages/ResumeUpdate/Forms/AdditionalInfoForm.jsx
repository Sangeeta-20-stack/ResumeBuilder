import React from "react";
import Input from "../../../components/Inputs/Input";
import { LuPlus, LuTrash2 } from "react-icons/lu";
import RatingInput from "../../../components/ResumeSections/RatingInput";

const AdditionalInfoForm = ({
  languages = [],
  interests = [],
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  return (
    <div className="px-6 pt-6 pb-4 space-y-10">
      {/* HEADER */}
      <h2
        className="text-2xl font-extrabold
        bg-clip-text text-transparent
        bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500"
      >
        Additional Information
      </h2>

      {/* ================= LANGUAGES ================= */}
      <div className="bg-white/30 backdrop-blur-xl border border-pink-300 rounded-3xl shadow-xl p-6 space-y-6">
        <h3 className="text-xl font-bold">Languages</h3>

        {languages.map((lang, index) => (
          <div
            key={index}
            className="relative bg-white/50 backdrop-blur-sm
            border border-gray-200 rounded-2xl p-4 shadow-md
            hover:shadow-lg transition-shadow"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Language"
                placeholder="English"
                value={lang?.name || ""}
                onChange={({ target }) =>
                  updateArrayItem("languages", index, "name", target.value)
                }
              />

              <div className="flex flex-col">
                <label className="font-medium mb-1">
                  Proficiency ({Math.round((lang?.progress || 0) / 20)}/5)
                </label>
                <RatingInput
                  value={lang?.progress || 0}
                  total={5}
                  onChange={(value) =>
                    updateArrayItem("languages", index, "progress", value)
                  }
                />
              </div>
            </div>

            {languages.length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem("languages", index)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-600
                bg-white/60 backdrop-blur-xl p-2 rounded-full shadow-md
                hover:shadow-lg transition"
              >
                <LuTrash2 size={18} />
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            addArrayItem("languages", { name: "", progress: 0 })
          }
          className="flex items-center gap-2 px-6 py-3 rounded-full
          bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500
          text-white font-bold shadow-lg hover:scale-105 transition-all"
        >
          <LuPlus size={18} /> Add Language
        </button>
      </div>

      {/* ================= INTERESTS ================= */}
      <div className="bg-white/30 backdrop-blur-xl border border-pink-300 rounded-3xl shadow-xl p-6 space-y-6">
        <h3 className="text-xl font-bold">Interests</h3>

        {interests.map((interest, index) => (
          <div
            key={index}
            className="relative bg-white/50 backdrop-blur-sm
            border border-gray-200 rounded-2xl p-4 shadow-md
            hover:shadow-lg transition-shadow"
          >
            <Input
              placeholder="Reading, Music, Open Source"
              value={interest || ""}
              onChange={({ target }) =>
                updateArrayItem("interests", index, null, target.value)
              }
            />

            {interests.length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem("interests", index)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-600
                bg-white/60 backdrop-blur-xl p-2 rounded-full shadow-md
                hover:shadow-lg transition"
              >
                <LuTrash2 size={18} />
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={() => addArrayItem("interests", "")}
          className="flex items-center gap-2 px-6 py-3 rounded-full
          bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500
          text-white font-bold shadow-lg hover:scale-105 transition-all"
        >
          <LuPlus size={18} /> Add Interest
        </button>
      </div>
    </div>
  );
};

export default AdditionalInfoForm;
