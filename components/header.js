'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [atTop, setAtTop] = useState(true);
  const [hideAll, setHideAll] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
  
      if (y > scrollY && !atTop) {
        setHideAll(true);
      } else if (y < scrollY) {
        setHideAll(false);
      }
       else if (y < scrollY) {
        setHideAll(false);       // scroll up: show
      }
  
      setAtTop(y < 50);          // at very top
      setScrollY(y);
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);

  const slideClass = hideAll ? '-translate-y-full' : 'translate-y-0';

  return (
    <>
      {/* Top bar */}
      <div className={`fixed top-0 left-0 w-full h-6 bg-[#272945] z-[60] transition-transform duration-200 ${slideClass}`}>
        <div className="max-w-screen-xl mx-auto h-full flex items-center px-4 ml-8">
            <Image
            src="/logo/logo-text-white.png"
            alt="Mini Logo"
            className="h-2 sm:h-2.5 md:h-3 lg:h-3"
            width={250} 
            height={16} 
            priority 
            />
        </div>
        </div>
      {/* Header */}
      <header className={`fixed top-0 left-0 w-full z-50 bg-white transition-transform duration-100 ${slideClass}`}>
        <div className={`max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between px-6 sm:px-10 transition-all duration-200 ${
          atTop ? 'py-10 sm:py-14' : 'py-4 sm:py-6'
        }`}>

          {/* AIDAS Title */}
          <div className={`${atTop ? 'text-5xl sm:text-6xl' : 'text-2xl sm:text-3xl'} font-extrabold transition-all duration-200 w-full sm:w-auto text-left mt-8`}>
            AIDAS Lab
            {atTop && (
              <p className="mt-2 text-base sm:text-lg font-normal">
                <span className="font-bold">AI</span>, big <span className="font-bold">DA</span>ta, and <span className="font-bold">S</span>ystem
              </p>
            )}
          </div>

          {/* Navigation */}
          <ul className={`
            transition-all duration-500
            ${atTop ? 'mt-20' : 'mt-2'}
            flex flex-wrap justify-center sm:justify-end
            gap-x-6 sm:gap-x-8
            text-md sm:text-lg md:text-xl
            font-medium tracking-wide
          `}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/publications">Publications</Link></li>
            <li><Link href="/people">People</Link></li>
            <li><Link href="/news">News</Link></li>
            <li><Link href="/seminar">Seminar</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/join">Join</Link></li>
          </ul>
        </div>
      </header>
    </>
  );
}
