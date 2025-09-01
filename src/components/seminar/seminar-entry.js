import Link from "next/link";
import DateDisplay from "../common/date-display";
import Image from "next/image";

export default function SeminarEntry({ title, date, slug, thumbnail, summary }) {
  return (
      <Link href={`/seminar/${slug}`}>
        <div className="overflow-hidden transition">
          {thumbnail && (
            <div className="relative w-full h-60">
              <Image src={`/${thumbnail}`} alt={title} fill className="object-contain" />
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
