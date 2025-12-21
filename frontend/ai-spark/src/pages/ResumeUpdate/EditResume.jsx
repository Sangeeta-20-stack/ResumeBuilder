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
import AdditionalInfoForm from "./Forms/AdditionalInfoForm";
import RenderResume from "../../components/ResumeTemplates/RenderResume";

const EditResume = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const resumeRef = useRef(null);
  const resumeDownloadRef = useRef(null);

  const [baseWidth, setBaseWidth] = useState(800);
  const [openThemeSelector, setOpenThemeSelector] = useState(false);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("profile-info");
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

const validateAndNext = (e) => {
  const errors = [];

  switch (currentPage) {
    case "profile-info": {
      const { fullName, designation, summary } = resumeData.profileInfo;

      if (!fullName?.trim()) errors.push("Full Name is required");
      if (!designation?.trim()) errors.push("Designation is required");
      if (!summary?.trim()) errors.push("Summary is required");
      break;
    }

    case "contact-info": {
      const { email, phone } = resumeData.contactInfo;

      if (!email?.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
        errors.push("Valid email is required");
      }

      if (!phone?.trim()) {
        errors.push("Valid phone number is required");
      }
      break;
    }

    case "work-experience": {
      resumeData.workExperience.forEach(
        ({ company, role, startDate, endDate }, index) => {
          if (!company?.trim())
            errors.push(`Company is required in experience ${index + 1}`);
          if (!role?.trim())
            errors.push(`Role is required in experience ${index + 1}`);
          if (!startDate || !endDate)
            errors.push(
              `Start and End dates are required in experience ${index + 1}`
            );
        }
      );
      break;
    }

    case "education-info": {
      resumeData.education.forEach(
        ({ degree, institution, startDate, endDate }, index) => {
          if (!degree?.trim())
            errors.push(`Degree is required in education ${index + 1}`);
          if (!institution?.trim())
            errors.push(`Institution is required in education ${index + 1}`);
          if (!startDate || !endDate)
            errors.push(
              `Start and End dates are required in education ${index + 1}`
            );
        }
      );
      break;
    }

    case "skills": {
      resumeData.skills.forEach(({ name, progress }, index) => {
        if (!name?.trim())
          errors.push(`Skill name is required in skill ${index + 1}`);
        if (progress < 1 || progress > 100)
          errors.push(
            `Skill progress must be between 1 and 100 in skill ${index + 1}`
          );
      });
      break;
    }

    case "projects": {
      resumeData.projects.forEach(
        ({ title, description }, index) => {
          if (!title?.trim())
            errors.push(`Project title is required in project ${index + 1}`);
          if (!description?.trim())
            errors.push(
              `Project description is required in project ${index + 1}`
            );
        }
      );
      break;
    }

    case "certifications": {
      resumeData.certifications.forEach(
        ({ title, issuer }, index) => {
          if (!title?.trim())
            errors.push(
              `Certification title is required in certification ${index + 1}`
            );
          if (!issuer?.trim())
            errors.push(
              `Issuer is required in certification ${index + 1}`
            );
        }
      );
      break;
    }

    case "additionalInfo": {
      if (
        resumeData.languages.length === 0 ||
        !resumeData.languages[0]?.name?.trim()
      ) {
        errors.push("At least one language is required");
      }

      if (
        resumeData.interests.length === 0 ||
        !resumeData.interests[0]?.trim()
      ) {
        errors.push("At least one interest is required");
      }
      break;
    }

    default:
      break;
  }

  // ✅ FIXED PART
  if (errors.length > 0) {
    setErrorMsg(errors.join(", "));
    return;
  }

  setErrorMsg("");
  goToNextStep();
};



  const goToNextStep = ()=>{
    const pages=[
      "profile-info",
      "contact-info",
      "work-experience",
      "education-info",
      "skills",
      "projects",
      "certifications",
      "additional-info"
    ];
    if(currentPage==="additionaInfo") setOpenPreviewModal(true);

    const currentIndex = pages.indexOf(currentPage);

    if(currentIndex!=-1 && currentIndex<pages.length-1){
      const nextIndex=currentIndex+1;
      setCurrentPage(pages[nextIndex]);

      const percent = Math.round((nextIndex/(pages.length-1))*100);
      setProgress(precent);
      window.scrollTo({top:0,behavior:"smooth"});
    }
  };


  const goBack = () => {
     const pages=[
      "profile-info",
      "contact-info",
      "work-experience",
      "education-info",
      "skills",
      "projects",
      "certifications",
      "additional-info"
    ];
    
    if(currentPage==="profile-info") navigate("/dashboard");

    const currentIndex=pages.indexOf(currentPage);
    if(currentIndex>0){
      const prevIndex=currentIndex-1;
      setCurrentPage(pages[prevIndex]);

      const percent=Math.round((prevIndex/(pages.length-1))*100);
      setProgress(percent);
      window.scrollTo({top:0,behavior:"smooth"});
    }
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

            case "additionalInfo":
              return (
                <AdditionalInfoForm
                languages ={resumeData.languages}
                interests={resumeData.interests}
                updateArrayItem={(section,index,key,value)=>
                  updateArrayItem(section,index,key,value)
                }
                addArrayItem={(section,newItem)=>addArrayItem(section,newItem)}
                removeArrayItem={(section,index)=>
                  removeArrayItem(section,index)
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
    if(resumeRef.current){
      setBaseWidth(resumeRef.current.offsetWidth);
    }
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

            <RenderResume
            templateId={resumeData?.template?.theme || ""}
            resumeData={resumeData}
            colorPalette={resumeData?.template?.colorPalette||[]}
            containerWidth={baseWidth}
            />
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditResume;
