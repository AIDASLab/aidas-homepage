import Link from "next/link";
import DateDisplay from "../common/date-display";
import Image from "next/image";

export default function SeminarEntry({ title, date, slug, thumbnail, summary }) {
  return (
      <Link href={`/seminar/${slug}`}>
        <div className="overflow-hidden transition-colors duration-200 ease-out">
          {thumbnail && (
            <div className="relative w-full h-60">
              <Image src={`/${thumbnail}`} alt={title} fill className="object-contain" />
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
