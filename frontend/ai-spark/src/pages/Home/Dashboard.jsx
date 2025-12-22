import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { LuCirclePlus } from "react-icons/lu";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import ResumeSummaryCard from "../../components/Cards/ResumeSummaryCard";
import CreateResumeForm from "../Home/CreateResumeForm";

const API_URL = "https://cv-spark-backend.onrender.com";

const Dashboard = () => {
  const navigate = useNavigate();

  const [allResumes, setAllResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ================= MODAL STATE ================= */
  const [openCreateModal, setOpenCreateModal] = useState(false);

  /* ================= PAINT BRUSH STATE ================= */
  const [splashes, setSplashes] = useState([]);

  /* ================= CURSOR PAINT EFFECT ================= */
  useEffect(() => {
    const handleMove = (e) => {
      const colors = [
        "rgba(255, 0, 102, 0.45)",
        "rgba(255, 94, 0, 0.45)",
        "rgba(138, 43, 226, 0.45)",
        "rgba(255, 0, 0, 0.45)",
        "rgba(255, 215, 0, 0.40)",
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
        const response = await axios.get(
          `${API_URL}/api/resume`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setAllResumes(response.data || []);
      } catch (err) {
        setError("Failed to load resumes");
        setAllResumes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllResumes();
  }, []);

  /* ================= HANDLE MODAL SUCCESS ================= */
  const handleResumeCreated = (resumeId) => {
    setOpenCreateModal(false);
    navigate(`/resume/${resumeId}`);
  };

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
            }}
          />
        ))}
      </div>

      {/* ================= DASHBOARD CONTENT ================= */}
      <div className="relative z-20 grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* ADD NEW RESUME CARD */}
        <div
          onClick={() => setOpenCreateModal(true)}
          className="
            h-[300px] flex flex-col gap-5 items-center justify-center
            rounded-3xl cursor-pointer relative overflow-hidden
            bg-gradient-to-br from-pink-50 via-purple-50 to-white
            border-2 border-purple-400/70
            transition-all duration-300
            hover:scale-[1.04]
            hover:shadow-[0_20px_40px_-15px_rgba(124,58,237,0.45)]
          "
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-black/10" />

          <div className="relative z-10 w-14 h-14 flex items-center justify-center bg-gradient-to-tr from-purple-200 to-pink-200 rounded-2xl shadow-md">
            <LuCirclePlus className="text-2xl text-purple-700 animate-pulse" />
          </div>

          <h3 className="relative z-10 font-semibold text-gray-800 text-lg">
            Add New Resume
          </h3>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="col-span-full text-center text-gray-500">
            Loading resumes...
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="col-span-full text-center text-red-500">
            {error}
          </div>
        )}

        {/* EMPTY */}
        {!loading && !error && allResumes.length === 0 && (
          <div className="col-span-full text-center text-gray-400">
            No resumes found.
          </div>
        )}

        {/* RESUME CARDS */}
        {!loading &&
          !error &&
          allResumes.map((resume) => (
            <ResumeSummaryCard
              key={resume._id}
              imageUrl={resume.thumbnailLink}
              title={resume.title || "Untitled"}
              lastUpdated={
                resume.updatedAt
                  ? moment(resume.updatedAt).format("DD MMM YYYY")
                  : "Not updated"
              }
              onSelect={() => navigate(`/resume/${resume._id}`)}
            />
          ))}
      </div>

      {/* ================= CREATE RESUME MODAL ================= */}
      <CreateResumeForm
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onSuccess={handleResumeCreated}
      />
    </DashboardLayout>
  );
};

export default Dashboard;

