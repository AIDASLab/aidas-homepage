// Projects page

import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import PageLayout from "@/components/layout/page-layout";
import ProjectEntry from "@/components/project/project-entry";
import CollaboratorSection from "@/components/project/collaborator-section";

export default async function projectPage() {
  const projectDir = path.join(process.cwd(), "public/project");

  const files = await fs.readdir(projectDir);

  const project = (
    await Promise.all(
      files
        .filter((f) => f.endsWith(".md"))
        .map(async (filename) => {
          const filePath = path.join(projectDir, filename);
          const fileContent = await fs.readFile(filePath, "utf-8");
          const { data } = matter(fileContent);
  
          return {
            title: data.title || filename,
            date: data.date || "",
            summary: data.summary || "",
            thumbnail: data.thumbnail || null,
            slug: filename.replace(".md", ""),
            collaborator: data.collaborator || [],
          };
        })
    )
  ).sort((a, b) => new Date(b.date) - new Date(a.date));

  // collate all collaboators mentioned in markdown files 
  const collaboratorSet = new Set(
    project.flatMap((p) => p.collaborator)
  );
  const collaboratorList = Array.from(collaboratorSet);

  return (
    <PageLayout title="Project">
      {/* Collaborator section */}
       <CollaboratorSection src={collaboratorList}/>

      {/* project section */}
      <section className="page-section grid grid-cols-1 sm:grid-cols-2 gap-6">
        {project.map((project, idx) => (
          <div key={idx}>
            <ProjectEntry
              title={project.title}
              thumbnail={project.thumbnail}
              date={project.date}
              summary={project.summary}
              slug={project.slug}
            />
          </div>
        ))}
      </section>
    </PageLayout>
  );
}
