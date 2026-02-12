import React from 'react'

const PageLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="text-center">
        {/* Brand Logo/Icon Area */}
        <div className="mb-6">
          <div className="inline-block relative">
            {/* Animated Spinner */}
            <div className="w-20 h-20 border-4 border-[#213554]/20 border-t-[#213554] rounded-full animate-spin"></div>
            {/* Center Brand Icon */} 
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#213554] to-[#EE334B] rounded-full flex items-center justify-center">
                <span style={{color: '#fff'}} className="text-white font-bold text-xl">X</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Brand Name */}
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#213554] to-[#EE334B] bg-clip-text text-transparent mb-2">
          Custom Packaging
        </h2>
       
        <div className="flex justify-center gap-1 mt-4">
          <div className="w-2 h-2 bg-[#213554] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-[#EE334B] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-[#213554] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PageLoader);
