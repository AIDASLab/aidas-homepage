function AwardCandidateIcon() {
  return (
    <span
      aria-hidden="true"
      className="-my-2.5 -ml-1 -mr-0.5 h-[2rem] w-[2rem] shrink-0 bg-current"
      style={{
        WebkitMaskImage: "url('/icons/cvpr-award-mask.svg')",
        maskImage: "url('/icons/cvpr-award-mask.svg')",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}

function getBadgeStyle(badge) {
  if (badge.toLowerCase() === "award candidate") {
    return "border-amber-300 bg-amber-50 text-amber-800";
  }

  return "border-red-200 bg-red-50 text-red-700";
}

export default function PublicationBadges({ badges = [] }) {
  if (!badges.length) return null;

  return badges.map((badge) => {
    const normalizedBadge = String(badge);
    const isAwardCandidate = normalizedBadge.toLowerCase() === "award candidate";

    return (
      <span
        key={normalizedBadge}
        className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] align-middle ${getBadgeStyle(normalizedBadge)}`}
      >
        {isAwardCandidate ? <AwardCandidateIcon /> : null}
        {normalizedBadge}
      </span>
    );
  });
}
