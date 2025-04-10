"use client";

export default function DateDisplay({
  date,
  className = "text-sm text-[#333333] whitespace-nowrap",
  locale = "en-US",
  formatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
}) {
  if (!date) return null;

  const formatted = new Date(date).toLocaleDateString(locale, formatOptions);

  return <p className={className}>{formatted}</p>;
}
