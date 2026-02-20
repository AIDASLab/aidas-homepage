import Link from "next/link";
import DateDisplay from "../common/date-display";
import Image from "next/image";

export default function SeminarEntry({ title, date, slug, thumbnail, summary }) {
  return (
    <Link href={`/seminar/${slug}`} className="group block">
      <article className="overflow-hidden rounded-xl border border-slate-200 bg-white transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
        {thumbnail && (
          <div className="relative aspect-[4/3] w-full bg-slate-50 p-4">
            <Image
              src={`/${thumbnail}`}
              alt={title}
              fill
              className="object-contain p-2"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="space-y-2 p-4 sm:p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">Seminar Series</p>
          <h2 className="text-lg font-semibold leading-snug text-slate-800 transition group-hover:text-slate-900">
            {title}
          </h2>
          <DateDisplay
            date={date}
            className="inline-block rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
            formatOptions={{ year: "numeric", month: "short", day: "numeric" }}
          />
          {summary && <p className="text-sm leading-snug text-slate-600 line-clamp-2">{summary}</p>}
        </div>
      </article>
    </Link>
  );
}
