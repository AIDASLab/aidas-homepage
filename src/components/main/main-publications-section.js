'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ViewMoreButton from '../common/view-more-button';

function isArxivPreprint(pub) {
  return String(pub?.venue_full || '').toLowerCase().trim() === 'arxiv preprint';
}

function parseYear(dateString) {
  const parsed = new Date(dateString);
  return Number.isNaN(parsed.getTime()) ? 'unknown' : String(parsed.getFullYear());
}

function getPaperAnchor(pub) {
  const titleSlug = String(pub?.title || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `paper-${titleSlug}-${parseYear(pub?.date)}`;
}

export default function PublicationsSection() {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    fetch('/json/publication.json')
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
        const nonArxiv = sorted.filter((pub) => !isArxivPreprint(pub));
        setPublications(nonArxiv.slice(0, 3));
      })
      .catch((err) => console.error('Failed to load publications:', err));
  }, []);

  return (

    <section className="section-shell">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[200px_1fr] gap-x-8 gap-y-5 md:gap-y-7 items-start">

        {/* Title & View More */}
        <div className="md:pl-2 lg:-ml-6 xl:-ml-12">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 mb-1.5">Research Highlights</p>
          <h2 className="text-3xl sm:text-4xl font-semibold whitespace-nowrap mb-3">Publications</h2>
          <ViewMoreButton href="/publications" />
        </div>

        {/* Paper List */}
        <div className="space-y-2.5 md:ml-12 lg:ml-16 max-w-3xl">
          {publications.map((pub, idx) => (
            <article key={idx} className="rounded-xl border border-slate-200 bg-white px-4 py-3.5 sm:px-5 sm:py-4">
              <h3 className="text-base sm:text-lg font-semibold leading-snug text-slate-800">
                <Link href={`/publications#${getPaperAnchor(pub)}`} className="hover-link">
                  {pub.title}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-slate-600 leading-snug">
                {Array.isArray(pub.authors) ? pub.authors.join(', ') : pub.authors}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                {pub.venue && (
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                    {pub.venue}
                  </span>
                )}
                {pub.date && (
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                    {pub.date.slice(0, 4)}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>



  );
}
