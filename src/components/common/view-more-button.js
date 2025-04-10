"use client";
import Link from "next/link";

export default function ViewMoreButton({ href, children = "View more" }) {
  return (
    <Link
      href={href}
      className="inline-block px-3 py-2 border border-blue-500 text-blue-500 rounded-none hover:bg-blue-50 transition text-sm"
    >
      {children}
    </Link>
  );
}
