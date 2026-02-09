'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const images = [
    '/hero/img1.jpg',
    '/hero/2025teachers_day.jpeg'
  ];

export default function HeroSection() {
    const [index, setIndex] = useState(0);
  
    // auto-advance
    const interval = 10000 // 10 seconds
    useEffect(() => {
      const t = setInterval(() => {
        setIndex((i) => (i + 1) % images.length);
      }, interval );
      return () => clearInterval(t);
    }, []);

    return (
        <div className="relative w-screen h-[50vh] mt-12 sm:mt-16 md:mt-20 overflow-hidden">
          {/* slide-wrapper: width = N * 100vw, translateX moves exactly one viewport each time */}
          <div
            className="flex h-full transition-transform duration-1000 ease-in-out"
            style={{
              width: `${images.length * 100}vw`,
              transform: `translateX(-${index * 100}vw)`,
            }}
          >
            {images.map((src, i) => (
              <div key={src} className="relative w-screen h-full flex-shrink-0">
                <Image
                  src={src}
                  alt={`Slide ${i}`}
                  fill
                  className="object-contain"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </div>
      );
    }