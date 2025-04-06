import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";

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
          <Link
            href="/project"
            className="inline-block px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition text-sm"
          >
            View more
          </Link>
        </div>

        {/* Project Cards */}
        <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProjects.map((project) => (
            <Link key={project.slug} href={`/project/${project.slug}`}>
              <div className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden flex flex-col h-full cursor-pointer">
                {project.thumbnail && (
                  <div className="relative w-full h-48 sm:h-56 md:h-40 lg:h-48">
                    <Image
                      src={`/${project.thumbnail}`}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{project.date}</p>
                    <p className="text-sm text-gray-700 line-clamp-3">
                      {project.summary}
                    </p>
                  </div>
                  <p className="text-blue-600 hover:underline font-medium mt-3 text-sm">
                    View Details →
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
