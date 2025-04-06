import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import Layout from "../../../../components/layout";
import MarkdownRenderer from "../../../../components/markdown-renderer";

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
            <Layout>
                <div className="min-h-screen bg-gray-100 py-24 flex flex-col items-center">
                    <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
                        {/* Title & Date */}
                        <div className="mb-6 border-b pb-4">
                            <h1 className="text-4xl font-bold text-center text-gray-900">
                                {data.title}
                            </h1>
                            <p className="text-gray-500 text-right text-sm mt-2">
                                {data.date}
                            </p>
                        </div>

                        {/* MarkdownRenderer */}
                        <MarkdownRenderer content={content} />
                    </div>
                </div>
            </Layout>
        );

    } catch (error) {
        console.error("Error loading article:", error);
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <p className="text-red-500 text-xl">Article not found.</p>
                </div>
            </Layout>
        );
    }
}
