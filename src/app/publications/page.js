"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageLayout from "@/components/layout/page-layout";

export default function Publications() {
    const [publications, setPublications] = useState([]);

    useEffect(() => {
        fetch("/json/publication.json")
            .then((res) => res.json())
            .then((data) => {
                const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setPublications(sorted);
            })
            .catch((err) => console.error("Error loading publications:", err));
    }, []);

    const grouped = publications.reduce((acc, pub) => {
        const year = new Date(pub.date).getFullYear();
        acc[year] = acc[year] || [];
        acc[year].push(pub);
        return acc;
    }, {});

    const sortedYears = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

    return (
        <PageLayout title="Publications">

            {sortedYears.map((year) => (
                <div key={year} className="mb-10">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6">{year}</h2>

                    <div className="space-y-4">
                        {grouped[year].map((paper, idx) => {
                            const extraLinks = Object.entries(paper)
                                .filter(([key]) => !["title", "authors", "conference", "venue", "venue_full", "date", "highlight", "abstract"].includes(key))
                                .map(([key, value]) =>
                                    typeof value === "string" ? (
                                        <Link
                                            key={key}
                                            href={value}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline text-sm"
                                        >
                                            [{key}]
                                        </Link>
                                    ) : null
                                );

                            return (
                                <div key={idx}>
                                    <div className="px-2 sm:px-4">
                                        {/* Title & Highlight */}
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h3 className="text-base sm:text-xl font-semibold">{paper.title}</h3>
                                            {paper.highlight && (
                                                <span className="text-[#666666] text-sm font-medium">[{paper.highlight}]</span>
                                            )}
                                        </div>

                                        {/* Authors */}
                                        {paper.authors && (
                                            <p className="text-sm text-[#666666] mt-1">
                                                {Array.isArray(paper.authors) ? paper.authors.join(", ") : paper.authors}
                                            </p>
                                        )}

                                        {/* Venue + Year */}
                                        <p className="text-sm text-[#666666] mt-1">
                                            {paper.venue_full} ({paper.venue}), {new Date(paper.date).getFullYear()}
                                        </p>

                                        {/* Extra Links */}
                                        {extraLinks.length > 0 && (
                                            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#666666]">
                                                {extraLinks}
                                            </div>
                                        )}
                                    </div>

                                    {/* Divider */}
                                    {idx < grouped[year].length - 1 && (
                                        <div className="mt-4 border-t border-gray-300" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </PageLayout>
    );
}
