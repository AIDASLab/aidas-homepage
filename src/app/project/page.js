import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";
import Image from "next/image";
import PageLayout from "@/components/layout/page-layout";
import ProjectEntry from "@/components/project/project-entry";
import CollaboratorSection from "@/components/project/collaborator-section";

export default async function projectPage() {
  const projectDir = path.join(process.cwd(), "public/project");

  const files = await fs.readdir(projectDir);

  const project = await Promise.all(
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
        };
      })
  );

  return (
    <PageLayout title="Project">
      {/* Collaborator section */}
       <CollaboratorSection />

      {/* project section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8 mb-8">
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
