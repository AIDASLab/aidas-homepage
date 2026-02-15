"use client";
import Link from "next/link";

export default function ViewMoreButton({ href, children = "View more" }) {
  return (
    <Link
      href={href}
      className="inline-block px-3 py-1.5 border border-[#d1d9e6] text-muted bg-white rounded-sm text-sm transition-[border-color,color,background-color] duration-200 ease-out hover:border-[#a8b6cc] hover:text-[#2f3f55] hover:bg-[#f8fafc]"
    >
      {children}
    </Link>
  );
}
