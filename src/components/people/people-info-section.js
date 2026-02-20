'use client';
import { useMemo, useState } from 'react';

export default function PeopleInfoSection({ person, property, title }) {
  // Grab the array from person
  const items = useMemo(
    () => (Array.isArray(person?.[property]) ? person[property] : []),
    [person, property]
  );

  // Default heading: capitalize the property name
  const heading =
    title || property.charAt(0).toUpperCase() + property.slice(1);

  const collapseThreshold = property === 'research' ? 3 : 2;
  const hasOverflow = items.length > collapseThreshold;
  const [expanded, setExpanded] = useState(false);

  const visibleItems = useMemo(() => {
    if (!hasOverflow || expanded) return items;
    return items.slice(0, collapseThreshold);
  }, [collapseThreshold, expanded, hasOverflow, items]);

  // If it's not an array or is empty, render nothing
  if (items.length === 0) return null;

  return (
    <div>
      <h4 className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{heading}</h4>
      <ul className="mt-1 space-y-0.5 text-sm leading-snug text-slate-700">
        {visibleItems.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      {hasOverflow && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-1 text-xs font-medium text-slate-500 transition hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-1"
          aria-expanded={expanded}
        >
          {expanded ? 'Show less' : `Show ${items.length - collapseThreshold} more`}
        </button>
      )}
    </div>
  );
}
