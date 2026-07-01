'use client';

const RAD = 180 / Math.PI;

function fmt(type, v) {
  if (type === 'prismatic') return `${(v * 1000).toFixed(0)} mm`;
  return `${(v * RAD).toFixed(0)}°`;
}

export default function JointControls({ joints, values, labels = {}, onChange, onReset }) {
  if (!joints?.length) {
    return <p className="text-sm text-slate-500">This model has no adjustable joints.</p>;
  }

  const dense = joints.length > 12;

  return (
    <div className="flex h-full min-h-0 flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Joints · {joints.length}
        </h3>
        <button
          onClick={onReset}
          className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
        >
          Reset
        </button>
      </div>

      <div className={`min-h-0 flex-1 overflow-y-auto pr-2 ${dense ? 'space-y-3' : 'space-y-3.5'}`}>
        {joints.map((j) => {
          const v = values[j.name] ?? 0;
          const label = labels[j.name] || j.name.replace(/_/g, ' ');
          return (
            <div key={j.name}>
              <div className="mb-1 flex items-baseline justify-between gap-3">
                <span className={`${dense ? 'text-xs' : 'text-sm'} min-w-0 truncate capitalize text-slate-700`}>{label}</span>
                <span className="font-mono text-xs tabular-nums text-sky-600">{fmt(j.type, v)}</span>
              </div>
              <input
                type="range"
                min={j.lower}
                max={j.upper}
                step={(j.upper - j.lower) / 200 || 0.01}
                value={v}
                onChange={(e) => onChange(j.name, parseFloat(e.target.value))}
                className="hw-slider w-full"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
