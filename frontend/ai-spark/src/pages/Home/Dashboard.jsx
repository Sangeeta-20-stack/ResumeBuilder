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
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Add New Resume Card */}
        <div
          className="h-[300px] flex flex-col gap-5 items-center justify-center 
                     bg-gradient-to-br from-pink-50 via-purple-50 to-white rounded-3xl 
                     border border-purple-200 hover:border-purple-400 hover:shadow-2xl 
                     cursor-pointer transition-all duration-300"
          onClick={() => navigate("/create-resume")}
        >
          <div className="w-14 h-14 flex items-center justify-center 
                         bg-gradient-to-tr from-purple-200/60 to-pink-200/60 
                         rounded-2xl hover:from-purple-300 hover:to-pink-300 transition-all duration-300">
            <LuCirclePlus className="text-2xl text-purple-600 animate-pulse" />
          </div>
          <h3 className="font-semibold text-gray-800 text-lg">Add New Resume</h3>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="col-span-full text-center text-gray-500 text-lg">
            Loading resumes...
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="col-span-full text-center text-red-500 text-lg">{error}</div>
        )}

        {/* Empty state */}
        {!loading && !error && allResumes.length === 0 && (
          <div className="col-span-full text-center text-gray-400 text-lg">
            No resumes found. Click "Add New Resume" to create one.
          </div>
        )}

        {/* Render all resumes */}
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
