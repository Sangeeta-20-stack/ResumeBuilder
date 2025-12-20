import React from "react";
import Input from "../../../components/Inputs/Input";
import {
  LuMail,
  LuPhone,
  LuMapPin,
  LuLinkedin,
  LuGithub,
  LuGlobe,
} from "react-icons/lu";

const ContactInfoForm = ({ contactInfo, updateSection }) => {
  return (
    <div className="px-6 pt-6 pb-4">
      {/* HEADER */}
      <h2
        className="text-2xl font-extrabold mb-6
        bg-clip-text text-transparent
        bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500"
      >
        Contact Information
      </h2>

      {/* FORM CARD */}
      <div
        className="bg-white/30 backdrop-blur-xl
        border border-pink-300 rounded-3xl
        shadow-xl p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* ADDRESS */}
          <div className="md:col-span-2">
            <Input
              label="Address"
              placeholder="City, State, Country"
              type="text"
              value={contactInfo.location || ""}
              onChange={({ target }) =>
                updateSection("location", target.value)
              }
              icon={<LuMapPin />}
            />
          </div>

          {/* EMAIL */}
          <Input
            label="Email"
            placeholder="john@example.com"
            type="email"
            value={contactInfo.email || ""}
            onChange={({ target }) =>
              updateSection("email", target.value)
            }
            icon={<LuMail />}
          />

          {/* PHONE */}
          <Input
            label="Phone Number"
            placeholder="+91 98765 43210"
            type="text"
            value={contactInfo.phone || ""}
            onChange={({ target }) =>
              updateSection("phone", target.value)
            }
            icon={<LuPhone />}
          />

          {/* LINKEDIN */}
          <Input
            label="LinkedIn"
            placeholder="https://linkedin.com/in/username"
            type="text"
            value={contactInfo.linkedin || ""}
            onChange={({ target }) =>
              updateSection("linkedin", target.value)
            }
            icon={<LuLinkedin />}
          />

          {/* GITHUB */}
          <Input
            label="GitHub"
            placeholder="https://github.com/username"
            type="text"
            value={contactInfo.github || ""}
            onChange={({ target }) =>
              updateSection("github", target.value)
            }
            icon={<LuGithub />}
          />

          {/* WEBSITE */}
          <div className="md:col-span-2">
            <Input
              label="Portfolio / Website"
              placeholder="https://yourwebsite.com"
              type="text"
              value={contactInfo.website || ""}
              onChange={({ target }) =>
                updateSection("website", target.value)
              }
              icon={<LuGlobe />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoForm;
