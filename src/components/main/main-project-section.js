import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";
import ViewMoreButton from "@/components/common/view-more-button";
import DateDisplay from "@/components/common/date-display";
import ReadMore from "../common/read-more";

export default async function ProjectSection() {
  const projectDirectory = path.join(process.cwd(), "public/project");
  const files = await fs.readdir(projectDirectory);

  const projectList = await Promise.all(
    files
      .filter((f) => f.endsWith(".md"))
      .map(async (filename) => {
        const filePath = path.join(projectDirectory, filename);
        const fileContent = await fs.readFile(filePath, "utf-8");
        const { data } = matter(fileContent);

        return {
          title: data.title || filename.replace(".md", ""),
          date: data.date || "Unknown date",
          slug: filename.replace(".md", ""),
          summary: data.summary || "",
          thumbnail: data.thumbnail || null,
        };
      })
  );

  const sortedProjects = projectList
    .filter((p) => p.date)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <section className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Section Title & Button */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl font-bold">Projects</h2>
          <ViewMoreButton href="/project" />
        </div>

        {/* Project Cards */}
        <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProjects.map((project) => (
            <Link key={project.slug} href={`/project/${project.slug}`}>
              <div className="bg-white rounded-lg transition overflow-hidden flex flex-col h-full cursor-pointer">
                {project.thumbnail && (
                  <div className="relative w-full h-48 sm:h-54 md:h-60 lg:h-64">
                    <Image
                      src={`/${project.thumbnail}`}
                      alt={project.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      {project.title}
                    </h3>
                    <DateDisplay date={project.date} className="text-sm text-[#666666] mb-2"/>
                    <p className="text-sm line-clamp-3">
                      {project.summary}
                    </p>
                  </div>
                  <ReadMore />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
