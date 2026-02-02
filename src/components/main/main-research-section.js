"use client";
import { useState, useRef, useEffect, useCallback } from "react";

const researchItems = [
  {
    title: "Core AI",
    subtitle: "Advance generative AI by developing state-of-the-art models such as large language models, vision-language models, and vision-language-action models. Drive innovation through novel model architectures and training methodologies, enabling the next generation of multi-modal AI systems.",
    image: "/icons/core_ai.png",
  },
  {
    title: "System AI",
    subtitle: "Enhance the scalability and efficiency of AI systems through integrated software-hardware co-design. Facilitate large-scale data processing and AI workloads through high-performance inference, training, and deployment across heterogeneous computing environments.",
    image: "/icons/system_ai.png",
  },
  {
    title: "Embodied AI",
    subtitle: "Develop intelligent agents capable of perceiving, reasoning, and acting autonomously in dynamic physical environments. Integrate multimodal perception, behavioral planning, and real-time control to empower autonomous systems with adaptive, goal-directed interaction.",
    image: "/icons/embodied_ai.png",
  },
  {
    title: "Medical AI",
    subtitle: "Utilize AI to interpret complex medical data, including imaging, biosignals, and electronic health records. Improve clinical decision-making through accurate, interpretable, and deployable models for diagnosis, treatment planning, and outcome prediction.",
    image: "/icons/medical_ai.png",
  },
  {
    title: "Industrial AI",
    subtitle: "Apply AI technologies to industrial and manufacturing domains, leveraging domain expertise to address challenges such as predictive maintenance, process optimization, and intelligent automation through robust algorithms and data-driven system integration.",
    image: "/icons/industrial_ai.png",
  },
];


export default function ResearchSection() {
  const autoSlideInterval = 10000 // 10s 

  // Start with pageIndex = 1 because index 0 will be a clone.
  const [pageIndex, setPageIndex] = useState(1);
  const [isInstant, setIsInstant] = useState(false);
  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const carouselRef = useRef(null);
  const [carouselWidth, setCarouselWidth] = useState(0);

  // Determine items per page based on width
  const getItemsPerPage = (width) => {
    if (width > 1200) return 4;
    if (width > 800) return 3;
    if (width > 500) return 2;
    return 1;
  };

  const itemsPerPage = getItemsPerPage(carouselWidth);

  // Build “real” pages from researchItems.
  const realPages = [];
  for (let i = 0; i < researchItems.length; i += itemsPerPage) {
    realPages.push(researchItems.slice(i, i + itemsPerPage));
  }
  const totalRealPages = realPages.length; // number of real pages

  // Build pages with clones:
  // pages[0] is a clone of the last real page.
  // pages[1..totalRealPages] are the real pages.
  // pages[totalRealPages+1] is a clone of the first real page.
  const pages = [
    realPages[totalRealPages - 1],
    ...realPages,
    realPages[0],
  ];

  const changePage = (nextIndex) => {
    if (nextIndex < 0) {
      setPageIndex(0);
    } else if (nextIndex >= pages.length) {
      setPageIndex(pages.length - 1);
    } else {
      setPageIndex(nextIndex);
    }
  };

  // Update carousel width on mount and on resize.
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

  // Auto slide (only if not dragging)
  useEffect(() => {
    if (isDragging) return;
    const interval = setInterval(() => {
      changePage(pageIndex + 1);
    }, autoSlideInterval);
    return () => clearInterval(interval);
  }, [isDragging, pageIndex]);

  // Drag handlers
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
    const threshold = carouselWidth / 10; // sensitivity threshold
    if (diff > threshold) {
      changePage(pageIndex - 1);
    } else if (diff < -threshold) {
      changePage(pageIndex + 1);
    }
  }, [currentX, startX, carouselWidth, pageIndex, isDragging]);

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

  // Calculate translateX: Each page takes carouselWidth.
  const translateX =
    -pageIndex * carouselWidth + (isDragging ? currentX - startX : 0);

  return (
    <section className="py-10">
      <div className="max-w-[1200px] mx-auto px-5 relative group">
        {/* Left Arrow Button */}
        <button
          onClick={() => changePage(pageIndex - 1)}
          className="z-50 absolute -left-3 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center justify-center bg-white text-[#333] border border-gray-300 px-3 py-1.5 sm:px-4 sm:py-2 rounded text-base sm:text-lg font-semibold transition"
          aria-label="Previous Slide"
        >
          &#8249;
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={() => changePage(pageIndex + 1)}
          className="z-50 absolute -right-3 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center justify-center bg-white text-[#333] border border-gray-300 px-3 py-1.5 sm:px-4 sm:py-2 rounded text-base sm:text-lg font-semibold transition"
          aria-label="Next Slide"
        >
          &#8250;
        </button>


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
            className="flex transition-transform duration-600 ease-out"
            style={{
              transform: `translateX(${translateX}px)`,
              transition: isDragging || isInstant ? "none" : undefined,
              cursor: isDragging ? "grabbing" : "grab",
            }}
            onTransitionEnd={() => {
              // If at the clone at beginning, jump to the corresponding real slide.
              if (pageIndex === 0) {
                setIsInstant(true);
                setPageIndex(totalRealPages);
                setTimeout(() => setIsInstant(false), 50);
              }
              // If at the clone at the end, jump to the first real slide.
              else if (pageIndex === pages.length - 1) {
                setIsInstant(true);
                setPageIndex(1);
                setTimeout(() => setIsInstant(false), 50);
              }
            }}
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
                        <div className="w-full h-[200px] mb-3 flex items-center justify-center overflow-hidden rounded-md">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="object-cover w-full h-full scale-[0.9]"
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
        {/* Dots */}
        {/* This side is a little bit tricky
        1. to remove latency, we used pages, not realPages
        2. check overflowing and underflowing scenario and color them too 
        */}
        <div className="flex justify-center mt-5">
          {pages.slice(1, pages.length - 1).map((_, idx) => (
            <div
              key={idx}
              onClick={() => setPageIndex(idx + 1)} // +1 to match actual pageIndex
              className={`w-2 h-2 rounded-full mx-1.5 cursor-pointer ${
                // First dot
                (idx === 0 && (pageIndex === 1 || pageIndex === pages.length - 1)) ||
                // Last dot
                (idx === pages.length - 3 && (pageIndex === pages.length - 2 || pageIndex === 0)) ||
                // Normal
                pageIndex === idx + 1
                  ? "bg-[#333333]"
                  : "bg-[#ccc]"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="mt-4 text-sm text-center text-gray-600">
</div>
    </section>
  );
}