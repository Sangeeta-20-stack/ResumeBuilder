import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ResumeSummaryCard from "../../components/Cards/ResumeSummaryCard";
import { LuCirclePlus } from "react-icons/lu";
import moment from "moment";

const Dashboard = () => {
  const navigate = useNavigate();
  const [allResumes, setAllResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ================= PAINT BRUSH STATE ================= */
  const [splashes, setSplashes] = useState([]);

  /* ================= CURSOR PAINT EFFECT ================= */
  useEffect(() => {
    const handleMove = (e) => {
      const colors = [
        "rgba(255, 0, 102, 0.45)",   // neon pink
        "rgba(255, 94, 0, 0.45)",    // vivid orange
        "rgba(138, 43, 226, 0.45)",  // electric purple
        "rgba(255, 0, 0, 0.45)",     // bright red
        "rgba(255, 215, 0, 0.40)",   // gold
      ];

      const splash = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        color: colors[Math.floor(Math.random() * colors.length)],
      };

      setSplashes((prev) => [...prev.slice(-18), splash]);

      setTimeout(() => {
        setSplashes((prev) => prev.filter((s) => s.id !== splash.id));
      }, 1200);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  /* ================= FETCH RESUMES ================= */
  useEffect(() => {
    const fetchAllResumes = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        setError("User not authenticated");
        setAllResumes([]);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:8000/api/resume", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAllResumes(response.data || []);
      } catch (err) {
        console.error("Error fetching resumes:", err);
        setError("Failed to load resumes");
        setAllResumes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllResumes();
  }, []);

  return (
    <DashboardLayout>
      {/* ================= PAINT SPLASH LAYER ================= */}
      <div className="pointer-events-none fixed inset-0 z-10">
        {splashes.map((s) => (
          <span
            key={s.id}
            className="absolute rounded-full blur-3xl animate-pulse"
            style={{
              left: s.x - 50,
              top: s.y - 50,
              width: "100px",
              height: "100px",
              background: s.color,
              transition: "all 1.2s ease-out",
            }}
          />
        ))}
      </div>

      {/* ================= DASHBOARD CONTENT ================= */}
      <div className="relative z-20 grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Add New Resume Card */}
        <div
          onClick={() => navigate("/create-resume")}
          className="
            h-[300px] flex flex-col gap-5 items-center justify-center
            rounded-3xl cursor-pointer relative overflow-hidden
            bg-gradient-to-br from-pink-50 via-purple-50 to-white

            border-2 border-purple-400/70
            ring-1 ring-black/5

            transition-all duration-300
            hover:scale-[1.04]
            hover:border-purple-500
            hover:ring-purple-300/40
            hover:shadow-[0_20px_40px_-15px_rgba(124,58,237,0.45)]
          "
        >
          {/* subtle overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-black/10 pointer-events-none" />

          <div
            className="
              relative z-10 w-14 h-14 flex items-center justify-center
              bg-gradient-to-tr from-purple-200/70 to-pink-200/70
              rounded-2xl
              transition-all duration-300
              hover:from-purple-300 hover:to-pink-300
              shadow-md
            "
          >
            <LuCirclePlus className="text-2xl text-purple-700 animate-pulse" />
          </div>

          <h3 className="relative z-10 font-semibold text-gray-800 text-lg">
            Add New Resume
          </h3>
        </div>

        {/* Loading */}
        {loading && (
          <div className="col-span-full text-center text-gray-500 text-lg">
            Loading resumes...
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="col-span-full text-center text-red-500 text-lg">
            {error}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && allResumes.length === 0 && (
          <div className="col-span-full text-center text-gray-400 text-lg">
            No resumes found. Click "Add New Resume" to create one.
          </div>
        )}

        {/* Resume Cards */}
        {!loading &&
          !error &&
          allResumes.length > 0 &&
          allResumes.map((resume) => (
            <ResumeSummaryCard
              key={resume._id}
              imageUrl={resume.thumbnailLink || null}
              title={resume.title || "Untitled"}
              lastUpdated={
                resume.updatedAt
                  ? moment(resume.updatedAt).format("DD MMM YYYY")
                  : "Not updated"
              }
              onSelect={() => navigate(`/resume/${resume._id}`)}
              className="hover:shadow-2xl hover:scale-105 transition-transform duration-300"
              gradient="bg-gradient-to-tr from-pink-50 via-purple-50 to-white"
            />
          ))}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
