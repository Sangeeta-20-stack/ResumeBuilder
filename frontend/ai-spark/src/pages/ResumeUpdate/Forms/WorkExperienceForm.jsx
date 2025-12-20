import React from "react";
import Input from "../../../components/Inputs/Input";
import { LuPlus, LuTrash2 } from "react-icons/lu";

const WorkExperienceForm = ({
  workExperience,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  return (
    <div className="px-6 pt-6 pb-4">
      {/* HEADER */}
      <h2
        className="text-2xl font-extrabold mb-6
        bg-clip-text text-transparent
        bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500"
      >
        Work Experience
      </h2>

      {/* FORM CARD */}
      {workExperience.map((experience, index) => (
        <div
          key={index}
          className="bg-white/30 backdrop-blur-xl border border-pink-300
          rounded-3xl shadow-xl p-6 mb-6 relative hover:shadow-2xl transition-shadow duration-300"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Company"
              placeholder="ABC Corporation"
              type="text"
              value={experience.company || ""}
              onChange={({ target }) =>
                updateArrayItem(index, "company", target.value)
              }
            />
            <Input
              label="Role"
              placeholder="Frontend Developer"
              type="text"
              value={experience.role || ""}
              onChange={({ target }) =>
                updateArrayItem(index, "role", target.value)
              }
            />
            <Input
              label="Start Date"
              type="month"
              value={experience.startDate || ""}
              onChange={({ target }) =>
                updateArrayItem(index, "startDate", target.value)
              }
            />
            <Input
              label="End Date"
              type="month"
              value={experience.endDate || ""}
              onChange={({ target }) =>
                updateArrayItem(index, "endDate", target.value)
              }
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 font-medium mb-1">
              Description
            </label>
            <textarea
              placeholder="What did you do in this role?"
              className="w-full border border-gray-300 rounded-lg p-2
                focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent
                bg-white/50 backdrop-blur-sm"
              rows={3}
              value={experience.description || ""}
              onChange={({ target }) =>
                updateArrayItem(index, "description", target.value)
              }
            />
          </div>

          {workExperience.length > 1 && (
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
        onClick={() =>
          addArrayItem({
            company: "",
            role: "",
            startDate: "",
            endDate: "",
            description: "",
          })
        }
      >
        <LuPlus size={18} /> Add Work Experience
      </button>
    </div>
  );
};

export default WorkExperienceForm;
