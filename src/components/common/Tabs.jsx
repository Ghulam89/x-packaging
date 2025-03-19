import React, { useState } from "react";

const Tabs = ({ tabs, defaultTab, className }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return (
    <div>
      <div className="flex   gap-3  overflow-x-auto whitespace-nowrap">
        {tabs.map((tab) => (
          <button
            key={tab.title}
            className={`px-4 cursor-pointer rounded-xl uppercase font-semibold text-sm py-4 ${className} ${
              activeTab === tab.title
                ? "  bg-[#EE334B]     w-full text-white"
                : "  w-full border text-[#213554] bg-[#F3F4F6] hover:bg-[#EE334B] hover:text-white hover:border-[#EE334B]  border-[#213554]"
            }`}
            onClick={() => setActiveTab(tab.title)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs.map((tab) => (
          <div
            key={tab.title}
            className={activeTab === tab.title ? "" : "hidden"}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
