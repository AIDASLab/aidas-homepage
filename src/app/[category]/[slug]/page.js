import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import MarkdownRenderer from "@/components/markdown-renderer";
import PageLayout from "@/components/layout/page-layout";
import DateDisplay from "@/components/common/date-display";

export async function generateStaticParams() {
    const categories = ["news", "seminar", "project"];
    const paths = [];

    for (const category of categories) {
        const directory = path.join(process.cwd(), `public/${category}`);
        try {
            const files = await fs.readdir(directory);

            const categoryPaths = files.map((filename) => ({
                category,
                slug: filename.replace(".md", ""),
            }));

            paths.push(...categoryPaths);
        } catch (error) {
            console.error(`Error reading ${category} directory:`, error);
        }
    }

    return paths;
}


export default async function ArticlePage({ params }) {
    const { category, slug } = await params;

    const categoryMap = {
        seminar: "public/seminar",
        news: "public/news",
        project: "public/project",
      };
      
    const directory = categoryMap[category];
    
    if (!directory) {
    throw new Error(`Invalid category: ${category}`);
    }
    
    // only if the filetype is md 
    const filePath = path.join(process.cwd(), directory, `${slug}.md`);

    try {
        const fileContent = await fs.readFile(filePath, "utf-8");
        const { content, data } = matter(fileContent);

        return (
            <PageLayout title={data.title}>
                <div className="flex justify-end mb-4">
                    <DateDisplay date={data.date} className="text-sm text-[#666666]" />
                </div>
                <MarkdownRenderer content={content}/>
            </PageLayout>
        );

    } catch (error) {
        console.error("Error loading article:", error);
        return (
            <PageLayout>
                <div className="min-h-screen flex items-center justify-center">
                    <p className="text-red-500 text-xl">Article not found.</p>
                </div>
            </PageLayout>
        );
    }
}
