'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PublicationsSection() {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    fetch('/json/publication.json')
      .then((res) => res.json())
      .then((data) => setPublications(data.slice(0, 3)))
      .catch((err) => console.error('Failed to load publications:', err));
  }, []);

  return (
    <section className="relative z-10 px-6 md:px-20 lg:px-80 py-16 border-t" style={{ borderColor: '#666666' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Publications</h2>
          <Link href="/publications" className="font-medium hover:underline">
            View more
          </Link>
        </div>

        <ul className="space-y-4">
          {publications.map((pub, idx) => (
            <li key={idx} className="text-base">
              <span className="font-semibold">{pub.title}</span><br />
              <span className="text-sm text-[#666666]">
                {Array.isArray(pub.authors) ? pub.authors.join(', ') : pub.authors}
                {" · "}
                {pub.venue}
                {" "}
                {pub.date?.slice(0, 4)}
              </span>
              {pub.summary && (
              <p className="text-sm mt-1 leading-relaxed">
                {pub.summary.length > 180
                  ? `${pub.summary.slice(0, 180)}... `
                  : pub.summary}
                {pub.summary.length > 180 && <span className="text-blue-600 hover:underline cursor-pointer">Read more</span>}
              </p>
              )}
              </li>
          ))}
        </ul>
      </div>
    </section>
  );
}


{/* Authors & Venue + Year */}

{/* Abstract / Summary (Trimmed) */}
