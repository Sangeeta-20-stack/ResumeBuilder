import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4
                 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50"
    >
      <div className="relative w-full max-w-md bg-white/30 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white/30 z-10">

        {/* Heading */}
        <div className="text-center">
          <div className="mx-auto mb-6 w-28 h-28 bg-white/50 rounded-full shadow-lg flex items-center justify-center">
            <FaUserCircle className="text-6xl text-purple-500" />
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent
                         bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500
                         animate-gradient-x hover:scale-105 transition-transform duration-500">
            Welcome Back
          </h1>
          <p className="text-gray-700 font-semibold mt-1 text-sm">
            Login to your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-8">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/60 shadow-inner border border-purple-200 focus:ring-2 focus:ring-purple-400 focus:outline-none backdrop-blur-sm"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/60 shadow-inner border border-purple-200 focus:ring-2 focus:ring-purple-400 focus:outline-none backdrop-blur-sm"
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white font-semibold shadow-lg transition-transform active:scale-95 hover:scale-[1.02]"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-700 font-semibold mt-1 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-sm md:text-md font-extrabold bg-clip-text text-transparent
                       bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500
                       animate-gradient-x hover:scale-105 transition-transform duration-500"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
