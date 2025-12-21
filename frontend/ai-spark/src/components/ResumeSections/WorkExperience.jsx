import React from "react";

const WorkExperience = ({
    company, role, duration, durationColor, description,
}) => {
    return (
        <div className="mb-5">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-[17px] font-semibold text-gray-900">
                        {company}
                    </h3>
                    <p className="text-[16px] text-gray-700 font-medium">{role}</p>
                </div>
                <p className="text-sm font-bold italic" style={{ color: durationColor }}>
                    {duration}
                </p>
            </div>

            <p className="text-[15px] text-gray-600 font-medium italic mt-[0.3rem]">
                {description}
            </p>
        </div>
    )
}

export default WorkExperience;
