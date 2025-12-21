import React from "react";
import TemplateOne from "./TemplateOne";
import TemplateTwo from "./TemplateTwo";
import TemplateThree from "./TemplateThree";
const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

const RenderResume = ({
  templateId,
  resumeData,
  colorPalette,
  containerWidth,
}) => {
  // Preview-only scale
  const scale =
    containerWidth && containerWidth < A4_WIDTH
      ? containerWidth / A4_WIDTH
      : 1;

  const renderTemplate = () => {
    switch (templateId) {
      case "01":
        return (
          <TemplateOne
            resumeData={resumeData}
            colorPalette={colorPalette}
          />
        );
         case "02":
        return (
          <TemplateTwo
            resumeData={resumeData}
            colorPalette={colorPalette}
          />
        );
         case "03":
        return (
          <TemplateThree
            resumeData={resumeData}
            colorPalette={colorPalette}
          />
        );

      default:
        return (
          <TemplateOne
            resumeData={resumeData}
            colorPalette={colorPalette}
          />
        );
    }
  };

  return (
    <div className="flex justify-center">
      {/* PREVIEW SCALE WRAPPER */}
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top center",
        }}
      >
        {/* ACTUAL A4 PAGE (CAPTURE THIS) */}
        <div
          id="resume-a4"
          style={{
            width: A4_WIDTH,
            minHeight: A4_HEIGHT,
            backgroundColor: "#ffffff",
          }}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};

export default RenderResume;
