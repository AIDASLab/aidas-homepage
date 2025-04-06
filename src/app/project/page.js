import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";
import Image from "next/image";
import Layout from "../../../components/layout";

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
    <Layout>
      <div className="min-h-screen py-16 px-4 max-w-6xl mx-auto mt-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Project
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {project.map((project) => (
            <Link key={project.slug} href={`/project/${project.slug}`}>
              <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-white">
                {project.thumbnail && (
                  <div className="relative w-full h-52">
                    <Image
                      src={`/${project.thumbnail}`}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {project.title}
                  </h2>
                  <p className="text-gray-500 text-sm mb-2">{project.date}</p>
                  <p className="text-gray-700 text-sm line-clamp-3">
                    {project.summary}
                  </p>
                  <p className="text-blue-600 hover:underline mt-3 inline-block">
                    View Details →
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
