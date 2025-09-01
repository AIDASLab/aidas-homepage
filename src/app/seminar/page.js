import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import PageLayout from "@/components/layout/page-layout";
import SeminarEntry from "@/components/seminar/seminar-entry";

export default async function SeminarPage() {

    const seminarDir = path.join(process.cwd(), "public/seminar");
    const files = await fs.readdir(seminarDir);

    const seminars = (
        await Promise.all(
            files
            .filter((f) => f.endsWith(".md"))
            .map(async (filename) => {
                const filePath = path.join(seminarDir, filename);
                const fileContent = await fs.readFile(filePath, "utf-8");
                const { data } = matter(fileContent);
                
                return {
                    title: data.title || filename,
                    date: data.date || "",
                    summary: data.summary || "",
                    thumbnail: data.thumbnail || null,
                    slug: filename.replace(".md", ""),
                };
            })
        )
    ).sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <PageLayout title="Seminar">
            {/* Seminar section */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8 mb-8">
                {seminars.map((seminar, idx) => (
                    <div key={idx}>
                        <SeminarEntry
                            title={seminar.title}
                            date={seminar.date}
                            summary={seminar.summary}
                            thumbnail={seminar.thumbnail}
                            slug={seminar.slug}
                        />
                    </div>
                ))}
            </section>
        </PageLayout>
    );
}