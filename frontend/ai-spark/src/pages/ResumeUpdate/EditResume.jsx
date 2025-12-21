import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  LuArrowLeft,
  LuCircleAlert,
  LuDownload,
  LuPalette,
  LuSave,
  LuCircleCheckBig,
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
import axios from "axios";
import { captureElementAsImage } from "../../utils/helper";
import { fixTailwindColors } from "../../utils/helper";
import { dataURLtoFile } from "../../utils/helper";
import Modal from "../../components/Modal";
import ThemeSelector from "./ThemeSelector";

const EditResume = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const [atsScore, setAtsScore] = useState(null);


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

    case "additional-info": {
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



 const goToNextStep = () => {
  const pages = [
    "profile-info",
    "contact-info",
    "work-experience",
    "education-info",
    "skills",
    "projects",
    "certifications",
    "additional-info",
  ];

  const currentIndex = pages.indexOf(currentPage);

  if (currentIndex === pages.length - 1) {
    setOpenPreviewModal(true);
    return;
  }

  if (currentIndex !== -1) {
    const nextIndex = currentIndex + 1;
    setCurrentPage(pages[nextIndex]);

    const percent = Math.round(
      (nextIndex / (pages.length - 1)) * 100
    );
    setProgress(percent);

    window.scrollTo({ top: 0, behavior: "smooth" });
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

            case "additional-info":
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

const uploadResumeImages = async () => {
  try {
    setIsLoading(true);

    const resumeEl = resumeRef.current;
    if (!resumeEl) throw new Error("Resume element not found");

    // Save original styles
    const originalTransform = resumeEl.style.transform;
    const originalOrigin = resumeEl.style.transformOrigin;
    const originalWidth = resumeEl.style.width;

    // 🔍 REAL ZOOM (visual)
    resumeEl.style.transform = "scale(1.35)"; // 🔥 increase to 1.5 if needed
    resumeEl.style.transformOrigin = "top left";
    resumeEl.style.width = "794px"; // keep A4 base width
    resumeEl.style.background = "#ffffff";

    // Fix Tailwind colors
    fixTailwindColors(resumeEl);

    // Capture full scaled content
    const imageDataUrl = await captureElementAsImage(resumeEl, {
      scale: 3, // image clarity
      backgroundColor: "#ffffff",
      width: resumeEl.scrollWidth * 1.35,
      height: resumeEl.scrollHeight * 1.35,
      windowWidth: resumeEl.scrollWidth * 1.35,
      windowHeight: resumeEl.scrollHeight * 1.35,
    });

    // Restore styles
    resumeEl.style.transform = originalTransform;
    resumeEl.style.transformOrigin = originalOrigin;
    resumeEl.style.width = originalWidth;

    const thumbnailFile = dataURLtoFile(
      imageDataUrl,
      `resume-${resumeId}.png`
    );

    const profileImageFile = resumeData?.profileInfo?.profileImg || null;

    const formData = new FormData();
    if (profileImageFile) formData.append("profileImage", profileImageFile);
    formData.append("thumbnail", thumbnailFile);

    const uploadRes = await axiosInstance.put(
      API_PATHS.RESUME.UPLOAD_IMAGES(resumeId),
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    const { thumbnailLink, profilePreviewUrl } = uploadRes.data;

    await updateResumeDetails(thumbnailLink, profilePreviewUrl);

    toast.success("Resume saved successfully");
    navigate("/dashboard");
  } catch (err) {
    console.error(err);
    toast.error("Failed to save resume");
  } finally {
    setIsLoading(false);
  }
};



const updateResumeDetails = async (thumbnailLink, profilePreviewUrl) => {
  try {
    const payload = {
      ...resumeData,

      thumbnailLink,

      profileInfo: {
        ...resumeData.profileInfo,
        profilePreviewUrl,
      },
    };

    await axiosInstance.put(
      API_PATHS.RESUME.UPDATE(resumeId),
      payload
    );
  } catch (error) {
    console.error("Error updating resume details:", error);
    toast.error("Failed to update resume details");
  }
};



const handlePrint = useReactToPrint({
  contentRef: resumeDownloadRef,
  documentTitle: resumeData?.profileInfo?.fullName || "Resume",
  pageStyle: `
    @page { size: A4; margin: 20mm; }
    body { -webkit-print-color-adjust: exact; }
  `,
});





  const handleDeleteResume = async () => {
    try{
      setIsLoading(true);
      const response=await axiosInstance.delete(API_PATHS.RESUME.DELETE(resumeId));
      toast.success('Resume Deleted successfully')
      navigate('/dashboard')
    }
    catch(err){
      console.error("Error capturing image:",err);
    }
    finally{
      setIsLoading(false);
    }
  };




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


// ✅ Role-specific ATS Keywords
const ATS_KEYWORDS_BY_ROLE = {
  fullstack: [
    "javascript", "typescript", "react", "reactjs", "node", "node.js", "express",
    "mongodb", "sql", "html", "css", "rest api", "docker", "git", "aws",
    "python", "redux", "next.js", "jest", "graphql"
  ],
  frontend: [
    "javascript", "typescript", "react", "reactjs", "vue", "angular",
    "html", "css", "sass", "tailwind", "material-ui", "redux", "jest", "cypress"
  ],
  backend: [
    "node", "node.js", "express", "python", "django", "flask", "java",
    "spring", "sql", "postgresql", "mongodb", "rest api", "docker", "kubernetes"
  ],
  data: [
    "python", "pandas", "numpy", "scikit-learn", "tensorflow", "pytorch",
    "machine learning", "deep learning", "nlp", "sql", "nosql", "big data",
    "spark", "hadoop", "data visualization"
  ],
  mobile: [
    "ios", "android", "flutter", "kotlin", "swift", "react native", "xamarin"
  ],
  devops: [
    "docker", "kubernetes", "jenkins", "github actions", "gitlab ci/cd", "circleci",
    "aws", "azure", "gcp", "heroku", "netlify", "vercel", "serverless", "terraform", "ansible", "puppet", "chef"
  ],
  qa: [
    "jest", "mocha", "chai", "selenium", "cypress", "junit", "pytest",
    "robot framework", "testing library", "tdd", "bdd", "automation testing"
  ],
  security: [
    "oauth", "jwt", "encryption", "ssl", "tls", "vulnerability", "penetration testing", "cybersecurity", "firewall", "cissp", "ceh", "ccna", "ccnp"
  ]
};

// ✅ Determine keyword list based on role
const getKeywordsByRole = (role = "") => {
  role = role.toLowerCase();
  if (role.includes("full stack")) return ATS_KEYWORDS_BY_ROLE.fullstack;
  if (role.includes("frontend")) return ATS_KEYWORDS_BY_ROLE.frontend;
  if (role.includes("backend")) return ATS_KEYWORDS_BY_ROLE.backend;
  if (role.includes("data") || role.includes("ml")) return ATS_KEYWORDS_BY_ROLE.data;
  if (role.includes("mobile")) return ATS_KEYWORDS_BY_ROLE.mobile;
  if (role.includes("devops")) return ATS_KEYWORDS_BY_ROLE.devops;
  if (role.includes("qa") || role.includes("tester") || role.includes("quality")) return ATS_KEYWORDS_BY_ROLE.qa;
  if (role.includes("security") || role.includes("cyber")) return ATS_KEYWORDS_BY_ROLE.security;
  return []; // fallback
};

// ✅ Extract all relevant text from resumeData
const extractResumeText = (resumeData) => {
  if (!resumeData) return "";

  const {
    profileInfo = {},
    workExperience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    languages = [],
    interests = [],
  } = resumeData;

  let text = [
    profileInfo.fullName,
    profileInfo.summary,
    skills.map((s) => s.name).join(" "),
    projects.map((p) => `${p.title} ${p.description}`).join(" "),
    certifications.map((c) => `${c.title} ${c.issuer}`).join(" "),
    languages.map((l) => l.name).join(" "),
    interests.join(" "),
  ]
    .filter(Boolean)
    .join(" ");

  workExperience.forEach((exp) => {
    text +=
      " " +
      [
        exp.title || exp.role,
        exp.company,
        exp.description,
      ]
        .filter(Boolean)
        .join(" ");
  });

  education.forEach((ed) => {
    text +=
      " " +
      [
        ed.degree,
        ed.institution,
        ed.description,
      ]
        .filter(Boolean)
        .join(" ");
  });

  return text.toLowerCase(); // lowercase for case-insensitive matching
};

// ✅ Calculate ATS score for role-specific keywords
const calculateATSScore = (resumeText, keywords) => {
  if (!keywords || keywords.length === 0) return 0;

  let matches = 0;
  keywords.forEach((keyword) => {
    if (resumeText.includes(keyword.toLowerCase())) matches++;
  });

  return Math.round((matches / keywords.length) * 100);
};

const handleATSScoreClick = () => {
  if (!resumeData) {
    toast.error("Resume data not ready!");
    return;
  }

  const text = extractResumeText(resumeData);
  const role = resumeData.profileInfo.designation || ""; // role from resume
  const keywords = getKeywordsByRole(role);

  if (keywords.length === 0) {
    toast.error("No keyword list found for this role.");
    return;
  }

  const score = calculateATSScore(text, keywords);
  setAtsScore(score); // store score in state

  // Optional: show found and missing keywords
  const found = keywords.filter((k) => text.includes(k.toLowerCase()));
  const missing = keywords.filter((k) => !text.includes(k.toLowerCase()));

  toast.success(`ATS Score for ${role}: ${score}%`, { duration: 4000 });
  console.log("Found Keywords:", found);
  console.log("Missing Keywords:", missing);
};

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

{/* ATS Score Button */}
<div className="flex items-center gap-3">
  <button
    className="flex items-center gap-2 px-4 py-2 rounded-full
      bg-green-500 text-white font-semibold shadow-lg hover:scale-105 transition"
    onClick={handleATSScoreClick}
  >
    <LuCircleCheckBig />
    <span className="hidden md:block">ATS Score</span>
  </button>

  {/* Display Score Badge */}
  {atsScore !== null && (
    <span
      className={`px-3 py-1 rounded-full font-semibold text-white
        ${atsScore >= 80 ? "bg-green-600" :
          atsScore >= 50 ? "bg-yellow-500" :
          "bg-red-500"}`}
    >
      {atsScore}%
    </span>
  )}
</div>



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

      <Modal
  isOpen={openThemeSelector}
  onClose={()=>setOpenThemeSelector(false)}
  title="Change Theme"
>
  <div className="bg-white rounded-2xl w-[95vw] max-w-7xl h-[90vh] overflow-hidden">

    <ThemeSelector
      selectedTheme={resumeData?.template}
      setSelectedTheme={(value) =>{
        setResumeData((prevState)=>({
          ...prevState,
          template:value || prevState.template,
        }));
      }}
      resumeData={null}
      onClose={()=>setOpenThemeSelector(false)}
    />
  </div>
</Modal>

{openPreviewModal && (
  <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
    <div className="bg-white w-[98vw] h-[95vh] rounded-xl shadow-xl flex flex-col">

      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b print:hidden">
        <h2 className="font-semibold">
          {resumeData?.title || "Resume Preview"}
        </h2>

        <div className="flex gap-2">
         <button
  onClick={handlePrint}
  className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold
             bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500
             text-white shadow-lg hover:shadow-2xl hover:scale-105
             transition-all duration-300"
>
  <LuDownload className="text-[18px]" />
  Download
</button>


          <button
            onClick={() => setOpenPreviewModal(false)}
            className="px-4 py-2 border rounded"
          >
            Close
          </button>
        </div>
      </div>

      {/* SCREEN PREVIEW WRAPPER */}
      <div className="flex-1 overflow-auto bg-gray-100 flex justify-center py-6">
        {/* ✅ PRINTABLE A4 */}
        <div ref={resumeDownloadRef} className="print-a4 bg-white">
          <RenderResume
            templateId={resumeData?.template?.theme || ""}
            resumeData={resumeData}
            colorPalette={resumeData?.template?.colorPalette || []}
          />
        </div>
      </div>

    </div>
  </div>
)}



   



   




    </DashboardLayout>
  );
};

export default EditResume;
