import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
const API_URL = "https://cv-spark-backend.onrender.com";
export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // PAINT BRUSH STATE
  const [splashes, setSplashes] = useState([]);

  // Handle cursor paint splashes
  useEffect(() => {
    const handleMove = (e) => {
      const colors = [
        "rgba(255, 0, 102, 0.45)",   // neon pink
        "rgba(255, 94, 0, 0.45)",    // vivid orange
        "rgba(138, 43, 226, 0.45)",  // electric purple
        "rgba(255, 0, 0, 0.45)",     // bright red
        "rgba(255, 215, 0, 0.4)",    // gold highlight
      ];

      // UNIQUE KEY FIX: add Math.random()
      const splash = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        color: colors[Math.floor(Math.random() * colors.length)],
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
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
              transition: "all 1.2s ease-out",
            }}
          />
        ))}
      </div>

      {/* LOGIN FORM */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-pink-100/30 backdrop-blur-sm px-4">
        <div className="relative w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 border-2 border-purple-500 z-10">
          {/* Heading */}
          <div className="text-center">
            <div className="mx-auto mb-6 w-28 h-28 bg-white rounded-full shadow-lg flex items-center justify-center">
              <FaUserCircle className="text-6xl text-purple-500" />
            </div>

            <h1
              className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent
                         bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500
                         animate-gradient-x hover:scale-105 transition-transform duration-500"
            >
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
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-700 font-semibold mt-4 text-sm">
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
    </div>
  );
}

