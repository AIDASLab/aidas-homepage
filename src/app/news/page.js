export const runtime = 'nodejs';

import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";
import Layout from "../../../components/layout";

export default async function NewsPage() {
    const newsDirectory = path.join(process.cwd(), "public/news");

    try {
        const files = await fs.readdir(newsDirectory);

        // Extract title & date from each markdown file
        const newsList = await Promise.all(
            files.map(async (filename) => {
                const filePath = path.join(newsDirectory, filename);
                const fileContent = await fs.readFile(filePath, "utf-8");
                const { data } = matter(fileContent); // Extract metadata

                return {
                    title: data.title || filename.replace(".md", ""),
                    date: data.date || "No date available", // Handle missing date
                    slug: filename.replace(".md", ""),
                };
            })
        );

        return (
            <Layout>
                <div className="min-h-screen flex flex-col items-center py-16">
                    {/* Page Title */}
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-10 mt-16">Latest News</h1>

                    {/* News List Section */}
                    <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
                        <ul className="space-y-6">
                            {newsList.map((news) => (
                                <li key={news.slug} className="p-6 border border-gray-200 rounded-lg shadow-md bg-gray-50 hover:bg-gray-100 transition-all">
                                    <Link href={`/news/${news.slug}`}>
                                        <div className="cursor-pointer">
                                            {/* Title */}
                                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{news.title}</h2>

                                            {/* Date */}
                                            <p className="text-gray-500 text-sm mb-2">{news.date}</p>

                                            {/* Read More */}
                                            <p className="text-blue-600 hover:underline font-medium">Read More →</p>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Layout>
        );

    } catch (error) {
        console.error("Error reading news directory:", error);
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <p className="text-red-500 text-xl">Failed to load news articles.</p>
                </div>
            </Layout>
        );
    }
}
