'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [atTop, setAtTop] = useState(true);
  const [hideAll, setHideAll] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const pathname = usePathname();

  // Normalize pathname to remove trailing slash (if not just '/')
  const normalizedPathname =
    pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  // Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > scrollY && !atTop) setHideAll(true);
      else if (y < scrollY) setHideAll(false);
      setAtTop(y < 50);
      setScrollY(y);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY, atTop]);

  const slideClass = hideAll ? '-translate-y-full' : 'translate-y-0';

  // Menu items array
  const menuItems = [
    { name: 'Publications', href: '/publications' },
    { name: 'People', href: '/people' },
    { name: 'News', href: '/news' },
    { name: 'Seminar', href: '/seminar' },
    { name: 'Project', href: '/project' },
    { name: 'Contact', href: '/contact' },
    { name: 'Join', href: '/join' },
  ];

  return (
    <>
      {/* Top bar */}
      <div
        className={`fixed top-0 left-0 w-full h-6 bg-[#272945] z-[60] transition-transform duration-200 ${slideClass}`}
      >
        <div className="max-w-screen-xl mx-auto h-full flex items-center px-4 sm:ml-4 md:ml-6 lg:ml-8">
          <Link href="https://www.snu.ac.kr" target="_blank" rel="noopener noreferrer">
            <Image
              src="/logo/snu-long-text-white.svg"
              alt="Mini Logo"
              className="h-2 sm:h-2.5 md:h-3 lg:h-3 w-auto"
              height={300}
              width={0}
              priority
            />
          </Link>
        </div>
      </div>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 w-full z-50 bg-white transition-transform duration-100 ${slideClass}`}
      >
        <div
          className={`max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between px-6 sm:px-10 transition-all duration-200 ${
            atTop ? 'py-10 sm:py-14' : 'py-4 sm:py-6'
          }`}
        >
          {/* Title */}
          <Link href="/">
            <div
              className={`${
                atTop ? 'text-5xl sm:text-6xl' : 'text-2xl sm:text-3xl'
              } font-extrabold transition-all duration-200 w-full sm:w-auto text-left mt-6`}
            >
              AIDAS Lab
              {atTop && (
                <p className="mt-2 text-base sm:text-lg font-normal">
                  <span className="font-bold">AI</span>, big{' '}
                  <span className="font-bold">DA</span>ta, and{' '}
                  <span className="font-bold">S</span>ystem
                </p>
              )}
            </div>
          </Link>
          {/* Navigation */}
          <ul
            className={`
            transition-all duration-500
            ${atTop ? 'mt-20' : 'mt-6'}
            flex flex-wrap justify-center sm:justify-end
            gap-x-6 sm:gap-x-8
            text-md sm:text-lg md:text-xl
            font-medium tracking-wide
          `}
          >
            {menuItems.map((item) => (
              <li key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={`inline-block py-2 ${
                    normalizedPathname === item.href ? 'text-[#333333]' : 'text-black'
                  } group-hover:text-[#333333]`}
                >
                  {item.name}
                  <div
                    className={`h-1 w-full bg-black transition-all duration-300 mt-3 ${
                      normalizedPathname === item.href
                        ? 'opacity-100'
                        : 'opacity-0 group-hover:opacity-100'
                    }`}
                  ></div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </>
  );
}
