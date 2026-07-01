'use client';

import { useCallback, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { ROBOTS, CATEGORY_LABELS, CATEGORY_ORDER, getRobot } from './robot-config';
import JointControls from './joint-controls';

const UrdfViewer = dynamic(() => import('./urdf-viewer'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
      Loading 3D viewer...
    </div>
  ),
});

function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}

export default function HardwareExplorer({ initialKey = 'so101' }) {
  const [selectedKey, setSelectedKey] = useState(initialKey);
  const [jointMeta, setJointMeta] = useState([]);
  const [jointValues, setJointValues] = useState({});
  const [loading, setLoading] = useState(true);

  const robot = getRobot(selectedKey);

  // Group robots by category for the selector rail.
  const grouped = useMemo(() => {
    const g = {};
    for (const r of ROBOTS) (g[r.category] ||= []).push(r);
    return g;
  }, []);

  const categoryEntries = useMemo(() => (
    CATEGORY_ORDER
      .filter((cat) => grouped[cat]?.length)
      .map((cat) => [cat, grouped[cat]])
  ), [grouped]);

  const selectRobot = useCallback((key) => {
    if (key === selectedKey) return;
    setSelectedKey(key);
    setJointMeta([]);
    setJointValues({});
    setLoading(true);
  }, [selectedKey]);

  const handleLoaded = useCallback((joints) => {
    const init = {};
    for (const j of joints) init[j.name] = clamp(0, j.lower, j.upper);
    // Apply the robot's default pose (e.g. manipulators start in "Ready").
    const preset = robot?.presets?.find((p) => p.name === robot?.defaultPreset);
    if (preset) {
      for (const j of joints) {
        if (preset.values[j.name] != null) {
          init[j.name] = clamp(preset.values[j.name], j.lower, j.upper);
        }
      }
    }
    setJointMeta(joints);
    setJointValues(init);
    setLoading(false);
  }, [robot]);

  const setJoint = useCallback((name, value) => {
    setJointValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const applyPreset = useCallback((preset) => {
    setJointValues((prev) => {
      const next = { ...prev };
      for (const j of jointMeta) {
        if (preset.values[j.name] != null) {
          next[j.name] = clamp(preset.values[j.name], j.lower, j.upper);
        }
      }
      return next;
    });
  }, [jointMeta]);

  const resetJoints = useCallback(() => {
    const init = {};
    for (const j of jointMeta) init[j.name] = clamp(0, j.lower, j.upper);
    const preset = robot?.presets?.find((p) => p.name === robot?.defaultPreset);
    if (preset) {
      for (const j of jointMeta) {
        if (preset.values[j.name] != null) {
          init[j.name] = clamp(preset.values[j.name], j.lower, j.upper);
        }
      }
    }
    setJointValues(init);
  }, [jointMeta, robot]);

  return (
    <div className="overflow-hidden rounded-lg border border-white/70 bg-white/45 shadow-[0_24px_80px_rgba(15,23,42,0.16)] backdrop-blur-2xl ring-1 ring-slate-900/5 lg:h-[calc(100vh-160px)] lg:min-h-[900px] lg:max-h-[1120px]">
      <div className="grid h-full min-h-0 grid-cols-1 lg:grid-cols-[270px_1fr]">
        {/* ---- Robot selector rail ---- */}
        <aside className="min-h-0 overflow-y-auto border-b border-white/60 bg-white/35 p-3 backdrop-blur-2xl lg:h-full lg:border-b-0 lg:border-r">
          {categoryEntries.map(([cat, list]) => (
            <div key={cat} className="mb-5 last:mb-0">
              <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                {CATEGORY_LABELS[cat] || cat}
              </p>
              <div className="space-y-2">
                {list.map((r) => {
                  const active = r.key === selectedKey;
                  return (
                    <button
                      key={r.key}
                      onClick={() => selectRobot(r.key)}
                      className={`grid min-h-[62px] w-full grid-cols-[42px_1fr] items-end gap-3 rounded-lg px-2 py-2.5 text-left transition ${
                        active
                          ? 'bg-white/65 text-sky-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_12px_30px_rgba(14,165,233,0.18)] ring-1 ring-sky-400/80 backdrop-blur-xl'
                          : 'text-slate-700 hover:bg-white/55 hover:text-slate-950 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_10px_22px_rgba(15,23,42,0.08)]'
                      }`}
                    >
                      <span className="flex h-10 w-10 items-end justify-center overflow-hidden rounded-md border border-white/80 bg-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_6px_16px_rgba(15,23,42,0.08)]">
                        {r.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={r.image} alt="" className="h-full w-full object-contain object-bottom p-1" />
                        ) : (
                          <span className="text-[10px] font-semibold uppercase tracking-tight text-slate-400">
                            {r.name.split(/\s|-/).map((part) => part[0]).join('').slice(0, 3)}
                          </span>
                        )}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium">{r.name}</span>
                        <span className="block text-xs text-slate-500">
                          {r.quantity || 1} {(r.quantity || 1) === 1 ? 'unit' : 'units'}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </aside>

        <div className="grid min-h-0 min-w-0 lg:h-full lg:grid-rows-[minmax(0,1fr)_340px]">
          {/* ---- 3D stage ---- */}
          <div className="relative h-[520px] overflow-hidden bg-white/25 lg:h-auto lg:min-h-0">
            {robot?.tier === '3d' ? (
              <UrdfViewer
                url={robot.urdf}
                upAxis={robot.upAxis}
                packages={robot.packages}
                controlJoints={robot.controlJoints}
                count={robot.quantity || 1}
                fleetAxis={robot.fleetAxis}
                modelScale={robot.modelScale}
                modelPosition={robot.modelPosition}
                modelYaw={robot.modelYaw}
                manualFrame={robot.manualFrame}
                boundsMargin={robot.boundsMargin}
                jointMimics={robot.jointMimics}
                jointValues={jointValues}
                onLoaded={handleLoaded}
              />
            ) : (
              <SpecOnly robot={robot} />
            )}

            <div className="pointer-events-none absolute left-5 top-5">
              <h2 className="text-2xl font-semibold text-slate-900">{robot?.name}</h2>
              <p className="mt-0.5 text-xs font-medium text-slate-500">{robot?.maker}</p>
            </div>
            {robot?.tier === '3d' && (
              <p className="pointer-events-none absolute bottom-4 left-5 text-[11px] text-slate-500/80">
                Rotate · Zoom · Pan
              </p>
            )}
          </div>

          {/* ---- Control panel ---- */}
          <div className="min-h-0 overflow-y-auto border-t border-white/60 bg-white/60 p-5 backdrop-blur-xl xl:overflow-hidden">
            <div className="grid h-full min-h-0 gap-6 xl:grid-cols-[minmax(220px,0.8fr)_minmax(280px,1fr)_minmax(320px,1.15fr)]">
              <div className="min-h-0 overflow-y-auto pr-2">
                <span className="inline-block rounded-full border border-white/70 bg-white/65 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                  {CATEGORY_LABELS[robot?.category] || robot?.category}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{robot?.tagline}</p>
                {robot?.modelNote && (
                  <p className="mt-2 text-[11px] italic leading-snug text-slate-400">
                    {robot.modelNote}
                  </p>
                )}
              </div>

              {robot?.tier === '3d' ? (
                <div className="min-h-0 overflow-hidden">
                  {robot.presets?.length > 0 && (
                    <div className="mb-5">
                      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Preset Poses
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {robot.presets.map((p) => (
                          <button
                            key={p.name}
                            onClick={() => applyPreset(p)}
                            disabled={loading}
                            className="rounded-md border border-white/70 bg-white/65 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_6px_16px_rgba(15,23,42,0.06)] transition hover:border-sky-300/70 hover:bg-sky-50/70 hover:text-sky-700 disabled:opacity-40"
                          >
                            {p.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {loading ? (
                    <p className="text-sm text-slate-400">Loading joint data...</p>
                  ) : (
                    <JointControls
                      joints={jointMeta}
                      values={jointValues}
                      labels={robot.jointLabels}
                      onChange={setJoint}
                      onReset={resetJoints}
                    />
                  )}
                </div>
              ) : (
                <div />
              )}

              <div className="min-h-0 overflow-y-auto pr-2">
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Specifications
                </h3>
                <dl className="divide-y divide-slate-100">
                  {robot?.specs?.map((s) => (
                    <div key={s.label} className="flex justify-between gap-4 py-2 text-sm">
                      <dt className="text-slate-500">{s.label}</dt>
                      <dd className="text-right font-medium text-slate-700">{s.value}</dd>
                    </div>
                  ))}
                </dl>
                {robot?.officialUrl && (
                  <a
                    href={robot.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-sky-600 hover:text-sky-700"
                  >
                    Manufacturer / Source
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpecOnly({ robot }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
      {robot?.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={robot.image} alt={robot.name} className="max-h-[45vh] object-contain" />
      ) : (
        <div className="flex h-40 w-40 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-300">
          <span className="text-4xl">3D</span>
        </div>
      )}
    </div>
  );
}
