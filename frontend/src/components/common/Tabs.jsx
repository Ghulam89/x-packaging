import React, { useState, useEffect } from "react";

// Add animations to document head
if (typeof document !== 'undefined' && !document.getElementById('tabs-animations')) {
    const style = document.createElement('style');
    style.id = 'tabs-animations';
    style.textContent = `
        @keyframes slideInRight {
            0% { transform: translateX(20px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInLeft {
            0% { transform: translateX(-20px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeInUp {
            0% { transform: translateY(10px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slideInRight {
            animation: slideInRight 0.4s ease-out;
        }
        .animate-slideInLeft {
            animation: slideInLeft 0.4s ease-out;
        }
        .animate-fadeInUp {
            animation: fadeInUp 0.4s ease-out;
        }
    `;
    document.head.appendChild(style);
}

const Tabs = ({ tabs, defaultTab, className }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [prevTab, setPrevTab] = useState(null);
  const [direction, setDirection] = useState('right');

  useEffect(() => {
    if (prevTab !== null && prevTab !== activeTab) {
      const prevIndex = tabs.findIndex(t => t.title === prevTab);
      const currentIndex = tabs.findIndex(t => t.title === activeTab);
      setDirection(currentIndex > prevIndex ? 'right' : 'left');
    }
    setPrevTab(activeTab);
  }, [activeTab, prevTab, tabs]);

  const handleTabChange = (tabTitle) => {
    setActiveTab(tabTitle);
  };

  return (
    <div>
      <div className="flex gap-2 bg-gradient-to-r from-gray-50 to-gray-100 p-1.5 rounded-2xl overflow-x-auto whitespace-nowrap  border border-gray-200 justify-between">
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.title;
          return (
            <button
              key={tab.title}
              className={`relative px-6 py-3.5 cursor-pointer transition-all duration-300 ease-in-out rounded-xl text-sm font-semibold overflow-hidden group flex-1 ${
                isActive
                  ? "bg-gradient-to-r from-[#213554] to-[#213554]/90 shadow-lg"
                  : `hover:bg-white/80 hover:text-[#213554] text-gray-600 hover:shadow-md hover:scale-105 ${className}`
              }`}
              onClick={() => handleTabChange(tab.title)}
              style={isActive ? { color: '#ffffff' } : {}}
            >
              {/* Animated background effect for active tab */}
              {isActive && (
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></span>
              )}
              {/* Hover shine effect for inactive tabs */}
              {!isActive && (
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#213554]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out"></span>
              )}
              <span className="relative z-10" style={isActive ? { color: '#ffffff' } : {}}>{tab.title}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-8 relative ">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.title;
          if (!isActive) return null;
          
          return (
            <div
              key={tab.title}
              className={`${
                direction === 'right' ? 'animate-slideInRight' : 'animate-slideInLeft'
              }`}
            >
              <div className="animate-fadeInUp">
                {tab.content}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
