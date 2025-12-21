import React from "react";

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="w-full">
      <div className="flex space-x-4 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`relative px-4 py-2 text-sm md:text-base font-medium rounded-t-lg transition-all duration-300 
              ${
                activeTab === tab.label
                  ? "bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500 text-white shadow-lg"
                  : "text-gray-600 hover:text-white"
              }`}
          >
            <span className="font-semibold">{tab.label}</span>

            {/* Active Indicator */}
            {activeTab === tab.label && (
              <span className="absolute -bottom-1 left-0 w-full h-1 rounded-t-lg
                               bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
