"use client";

import Link from "next/link";

export default function ReadMore({ href, children = "Read more" }) {
    if (!href) {
      return <p className="text-blue-600 hover:underline ml-1 mt-3 text-sm">{children}</p>;
    }
  
    return (
      <Link
        href={href}
        className="text-blue-600 hover:underline ml-1 mt-3 text-sm"
      >
        {children}
      </Link>
    );
  }