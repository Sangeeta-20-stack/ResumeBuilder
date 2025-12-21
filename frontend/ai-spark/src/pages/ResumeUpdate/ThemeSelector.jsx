import React, { useEffect, useRef, useState } from "react";
import {
  DUMMY_RESUME_DATA,
  ResumeTemplates,
  themeColorPalette,
} from "../../utils/data";
import { LuCircleCheckBig } from "react-icons/lu";
import Tabs from "../../components/Tabs";
import TemplateOne from "../../components/ResumeTemplates/TemplateOne";
import TemplateCard from "../../components/Cards/TemplateCard";
import RenderResume from "../../components/ResumeTemplates/RenderResume";

const TAB_DATA = [{ label: "Templates" }, { label: "Color Palettes" }];

const ThemeSelector = ({
  selectedTheme,
  setSelectedTheme,
  resumeData,
  onClose,
}) => {
  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800);
  const [tabValue, setTabValue] = useState("Templates");

  const [selectedColorPalette, setSelectedColorPalette] = useState({
    colors: selectedTheme?.colorPalette || [],
    index: -1,
  });

  const [selectedTemplate, setSelectedTemplate] = useState({
    theme: selectedTheme?.theme || "",
    index: -1,
  });

  const handleThemeSelection = () => {
    setSelectedTheme({
      colorPalette: selectedColorPalette.colors,
      theme: selectedTemplate.theme,
    });
    onClose();
  };

  useEffect(() => {
    const updateBaseWidth = () => {
      if (resumeRef.current) {
        setBaseWidth(resumeRef.current.offsetWidth);
      }
    };

    updateBaseWidth();
    window.addEventListener("resize", updateBaseWidth);

    return () => window.removeEventListener("resize", updateBaseWidth);
  }, []);

  return (
    <div className="container mx-auto px-2 md:px-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 mt-2">
        <Tabs tabs={TAB_DATA} activeTab={tabValue} setActiveTab={setTabValue} />
       <button
  onClick={handleThemeSelection}
  className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold
             bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500
             text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
>
  <LuCircleCheckBig className="text-[18px]" />
  Done
</button>

      </div>

      <div className="grid grid-cols-12 gap-5">
        {/* LEFT */}
        <div className="col-span-12 md:col-span-5 bg-white">
          <div className="grid grid-cols-2 gap-5 max-h-[80vh] overflow-auto custom-scrollbar">
            {tabValue === "Templates" &&
              ResumeTemplates.map((template, index) => (
                <TemplateCard
                  key={`template_${index}`}
                  thumbnailImg={template.thumbnailImg}
                  isSelected={selectedTemplate.index === index}
                  onSelect={() =>
                    setSelectedTemplate({ theme: template.id, index })
                  }
                />
              ))}

            {tabValue === "Color Palettes" &&
              themeColorPalette.themeOne.map((colors, index) => (
                <ColorPalette
                  key={`palette_${index}`}
                  colors={colors}
                  isSelected={selectedColorPalette.index === index}
                  onSelect={() =>
                    setSelectedColorPalette({ colors, index })
                  }
                />
              ))}
          </div>
        </div>

        {/* RIGHT (Preview) */}
        <div
          className="col-span-12 md:col-span-7 bg-white -mt-3 p-3"
          ref={resumeRef}
        >
          <TemplateOne
            resumeData={resumeData || DUMMY_RESUME_DATA}
            colorPalette={selectedColorPalette.colors}
            theme={selectedTemplate.theme}
            baseWidth={baseWidth}
          />
        </div>
      </div>
      <div className="col-span-12 md:col-span-7 bg-white -mt-3" ref={resumeRef}>
        <RenderResume
            templateId={selectedTemplate?.theme || ""}
            resumeData={resumeData || DUMMY_RESUME_DATA}
            containerWidth={baseWidth}
            colorPalette={selectedColorPalette?.colors|| []}
            />
      </div>
    </div>
  );
};

export default ThemeSelector;

const ColorPalette = ({ colors, isSelected, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className={`h-28 flex rounded-lg overflow-hidden cursor-pointer border-2 transition-all
        ${isSelected ? "border-purple-500" : "border-transparent hover:border-purple-300"}`}
    >
      {colors.map((color, index) => (
        <div
          key={`color_${index}`}
          className="flex-1"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};
