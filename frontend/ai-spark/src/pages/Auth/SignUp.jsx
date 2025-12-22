import React, { useState, useEffect } from "react";
import { FaUserPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";


const API_URL = "https://cv-spark-backend.onrender.com";


export default function SignUp() {
  const [profilePreview, setProfilePreview] = useState(null);
  const [profileFile, setProfileFile] = useState(null); // store actual file
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // PAINT BRUSH STATE
  const [splashes, setSplashes] = useState([]);

  useEffect(() => {
    const handleMove = (e) => {
      const colors = [
        "rgba(255, 0, 102, 0.45)",
        "rgba(255, 94, 0, 0.45)",
        "rgba(138, 43, 226, 0.45)",
        "rgba(255, 0, 0, 0.45)",
        "rgba(255, 215, 0, 0.4)"
      ];

      const splash = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        color: colors[Math.floor(Math.random() * colors.length)]
      };

      setSplashes((prev) => [...prev.slice(-20), splash]);

      setTimeout(() => {
        setSplashes((prev) => prev.filter((s) => s.id !== splash.id));
      }, 1200);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfilePreview(URL.createObjectURL(file));
    setProfileFile(file); // save actual file to upload
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      if (profileFile) formDataToSend.append("profileImage", profileFile);

      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        body: formDataToSend
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* PAINT SPLASH LAYER */}
      <div className="pointer-events-none fixed inset-0 z-10">
        {splashes.map((s) => (
          <span
            key={s.id}
            className="absolute rounded-full blur-3xl animate-pulse"
            style={{
              left: s.x - 60,
              top: s.y - 60,
              width: "120px",
              height: "120px",
              background: s.color,
              transition: "all 1.2s ease-out"
            }}
          />
        ))}
      </div>

      {/* SIGNUP FORM */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-pink-100/30 backdrop-blur-sm px-4">
        <div className="relative w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 border-2 border-purple-500 z-10">
          <div className="text-center">
            <div className="mx-auto mb-6 w-28 h-28 bg-white rounded-full shadow-lg flex items-center justify-center relative overflow-hidden">
              {profilePreview ? (
                <img
                  src={profilePreview}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUserPlus className="text-5xl text-purple-500" />
              )}
              <label className="absolute bottom-0 right-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 p-2 text-white rounded-full shadow-md cursor-pointer text-sm">
                +
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImage}
                />
              </label>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent
                           bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500
                           animate-gradient-x hover:scale-105 transition-transform duration-500">
              Create your account
            </h1>
            <p className="text-gray-700 font-semibold mt-1 text-sm">
              Start building beautiful resumes instantly
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 mt-8">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white shadow-inner border-2 border-purple-500 focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white shadow-inner border-2 border-purple-500 focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white shadow-inner border-2 border-purple-500 focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
              required
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white font-semibold shadow-lg transition-transform active:scale-95 hover:scale-[1.02]"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <p className="text-center text-gray-700 font-semibold mt-4 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-sm md:text-md font-extrabold bg-clip-text text-transparent
                         bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500
                         animate-gradient-x hover:scale-105 transition-transform duration-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

