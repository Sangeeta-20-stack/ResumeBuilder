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

const DEFAULT_THEME = ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#00B8DB", "#4A5565"];

const TemplateOne = ({ resumeData = {}, colorPalette, containerWidth }) => {
  const themeColors =
    colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME;

  const resumeRef = useRef(null);
  const BASE_WIDTH = 800;
  const [scale, setScale] = useState(1);

  const profile = resumeData.profileInfo || {};
  const contactInfo = resumeData.contactInfo || {};

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
      <div className="grid grid-cols-12 gap-8">
        {/* LEFT PANEL */}
        <div
          className="col-span-4 py-10"
          style={{ backgroundColor: themeColors[0] }}
        >
          <div className="flex flex-col items-center px-2">
            <div
              className="w-[100px] h-[100px] rounded-full flex items-center justify-center"
              style={{ backgroundColor: themeColors[1] }}
            >
              {profile.profilePreviewUrl ? (
                <img
                  src={profile.profilePreviewUrl}
                  className="w-[90px] h-[90px] rounded-full"
                  alt="Profile"
                />
              ) : (
                <div
                  className="w-[90px] h-[90px] flex items-center justify-center text-5xl rounded-full"
                  style={{ color: themeColors[4] }}
                >
                  <LuUser />
                </div>
              )}
            </div>

            <h2 className="text-xl font-bold mt-3">
              {profile.fullName || "-"}
            </h2>
            <p className="text-sm text-center">
              {profile.designation || "-"}
            </p>
          </div>

          {/* CONTACT INFO */}
          <div className="my-6 mx-6">
            <div className="flex flex-col gap-4">
              <ContactInfo
                icon={<LuMapPinHouse />}
                iconBG={themeColors[2]}
                value={contactInfo.location}
              />
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
              <ContactInfo
                icon={<RiLinkedinLine />}
                iconBG={themeColors[2]}
                value={contactInfo.linkedin}
              />
              <ContactInfo
                icon={<LuGithub />}
                iconBG={themeColors[2]}
                value={contactInfo.github}
              />
              <ContactInfo
                icon={<LuRss />}
                iconBG={themeColors[2]}
                value={contactInfo.website}
              />
            </div>

            <div className="mt-5">
                <Title text="Education" color={themeColors[1]} />
                {resumeData.education.map((data,index)=>(
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
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="col-span-8 pt-10 mr-10 pb-5">
          {/* Additional content can go here */}
        </div>
      </div>
    </div>
  );
};

export default TemplateOne;
