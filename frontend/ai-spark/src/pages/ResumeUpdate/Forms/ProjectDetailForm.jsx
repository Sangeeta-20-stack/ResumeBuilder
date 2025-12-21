import React from "react";
import Input from "../../../components/Inputs/Input";
import { LuPlus, LuTrash2, LuGithub, LuGlobe } from "react-icons/lu";

const ProjectDetailForm = ({
  projectInfo = [],
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  if (!Array.isArray(projectInfo)) projectInfo = [];

  return (
    <div className="px-6 pt-6 pb-4">
      {/* HEADER */}
      <h2
        className="text-2xl font-extrabold mb-6
        bg-clip-text text-transparent
        bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500"
      >
        Projects
      </h2>

      {/* PROJECT CARDS */}
      <div className="space-y-6">
        {projectInfo.map((project, index) => (
          <div
            key={index}
            className="relative bg-white/30 backdrop-blur-xl
            border border-pink-300 rounded-3xl
            shadow-xl p-6 hover:shadow-2xl transition-all"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* TITLE */}
              <Input
                label="Project Title"
                placeholder="Portfolio Website"
                type="text"
                value={project?.title || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "title", target.value)
                }
              />

              {/* GITHUB */}
              <Input
                label="GitHub Repository"
                placeholder="https://github.com/username/project"
                type="url"
                value={project?.github || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "github", target.value)
                }
                icon={<LuGithub />}
              />

          {/* DESCRIPTION */}
<div className="md:col-span-2">
  <label className="text-xs font-medium text-slate-600 mb-1 block">
    Description
  </label>
  <textarea
    rows={4}
    placeholder="Short description about the project"
    value={project?.description || ""}
    onChange={({ target }) =>
      updateArrayItem(index, "description", target.value)
    }
    className="
      w-full rounded-2xl px-4 py-3 text-sm
      bg-white/50 backdrop-blur-md
      border border-gray-200
      shadow-sm
      focus:outline-none focus:ring-2 focus:ring-pink-400
      focus:border-pink-400
      transition resize-none
    "
  />
</div>


              {/* LIVE DEMO */}
              <div className="md:col-span-2">
                <Input
                  label="Live Demo URL"
                  placeholder="https://yourproject.live"
                  type="url"
                  value={project?.liveDemo || ""}
                  onChange={({ target }) =>
                    updateArrayItem(index, "liveDemo", target.value)
                  }
                  icon={<LuGlobe />}
                />
              </div>
            </div>

            {/* REMOVE BUTTON */}
            {projectInfo.length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem(index)}
                className="absolute top-4 right-4
                bg-white/60 backdrop-blur-xl
                p-2 rounded-full text-red-500
                shadow-md hover:shadow-lg hover:text-red-600 transition"
              >
                <LuTrash2 size={18} />
              </button>
            )}
          </div>
        ))}

        {/* ADD PROJECT */}
        <button
          type="button"
          onClick={() =>
            addArrayItem({
              title: "",
              description: "",
              github: "",
              liveDemo: "",
            })
          }
          className="flex items-center gap-2 px-6 py-3 rounded-full
          bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500
          text-white font-bold shadow-lg
          hover:scale-105 transition-all duration-300"
        >
          <LuPlus size={18} /> Add Project
        </button>
      </div>
    </div>
  );
};

export default ProjectDetailForm;
