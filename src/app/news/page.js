import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import PageLayout from "@/components/layout/page-layout";
import NewsEntry from "@/components/news/news-entry";

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
                    summary: data.summary || "",
                    slug: filename.replace(".md", ""),
                };
            })
        );
        
        // sort newsList by date 
        newsList.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        return (
            <PageLayout title="News">
                {newsList.map((news, idx) => (
                    <div key={idx}>
                        <NewsEntry
                            title={news.title}
                            date={news.date}
                            summary={news.summary}
                            slug={news.slug}
                        />
                        {/* Divider */}
                        {idx < newsList.length - 1 && (
                            <div className="mt-6 border-t border-gray-300" />
                        )}
                    </div>
                ))}
            </PageLayout>
        );

    } catch (error) {
        console.error("Error reading news directory:", error);
        return (
            <PageLayout title="News">
                <div className="min-h-screen flex items-center justify-center">
                    <p className="text-red-500 text-xl">Failed to load news articles.</p>
                </div>
            </PageLayout>
        );
    }
}
