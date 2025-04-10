import Link from "next/link";
import DateDisplay from "@/components/common/date-display";

export default function NewsEntry({ title, date, summary, slug }) {
  return (
    <div className="px-2 sm:px-4 my-6">
      {/* Title & Date Row */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Link href={`/news/${slug}`} className="hover:underline">
          <h3 className="text-base sm:text-xl font-semibold">{title}</h3>
        </Link>
        {date && (
          <DateDisplay
            date={date}
            className="text-sm text-[#666666]"
          />
        )}
      </div>

      {/* Summary */}
      {summary && (
        <p className="mt-2 text-sm text-[#666666] leading-relaxed">
          {summary}
        </p>
      )}
    </div>
  );
}
