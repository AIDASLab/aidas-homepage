'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function DesktopHeader({menuItems}) {
    const [atTop, setAtTop] = useState(true);
    const [hideAll, setHideAll] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const pathname = usePathname();

    // check what section is currently selected 
    // for hover effect 
    const normalizedPathname = (() => {
        const path = pathname.replace(/\/$/, ''); // strip trailing slash
        for (const { href } of menuItems) {
        if (path === href || path.startsWith(href + '/')) {
            return href;
        }
        }
        return path || '/';
    })();

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

    return (

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
            className="w-full sm:w-auto mt-6 "
            >
            <Image
                src="/logo/aidas-logo-long.png"
                alt="AIDAS Lab Logo"
                width={atTop ? 300 : 200}
                height={0} 
                className="transition-all duration-200 h-auto"
                priority
            />
            </div>
        </Link>
        {/* Navigation */}
        <ul
            className={`
            transition-all duration-500
            ${atTop ? 'mt-10' : 'mt-10'}
            flex flex-wrap justify-center sm:justify-end
            gap-x-6 sm:gap-x-8
            text-sm sm:text-base md:text-lg
            font-medium tracking-normal
        `}
        >
            {menuItems.map((item) => (
            <li key={item.href} className="relative group">
                <Link
                href={item.href}
                className={`inline-block py-2 transition-colors duration-200 ease-out ${
                    normalizedPathname === item.href ? 'text-[#2f3f55]' : 'text-[#4b5563]'
                } group-hover:text-[#2f3f55]`}
                >
                {item.name}
                <div
                    className={`h-[1.5px] w-full bg-current transition-opacity duration-200 mt-2 ${
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
    );
}
