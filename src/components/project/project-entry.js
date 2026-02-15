import Link from "next/link";
import Image from "next/image";
import DateDisplay from "../common/date-display";

export default function ProjectEntry({ title, thumbnail, date, summary, slug }) {
  return (
    <Link href={`/project/${slug}`}>
      <div className="overflow-hidden transition-colors duration-200 ease-out">
        {thumbnail && (
          <div className="relative w-full h-52">
            <Image
              src={`/${thumbnail}`}
              alt={title}
              fill
              className="object-contain"
            />
          </div>
        )}
        <div className="p-5">
          <h2 className="text-xl font-medium mb-2 hover-link">{title}</h2>
          <DateDisplay date={date} className="text-sm mb-2 text-muted"/>
          {summary && (
            <p className="text-sm text-muted line-clamp-3">{summary}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
