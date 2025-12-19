import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import ProfileInfoCard from "../Cards/ProfileInfoCard";

const DashboardLayout = ({ children }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-white">
      {/* Navbar */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-white/40 border-b border-pink-300 px-6 md:px-16 h-20 flex items-center justify-between shadow-md">
        <Link to="/dashboard">
          <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent 
                         bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500 
                         hover:scale-105 transition-transform duration-500">
            CV Spark
          </h1>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <ProfileInfoCard user={user} />
          ) : (
            <Link
              to="/login"
              className="px-5 py-2 bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500 
                         text-white rounded-full font-semibold shadow-lg hover:shadow-2xl 
                         hover:scale-105 transition-all duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="p-6 md:p-12">{children}</div>
    </div>
  );
};

export default DashboardLayout;
