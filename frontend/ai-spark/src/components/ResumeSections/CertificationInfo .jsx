import React from "react";

const CertificationInfo = ({ title, issuer, year, bgColor }) => {
  return (
    <div>
      <h3 className="text-[17px] font-semibold text-gray-900">{title}</h3>

      <div className="flex items-center gap-2 mt-1">
        {year && (
          <div
            className="text-[13px] font-bold text-gray-800 px-3 py-1 rounded-lg"
            style={{ backgroundColor: bgColor }}
          >
            {year}
          </div>
        )}

        <p className="text-[14px] text-gray-700 font-medium">
          {issuer}
        </p>
      </div>
    </div>
  );
};

export default CertificationInfo;
