import Link from "next/link";
import DateDisplay from "@/components/common/date-display";

export default function NewsEntry({ title, date, slug }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white px-4 py-3.5 sm:px-5 sm:py-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <Link href={`/news/${slug}`} className="hover-link">
          <h3 className="text-base sm:text-lg font-semibold leading-snug text-slate-800">{title}</h3>
        </Link>
        {date && (
          <DateDisplay
            date={date}
            className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 whitespace-nowrap"
          />
        )}
      </div>
    </article>
  );
}
