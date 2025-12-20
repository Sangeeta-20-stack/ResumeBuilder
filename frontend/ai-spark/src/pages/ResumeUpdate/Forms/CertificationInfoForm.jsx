import React from "react";
import Input from "../../../components/Inputs/Input";
import { LuPlus, LuTrash2, LuAward, LuCalendar } from "react-icons/lu";

const CertificationInfoForm = ({
  certifications = [],
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  if (!Array.isArray(certifications)) certifications = [];

  return (
    <div className="px-6 pt-6 pb-4">
      {/* HEADER */}
      <h2
        className="text-2xl font-extrabold mb-6
        bg-clip-text text-transparent
        bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500"
      >
        Certifications
      </h2>

      {/* CERTIFICATION CARDS */}
      <div className="space-y-6">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className="relative bg-white/30 backdrop-blur-xl
            border border-pink-300 rounded-3xl
            shadow-xl p-6 hover:shadow-2xl transition-all"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* TITLE */}
              <Input
                label="Certification Title"
                placeholder="Full Stack Web Developer"
                type="text"
                value={cert?.title || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "title", target.value)
                }
                icon={<LuAward />}
              />

              {/* ISSUER */}
              <Input
                label="Issued By"
                placeholder="Coursera / Google / Udemy"
                type="text"
                value={cert?.issuer || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "issuer", target.value)
                }
              />

              {/* YEAR */}
              <Input
                label="Year"
                placeholder="2024"
                type="text"
                value={cert?.year || ""}
                onChange={({ target }) =>
                  updateArrayItem(index, "year", target.value)
                }
                icon={<LuCalendar />}
              />
            </div>

            {/* REMOVE BUTTON */}
            {certifications.length > 1 && (
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

        {/* ADD BUTTON */}
        <button
          type="button"
          onClick={() =>
            addArrayItem({
              title: "",
              issuer: "",
              year: "",
            })
          }
          className="flex items-center gap-2 px-6 py-3 rounded-full
          bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500
          text-white font-bold shadow-lg
          hover:scale-105 transition-all duration-300"
        >
          <LuPlus size={18} /> Add Certification
        </button>
      </div>
    </div>
  );
};

export default CertificationInfoForm;
