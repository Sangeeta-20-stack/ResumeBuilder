import React, { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [profilePreview, setProfilePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfilePreview(URL.createObjectURL(file));
    const reader = new FileReader();
    reader.onloadend = () =>
      setFormData((prev) => ({ ...prev, profilePic: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/premium-photo/top-view-resumes-applicants-magnifying-glass-green-background-job-search-concept_35674-13811.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative w-full max-w-md bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/40 z-10">

        {/* Heading */}
        <div className="text-center">
          <div className="mx-auto mb-6 w-28 h-28 bg-white rounded-full shadow-lg flex items-center justify-center relative overflow-hidden">
            {profilePreview ? (
              <img
                src={profilePreview}
                alt=""
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
          <p className="text-black-200 font-semibold mt-1 text-sm">
            Start building beautiful resumes instantly
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-8">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white shadow-inner border border-purple-200 focus:ring-2 focus:ring-purple-400 focus:outline-none"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white shadow-inner border border-purple-200 focus:ring-2 focus:ring-purple-400 focus:outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white shadow-inner border border-purple-200 focus:ring-2 focus:ring-purple-400 focus:outline-none"
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

        {/* Footer */}
        <p className="text-center text-black-200 font-semibold mt-1 text-sm">
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
  );
}
