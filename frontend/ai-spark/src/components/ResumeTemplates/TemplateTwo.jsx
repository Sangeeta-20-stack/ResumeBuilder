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


const TemplateTwo = ({ resumeData = {}, colorPalette, containerWidth }) => {
  const themeColors = colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME;
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
      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
        <div
          className="w-[120px] h-[120px] rounded-full flex items-center justify-center"
          style={{ backgroundColor: themeColors[1] }}
        >
          {profile.profilePreviewUrl ? (
            <img
              src={profile.profilePreviewUrl}
              className="w-[110px] h-[110px] rounded-full"
              alt="Profile"
            />
          ) : (
            <div
              className="w-[110px] h-[110px] flex items-center justify-center text-5xl rounded-full"
              style={{ color: themeColors[4] }}
            >
              <LuUser />
            </div>
          )}
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">{profile.fullName || "-"}</h2>
          <p className="text-md">{profile.designation || "-"}</p>
        </div>
      </div>

      {/* CONTACT INFO IN TWO COLUMNS */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <ContactInfo icon={<LuMapPinHouse />} iconBG={themeColors[2]} value={contactInfo.location} />
        <ContactInfo icon={<LuMail />} iconBG={themeColors[2]} value={contactInfo.email} />
        <ContactInfo icon={<LuPhone />} iconBG={themeColors[2]} value={contactInfo.phone} />
        <ContactInfo icon={<RiLinkedinLine />} iconBG={themeColors[2]} value={contactInfo.linkedin} />
        <ContactInfo icon={<LuGithub />} iconBG={themeColors[2]} value={contactInfo.github} />
        <ContactInfo icon={<LuRss />} iconBG={themeColors[2]} value={contactInfo.website} />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-12 gap-8">
        {/* LEFT PANEL */}
        <div className="col-span-12 md:col-span-5 space-y-6">
          <div className="p-4 rounded-lg" style={{ backgroundColor: themeColors[0] }}>
            <Title text="Education" color={themeColors[1]} />
            {education.map((data, index) => (
              <EducationInfo
                key={index}
                degree={data.degree}
                institution={data.institution}
                duration={`${formatYearMonth(data.startDate)} - ${formatYearMonth(data.endDate)}`}
              />
            ))}
          </div>

          <div className="p-4 rounded-lg" style={{ backgroundColor: themeColors[0] }}>
            <Title text="Languages" color={themeColors[1]} />
            <LanguageSection languages={languages} accentColor={themeColors[3]} bgColor={themeColors[2]} />
          </div>

          <div className="p-4 rounded-lg" style={{ backgroundColor: themeColors[0] }}>
            <Title text="Skills" color={themeColors[1]} />
            <SkillSection skills={skills} accentColor={themeColors[3]} bgColor={themeColors[2]} />
          </div>

          <div className="p-4 rounded-lg" style={{ backgroundColor: themeColors[0] }}>
            <Title text="Certifications" color={themeColors[1]} />
            {certifications.map((data, index) => (
              <CertificationInfo
                key={index}
                title={data.title}
                issuer={data.issuer}
                year={data.year}
                bgColor={themeColors[2]}
              />
            ))}
          </div>

          {interests?.length > 0 && interests[0] !== "" && (
            <div className="p-4 rounded-lg" style={{ backgroundColor: themeColors[0] }}>
              <Title text="Interests" color={themeColors[1]} />
              <div className="flex items-center flex-wrap gap-3 mt-2">
                {interests.map((interest, idx) =>
                  interest ? (
                    <div
                      key={idx}
                      className="text-[14px] font-medium py-1 px-3 rounded-lg"
                      style={{ backgroundColor: themeColors[2] }}
                    >
                      {interest}
                    </div>
                  ) : null
                )}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className="col-span-12 md:col-span-7 space-y-6">
          <div className="p-4 rounded-lg" style={{ backgroundColor: themeColors[0] }}>
            <Title text="Professional Summary" color={themeColors[1]} />
            <p className="text-md font-medium">{profile.summary}</p>
          </div>

          <div className="p-4 rounded-lg" style={{ backgroundColor: themeColors[0] }}>
            <Title text="Work Experience" color={themeColors[1]} />
            {workExperience.map((data, index) => (
              <WorkExperience
                key={index}
                company={data.company}
                role={data.role}
                duration={`${formatYearMonth(data.startDate)} - ${formatYearMonth(data.endDate)}`}
                durationColor={themeColors[4]}
                descripion={data.descripion}
              />
            ))}
          </div>

          <div className="p-4 rounded-lg" style={{ backgroundColor: themeColors[0] }}>
            <Title text="Projects" color={themeColors[1]} />
            {projects.map((project, index) => (
              <ProjectInfo
                key={index}
                title={project.title}
                description={project.description}
                githubLink={project.github}
                liveDemoUrl={project.liveDemo}
                bgColor={themeColors[2]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateTwo;