import Link from "next/link";
import DateDisplay from "@/components/common/date-display";

export default function SeminarEntry({ title, date, presenter, slug }) {
  return (
    <div className="px-2 sm:px-4 my-6">
      {/* Title */}
      <Link href={`/seminar/${slug}`} className="hover:underline">
        <h3 className="text-base sm:text-xl font-semibold">{title}</h3>
      </Link>

      {/* Presenter & Date */}
      <div className="mt-2 text-sm text-[#666666]">
        {presenter && <span>{presenter}</span>}
        {presenter && date && <span className="mx-1">|</span>}
        {date && <DateDisplay date={date} className="inline" />}
      </div>
    </div>
  );
}
