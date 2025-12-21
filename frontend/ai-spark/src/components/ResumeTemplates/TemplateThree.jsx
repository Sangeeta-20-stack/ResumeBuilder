import React, { useEffect, useState, useRef } from "react";
import {
  LuMapPinHouse,
  LuMail,
  LuPhone,
  LuGithub,
  LuUser,
  LuRss,
} from "react-icons/lu";
import { RiLinkedinLine } from "react-icons/ri";
import ContactInfo from "../ResumeSections/ContactInfo";
import EducationInfo from "../ResumeSections/EducationInfo";
import { formatYearMonth } from "../../utils/helper";
import Title from "../ResumeSections/Title";
import LanguageSection from "../ResumeSections/LanguageSection";
//import WorkExperienceForm from "../../pages/ResumeUpdate/Forms/WorkExperienceForm";
import WorkExperience from "../ResumeSections/WorkExperience";
import ProjectInfo from "../ResumeSections/ProjectInfo";
//import SkillsInfoForm from "../../pages/ResumeUpdate/Forms/SkillsInfoForm";
import SkillSection from "../ResumeSections/SkillSection";
import CertificationInfo from "../ResumeSections/CertificationInfo ";
import { fixTailwindColors } from "../../utils/helper";




const DEFAULT_THEME = ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#00B8DB", "#4A5565"];

const TemplateThree = ({ resumeData = {}, colorPalette, containerWidth }) => {
  const themeColors =
    colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME;

  const resumeRef = useRef(null);
  
  const BASE_WIDTH = 800;
  const [scale, setScale] = useState(1);

  const profile = resumeData.profileInfo || {};
  const contactInfo = resumeData.contactInfo || {};
  const education = resumeData.education || [];
const languages = resumeData.languages || [];
const workExperience = resumeData.workExperience || [];
const projects = resumeData.projects || [];
const skills = resumeData.skills || [];
const certifications = resumeData.certifications || [];
const interests = resumeData.interests || [];


  useEffect(() => {
    if (!containerWidth) return;
    setScale(containerWidth / BASE_WIDTH);
  }, [containerWidth]);

  return (
    <div
      ref={resumeRef}
      className="p-3 bg-white"
      style={{
        transform: containerWidth ? `scale(${scale})` : "none",
        transformOrigin: "top left",
        width: `${BASE_WIDTH}px`,
      }}
    >


      <div className="flex items-start gap-5 px-2 mb-5">
        <div 
        className="w-[100px] h-[100px] max-w-[105px] max-h-[105px] rounded-2xl flex items-center justify-center"


        style={{backgroundColor:themeColors[1]}}
        >
            {resumeData.profileInfo.profilePreviewUrl ? (
                <img 
                src={resumeData.profileInfo.profilePreviewUrl}
                className="w-[90px] h-[90px] rounded-2xl"
                />
            ):(
                <div 
                className="w-[90px] h-[90px] flex items-center justify-center text-5xl rounded-full"
                style={{color:themeColors[4]}}
                >
                    <LuUser />
                    </div>
            
            )}
        </div>

        <div>
            <div className="grid grid-cols-12 items-center">
                <div className="col-span-8">
                    <h2 className="text-2xl font-bold">
                        {resumeData.profileInfo.fullName}
                    </h2>
                    <p className="text-[15px] font-semibold mb-2">
                        {resumeData.profileInfo.designation}
                    </p>

                    <ContactInfo
                    icon={<LuMapPinHouse />}
                    iconBG={themeColors[2]}
                    value={contactInfo.location}
                    />

                    <div className="col-span-4 flex flex-col gap-5 mt-2">
                          <ContactInfo
                    icon={<LuMail />}
                    iconBG={themeColors[2]}
                    value={contactInfo.email}
                    />

                      <ContactInfo
                    icon={<LuPhone />}
                    iconBG={themeColors[2]}
                    value={contactInfo.phone}
                    />

                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* LEFT PANEL */}
        <div
          className="col-span-4 py-10"
          style={{ backgroundColor: themeColors[0] }}
        >
          

          {/* CONTACT INFO */}
          <div className="my-6 mx-6">
            <div className="flex flex-col gap-4">
              
              <ContactInfo
                icon={<RiLinkedinLine size={22} />}
                iconBG={themeColors[2]}
                value={contactInfo.linkedin}
              />
              <ContactInfo
                icon={<LuGithub size={22} />}
                iconBG={themeColors[2]}
                value={contactInfo.github}
              />
              <ContactInfo
                icon={<LuRss size={22} />}
                iconBG={themeColors[2]}
                value={contactInfo.website}
              />
            </div>

            <div className="mt-5">
                <Title text="Education" color={themeColors[1]} />
                {education.map((data,index)=>(
                    <EducationInfo
                    key={`education_${index}`}
                    degree={data.degree}
                    institution={data.institution}
                    duration={`${formatYearMonth(
                        data.startDate
                    )} - ${formatYearMonth(data.endDate)}`}
                    />
                ))}
            </div>

            <div className="mt-5">
              <Title text="Languages" color={themeColors[1]}/>
              <LanguageSection
              languages={languages}
              accentColor={themeColors[3]}
              bgColor={themeColors[2]}
              />
            </div>


          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="col-span-8 pt-10 mr-10 pb-5">
          {/* Additional content can go here */}
          <div>
            <Title text="Professional Summary" color={themeColors[1]}/>
            <p className="text-md font-medium">
              {resumeData.profileInfo.summary}
            </p>
          </div>

          <div className="mt-4">
            <Title text="Work Experience" color={themeColors[1]}/>
            {workExperience.map((data,index)=>(
              <WorkExperience
              key={`work_${index}`}
              company={data.company}
              role={data.role}
              duration={`${formatYearMonth(
                data.startDate
              )} - ${formatYearMonth(data.endDate)}`}
              durationColor={themeColors[4]}
              descripion={data.descripion}
              />
            ))}
          </div>

          <div className="mt-4">
            <Title text="Projects" color={themeColors[1]}/>
            {projects.map((project,index) => (
              <ProjectInfo
  key={`project_${index}`}
  title={project.title}
  description={project.description}   // ✅ FIXED
  githubLink={project.github}
  liveDemoUrl={project.liveDemo}
  bgColor={themeColors[2]}
/>

            ))}
          </div>

          <div className="mt-4">
            <Title text="Skills" color={themeColors[1]} />
            <SkillSection
            skills={skills}
            accentColor={themeColors[3]}
            bgColor={themeColors[2]}
            />
          </div>

          <div className="mt-4">
            <Title text="Certifications" color={themeColors[1]} />

            <div className="">
              {certifications.map((data,index)=>(
                <CertificationInfo 
                key={`cert_${index}`}
                title={data.title}
                issuer={data.issuer}
                year={data.year}
                bgColor={themeColors[2]}
                />

              ))}
            </div>
{interests?.length > 0 && interests[0] !== "" && (
  <div className="mt-4">
    <Title text="Interests" color={themeColors[1]} />
    <div className="flex items-center flex-wrap gap-3 mt-4">
      {interests.map((interest, index) => {
        if (!interest) return null;

        return (
          <div
            key={`interest_${index}`}
            className="text-[14px] font-medium py-1 px-3 rounded-lg"
            style={{ backgroundColor: themeColors[2] }}
          >
            {interest}
          </div>
        );
      })}
    </div>
  </div>
)}

</div>

        </div>
      </div>
    </div>
  );
};

export default TemplateThree;
