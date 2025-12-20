import React, { useState } from "react";
import Input from "../../components/Inputs/Input";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const CreateResumeForm = ({ open, onClose, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleCreateResume = async (e) => {
    e.preventDefault();

    if (!title) {
      setError("Please enter resume title");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await axiosInstance.post(
        API_PATHS.RESUME.CREATE,
        { title }
      );

      if (response.data?._id) {
        onSuccess(response.data._id);
        onClose();
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* BACKDROP (same feel as landing/auth modal) */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-lg"
      />

      {/* MODAL CARD */}
      <div
        className="
          relative z-10 w-[90vw] max-w-md
          bg-white/90 backdrop-blur-xl
          border-2 border-pink-300
          rounded-3xl p-8
          shadow-[0_25px_60px_-15px_rgba(236,72,153,0.6)]
          animate-scaleIn
        "
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold"
        >
          ✕
        </button>

        {/* TITLE */}
        <h3
          className="
            text-2xl font-extrabold text-center
            bg-clip-text text-transparent
            bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500
          "
        >
          Create New Resume
        </h3>

        <p className="text-center text-gray-600 text-sm mt-2 mb-6">
          Give your resume a title to get started.
        </p>

        {/* FORM */}
        <form onSubmit={handleCreateResume} className="space-y-4">
          <Input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            label="Resume Title"
            placeholder="Eg: John's Resume"
            type="text"
          />

          {error && (
            <p className="text-red-500 text-xs text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-3 mt-2
              text-white font-bold rounded-full
              bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500
              shadow-lg
              hover:scale-105 hover:shadow-2xl
              transition-all duration-300
              disabled:opacity-60 disabled:cursor-not-allowed
            "
          >
            {loading ? "Creating..." : "Create Resume"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateResumeForm;
