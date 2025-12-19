import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const ProfileInfoCard = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  if (!user) return null;

  // Support backend fields
  const fullName = user.fullName || user.name || "User";
  const profileImage = user.profileImage || user.profileImageUrl || null;

  return (
    <div className="flex items-center gap-4">
      {/* Profile Picture */}
      {profileImage ? (
        <img
          src={profileImage}
          alt="Profile"
          className="w-14 h-14 rounded-full object-cover border-2 border-pink-400"
        />
      ) : (
        <FaUserCircle className="text-5xl text-pink-500" />
      )}

      {/* Name + Logout */}
      <div className="flex flex-col leading-tight">
        <span className="text-lg md:text-xl font-bold text-gray-800">
          {fullName}
        </span>

        <button
          onClick={handleLogout}
          className="text-sm md:text-base font-semibold text-red-600 hover:underline w-fit mt-1"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfoCard;
