import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";
import PageLayout from "@/components/layout/page-layout";
import SeminarEntry from "@/components/seminar/seminar-entry";

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
                    presenter: data.presenter || "",
                    slug: filename.replace(".md", ""),
                };
            })
        );

        return (
            <PageLayout title="Seminar">
                {seminarList.map((seminar, idx) => (
                    <div key={idx}>
                        <SeminarEntry
                            title={seminar.title}
                            date={seminar.date}
                            presenter={seminar.presenter}
                            slug={seminar.slug}
                        />
                        {/* Divider */}
                        {idx < seminarList.length - 1 && (
                            <div className="mt-6 border-t border-gray-300" />
                        )}
                    </div>
                ))}
            </PageLayout>
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
