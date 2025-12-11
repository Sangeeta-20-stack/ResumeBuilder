import React from "react";
import { FaEdit, FaPalette, FaChartLine } from "react-icons/fa";
import { Link } from "react-router-dom"; // Fixed missing import
import Container from "../components/Container"; // Make sure this exists
import hero from "../assets/hero.png"; // Make sure the image exists



export default function LandingPage() {
  return (
    <div>

      {/* NAVBAR ON TOP */}
      <div className="sticky top-0 z-50 bg-white/30 backdrop-blur-lg border-b border-pink-300 py-4">
        <Container>
          <div className="flex items-center justify-between">

            {/* Gradient Title with animation */}
            <h1
              className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent
                         bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500
                         hover:scale-105 transition-transform duration-500"
            >
              CV Spark
            </h1>

            {/* Login Button */}
            <Link
              to="/login"
              className="px-6 py-2 bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500 
                         text-white rounded-full font-semibold shadow-lg hover:shadow-2xl 
                         hover:scale-105 transition-all duration-300"
            >
              Login / Sign Up
            </Link>

          </div>
        </Container>
      </div>

      {/* MAIN LANDING SECTION */}
      <div className="py-16 bg-gradient-to-b from-pink-50 to-purple-50 border-4 border-pink-300 rounded-2xl mt-6 px-6 md:px-16">

        {/* HERO CONTENT */}
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* LEFT SIDE CONTENT */}
            <div>
              <h2 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent 
                  bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 leading-tight">
                Build your perfect Resume <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-orange-400">
                  in Minutes
                </span>
              </h2>

              <p className="text-gray-700 mt-4 text-lg md:text-xl font-medium">
                Create ATS-friendly, beautiful resumes with live templates, smart editing, 
                and one-click PDF export.
              </p>

              <div className="mt-8">
                <button className="px-8 py-3 text-white font-bold rounded-full 
                  bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500 
                  shadow-lg hover:from-purple-500 hover:to-pink-500 hover:scale-105 
                  transition-all duration-300 animate-pulse">
                  GET STARTED
                </button>
              </div>
            </div>

            {/* RIGHT SIDE IMAGE */}
            <div className="flex justify-center">
              <img
                src={hero}
                alt="Hero"
                className="w-[400px] md:w-[550px] hover:scale-105 transition-transform duration-500 
                 shadow-2xl rounded-3xl"
              />
            </div>

          </div>
        </Container>

        {/* FEATURES SECTION */}
        <div className="py-20 mt-20">
          <Container>

            {/* HEADING */}
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 
                bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-orange-500 to-purple-500">
              Features that make you shine
            </h2>

            {/* FEATURES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

              {/* CARD 1 */}
              <div className="bg-white shadow-xl border border-pink-200 rounded-3xl p-6 
                  hover:shadow-2xl hover:scale-105 transition-transform duration-300 text-center relative overflow-hidden">
                <FaEdit className="text-pink-500 mx-auto text-5xl mb-4" />
                <h3 className="text-xl md:text-2xl font-semibold text-pink-600 mb-3">
                  Live Resume Editor
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  Real-time editor with instant preview for a fast, distraction-free
                  resume-building experience. 
                  <span className="text-pink-600 font-medium"> Every edit updates instantly—no reload, no delay.</span>
                </p>
              </div>

              {/* CARD 2 */}
              <div className="bg-white shadow-xl border border-pink-200 rounded-3xl p-6 
                  hover:shadow-2xl hover:scale-105 transition-transform duration-300 text-center relative overflow-hidden">
                <FaPalette className="text-orange-500 mx-auto text-5xl mb-4" />
                <h3 className="text-xl md:text-2xl font-semibold text-pink-600 mb-3">
                  Professional Templates
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  Switch between modern, minimal templates and personalize with
                  tech-inspired color palettes & gradients. Clean layouts optimized
                  for clarity and 
                  <span className="text-orange-500 font-medium"> recruiter-friendly scan patterns.</span>
                </p>
              </div>

              {/* CARD 3 */}
              <div className="bg-white shadow-xl border border-pink-200 rounded-3xl p-6 
                  hover:shadow-2xl hover:scale-105 transition-transform duration-300 text-center relative overflow-hidden">
                <FaChartLine className="text-purple-500 mx-auto text-5xl mb-4" />
                <h3 className="text-xl md:text-2xl font-semibold text-pink-600 mb-3">
                  ATS Score Analyzer
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  Run your resume through an ATS compatibility check and instantly
                  download a polished PDF.  
                  <span className="text-orange-500 font-medium">
                    Keyword analysis, readability score, formatting validation,
                    and improvement suggestions.
                  </span>
                </p>
              </div>

            </div>
          </Container>
        </div>

        {/* FOOTER */}
        <footer className="w-full py-10 bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500 text-white text-center mt-20">
          <p className="text-lg md:text-xl font-semibold">
            &copy; {new Date().getFullYear()} CV Spark. All rights reserved.
          </p>
          <p className="mt-2 text-sm md:text-base">
            Crafting perfect resumes with style and ease.
          </p>
        </footer>

      </div>
    </div>
  );
}
