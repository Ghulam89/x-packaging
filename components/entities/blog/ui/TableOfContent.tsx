"use client";
import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";

type Heading = {
  text: string;
  id: string;
  level: number;
};

type Props = {
  content: string;
};

export default function TableOfContent({ content }: Props) {
  const [openTable, setTableOpen] = useState(true);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (content) {
      const timeoutId = setTimeout(() => {
        const contentElement = document.querySelector(".blog_content");
        if (contentElement) {
          const headingElements = Array.from(
            contentElement.querySelectorAll("h1, h2, h3, h4, h5, h6")
          ) as HTMLElement[];

          const processedHeadings = headingElements.map((heading, index) => {
            let id = heading.id;
            if (!id || id.trim() === "") {
              const text = heading.textContent?.trim() || "";
              id = `section-${index}-${text
                .toLowerCase()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-")
                .substring(0, 50)}`;
              heading.id = id;
            }

            return {
              text: heading.textContent?.trim() || "",
              id: id,
              level: parseInt(heading.tagName.substring(1)),
            };
          });

          setHeadings(processedHeadings);
        }
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) return;

    const callback: IntersectionObserverCallback = (entries) => {
      let mostVisible = null;
      let maxRatio = 0;

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          mostVisible = entry.target.id;
        }
      });

      if (mostVisible) {
        setActiveId(mostVisible);
      }
    };

    observerRef.current = new IntersectionObserver(callback, {
      rootMargin: "-120px 0px -60% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [headings]);

  const scrollToHeading = (id: string, event: React.MouseEvent) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      setActiveId(id);
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden sticky top-24">
      <button
        onClick={() => setTableOpen(!openTable)}
        className="w-full flex items-center justify-between p-5 bg-gray-50 border-b border-gray-100 transition-colors hover:bg-gray-100"
      >
        <h2 className="text-xl font-bold text-[#213554]">Table of Contents</h2>
        <IoIosArrowDown
          className={`text-[#213554] transition-transform duration-300 ${
            openTable ? "rotate-180" : ""
          }`}
          size={20}
        />
      </button>

      {openTable && (
        <nav className="p-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
          <ul className="space-y-1">
            {headings.map((heading) => (
              <li
                key={heading.id}
                style={{ marginLeft: `${(heading.level - 1) * 12}px` }}
              >
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => scrollToHeading(heading.id, e)}
                  className={`block py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 border-l-2 ${
                    activeId === heading.id
                      ? "text-[#EE334B] bg-[#EE334B]/5 border-[#EE334B]"
                      : "text-gray-600 border-transparent hover:text-[#213554] hover:bg-gray-50 hover:border-gray-200"
                  }`}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
