import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  LuArrowLeft,
  LuCircleAlert,
  LuDownload,
  LuPalette,
  LuSave,
  LuTrash2,
} from "react-icons/lu";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import TitleInput from "../../components/Inputs/TitleInput";
import { useReactToPrint } from "react-to-print";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import StepProgress from "../../components/StepProgress";
import ProfileInfoForm from "./Forms/ProfileInfoForm";
import ContactInfoForm from "./Forms/ContactInfoForm";
import WorkExperienceForm from "./Forms/WorkExperienceForm";
import EducationDetailsForm from "./Forms/EducationDetailsForm";
import SkillsInfoForm from "./Forms/SkillsInfoForm";
import ProjectDetailForm from "./Forms/ProjectDetailForm";
import CertificationInfoForm from "./Forms/CertificationInfoForm";


const EditResume = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const resumeRef = useRef(null);
  const resumeDownloadRef = useRef(null);

  const [baseWidth, setBaseWidth] = useState(800);
  const [openThemeSelector, setOpenThemeSelector] = useState(false);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("certifications");
  const [progress, setProgress] = useState(20);

  const [resumeData, setResumeData] = useState({
    title: "",
    thumbnailLink: "",
    profileInfo: {
      profileImg: null,
      profilePreviewUrl: "",
      fullName: "",
      designation: "",
      summary: "",
    },
    template: {
      theme: "",
      colorPalette: "",
    },
    contactInfo: {
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      website: "",
    },
    workExperience: [
      {
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education: [
      {
        degree: "",
        institution: "",
        startDate: "",
        endDate: "",
      },
    ],
    skills: [{ name: "", progress: 0 }],
    projects: [
      {
        title: "",
        description: "",
        github: "",
        liveDemo: "",
      },
    ],
    certifications: [{ title: "", issuer: "", year: "" }],
    languages: [{ name: "", progress: 0 }],
    interests: [""],
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateAndNext = () => {
    setProgress(40);
  };

  const goBack = () => {
    navigate(-1);
  };

  const renderForm = () => {
    switch (currentPage) {
      case "profile-info":
        return (
          <ProfileInfoForm
            profileData={resumeData.profileInfo}
            updateSection={(key, value) =>
              updateSection("profileInfo", key, value)
            }
            onNext={validateAndNext}
          />
        );

        case "contact-info":
            return(
                <ContactInfoForm
                contactInfo={resumeData?.contactInfo}
                updateSection={(key,value) =>{
                    updateSection("contactInfo",key,value);
                }}/>
            );

         case "work-experience":
            return(
               <WorkExperienceForm
  workExperience={resumeData?.workExperience || []} // ✅ correct prop
  updateArrayItem={(index,key,value)=>{
      updateArrayItem("workExperience",index,key,value);
  }}
  addArrayItem={(newItem)=>addArrayItem("workExperience",newItem)}
  removeArrayItem={(index)=>
      removeArrayItem("workExperience",index)
  }
/>
 );

        case "education-info":
            return(
                <EducationDetailsForm
                    educationInfo={resumeData?.education}
                    updateArrayItem={(index,key,value)=>{
                        updateArrayItem("education",index,key,value);
                    }
                    }
                    addArrayItem={(newItem)=>addArrayItem("education",newItem)}
                    removeArrayItem={(index)=>removeArrayItem("education",index)}
                    />

            );

        case "skills":
            return(
                <SkillsInfoForm
                    skillsInfo = {resumeData?.skills}
                    updateArrayItem={(index,key,value)=>{
                        updateArrayItem("skills",index,key,value);
                    }}
                    addArrayItem={(newItem) => addArrayItem("skills",newItem)}
                    removeArrayItem={(index)=> removeArrayItem("skills",index)}
                    />
            );
        
        case "projects":
            return(
                <ProjectDetailForm
                    projectInfo={resumeData?.projects}
                    updateArrayItem={(index,key,value)=>{
                        updateArrayItem("projects",index,key,value);
                    }}
                    addArrayItem={(newItem) => addArrayItem("projects",newItem)}
                    removeArrayItem={(index) => removeArrayItem("projects",index)}
                    />

            );

        case "certifications":
            return(
               <CertificationInfoForm
  certifications={resumeData?.certifications}
  updateArrayItem={(index, key, value) => {
    updateArrayItem("certifications", index, key, value);
  }}
  addArrayItem={(newItem) =>
    addArrayItem("certifications", newItem)
  }
  removeArrayItem={(index) =>
    removeArrayItem("certifications", index)
  }
/>

            );
               
            default:
                return null
        }
    };

   
     
  const updateSection = (section, key, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

const updateArrayItem = (section, index, key, value) => {
  setResumeData((prev) => {
    const array = prev[section] || []; // fallback to empty array
    const updatedArray = [...array];

    if (key === null) {
      updatedArray[index] = value; // replace entire item
    } else {
      updatedArray[index] = {
        ...updatedArray[index],
        [key]: value,
      };
    }

    return {
      ...prev,
      [section]: updatedArray,
    };
  });
};

const addArrayItem = (section, newItem) => {
  setResumeData((prev) => {
    const array = prev[section] || [];
    return {
      ...prev,
      [section]: [...array, newItem],
    };
  });
};

const removeArrayItem = (section, index) => {
  setResumeData((prev) => {
    const array = prev[section] || [];
    if (array.length === 0) return prev; // nothing to remove

    const updatedArray = [...array];
    updatedArray.splice(index, 1);

    // Ensure at least one empty item remains if needed
    if (updatedArray.length === 0 && section === "workExperience") {
      updatedArray.push({
        company: "",
        role: "",
        startDate: new Date().toISOString().slice(0, 7),
        endDate: new Date().toISOString().slice(0, 7),
        description: "",
      });
    }

    return {
      ...prev,
      [section]: updatedArray,
    };
  });
};

  const fetchResumeDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.RESUME.GET_BY_ID(resumeId)
      );

      if (response.data) {
        const resumeInfo = response.data;

        setResumeData((prev) => ({
          ...prev,
          title: resumeInfo.title || "Untitled",
          profileInfo: resumeInfo.profileInfo || prev.profileInfo,
          template: resumeInfo.template || prev.template,
          contactInfo: resumeInfo.contactInfo || prev.contactInfo,
          workExperience: resumeInfo.workExperience || prev.workExperience,
          education: resumeInfo.education || prev.education,
          skills: resumeInfo.skills || prev.skills,
          projects: resumeInfo.projects || prev.projects,
          certifications:
            resumeInfo.certifications || prev.certifications,
          languages: resumeInfo.languages || prev.languages,
          interests: resumeInfo.interests || prev.interests,
        }));
      }
    } catch (error) {
      console.error("Error fetching resume", error);
    }
  };

  const uploadResumeImages = async () => {};
  const updateResumeDetails = async () => {};
  const handleDeleteResume = async () => {};

  const reactToPrintFn = useReactToPrint({
    content: () => resumeDownloadRef.current,
  });

  const updateBaseWidth = () => {
    setBaseWidth(window.innerWidth < 1024 ? 600 : 800);
  };

  useEffect(() => {
    updateBaseWidth();
    window.addEventListener("resize", updateBaseWidth);

    if (resumeId) fetchResumeDetailsById();

    return () => {
      window.removeEventListener("resize", updateBaseWidth);
    };
  }, []);

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4
          bg-white/30 backdrop-blur-xl border border-pink-300
          rounded-3xl px-6 py-4 mb-6 shadow-xl">

          <TitleInput
            title={resumeData.title}
            setTitle={(value) =>
              setResumeData((prev) => ({ ...prev, title: value }))
            }
          />

          <div className="flex items-center gap-3 flex-wrap">

            <button
              className="flex items-center gap-2 px-4 py-2 rounded-full
              bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500
              text-white font-semibold shadow-lg hover:scale-105 transition"
              onClick={() => setOpenThemeSelector(true)}
            >
              <LuPalette />
              <span className="hidden md:block">Theme</span>
            </button>

            <button
              className="flex items-center gap-2 px-4 py-2 rounded-full
              bg-white/70 border border-pink-300 text-pink-600
              font-semibold hover:bg-pink-50 transition"
              onClick={handleDeleteResume}
            >
              <LuTrash2 />
              <span className="hidden md:block">Delete</span>
            </button>

            <button
              className="flex items-center gap-2 px-4 py-2 rounded-full
              bg-gradient-to-r from-orange-400 to-pink-500
              text-white font-semibold shadow-lg hover:scale-105 transition"
              onClick={() => setOpenPreviewModal(true)}
            >
              <LuDownload />
              <span className="hidden md:block">
                Preview & Download
              </span>
            </button>

          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* LEFT FORM */}
          <div className="bg-white/30 backdrop-blur-xl
            border border-pink-300 rounded-3xl shadow-2xl overflow-hidden">

            <div className="px-6 pt-4">
              <StepProgress progress={progress} />
            </div>

            {renderForm()}

            <div className="px-6 pb-6">
              {errorMsg && (
                <div className="flex items-center gap-2 text-xs font-medium
                  text-pink-700 bg-pink-100/60 border border-pink-300
                  rounded-full px-3 py-1 my-3">
                  <LuCircleAlert /> {errorMsg}
                </div>
              )}

              <div className="flex justify-end gap-3 mt-4">

                <button
                  className="px-4 py-2 rounded-full border border-pink-400
                  text-pink-600 font-semibold hover:bg-pink-50 transition"
                  onClick={goBack}
                  disabled={isLoading}
                >
                  <LuArrowLeft /> Back
                </button>

                <button
                  className="px-5 py-2 rounded-full
                  bg-white/70 border border-pink-300
                  text-pink-600 font-semibold hover:bg-pink-50 transition"
                  onClick={uploadResumeImages}
                  disabled={isLoading}
                >
                  <LuSave /> Save & Exit
                </button>

                <button
                  className="px-6 py-2 rounded-full
                  bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500
                  text-white font-bold shadow-xl animate-pulse
                  hover:scale-105 transition"
                  onClick={validateAndNext}
                >
                  Next
                  <LuArrowLeft className="rotate-180 ml-1" />
                </button>

              </div>
            </div>
          </div>

          {/* RIGHT PREVIEW */}
          <div
            ref={resumeRef}
            className="h-[100vh] bg-white/30 backdrop-blur-xl
            border border-pink-300 rounded-3xl shadow-2xl"
          >
            {/* Resume Template */}
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditResume;
