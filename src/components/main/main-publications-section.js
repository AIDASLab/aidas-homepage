'use client';

import { useEffect, useState } from 'react';
import ViewMoreButton from '../common/view-more-button';
import ReadMore from '../common/read-more';

export default function PublicationsSection() {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    fetch('/json/publication.json')
      .then((res) => res.json())
      .then((data) => setPublications(data.slice(0, 3)))
      .catch((err) => console.error('Failed to load publications:', err));
  }, []);

  return (

    <section className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[200px_1fr] gap-x-8 gap-y-8 md:gap-y-12 items-start">

        {/* Title & View More */}
        <div className="md:pl-2 lg:-ml-6 xl:-ml-12">
          <h2 className="text-4xl font-bold whitespace-nowrap mb-4">Publications</h2>
          <ViewMoreButton href="/publications" />
        </div>

        {/* Paper List */}
        <div className="space-y-12 md:ml-12 lg:ml-16 max-w-3xl">
          {publications.map((pub, idx) => (
            <div key={idx}>
              <h3 className="text-xl font-semibold">{pub.title}</h3>
              <p className="text-sm text-[#666666] mt-1">
                {Array.isArray(pub.authors) ? pub.authors.join(', ') : pub.authors} · {pub.venue} {pub.date.slice(0, 4)}
              </p>
              {pub.abstract && (
                <p className="text-sm mt-2 leading-relaxed">
                  {pub.abstract.length > 300
                    ? `${pub.abstract.slice(0, 300)}... `
                    : pub.abstract}
                  {pub.abstract.length > 300 && (
                    <ReadMore href="/publications" />
                  )}
                </p>
              )}
              {/* Divider */}
              {idx !== publications.length - 1 && (
                <div className="border-t border-gray-400/60 mt-6" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>



  );
}