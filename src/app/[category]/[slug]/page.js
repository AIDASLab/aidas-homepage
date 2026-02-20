import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import MarkdownRenderer from "@/components/markdown-renderer";
import PageLayout from "@/components/layout/page-layout";
import DateDisplay from "@/components/common/date-display";
import ProjectCollaborator from "@/components/project/project-collaborator";
import ProjectThumbnail from "@/components/project/project-thumbnail";

export async function generateStaticParams() { // To generate Static Routing 
    const categories = ['news', 'project', 'seminar'];
    const params = [];
  
    for (const category of categories) {
      const dir = path.join(process.cwd(), 'public', category);
      const files = await fs.readdir(dir);
  
      const slugs = files
        .filter(f => f.endsWith('.md'))
        .map(f => f.replace('.md', ''));
  
      slugs.forEach(slug => {
        params.push({ category, slug });
      });
    }
  
    return params;
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
                <div className="flex justify-end mb-3">
                    <DateDisplay date={data.date} className="text-sm text-muted" />
                </div>

                {/* render thumbnail when the category is project */}
                {category == "project" && <ProjectThumbnail src={data.thumbnail}/>}

                {/* render the main content */}
                <MarkdownRenderer content={content}/>

                {/* render collaborators when the category is project */}
                {category == "project" && <ProjectCollaborator src={data.collaborator}/>}

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
