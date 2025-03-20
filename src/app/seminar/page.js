import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";
import Layout from "../../../components/layout";

export default async function SeminarPage() {

    const seminarDirectory = path.join(process.cwd(), "public/seminar");

    try {
        const files = await fs.readdir(seminarDirectory);

        // Extract title & date from each markdown file
        const seminarList = await Promise.all(
            files.map(async (filename) => {
                const filePath = path.join(seminarDirectory, filename);
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
                <img 
                    src="/background/random_background2.jpg" 
                    alt="Decoration"
                    className="absolute top-0 left-0 w-full h-32 sm:h-48 md:h-56 lg:h-[25vh] object-cover"
                    />
                <div className="min-h-screen flex flex-col items-center bg-gray-100 pt-40 sm:pt-60 md:pt-80 lg:pt-[25vh]">
                    {/* Page Title */}
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Seminars</h1>

                    {/* Seminar List Section */}
                    <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
                        <ul className="space-y-6">
                            {seminarList.map((seminar) => (
                                <li key={seminar.slug} className="p-6 border border-gray-200 rounded-lg shadow-md bg-gray-50 hover:bg-gray-100 transition-all">
                                    <Link href={`/seminar/${seminar.slug}`}>
                                        <div className="cursor-pointer">
                                            {/* Title */}
                                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{seminar.title}</h2>

                                            {/* Date */}
                                            <p className="text-gray-500 text-sm mb-2">{seminar.date}</p>

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
        console.error("Error reading seminar directory:", error);
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <p className="text-red-500 text-xl">Failed to load seminar articles.</p>
                </div>
            </Layout>
        );
    }
}
