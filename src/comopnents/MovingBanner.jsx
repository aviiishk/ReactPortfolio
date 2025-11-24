import React from "react";

export default function MovingBanner({
  gap = "mx-6",
  speed = 20,
  pauseOnHover = true,
}) {
  const items = [
    "RESPONSIVE",
    "ROBUST",
    "SCALABLE",
    "SECURE",
    "ACCESSIBLE",
    "USER FRIENDLY",
    "MAINTAINABLE",
    "INTERACTIVE",
    "SEARCH OPTIMIZED",
    "USABLE",
    "EFFICIENT",
  ];
  const trackRef = React.useRef(null);

  const styleTag = `
    @keyframes mb-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    .mb-paused { animation-play-state: paused !important; }
  `;

  const duplicated = [...items, ...items]; // seamless loop

  return (
    <div className="relative w-full overflow-hidden select-none py-2 bg-linear-to-r from-blue-500/40 via-blue-400/30 to-purple-500/40">
      <style>{styleTag}</style>

      <div
        onMouseEnter={() =>
          pauseOnHover && trackRef.current?.classList.add("mb-paused")
        }
        onMouseLeave={() =>
          pauseOnHover && trackRef.current?.classList.remove("mb-paused")
        }
        className="w-full"
      >
        <div
          ref={trackRef}
          className="flex whitespace-nowrap will-change-transform  text-base text-black font-bold tracking-wide"
          style={{ animation: `mb-scroll ${speed}s linear infinite` }}
        >
          {duplicated.map((text, i) => (
            <span key={i} className={`${gap} flex items-center`}>
              {text}
              <span className="mx-4 opacity-70">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * USAGE:
 * <MovingBanner
 *    items={["RESPONSIVE", "ROBUST", "SCALABLE", "SECURE", "ACCESSIBLE", "USER FRIENDLY", "MAINTAINABLE", "INTERACTIVE", "SEARCH OPTIMIZED", "USABLE", "EFFICIENT"]}
 *    speed={18}
 * />
 */
