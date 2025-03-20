"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

const Layout = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <Head>
        <title>SNU AIDAS Lab</title>
      </Head>

      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 z-50 w-full flex flex-col items-center transition-all duration-300 ${scrolled ? "py-4 bg-[#101820]/95 shadow-lg" : "py-8 bg-[#101820]/80"
          }`}
      >
        <div className="flex justify-between items-center w-full px-6">
          {/* Left Side: Logo & Title */}
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
            <img
              src="/logo/snu-white.png"
              alt="Lab Logo"
              className={`transition-all duration-300 ${scrolled ? "h-8 sm:h-12" : "h-12 sm:h-16 md:h-20"
                }`}
            />
            <h1
              className={`text-gray-100 font-bold transition-all duration-300 ${scrolled ? "text-2xl" : "text-3xl"
                }`}
            >
              SNU AIDAS Lab
            </h1>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-12 text-gray-100 text-lg font-semibold">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/publications" className="hover:underline">Publications</Link></li>
            <li><Link href="/people" className="hover:underline">People</Link></li>
            <li><Link href="/news" className="hover:underline">News</Link></li>
            <li><Link href="/seminar" className="hover:underline">Seminar</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            <li><Link href="/join" className="hover:underline">Join</Link></li>
          </ul>

          {/* Mobile Hamburger Menu */}
          <button
            className="md:hidden text-white text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden w-full bg-black/90 text-white text-center py-4 absolute top-full">
            <ul className="space-y-4">
              <li><Link href="/" className="block hover:underline">Home</Link></li>
              <li><Link href="/publications" className="block hover:underline">Publications</Link></li>
              <li><Link href="/people" className="block hover:underline">People</Link></li>
              <li><Link href="/news" className="block hover:underline">News</Link></li>
              <li><Link href="/seminar" className="block hover:underline">Seminar</Link></li>
              <li><Link href="/contact" className="block hover:underline">Contact</Link></li>
              <li><Link href="/join" className="block hover:underline">Join</Link></li>
            </ul>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="mt-20">{children}</div>

      {/* Footer */}
<footer className="p-10 bg-[#101820] text-white">
    <div className="container mx-auto flex flex-col md:flex-row items-center md:items-start justify-between">
        {/* Left Side: Logo */}
        <div className="flex items-center space-x-4 mb-6 md:mb-0">
            <img src="/logo/snu-ece-white-ko.svg" alt="University Logo" className="h-12 md:h-16" />
        </div>

        {/* Centered Two-Column Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm text-gray-300 text-center md:text-left">
            <div>
                <h3 className="text-white font-semibold mb-2">About</h3>
                <ul className="space-y-1">
                    <li><Link href="/about" className="hover:underline">About Us</Link></li>
                    <li><Link href="/people" className="hover:underline">Our Team</Link></li>
                    <li><Link href="/contact" className="hover:underline">Contact</Link></li>
                </ul>
            </div>
            <div>
                <h3 className="text-white font-semibold mb-2">Legal</h3>
                <ul className="space-y-1">
                    <li><Link href="/terms" className="hover:underline">Terms of Use</Link></li>
                    <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
                    <li><Link href="/accessibility" className="hover:underline">Accessibility</Link></li>
                </ul>
            </div>
        </div>
    </div>

    {/* Bottom Copyright */}
    <div className="text-center text-sm text-gray-300 mt-6 border-t border-gray-600 pt-4">
        &copy; {new Date().getFullYear()} AIDAS Lab | All Rights Reserved
    </div>
</footer>



    </div>
  );
};

export default Layout;
