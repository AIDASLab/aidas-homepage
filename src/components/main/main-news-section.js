import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import ViewMoreButton from "@/components/common/view-more-button";
import DateDisplay from "@/components/common/date-display";

export default async function NewsSection() {
  const newsDirectory = path.join(process.cwd(), "public/news");
  const files = await fs.readdir(newsDirectory);

  const newsList = await Promise.all(
    files.map(async (filename) => {
      const filePath = path.join(newsDirectory, filename);
      const fileContent = await fs.readFile(filePath, "utf-8");
      const { data } = matter(fileContent);

      return {
        title: data.title || filename.replace(".md", ""),
        date: data.date || "Unknown date",
        slug: filename.replace(".md", ""),
      };
    })
  );

  // Sort by newest first
  const sortedNews = newsList
    .filter(n => n.date) // filter out invalid dates
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <section className="section-shell">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[200px_1fr] gap-x-8 gap-y-6 md:gap-y-8 items-start">

        {/* Title & View More */}
        <div className="md:pl-2 lg:-ml-6 xl:-ml-12">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 mb-1.5">Lab Updates</p>
          <h2 className="text-3xl sm:text-4xl font-semibold whitespace-nowrap mb-3">News</h2>
          <ViewMoreButton href="/news"/>
        </div>

        {/* News List */}
        <div className="space-y-2.5 md:ml-12 lg:ml-16 max-w-3xl">
          {sortedNews.map((news, idx) => (
            <article key={idx} className="rounded-xl border border-slate-200 bg-white px-4 py-3.5 sm:px-5 sm:py-4">
              <div className="flex flex-wrap justify-between items-start gap-2">
                <h3 className="text-base sm:text-lg font-semibold leading-snug text-slate-800">
                  <Link href={`/news/${news.slug}`} className="hover-link">{news.title}</Link>
                </h3>
                <DateDisplay
                  date={news.date}
                  className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 whitespace-nowrap"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
