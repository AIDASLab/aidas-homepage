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
          <h2 className="text-3xl sm:text-4xl font-semibold whitespace-nowrap mb-3">News</h2>
          <ViewMoreButton href="/news"/>
        </div>

        {/* News List */}
        <div className="space-y-3 md:ml-12 lg:ml-16 max-w-3xl">
          {sortedNews.map((news, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-start">
                <h3 className="text-base sm:text-lg font-medium">
                  <Link href={`/news/${news.slug}`} className="hover-link">{news.title}</Link>
                </h3>
                <DateDisplay date={news.date} className="text-sm text-muted"/>
              </div>

              {/* Divider */}
              {idx !== sortedNews.length - 1 && (
                <div className="border-t border-gray-300 mt-4" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
