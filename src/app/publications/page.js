"use client";

import { useEffect, useState } from "react";
import Layout from "../../../components/layout";
import Link from "next/link";

export default function Publications() {
    const [publications, setPublications] = useState([]);

    useEffect(() => {
        fetch("/json/publication.json")
            .then((res) => res.json())
            .then((data) => {
                // Sort by exact date (Newest first)
                const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setPublications(sortedData);
            })
            .catch((err) => console.error("Error loading publications:", err));
    }, []);

    // Group publications by year (sorted in descending order)
    const groupedPublications = publications.reduce((acc, paper) => {
        const year = new Date(paper.date).getFullYear();
        if (!acc[year]) acc[year] = [];
        acc[year].push(paper);
        return acc;
    }, {});

    // Sort the years so that the latest year appears first
    const sortedYears = Object.keys(groupedPublications)
        .sort((a, b) => Number(b) - Number(a));

    return (
        <Layout>
            <div className="relative flex justify-center p-8 pt-20 sm:pt-40 md:pt-60 lg:pt-[15vh]">
                <div className="w-full max-w-5xl">  {/* Wide & centered */}
                    <h1 className="text-4xl text-center font-bold mb-6">Publications</h1>

                    {sortedYears.map((year) => (
                        <div key={year} className="mb-12">
                            {/* Year Header */}
                            <h2 className="text-3xl font-bold mb-4">{year}</h2>

                            {/* List of Publications */}
                            <div className="space-y-4">
                                {groupedPublications[year]
                                    .sort((a, b) => new Date(b.date) - new Date(a.date)) // Ensure newest within year
                                    .map((paper, idx) => (
                                        <div key={idx} className="p-6 px-8 w-full border border-gray-300 shadow-md bg-white rounded-lg">
                                            {/* Title & Highlight */}
                                            <div className="flex items-center">
                                                <h3 className="text-lg font-semibold">{paper.title}</h3>
                                                {paper.highlight && (
                                                    <span className="ml-2 text-red-600 font-bold text-sm">[{paper.highlight}]</span>
                                                )}
                                            </div>

                                            {/* Category & Conference */}
                                            <p className="text-gray-600 text-sm">
                                                <span className="font-semibold">{paper.category}</span> | {paper.conference}
                                            </p>

                                            {/* Exact Date */}
                                            <p className="text-gray-500 text-xs">{new Date(paper.date).toLocaleDateString()}</p>

                                            {/* Links */}
                                            <div className="mt-1 flex space-x-4">
                                                {paper.code && (
                                                    <Link href={paper.code} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                                                        Code
                                                    </Link>
                                                )}
                                                {paper.video && (
                                                    <Link href={paper.video} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline text-sm">
                                                        Video
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
