import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function getNewsMetaList() {
  const newsDir = path.join(process.cwd(), "public/news");
  const files = fs.readdirSync(newsDir);

  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(newsDir, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);

      return {
        title: data.title,
        date: data.date,
        slug: file.replace(/\.md$/, ""),
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // 최신순 정렬
}
