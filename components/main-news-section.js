import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

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
        summary: data.summary || null,
      };
    })
  );

  // Sort by newest first
  const sortedNews = newsList
    .filter(n => n.date) // filter out invalid dates
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <section className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[200px_1fr] gap-x-8 gap-y-8 md:gap-y-12 items-start">

        {/* Title & View More */}
        <div className="md:pl-2 lg:-ml-6 xl:-ml-12">
          <h2 className="text-4xl font-bold whitespace-nowrap mb-4">News</h2>
          <Link
            href="/news"
            className="inline-block px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition text-sm"
          >
            View more
          </Link>
        </div>

        {/* News List */}
        <div className="space-y-12 md:ml-12 lg:ml-16 max-w-3xl">
          {sortedNews.map((news, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold text-gray-900">
                  <Link href={`/news/${news.slug}`}>{news.title}</Link>
                </h3>
                <span className="text-l text-gray-500 whitespace-nowrap">{news.date}</span>
              </div>

              {news.summary && (
                <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                  {news.summary}
                  <Link
                    href={`/news/${news.slug}`}
                    className="text-blue-600 hover:underline ml-1"
                  >
                    Read more
                  </Link>
                </p>
              )}

              {/* Divider */}
              {idx !== sortedNews.length - 1 && (
                <div className="border-t border-gray-400/60 mt-6" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}