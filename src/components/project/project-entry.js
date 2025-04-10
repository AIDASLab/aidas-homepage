import Link from "next/link";
import Image from "next/image";
import DateDisplay from "../common/date-display";

export default function ProjectEntry({ title, thumbnail, date, summary, slug }) {
  return (
    <Link href={`/project/${slug}`}>
      <div className="overflow-hidden transition">
        {thumbnail && (
          <div className="relative w-full h-52">
            <Image
              src={`/${thumbnail}`}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="p-5">
          <h2 className="text-xl font-semibold mb-2 hover:underline">{title}</h2>
          <DateDisplay date={date} className="text-sm mb-2 text-[#666666]"/>
          {summary && (
            <p className="text-sm line-clamp-3">{summary}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
