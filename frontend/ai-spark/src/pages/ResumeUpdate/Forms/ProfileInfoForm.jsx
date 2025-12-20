import React from "react";
import ProfilePhotoSelector from "../../../components/Inputs/ProfilePhotoSelector";
import Input from "../../../components/Inputs/Input";

const ProfileInfoForm = ({ profileData, updateSection, onNext }) => {
  return (
    <div
      className="px-6 pt-6 pb-6
      bg-white/30 backdrop-blur-xl
      border border-pink-300
      rounded-3xl shadow-xl mx-4 my-4"
    >
      {/* HEADING */}
      <h2
        className="text-2xl font-extrabold mb-1
        bg-clip-text text-transparent
        bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500"
      >
        Personal Information
      </h2>

      <p className="text-sm text-gray-700 mb-5 font-medium">
        Tell us a bit about yourself
      </p>

      {/* PHOTO SELECTOR */}
      <ProfilePhotoSelector
        image={profileData?.profileImg}
        setImage={(value) => updateSection("profileImg", value)}
        preview={profileData?.profilePreviewUrl}
        setPreview={(value) =>
          updateSection("profilePreviewUrl", value)
        }
      />

      {/* FORM FIELDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
        <Input
          value={profileData?.fullName || ""}
          onChange={({ target }) =>
            updateSection("fullName", target.value)
          }
          label="Full Name"
          placeholder="John Doe"
          type="text"
        />

        <Input
          value={profileData?.designation || ""}
          onChange={({ target }) =>
            updateSection("designation", target.value)
          }
          label="Designation"
          placeholder="UI / Frontend Developer"
          type="text"
        />

        {/* SUMMARY */}
        <div className="col-span-1 md:col-span-2 mt-2">
          <label
            className="text-xs font-semibold text-gray-700 mb-1 block"
          >
            Summary
          </label>

          <textarea
            placeholder="Write a short professional summary..."
            rows={4}
            value={profileData?.summary || ""}
            onChange={({ target }) =>
              updateSection("summary", target.value)
            }
            className="w-full rounded-xl border border-pink-300
              bg-white/70 backdrop-blur-md
              px-4 py-3 text-sm text-gray-800
              focus:outline-none focus:ring-2
              focus:ring-pink-400 transition"
          />
        </div>
      </div>

      {/* ACTION BUTTON */}
     
    </div>
  );
};

export default ProfileInfoForm;
