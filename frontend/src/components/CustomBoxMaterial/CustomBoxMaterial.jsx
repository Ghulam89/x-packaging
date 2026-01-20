import React, { useState, useEffect } from "react";
import CustomBoxCard from "../common/CustomBoxCard";
import { Box1, Box2, Box3, Box4, Box5, Box6, Box7 } from "../../assets";

// Add fadeInUp animation
if (typeof document !== 'undefined' && !document.getElementById('custom-box-animations')) {
  const style = document.createElement('style');
  style.id = 'custom-box-animations';
  style.textContent = `
    @keyframes fadeInUp {
      0% { transform: translateY(10px); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    }
    .animate-fadeInUp {
      animation: fadeInUp 0.4s ease-out;
    }
  `;
  document.head.appendChild(style);
}

// Preload critical images to prevent layout shifts
const preloadImages = (imageUrls) => {
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
};

const CustomBoxMaterial = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("Rigid Boxes");
  
  const customBox = [
    {
      id: 1,
      title: "Rigid Boxes",
      subTitle: "Strong Boxes for Special Things: Rigid Boxes Explained!",
      description:
        "Rigid boxes are like super strong and unbreakable homes for extraordinary things. The manufacturers make these boxes using special materials to keep toys, makeup, and nice things protected. Additionally, people use printed rigid boxes to make things look extra special by painting them with cool colors and designs.",
      image: Box1,
      buttonUrl: "#",
      width: 450,  // Added explicit dimensions
      height: 300,
    },
    {
      id: 2,
      title: "Corrugated Boxes",
      subTitle: "Super Boxes: How Corrugated Magic Keeps Things Safe!",
      description:
        "Corrugated boxes are special types of containers made from a material called corrugated cardboard. Essentially, these boxes consist of three layers. The inner layer, known as corrugation, adds strength and durability to the box. Perfect for mailing and shipping, they make sure your items reach their destination in great shape. Trust corrugated boxes for a safe and secure journey!",
      image: Box2,
      buttonUrl: "#",
      width: 450,
      height: 300,
    },
    {
      id: 3,
      title: "Kraft Boxes",
      subTitle: "Go Green with Kraft Boxes!",
      description:
        "Make a smart choice with Kraft boxes—good for your stuff and good for the environment! These boxes are strong containers for packing things, and they’re made from a special paper called kraft paper. These boxes are handy for packing lots of different things, showing that they work well for many uses.",
      image: Box3,
      buttonUrl: "#",
      width: 450,
      height: 300,
    },
    {
      id: 4,
      title: "Cardboard Boxes",
      subTitle:
        "Magic of Cardboard: Versatile Containers for Retail Packaging!",
      description:
        "Cardboard boxes are like strong, big containers made out of thick paper. They’re used for packing and carrying lots of different things. They come in all shapes and sizes, like small ones for holding toys or big ones. These boxes are perfect for packaging your items and making them look neat on the shelves. They keep your products safe and make your shop look great!",
      image: Box4,
      buttonUrl: "#",
      width: 450,
      height: 300,
    },
    {
      id: 5,
      title: "Black Linen Boxes",
      subTitle:
        "Fancy Boxes: Cool Black Linen Style!",
      description:
        "Get sleek Black Linen boxes for your special items! These boxes look cool and feel smooth. They come in black color. These boxes are eco-friendly helping to keep the Earth healthy. Perfect for keeping your things safe and looking fancy. You can choose black Linen boxes for a stylish way to store and protect your stuff!",
      image: Box5,
      buttonUrl: "#",
      width: 450,
      height: 300,
    },
    {
      id: 6,
      title: "White Linen Boxes",
      subTitle:
        "Classic Elegance: White Linen Boxes!",
      description:
        "White Linen boxes are bright and feel soft. Perfect for keeping your stuff safe and looking neat. They come in bright white color. You can choose white Linen boxes for a cool way to store and protect your things! These boxes are eco-friendly helping to keep the Earth healthy.",
      image: Box6,
      buttonUrl: "#",
      width: 450,
      height: 300,
    },
    {
      id: 7,
      title: "Bux Boxes",
      subTitle:
        "Affordable and Reliable: Bux Board Boxes!",
      description:
        "Bux Board boxes are budget-friendly options for storing your things. Despite being economical, they're still strong and reliable. Don't let the low price fool you – they are still sturdy and get the job done. So, if you're looking for an inexpensive yet dependable packaging or storage option, Bux Board boxes are a great choice, providing both affordability and reliability.",
      image: Box7,
      buttonUrl: "#",
      width: 450,
      height: 300,
    },
  ];

  // Preload images on component mount
  useEffect(() => {
    const imageUrls = customBox.map(box => box.image);
    preloadImages(imageUrls);
    
    // Set a small timeout to allow images to start loading
    const timer = setTimeout(() => {
      setImagesLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Get first 4 boxes for the image grid (2x2)
  const imageTabs = customBox.slice(0, 4);
  const activeBoxData = customBox.find(box => box.title === activeTab) || customBox[0];

  return (
    <div className="w-full mx-auto">
      <div className="text-center">
        <h2 className="sm:text-[35px] text-[25px] font-sans font-[600] text-[#333333] break-words">
          Custom Box Material Guide: Finding the Perfect Fit
        </h2>
        <p className="pt-3 pb-6 text-sm break-words">
          Let's explore the Types of Materials for Your Unique Packaging.
        </p>
      </div>
      
      {/* Add a loading placeholder to prevent layout shift */}
      {!imagesLoaded && (
        <div className="my-10 min-h-[400px] flex items-center justify-center">
          <div className="animate-pulse bg-gray-200 rounded-lg w-full h-full max-h-[400px]"></div>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center lg:gap-8 my-8">
        {/* Left Side - Image Grid Tabs (2x2) */}
        <div className="relative">
          {/* Watermark Background */}
          {/* <div className="hidden lg:flex absolute -top-32 bottom-0 -left-8 items-center justify-start pl-4 pointer-events-none opacity-10">
            <h6
              className="text-[60px] lg:text-[100px] font-bold text-gray-300 select-none"
              style={{
                fontFamily: 'Arial, sans-serif',
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
              }}
            >
              Custom style
            </h6>
          </div> */}
          {/* <div className="hidden md:flex absolute -top-32 sm:-top-28 bottom-0 -left-8 sm:-left-16 items-center justify-start pl-4 sm:pl-8 pointer-events-none">
            <h6
              className="text-[40px] sm:text-[60px] lg:text-[100px] font-bold text-[#EE334B] opacity-10 select-none" 
              style={{ 
                fontFamily: 'Arial, sans-serif',
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                transform: 'rotate(0deg)'
              }}
            >
              Custom Quote
            </h6>
          </div>
           */}
          <div className="grid grid-cols-2 gap-4 relative z-10">
            {imageTabs.map((box) => {
              const isActive = activeTab === box.title;
              return (
                <button
                  key={box.id}
                  onClick={() => setActiveTab(box.title)}
                  className={`relative group rounded-lg overflow-hidden border-2 transition-all duration-300 transform  ${
                    isActive
                      ? 'border-[#EE334B] shadow-lg'
                      : 'border-gray-200 hover:border-[#EE334B]/50 hover:shadow-md'
                  }`}
                >
                  <div className="relative w-full  sm:h-64 h-auto aspect-square overflow-hidden">
                    <img
                      src={box.image}
                      alt={box.title}
                      className={`w-full h-full  object-cover transition-transform duration-700 ${
                        isActive ? '' : ''
                      }`}
                    />
                    {/* Overlay Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-[#213554]/60 via-transparent to-transparent transition-opacity duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}></div>
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"></div>
                  </div>
                  {/* Label */}
                  <div className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/60 to-transparent ${
                    isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  } transition-opacity duration-300`}>
                    <p className="text-white font-semibold text-sm text-center">{box.title}</p>
                  </div>
                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-[#EE334B] rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="relative">
          {/* Watermark Background */}
          {/* <div className="hidden lg:flex absolute -top-32 bottom-0 -right-8 items-center justify-end pr-4 pointer-events-none opacity-10">
            <h6
              className="text-[60px] lg:text-[100px] font-bold text-gray-300 select-none"
              style={{
                fontFamily: 'Arial, sans-serif',
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
              }}
            >
              style
            </h6>
          </div> */}
          <div className="relative">
          <div className=" z-10 animate-fadeInUp md:pr-20 pr-0">
            <CustomBoxCard {...activeBoxData} />
          </div>
          <div className="hidden md:flex absolute  z-30 -bottom-18 right-0 items-center justify-start pointer-events-none">
            <h6
              className="text-[40px] sm:text-[60px]  lg:text-[77px] font-bold text-[#EE334B] opacity-10 select-none" 
              style={{ 
                fontFamily: 'Arial, sans-serif',
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                transform: 'rotate(0deg)',
                whiteSpace: 'nowrap'
              }}
            >
              Custom{'\u00A0'}Material 
            </h6>
          </div>
       
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default CustomBoxMaterial;