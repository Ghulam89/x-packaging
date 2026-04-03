"use client";
import React from "react";
import Image from "next/image";

export type ServiceItem = {
  id?: string | number;
  title: string;
  description?: string;
  icon?: string | React.ReactNode;
};

type Props = {
  items: ServiceItem[];
};

const ServiceSelectionCard = ({ items = [] }: Props) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-[#F7F7F7] border-b border-gray-100">
      <div className="sm:max-w-8xl max-w-[95%] mx-auto">
        <div className="flex flex-wrap justify-center items-stretch">
          {items.map((item, index) => (
            <React.Fragment key={item.id || index}>
              <div className="flex items-center gap-4 py-3 px-4 flex-1 min-w-[200px] justify-center md:justify-start">
                <div className="flex-shrink-0">
                  {item.icon && (
                    <div className="w-12 h-12 flex items-center justify-center relative">
                      {typeof item.icon === "string" ? (
                        <Image
                          src={item.icon}
                          alt={item.title}
                          width={48}
                          height={48}
                          className="opacity-90 object-contain"
                          style={{ filter: "saturate(100%) invert(0%)" }}
                        />
                      ) : (
                        item.icon
                      )}
                    </div>
                  )}
                </div>

                <div className="flex flex-col">
                  <h6 className="text-sm font-bold text-[#213554] uppercase tracking-wider leading-tight">
                    {item.title}
                  </h6>
                  {item.description && (
                    <p className="text-[10px] md:text-xs text-gray-500 mt-1 font-medium">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
              {/* Separator - Show only if not last item */}
              {index < items.length - 1 && (
                <div className="w-px bg-gray-200 self-stretch my-6 hidden md:block"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceSelectionCard;
