import Image from "next/image";

const announcements = [
  { id: 1, title: "Claim Your 30% Discount Now", icon: "/assets/images/icon/Discount.svg" },
  { id: 2, title: "Contact us for a custom quote today!", icon: "/assets/images/icon/contact us.svg" },
  { id: 3, title: "Biggest Sale of the Season", icon: "/assets/images/icon/Big sale.svg" },
  { id: 4, title: "Save 40% on Custom Boxes", icon: "/assets/images/icon/Big sale.svg" },
  { id: 5, title: "Free Shipping!     Free Design!     Save Big on Bulk Orders!", icon: "/assets/images/icon/Free-delivery.png" },
];

export default function AnnouncementBanner() {
  const duplicated = [...announcements, ...announcements];
  return (
    <>
      <style>
        {`
          @keyframes scroll-announcement {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .announcement-scroll {
            animation: scroll-announcement 15s linear infinite;
            will-change: transform;
          }
          .announcement-scroll:hover {
            animation-play-state: paused;
          }
        `}
      </style>
      <div className="h-px w-full" style={{ backgroundColor: "#213554", boxShadow: "0 1px 2px rgba(33,53,84,0.2)" }} />
      <div className="bg-[#213554] relative overflow-hidden w-full z-30">
        <div className="relative w-full py-1 sm:py-1">
          <div className="flex announcement-scroll whitespace-nowrap">
            {duplicated.map((a, index) => (
              <div key={`${a.id}-${index}`} className="inline-flex items-center gap-1 sm:gap-3 px-6 sm:px-8 lg:px-12 flex-shrink-0">
                {a.icon ? (
                  <Image
                    src={a.icon.replace(/ /g, "%20")}
                    alt=""
                    width={24}
                    height={24}
                    className="flex-shrink-0 object-contain"
                  />
                ) : null}
                <span className="text-xs sm:text-sm md:text-base font-bold whitespace-nowrap underline" style={{ color: "#ffffff" }}>
                  {a.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-px w-full" style={{ backgroundColor: "#213554", boxShadow: "0 -1px 2px rgba(33,53,84,0.2)" }} />
    </>
  );
}
