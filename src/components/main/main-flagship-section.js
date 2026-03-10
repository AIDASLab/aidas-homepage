import Link from "next/link";

const projects = [
  {
    codename: "dynin-omni",
    title: "Omnimodal Diffusion Model",
    description:
      "A unified generative foundation model capable of understanding and generating across all modalities — text, image, video, audio, and more — within a single coherent architecture.",
    status: "Released",
    statusStyle: "bg-emerald-400/20 text-emerald-300 border border-emerald-400/30",
    href: "https://dynin.ai/omni",
    external: true,
    gradient: "from-[#0f172a] via-[#1e1b4b] to-[#1e3a5f]",
    accentColor: "text-indigo-300",
    dotColor: "bg-indigo-400",
    arrowColor: "text-indigo-300 group-hover:text-white",
    borderHover: "hover:border-indigo-500/50",
    tag: "Core AI",
  },
  {
    codename: "dynin-robotics",
    title: "Omnimodal Robotics Model",
    description:
      "An omnimodal robot foundation model extending perception beyond vision and language — incorporating physical sensors such as force, torque, and more — to enable full-body-aware autonomy.",
    status: "In Development",
    statusStyle: "bg-amber-400/20 text-amber-300 border border-amber-400/30",
    href: null,
    external: false,
    gradient: "from-[#0f172a] via-[#1a2e1a] to-[#1c3028]",
    accentColor: "text-emerald-300",
    dotColor: "bg-emerald-400",
    arrowColor: "text-slate-500",
    borderHover: "",
    tag: "Embodied AI",
  },
];

export default function FlagshipSection() {
  return (
    <section className="section-shell">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-7">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 mb-1.5">
            Flagship Projects
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-800">
            What We Build
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {projects.map((p) => {
            const CardWrapper = p.href
              ? ({ children }) => (
                  <Link
                    href={p.href}
                    target={p.external ? "_blank" : undefined}
                    rel={p.external ? "noopener noreferrer" : undefined}
                    className={`group block rounded-2xl border border-white/10 bg-gradient-to-br ${p.gradient} ${p.borderHover} transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5`}
                  >
                    {children}
                  </Link>
                )
              : ({ children }) => (
                  <div
                    className={`rounded-2xl border border-white/10 bg-gradient-to-br ${p.gradient} opacity-80`}
                  >
                    {children}
                  </div>
                );

            return (
              <CardWrapper key={p.codename}>
                <div className="p-6 sm:p-8 flex flex-col h-full min-h-[240px]">
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${p.dotColor} flex-shrink-0`} />
                      <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                        {p.tag}
                      </span>
                    </div>
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${p.statusStyle}`}
                    >
                      {p.status}
                    </span>
                  </div>

                  {/* Codename */}
                  <p className={`text-sm font-mono font-medium mb-1.5 ${p.accentColor}`}>
                    {p.codename}
                  </p>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-semibold text-white leading-snug mb-3">
                    {p.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-400 leading-relaxed flex-grow">
                    {p.description}
                  </p>

                  {/* Link row */}
                  {p.href ? (
                    <div className={`mt-5 flex items-center gap-1.5 text-sm font-medium ${p.arrowColor} transition-colors duration-200`}>
                      <span>Visit {p.codename}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      >
                        <path d="M7 7h10v10" />
                        <path d="M7 17 17 7" />
                      </svg>
                    </div>
                  ) : (
                    <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-slate-600">
                      <span>Coming soon</span>
                    </div>
                  )}
                </div>
              </CardWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
