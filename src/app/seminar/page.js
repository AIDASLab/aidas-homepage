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

    const latestDate = seminars[0]?.date ? new Date(seminars[0].date).getFullYear() : null;

    return (
        <PageLayout title="Seminar">
            <section className="page-section space-y-6">
                <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-sky-50/40 p-5 sm:p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Seminar Library</p>
                    <h2 className="mt-1.5 text-2xl font-semibold leading-tight text-slate-800 sm:text-3xl">
                        Tutorials, paper readings, and invited talks
                    </h2>
                    <p className="mt-1.5 text-sm leading-snug text-slate-600">
                        Explore AIDAS seminar tracks.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 border border-slate-200">
                            {seminars.length} seminars
                        </span>
                        {latestDate && (
                            <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 border border-slate-200">
                                Latest update {latestDate}
                            </span>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {seminars.map((seminar, idx) => (
                        <SeminarEntry
                            key={idx}
                            title={seminar.title}
                            date={seminar.date}
                            summary={seminar.summary}
                            thumbnail={seminar.thumbnail}
                            slug={seminar.slug}
                        />
                    ))}
                </div>
            </section>
        </PageLayout>
    );
}
