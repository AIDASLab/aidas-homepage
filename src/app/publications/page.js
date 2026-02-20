"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import PageLayout from "@/components/layout/page-layout";

const HIDDEN_FIELDS = new Set([
  "title",
  "authors",
  "conference",
  "venue",
  "venue_full",
  "date",
  "highlight",
  "abstract",
]);

const LINK_LABEL_MAP = {
  arxiv: "arXiv",
  code: "Code",
  page: "Project",
  paper: "Paper",
  poster: "Poster",
  demo: "Demo",
  dataset: "Dataset",
  slides: "Slides",
  video: "Video",
};

function parseYear(dateString) {
  const parsed = new Date(dateString);
  return Number.isNaN(parsed.getTime()) ? "Unknown" : String(parsed.getFullYear());
}

function getLinkLabel(key) {
  const normalized = key.toLowerCase();
  return LINK_LABEL_MAP[normalized] || key;
}

function normalizeText(value) {
  if (!value) return "";
  return String(value).toLowerCase();
}

function isArxivPreprint(paper) {
  return normalizeText(paper?.venue_full).trim() === "arxiv preprint";
}

function getPaperAnchor(paper) {
  const titleSlug = String(paper?.title || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `paper-${titleSlug}-${parseYear(paper?.date)}`;
}

export default function Publications() {
  const [publications, setPublications] = useState([]);
  const [query, setQuery] = useState("");
  const [activeYear, setActiveYear] = useState("All");

  useEffect(() => {
    fetch("/json/publication.json")
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
        setPublications(sorted);
      })
      .catch((err) => console.error("Error loading publications:", err));
  }, []);

  useEffect(() => {
    if (!publications.length || typeof window === "undefined") return;
    const hash = decodeURIComponent(window.location.hash.replace("#", ""));
    if (!hash) return;

    const scrollToPaper = () => {
      const target = document.getElementById(hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    // Ensure the element exists after client render and data hydration.
    setTimeout(scrollToPaper, 0);
  }, [publications]);

  const years = useMemo(() => {
    const allYears = Array.from(new Set(publications.map((item) => parseYear(item.date))));
    return ["All", ...allYears.sort((a, b) => Number(b) - Number(a))];
  }, [publications]);

  const filteredPublications = useMemo(() => {
    const keyword = normalizeText(query.trim());

    return publications.filter((paper) => {
      const paperYear = parseYear(paper.date);
      if (activeYear !== "All" && paperYear !== activeYear) {
        return false;
      }

      if (!keyword) {
        return true;
      }

      const haystack = [
        paper.title,
        Array.isArray(paper.authors) ? paper.authors.join(" ") : paper.authors,
        paper.venue,
        paper.venue_full,
      ]
        .map((value) => normalizeText(value))
        .join(" ");

      return haystack.includes(keyword);
    });
  }, [activeYear, publications, query]);

  const grouped = useMemo(() => {
    return filteredPublications
      .filter((pub) => !isArxivPreprint(pub))
      .reduce((acc, pub) => {
      const year = parseYear(pub.date);
      acc[year] = acc[year] || [];
      acc[year].push(pub);
      return acc;
      }, {});
  }, [filteredPublications]);

  const arxivPapers = useMemo(() => {
    return filteredPublications.filter((paper) => isArxivPreprint(paper));
  }, [filteredPublications]);

  const sortedYears = useMemo(() => {
    return Object.keys(grouped).sort((a, b) => {
      if (a === "Unknown") return 1;
      if (b === "Unknown") return -1;
      return Number(b) - Number(a);
    });
  }, [grouped]);

  return (
    <PageLayout title="Publications">
      <section className="page-section space-y-5 sm:space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-sky-50/60 p-4.5 sm:p-5">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Research Archive</p>
          </div>

          <div className="mt-3 flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <label htmlFor="publication-search" className="sr-only">
              Search publications
            </label>
            <input
              id="publication-search"
              type="search"
              placeholder="Search by title, author, venue"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 outline-none transition focus:border-slate-500"
            />
            <div className="flex flex-wrap gap-2">
              {years.map((year) => (
                <button
                  key={year}
                  type="button"
                  onClick={() => setActiveYear(year)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                    activeYear === year
                      ? "border-slate-800 bg-slate-800 text-white"
                      : "border-slate-300 bg-white text-slate-600 hover:border-slate-500 hover:text-slate-800"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </div>

        {sortedYears.length === 0 && arxivPapers.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 px-6 py-12 text-center text-sm text-slate-500">
            No results found. Try a different keyword or year.
          </div>
        )}

        <div className="space-y-6">
          {arxivPapers.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-semibold text-slate-800 sm:text-3xl">arXiv</h2>
                <span className="h-px flex-1 bg-slate-200" />
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">{arxivPapers.length} papers</span>
              </div>

              <div className="space-y-2">
                {arxivPapers.map((paper, idx) => {
                  const extraLinks = Object.entries(paper)
                    .filter(([key]) => !HIDDEN_FIELDS.has(key))
                    .map(([key, value]) =>
                      typeof value === "string" ? (
                        <Link
                          key={key}
                          href={value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full border border-slate-200 px-2.5 py-0.5 text-xs font-medium text-slate-600 transition hover:border-slate-500 hover:text-slate-800"
                        >
                          {getLinkLabel(key)}
                        </Link>
                      ) : null
                    );

                  return (
                    <article
                      id={getPaperAnchor(paper)}
                      key={`${paper.title}-${idx}`}
                      className="scroll-mt-44 sm:scroll-mt-52 rounded-xl border border-slate-200 bg-white px-4 py-3 sm:px-5 sm:py-3.5"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-semibold leading-snug text-slate-800 sm:text-lg">{paper.title}</h3>
                        {paper.highlight && (
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
                            {paper.highlight}
                          </span>
                        )}
                      </div>

                      {paper.authors && (
                        <p className="mt-1 text-sm leading-tight text-slate-600">
                          {Array.isArray(paper.authors) ? paper.authors.join(", ") : paper.authors}
                        </p>
                      )}

                      <p className="mt-0.5 text-sm leading-tight text-slate-500">
                        {paper.venue_full || "Venue TBD"}
                        {paper.venue ? ` (${paper.venue})` : ""}
                        {paper.date ? `, ${parseYear(paper.date)}` : ""}
                      </p>

                      {extraLinks.length > 0 && <div className="mt-2 flex flex-wrap gap-1.5">{extraLinks}</div>}
                    </article>
                  );
                })}
              </div>
            </div>
          )}

          {sortedYears.map((year) => (
            <div key={year} className="space-y-2.5">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-semibold text-slate-800 sm:text-3xl">{year}</h2>
                <span className="h-px flex-1 bg-slate-200" />
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">{grouped[year].length} papers</span>
              </div>

              <div className="space-y-2">
                {grouped[year].map((paper, idx) => {
                  const extraLinks = Object.entries(paper)
                    .filter(([key]) => !HIDDEN_FIELDS.has(key))
                    .map(([key, value]) =>
                      typeof value === "string" ? (
                        <Link
                          key={key}
                          href={value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full border border-slate-200 px-2.5 py-0.5 text-xs font-medium text-slate-600 transition hover:border-slate-500 hover:text-slate-800"
                        >
                          {getLinkLabel(key)}
                        </Link>
                      ) : null
                    );

                  return (
                    <article
                      id={getPaperAnchor(paper)}
                      key={`${paper.title}-${idx}`}
                      className="scroll-mt-44 sm:scroll-mt-52 rounded-xl border border-slate-200 bg-white px-4 py-3 sm:px-5 sm:py-3.5"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-semibold leading-snug text-slate-800 sm:text-lg">{paper.title}</h3>
                        {paper.highlight && (
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
                            {paper.highlight}
                          </span>
                        )}
                      </div>

                      {paper.authors && (
                        <p className="mt-1 text-sm leading-tight text-slate-600">
                          {Array.isArray(paper.authors) ? paper.authors.join(", ") : paper.authors}
                        </p>
                      )}

                      <p className="mt-0.5 text-sm leading-tight text-slate-500">
                        {paper.venue_full || "Venue TBD"}
                        {paper.venue ? ` (${paper.venue})` : ""}
                        {paper.date ? `, ${parseYear(paper.date)}` : ""}
                      </p>

                      {extraLinks.length > 0 && <div className="mt-2 flex flex-wrap gap-1.5">{extraLinks}</div>}
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
