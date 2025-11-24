import React, { useEffect, useRef, useState } from "react";
import { PROJECTS } from "../Utill/ProjectsData";
import { FiGithub, FiExternalLink } from "react-icons/fi";

/**
 * Projects.jsx
 * - Desktop: left sticky details + right scrollable cards
 *   -> GitHub & Live icons on the right of each card (desktop only)
 * - Mobile: bottom-sheet details (unchanged)
 * - Images: object-contain (no cropping)
 */

export default function Projects() {
  const [active, setActive] = useState(0);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.matchMedia("(min-width: 768px)").matches : true
  );

  const cardRefs = useRef([]);
  const scrollContainerRef = useRef(null);
  const observerRef = useRef(null);

  // Track desktop vs mobile
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Desktop observer (root = scrollContainer)
  useEffect(() => {
    if (!isDesktop) return;

    const options = {
      root: scrollContainerRef.current,
      rootMargin: "0px",
      threshold: [0.4, 0.6, 0.9],
    };

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(Number(visible.target.dataset.index));
    }, options);

    observerRef.current = observer;
    cardRefs.current.forEach((r) => r && observer.observe(r));

    return () => observer.disconnect();
  }, [isDesktop]);

  // Mobile observer (root = viewport)
  useEffect(() => {
    if (isDesktop) return;

    const opts = { root: null, threshold: [0.5] };
    const obs = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(Number(visible.target.dataset.index));
    }, opts);

    cardRefs.current.forEach((r) => r && obs.observe(r));
    observerRef.current = obs;

    return () => obs.disconnect();
  }, [isDesktop]);

  // Lock body scroll when sheet open (mobile)
  useEffect(() => {
    if (isDesktop) return;
    document.body.style.overflow = sheetOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [sheetOpen, isDesktop]);

  function scrollToIndex(i) {
    const ref = cardRefs.current[i];
    if (!ref) return;
    ref.scrollIntoView({ behavior: "smooth", block: isDesktop ? "center" : "start" });
    setActive(i);
    if (!isDesktop) setSheetOpen(true);
  }

  // Simple horizontal swipe detection for mobile slides
  const touch = useRef({ startX: 0, startY: 0, time: 0 });
  function onTouchStart(e) {
    const t = e.touches ? e.touches[0] : e;
    touch.current.startX = t.clientX;
    touch.current.startY = t.clientY;
    touch.current.time = Date.now();
  }
  function onTouchEnd(e) {
    const t = e.changedTouches ? e.changedTouches[0] : e;
    const dx = t.clientX - touch.current.startX;
    const dy = t.clientY - touch.current.startY;
    const dt = Date.now() - touch.current.time;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    if (absX > 40 && absX > absY && dt < 500) {
      if (dx < 0) scrollToIndex(Math.min(PROJECTS.length - 1, active + 1));
      else scrollToIndex(Math.max(0, active - 1));
    }
  }

  // Helpers for links / fallbacks
  function getGithub(project) {
    return project.github && project.github.trim() !== "" ? project.github : null;
  }
  function hasLive(project) {
    return project.live && project.live.trim() !== "";
  }
  function getYear(project) {
    return project.year || "";
  }

  // --- Desktop render (unchanged layout; visuals improved) ---
  if (isDesktop) {
    const current = PROJECTS[active] || {};
    return (
      <div className="min-h-screen w-full bg-black text-gray-200 py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left details column: sticky */}
          <div className="md:col-span-5 sticky top-24 self-start">
            <h2 className="text-4xl font-semibold text-purple-400 flex items-center gap-3">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="opacity-90">
                <rect width="24" height="24" rx="3" fill="#4C1D95" />
              </svg>
              Projects
            </h2>

            <div className="mt-10">
              <h3 className="text-3xl font-medium">{current.title}</h3>
              <p className="mt-3 text-gray-400 max-w-xl">{current.description}</p>

              <ul className="mt-6 space-y-3">
                {(current.features || []).map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-purple-400">♦</span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                {(current.tags || []).map((t) => {
                  const Icon = t.icon;
                  return (
                    <div
                      key={`${current.id}-${t.name}`}
                      className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-sm text-gray-200"
                    >
                      <Icon size={18} />
                      <span>{t.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right scrollable images column */}
          <div className="md:col-span-7">
            <div
              ref={scrollContainerRef}
              className="h-[70vh] overflow-y-auto pr-4 space-y-8 md:space-y-12 scroll-smooth no-scrollbar"
            >
              {PROJECTS.map((p, i) => (
                <div
                  key={p.id}
                  data-index={i}
                  ref={(el) => (cardRefs.current[i] = el)}
                  className={`relative rounded-2xl  p-6 md:p-8 transition-transform duration-400 transform-gpu mx-auto md:mx-0 md:w-[100%] ${
                    i === active ? "scale-100" : "scale-95 opacity-70"
                  }`}
                >
                  {/* Neutral professional card background */}
                  <div
                    className="rounded-xl p-4 md:p-8 border border-transparent transition-all duration-300 hover:border-blue-400 hover:scale-[1.03] shadow-sm hover:shadow-md relative"
                    style={{
                      background: "linear-gradient(180deg, rgba(6,9,12,0.85), rgba(10,12,14,0.8))",
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-mono text-white">{p.subtitle}</h4>
                      </div>

                      {/* REPLACED: arrow -> github + live icons (desktop) */}
                      <div className="flex items-center gap-2 opacity-90">
                        {hasLive(p) && (
                          <a
                            href={p.live}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`${p.title} live link`}
                            className="bg-black/20 p-2 rounded-full hover:bg-black/30"
                          >
                            <FiExternalLink size={18} />
                          </a>
                        )}

                        {getGithub(p) && (
                          <a
                            href={getGithub(p)}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`${p.title} github repo`}
                            className="bg-black/20 p-2 rounded-full hover:bg-black/30"
                          >
                            <FiGithub size={18} />
                          </a>
                        )}

                        {/* Keep a small focus button so user can center the card when needed */}
                        <button
                          onClick={() => scrollToIndex(i)}
                          className="ml-2 bg-black/10 p-2 rounded-full hover:bg-black/20"
                          aria-label={`Focus ${p.title}`}
                        >
                          ⤴
                        </button>
                      </div>
                    </div>

                    {/* Image area: object-contain so images are not cropped */}
                    <div className="mt-6 rounded-lg overflow-hidden border border-black/30 shadow-lg bg-black/70 flex items-center justify-center p-4">
                      <img
                        src={p.image}
                        alt={`${p.title} screenshot`}
                        className="w-full object-contain max-h-72 md:max-h-96"
                        loading="lazy"
                        style={{ backgroundColor: "#000" }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Mobile render (improved) ---
  const currentMobile = PROJECTS[active] || {};
  return (
    <div className="min-h-screen w-full bg-black text-gray-200 py-6 px-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-semibold text-purple-400 flex items-center gap-2">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="opacity-90">
            <rect width="24" height="24" rx="3" fill="#4C1D95" />
          </svg>
          Projects
        </h2>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollToIndex(Math.max(0, active - 1))}
            aria-label="Previous project"
            className="px-3 py-1 rounded-md bg-gray-800 border border-gray-700"
          >
            ‹
          </button>

          <button
            onClick={() => setSheetOpen((s) => !s)}
            aria-label={sheetOpen ? "Close details" : "Open details"}
            className="px-3 py-1 rounded-md bg-gray-800 border border-gray-700"
          >
            {sheetOpen ? "Close" : "Details"}
          </button>

          <button
            onClick={() => scrollToIndex(Math.min(PROJECTS.length - 1, active + 1))}
            aria-label="Next project"
            className="px-3 py-1 rounded-md bg-gray-800 border border-gray-700"
          >
            ›
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="h-[82vh] overflow-y-auto snap-y snap-mandatory space-y-6 pr-2 no-scrollbar"
        tabIndex={0}
      >
        {PROJECTS.map((p, i) => (
          <div
            key={p.id}
            data-index={i}
            ref={(el) => (cardRefs.current[i] = el)}
            className={`snap-start rounded-2xl shadow-lg overflow-hidden transform transition-transform duration-300 ${
              i === active ? "scale-100" : "scale-95 opacity-80"
            }`}
            style={{ minHeight: "78vh", background: "linear-gradient(180deg, rgba(6,9,12,0.88), rgba(10,12,14,0.84))" }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onMouseDown={onTouchStart}
            onMouseUp={onTouchEnd}
            onClick={() => {
              setActive(i);
              setSheetOpen(true);
            }}
            role="button"
            aria-label={`Open details for ${p.title}`}
          >
            <div className="p-4 flex flex-col h-full">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-white text-lg font-semibold">{p.title}</h3>
                  <div className="text-xs text-gray-400 mt-1">{p.subtitle}</div>
                </div>

                <div className="text-sm text-gray-300">{getYear(p)}</div>
              </div>

              <div className="flex-1 mt-4 rounded-xl overflow-hidden border border-black/30 shadow-inner bg-black/70 flex items-center justify-center">
                <img
                  src={p.image}
                  alt={`${p.title} screenshot`}
                  className="w-full object-contain"
                  style={{ maxHeight: "60vh", backgroundColor: "#000" }}
                  loading="lazy"
                />
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex gap-2">
                  {(p.tags || []).slice(0, 3).map((t) => (
                    <span key={t.name} className="text-xs px-2 py-1 rounded-full bg-gray-800/60">
                      {t.name}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-gray-400">Tap for details ⤴</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-center gap-4">
        <div className="flex gap-2">
          {PROJECTS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              aria-label={`Go to project ${idx + 1}`}
              className={`w-2 h-2 rounded-full ${idx === active ? "bg-purple-400" : "bg-gray-700"}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom sheet details (mobile) */}
      <div
        className={`fixed left-0 right-0 bottom-0 z-50 transition-transform duration-300`}
        style={{ transform: sheetOpen ? "translateY(0%)" : "translateY(100%)" }}
        aria-hidden={!sheetOpen}
      >
        <button
          aria-label="Close details"
          onClick={() => setSheetOpen(false)}
          className={`fixed inset-0 bg-black/50 z-[-1] ${sheetOpen ? "block" : "hidden"}`}
        />

        <div className="mx-3 mb-3 bg-[#06110b] rounded-t-2xl shadow-xl max-h-[86vh] overflow-y-auto border border-black/30">
          <div className="w-full flex justify-center py-2">
            <div className="w-12 h-1.5 rounded-full bg-gray-700" />
          </div>

          <div className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-white">{currentMobile.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{currentMobile.subtitle}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    scrollToIndex(Math.max(0, active - 1));
                    setSheetOpen(false);
                    setTimeout(() => setSheetOpen(true), 220);
                  }}
                  aria-label="Previous"
                  className="px-2 py-1 rounded-md bg-gray-800 border border-gray-700"
                >
                  ‹
                </button>

                <button
                  onClick={() => {
                    scrollToIndex(Math.min(PROJECTS.length - 1, active + 1));
                    setSheetOpen(false);
                    setTimeout(() => setSheetOpen(true), 220);
                  }}
                  aria-label="Next"
                  className="px-2 py-1 rounded-md bg-gray-800 border border-gray-700"
                >
                  ›
                </button>
              </div>
            </div>

            <p className="mt-3 text-gray-300 leading-relaxed">{currentMobile.description}</p>

            <ul className="mt-4 space-y-2">
              {(currentMobile.features || []).map((f, idx) => (
                <li key={idx} className="text-gray-200 flex items-start gap-3">
                  <span className="text-purple-400 mt-0.5">♦</span>
                  <span className="text-sm">{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              {(currentMobile.tags || []).map((t) => {
                const Icon = t.icon;
                return (
                  <div key={t.name} className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-sm">
                    <Icon size={14} />
                    <span>{t.name}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex items-center justify-between">
              <div className="text-sm text-gray-400">{getYear(currentMobile)}</div>

              <div className="flex gap-3">
                {hasLive(currentMobile) && (
                  <a
                    href={currentMobile.live}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 rounded-md bg-purple-500 text-black font-semibold"
                  >
                    Live
                  </a>
                )}

                {getGithub(currentMobile) && (
                  <a
                    href={getGithub(currentMobile)}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 rounded-md bg-gray-800 border border-gray-700"
                  >
                    Code
                  </a>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button onClick={() => setSheetOpen(false)} className="px-4 py-2 rounded-md bg-gray-700 border border-gray-600">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
