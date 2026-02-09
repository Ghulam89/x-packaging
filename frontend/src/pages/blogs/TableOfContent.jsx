import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowDown } from "react-icons/io";

function TableOfContent({ content }) {
    const [openTable, setTableOpen] = useState(true);
    const [headings, setHeadings] = useState([]);
    const [activeId, setActiveId] = useState(null);
    const observerRef = useRef(null);
    const activeItemRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (content) {
            // Wait for DOM to be ready - increased timeout for slower connections
            const timeoutId = setTimeout(() => {
                const contentElement = document.querySelector('.blog_content');
                if (contentElement) {
                    const headingElements = Array.from(
                        contentElement.querySelectorAll('h1, h2, h3, h4, h5, h6')
                    );
                    
                    const processedHeadings = headingElements.map((heading, index) => {
                        // Always generate a unique ID if not present
                        let id = heading.id;
                        if (!id || id.trim() === '') {
                            const text = heading.textContent.trim();
                            id = `section-${index}-${text
                                .toLowerCase()
                                .replace(/[^\w\s-]/g, '')
                                .replace(/\s+/g, '-')
                                .substring(0, 50)}`;
                            heading.id = id;
                            // Ensure ID is set on the actual DOM element
                            heading.setAttribute('id', id);
                        }
                        
                        // Store reference to the element
                        return {
                            text: heading.textContent.trim(),
                            id: id,
                            level: parseInt(heading.tagName.substring(1)),
                            element: heading
                        };
                    });

                    setHeadings(processedHeadings);
                    
                    // Handle initial hash in URL
                    if (window.location.hash) {
                        const hashId = window.location.hash.substring(1);
                        const element = document.getElementById(hashId);
                        if (element) {
                            setTimeout(() => {
                                setActiveId(hashId);
                                const offset = 120;
                                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                                const offsetPosition = elementPosition - offset;
                                window.scrollTo({
                                    top: offsetPosition,
                                    behavior: 'smooth'
                                });
                            }, 300);
                        }
                    }
                }
            }, 500); // Increased timeout to ensure DOM is fully rendered

            return () => clearTimeout(timeoutId);
        }
    }, [content]);

    useEffect(() => {
        // Set up IntersectionObserver to track which heading is in view
        if (headings.length === 0) return;

        const callback = (entries) => {
            // Find the entry that's most visible
            let mostVisible = null;
            let maxRatio = 0;

            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
                    maxRatio = entry.intersectionRatio;
                    mostVisible = entry.target.id;
                }
            });

            // If we have intersecting entries, set the most visible one
            if (mostVisible) {
                setActiveId(mostVisible);
            } else {
                // Fallback: find the first entry that's above the viewport
                const sortedEntries = entries
                    .filter(e => e.boundingClientRect.top < window.innerHeight / 2)
                    .sort((a, b) => b.boundingClientRect.top - a.boundingClientRect.top);
                
                if (sortedEntries.length > 0) {
                    setActiveId(sortedEntries[0].target.id);
                }
            }
        };

        observerRef.current = new IntersectionObserver(callback, {
            rootMargin: '-120px 0px -60% 0px',
            threshold: [0, 0.25, 0.5, 0.75, 1]
        });

        // Observe all headings
        headings.forEach(heading => {
            const element = document.getElementById(heading.id);
            if (element) {
                observerRef.current.observe(element);
            }
        });

        // Clean up observer on unmount
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [headings]);

    // Scroll active item into view in the TOC sidebar
    useEffect(() => {
        if (activeId && activeItemRef.current && containerRef.current) {
            const container = containerRef.current;
            const activeItem = activeItemRef.current;
            
            const containerRect = container.getBoundingClientRect();
            const itemRect = activeItem.getBoundingClientRect();
            
            // Check if item is outside visible area
            if (itemRect.top < containerRect.top) {
                // Scroll item to top of container
                activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else if (itemRect.bottom > containerRect.bottom) {
                // Scroll item to bottom of container
                activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    }, [activeId]);

    const scrollToHeading = (id, event) => {
        event.preventDefault();
        event.stopPropagation();
        
        // Try multiple ways to find the element
        let element = document.getElementById(id);
        
        // If not found by ID, try finding by querySelector in blog_content
        if (!element) {
            const contentElement = document.querySelector('.blog_content');
            if (contentElement) {
                element = contentElement.querySelector(`#${id}`) || 
                         contentElement.querySelector(`[id="${id}"]`) ||
                         Array.from(contentElement.querySelectorAll('h1, h2, h3, h4, h5, h6'))
                             .find(el => el.id === id || el.textContent.trim() === headings.find(h => h.id === id)?.text);
            }
        }
        
        if (element) {
            // Set active ID immediately for instant feedback
            setActiveId(id);
            
            // Temporarily disable IntersectionObserver to prevent conflicts
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
            
            // Calculate scroll position with offset for header
            const offset = 120;
            const elementRect = element.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const elementTop = elementRect.top + scrollTop;
            const offsetPosition = elementTop - offset;

            // Smooth scroll to the section
            window.scrollTo({
                top: Math.max(0, offsetPosition),
                behavior: 'smooth'
            });

            // Update URL hash after a small delay
            setTimeout(() => {
                window.history.pushState(null, null, `#${id}`);
                
                // Re-enable IntersectionObserver after scroll completes
                if (observerRef.current && headings.length > 0) {
                    headings.forEach(heading => {
                        const headingElement = document.getElementById(heading.id);
                        if (headingElement) {
                            observerRef.current.observe(headingElement);
                        }
                    });
                }
            }, 100);
            
            // Focus the element for accessibility
            element.setAttribute('tabindex', '-1');
            setTimeout(() => {
                element.focus({ preventScroll: true });
            }, 500);
        } else {
            console.warn(`Element with id "${id}" not found`);
        }
    };

    if (!headings || headings.length === 0) {
        return null;
    }

    return (
        <div className='bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6'>
            <div 
                className='flex items-center justify-between p-4 cursor-pointer bg-gradient-to-r from-[#213554] to-[#213554]/95'
                onClick={() => setTableOpen(!openTable)}
            >
                <h5 className='text-lg font-bold text-white'>Table of Contents</h5>
                <IoIosArrowDown 
                    className={`transition-transform duration-300 text-white ${openTable ? 'rotate-180' : ''}`} 
                />
            </div>
            
            {openTable && (
                <div 
                    ref={containerRef}
                    className='border-t max-h-[70vh] overflow-y-auto custom-scrollbar'
                    style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e0 transparent' }}
                >
                    <nav className='p-4'>
                        <ul className='space-y-2'>
                            {headings.map((heading, index) => {
                                const isActive = activeId === heading.id;
                                return (
                                    <li 
                                        key={`${heading.id}-${index}`} 
                                        className={`text-sm transition-all duration-200 ${
                                            heading.level === 1 ? 'pl-0 font-semibold' : 
                                            heading.level === 2 ? 'pl-3' : 
                                            heading.level === 3 ? 'pl-6' :
                                            'pl-9'
                                        }`}
                                    >
                                        <a 
                                            ref={isActive ? activeItemRef : null}
                                            href={`#${heading.id}`}
                                            onClick={(e) => scrollToHeading(heading.id, e)}
                                            className={`block py-2 px-3 rounded-md transition-all duration-200 cursor-pointer ${
                                                isActive
                                                    ? 'text-[#EE334B] font-semibold bg-[#EE334B]/10 border-l-4 border-[#EE334B] shadow-sm' 
                                                    : 'text-gray-700 hover:bg-[#EE334B]/5 hover:text-[#EE334B]'
                                            }`}
                                        >
                                            <span className="flex items-start gap-2">
                                                <span className={`min-w-[24px] text-xs mt-0.5 font-medium ${
                                                    isActive ? 'text-[#EE334B] font-bold' : 'text-gray-400'
                                                }`}>
                                                    {index + 1}.
                                                </span>
                                                <span className="leading-relaxed flex-1">
                                                    {heading.text.length > 50 
                                                        ? `${heading.text.substring(0, 50)}...` 
                                                        : heading.text}
                                                </span>
                                            </span>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
}

export default TableOfContent;
