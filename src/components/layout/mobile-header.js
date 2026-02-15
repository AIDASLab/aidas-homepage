'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function MobileHeader({ menuItems }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-6 left-0 w-full z-50 bg-white block md:hidden">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-6">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo/aidas-logo-long.png"
            alt="AIDAS Lab Logo"
            width={120}
            height={0}
            className="w-40 h-auto"
            priority
          />
        </Link>

        {/* Hamburger */}
        <button
          className="p-2"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 bg-black mb-1" />
          <span className="block w-6 h-0.5 bg-black mb-1" />
          <span className="block w-6 h-0.5 bg-black" />
        </button>
      </div>

      {/* Slide‐down menu */}
      {open && (
        <nav className="absolute inset-x-0 top-full bg-white shadow-md z-40">
          <ul className="flex flex-col p-4 gap-y-4">
            {menuItems.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm font-normal text-[#4b5563] transition-colors duration-200 ease-out hover:text-[#2f3f55]"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
