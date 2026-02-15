import Link from "next/link";
import DateDisplay from "@/components/common/date-display";

export default function NewsEntry({ title, date, summary, slug }) {
  return (
    <div className="px-2 sm:px-4 my-5">
      {/* Title & Date Row */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Link href={`/news/${slug}`} className="hover-link">
          <h3 className="text-base sm:text-xl font-medium leading-snug">{title}</h3>
        </Link>
        {date && (
          <DateDisplay
            date={date}
            className="text-sm text-muted"
          />
        )}
      </div>

      {/* Summary */}
      {summary && (
        <p className="mt-1.5 text-sm text-muted leading-snug">
          {summary}
        </p>
      )}
    </div>
  );
}
