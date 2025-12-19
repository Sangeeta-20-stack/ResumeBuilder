import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-pink-50 via-purple-50 to-white/30 backdrop-blur-lg border-b border-pink-300 shadow-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-16 h-16">
        
        {/* Logo */}
        <Link to="/dashboard" className="group relative">
          <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent
                         bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500
                         hover:scale-110 hover:drop-shadow-2xl transition-all duration-500">
            CV Spark
          </h1>
          <div className="absolute -bottom-1 left-0 h-1 w-0 group-hover:w-full
                          bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500
                          rounded-full transition-all duration-500"></div>
        </Link>

        {/* User / Auth Buttons */}
        <div className="flex items-center gap-4 relative">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 via-orange-400 to-purple-600
                           text-white rounded-full font-semibold shadow-lg hover:shadow-2xl
                           hover:scale-105 transition-all duration-300 neon-glow"
              >
                <FaUserCircle className="text-2xl" />
                <span className="hidden md:inline">{user.name}</span>
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gradient-to-br from-pink-600 via-orange-500 to-purple-600/90
                                backdrop-blur-md rounded-xl shadow-2xl border border-purple-400 overflow-hidden animate-fadeIn">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-purple-700 text-white font-medium transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/logout"
                    className="block px-4 py-2 hover:bg-purple-700 text-white font-medium transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-6 py-2 bg-gradient-to-r from-pink-500 via-orange-400 to-purple-600
                         text-white rounded-full font-semibold shadow-lg hover:shadow-2xl
                         hover:scale-105 transition-all duration-300 neon-glow animate-pulse"
            >
              Login / Sign Up
            </Link>
          )}
        </div>
      </div>

      {/* Glow & Animation Styles */}
      <style>{`
        .neon-glow {
          box-shadow: 0 0 8px rgba(255, 100, 255, 0.6),
                      0 0 16px rgba(255, 150, 50, 0.5),
                      0 0 24px rgba(128, 0, 255, 0.4);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Navbar;
