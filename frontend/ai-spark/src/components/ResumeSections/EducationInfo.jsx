import React from "react";

const EducationInfo = ({ degree, institution, duration }) => {
  return (
    <div className="mb-5">
      <h3 className="text-[17px] font-semibold text-gray-900">{degree}</h3>
      <p className="text-[15px] text-gray-700 font-medium">{institution}</p>
      <p className="text-[13px] text-gray-500 font-medium italic mt-0.5">
        {duration}
      </p>
    </div>
  );
};

export default EducationInfo;
