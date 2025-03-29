"use client";
import { useState, useRef, useEffect, useCallback } from "react";

const researchItems = [
  {
    title: "CoreAI",
    subtitle: "Focuses on cutting-edge generative AI algorithms, including text-based LLMs, vision-text LVLMs,  and multi-modal LMs, pushing advancements in the latest AI models.",
    image: "/background/snu-night.jpg",
  },
  {
    title: "SysAI",
    subtitle: "Explores AI integration into big data systems (from SW/HW perspectives), applying AI to various components, and design systems for accelerating AI models, driving innovation in system architecture and efficiency.",
    image: "/background/snu-night.jpg",
  },
  {
    title: "MedAI",
    subtitle: "Leverages AI to analyze real-world healthcare data, aiming to enhance diagnostics, treatment, and patient outcomes through innovative AI-driven solutions in medical applications.",
    image: "/background/snu-night.jpg",
  },
  {
    title: "CoreAI",
    subtitle: "Focuses on cutting-edge generative AI algorithms, including text-based LLMs, vision-text LVLMs,  and multi-modal LMs, pushing advancements in the latest AI models.",
    image: "/background/snu-night.jpg",
  },
  {
    title: "SysAI",
    subtitle: "Explores AI integration into big data systems (from SW/HW perspectives), applying AI to various components, and design systems for accelerating AI models, driving innovation in system architecture and efficiency.",
    image: "/background/snu-night.jpg",
  },
  {
    title: "MedAI",
    subtitle: "Leverages AI to analyze real-world healthcare data, aiming to enhance diagnostics, treatment, and patient outcomes through innovative AI-driven solutions in medical applications.",
    image: "/background/snu-night.jpg",
  },
  {
    title: "CoreAI",
    subtitle: "Focuses on cutting-edge generative AI algorithms, including text-based LLMs, vision-text LVLMs,  and multi-modal LMs, pushing advancements in the latest AI models.",
    image: "/background/snu-night.jpg",
  },
  {
    title: "SysAI",
    subtitle: "Explores AI integration into big data systems (from SW/HW perspectives), applying AI to various components, and design systems for accelerating AI models, driving innovation in system architecture and efficiency.",
    image: "/background/snu-night.jpg",
  },
  {
    title: "MedAI",
    subtitle: "Leverages AI to analyze real-world healthcare data, aiming to enhance diagnostics, treatment, and patient outcomes through innovative AI-driven solutions in medical applications.",
    image: "/background/snu-night.jpg",
  },
];

export default function ResearchSection() {
    // Current page index
    const [pageIndex, setPageIndex] = useState(0);
    // Drag state variables
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);
    // Carousel ref and width
    const carouselRef = useRef(null);
    const [carouselWidth, setCarouselWidth] = useState(0);
  
    // Determine number of items per page for responsiveness
    const getItemsPerPage = (width) => {
      if (width > 1200) return 4;
      if (width > 800) return 3;
      if (width > 500) return 2;
      return 1;
    };
  
    const itemsPerPage = getItemsPerPage(carouselWidth);
    const totalPages = Math.ceil(researchItems.length / itemsPerPage);
  
    // Group items into pages
    const pages = [];
    for (let i = 0; i < researchItems.length; i += itemsPerPage) {
      pages.push(researchItems.slice(i, i + itemsPerPage));
    }
  
    // Update carousel width on mount and resize
    useEffect(() => {
      const updateWidth = () => {
        if (carouselRef.current) {
          setCarouselWidth(carouselRef.current.offsetWidth);
        }
      };
      updateWidth();
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }, []);
  
    // Adjust current page index if totalPages가 변경되면 범위 내로 보정
    useEffect(() => {
      if (pageIndex >= totalPages) {
        setPageIndex(totalPages - 1);
      }
    }, [totalPages, pageIndex]);
  
    // Auto slide (pausing during dragging)
    useEffect(() => {
      if (isDragging) return;
      const interval = setInterval(() => {
        setPageIndex((prev) => (prev + 1) % totalPages);
      }, 5000);
      return () => clearInterval(interval);
    }, [isDragging, totalPages]);
  
    // Drag handlers with useCallback for stability
    const handleDragStart = useCallback((clientX) => {
      setIsDragging(true);
      setStartX(clientX);
      setCurrentX(clientX);
    }, []);
  
    const handleDragMove = useCallback(
      (clientX) => {
        if (!isDragging) return;
        setCurrentX(clientX);
      },
      [isDragging]
    );
  
    const handleDragEnd = useCallback(() => {
      if (!isDragging) return;
      setIsDragging(false);
      const diff = currentX - startX;
      const threshold = carouselWidth / 10; // Lower threshold for sensitivity
      if (diff > threshold) {
        setPageIndex((prev) => (prev - 1 + totalPages) % totalPages);
      } else if (diff < -threshold) {
        setPageIndex((prev) => (prev + 1) % totalPages);
      }
    }, [currentX, startX, carouselWidth, totalPages, isDragging]);
  
    // Global mouse event listeners for improved drag handling
    useEffect(() => {
      const onMouseMove = (e) => handleDragMove(e.clientX);
      const onMouseUp = () => handleDragEnd();
      if (isDragging) {
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
      }
      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };
    }, [isDragging, handleDragMove, handleDragEnd]);
  
    const translateX = -pageIndex * carouselWidth + (isDragging ? currentX - startX : 0);
  
    return (
      <section className="py-10">
        {/* Container with max-width and horizontal padding */}
        <div className="max-w-[1200px] mx-auto px-5">
          <div
            ref={carouselRef}
            className="overflow-hidden relative select-none"
            style={{ touchAction: "pan-y" }}
            onMouseDown={(e) => handleDragStart(e.clientX)}
            onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
            onTouchEnd={handleDragEnd}
            onTouchCancel={handleDragEnd}
          >
            <div
              className={`flex ${!isDragging ? "transition-transform duration-600 ease-out" : ""} ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
              }`}
              style={{ transform: `translateX(${translateX}px)` }}
            >
              {pages.map((page, pIdx) => (
                <div key={pIdx} className="flex-none w-full">
                  <div className="flex">
                    {page.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-2.5"
                        style={{ flexBasis: `${100 / itemsPerPage}%` }}
                      >
                        <div className="rounded-lg p-4 h-full">
                          <div className="w-full h-[150px] mb-3 flex items-center justify-center overflow-hidden rounded-md">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <h3 className="text-xl mb-2">{item.title}</h3>
                          <p className="text-l">{item.subtitle}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-5">
            {pages.map((_, idx) => (
              <div
                key={idx}
                onClick={() => setPageIndex(idx)}
                className={`w-2 h-2 rounded-full mx-1.5 cursor-pointer ${
                  idx === pageIndex ? "bg-[#333]" : "bg-[#ccc]"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }