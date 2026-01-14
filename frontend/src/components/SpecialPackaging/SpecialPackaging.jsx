import { special1, special10, special11, special12, special13, special14, special15, special16, special17, special18, special2, special3, special4, special5, special6, special7, special8, special9 } from "../../assets";

const SpecialPackaging = () => {
  const customBox = [
    {
      id: 1,
      title: "Custom Foiling",
      image: special16,
    },
    {
      id: 2,
      title: "Gold Foiling",
      image: special10,
    },
    {
      id: 3,
      title: "Embossing",
      image: special1,
    },
    {
      id: 4,
      title: "Custom Ribbons",
      image: special7,
    },
    {
      id: 5,
      title: "Spot UV",
      image: special13,
    },
    {
      id: 6,
      title: "Debossing",
      image: special4,
    },
    {
      id: 7,
      title: "Metallic Printing",
      image: special4,
    },
    {
      id: 8,
      title: "Food Grade Print",
      image: special4,
    },
  ];

  return (
    <div className="sm:max-w-8xl p-3 max-w-[95%] mx-auto pb-12 pt-6">
      <div className="text-center mb-10">
        <h2 className="sm:text-[35px] text-[25px] leading-9 font-sans font-[600] text-[#333333]">
          Enhance Your Product Presentation with Our Special Packaging Features
        </h2>
      </div>
      
      {/* Grid Layout - 3 columns on desktop, 2 on tablet, 1 on mobile */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {customBox.map((box) => (
          <div
            key={box.id}
            className="group relative overflow-hidden rounded-xl bg-gray-50  transition-shadow duration-300"
          >
            {/* Image */}
            <div className="relative w-full overflow-hidden">
              <img
                src={box.image}
                alt={box.title}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              
              {/* Linear Gradient Overlay at Bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
            </div>
            
            {/* Label Bar */}
            <div className="absolute bottom-0 left-0 right-0 px-4 py-3">
              <h3 className="text-white font-semibold text-left text-sm sm:text-base">
                {box.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialPackaging;
