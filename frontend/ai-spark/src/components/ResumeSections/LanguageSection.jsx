import React from "react";
import Progress from "../Progress";

const LanguageInfo = ({ language, progress, accentColor, bgColor }) => {
  return (
    <div>
      <p className="text-[16px] font-semibold text-gray-900">
        {language}
      </p>

      {progress > 0 && (
        <Progress
          progress={progress}
          color={accentColor}
          bgColor={bgColor}
        />
      )}
    </div>
  );
};

const LanguageSection = ({ languages = [], accentColor, bgColor }) => {
  return (
    <div className="flex flex-col gap-3">
      {languages.map((language, index) => (
        <LanguageInfo
          key={`language_${index}`}
          language={language.name || ""}
          progress={language.progress || 0}
          accentColor={accentColor}
          bgColor={bgColor}
        />
      ))}
    </div>
  );
};

export default LanguageSection;
