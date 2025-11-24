// src/components/Header.jsx
import { useEffect, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

/**
 * Header (no hash paths)
 * - no URL hashes (#home etc.)
 * - smooth-scroll only (no pushState)
 * - mobile links close menu + smooth-scroll
 * - desktop links smooth-scroll
 * - accessibility preserved
 */

const NAV_ITEMS = [
  { id: "home", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "education", label: "EDUCATION" },
  { id: "projects", label: "PROJECTS" },
  { id: "contact", label: "CONTACT" },
  { id: "my-space", label: "MY SPACE" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(NAV_ITEMS[0].id);
  const firstMobileLinkRef = useRef(null);
  const menuButtonRef = useRef(null);

  const resumeHref = "/resume.pdf";

  // smooth scroll helper (no hash changes)
  function smoothScrollTo(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Handler used by both desktop and mobile clickable navs
  function handleNavClick(id, isMobile = false) {
    smoothScrollTo(id);
    if (isMobile) {
      // close mobile menu after a short delay so user sees the click effect
      setTimeout(() => setOpen(false), 150);
    }
  }

  // Focus / Escape handling for mobile menu
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }

    if (open) {
      document.addEventListener("keydown", onKey);
      requestAnimationFrame(() => firstMobileLinkRef.current?.focus());
    } else {
      document.removeEventListener("keydown", onKey);
      menuButtonRef.current?.focus?.();
    }

    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // IntersectionObserver -> setActive when sections scroll into view
  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.id);
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);

    if (!sections.length) return;

    const headerHeight = 72; // px; adjust if header size changes
    const rootMargin = `-${headerHeight + 8}px 0px -40% 0px`;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActive(visible.target.id);
        }
      },
      {
        root: null,
        rootMargin,
        threshold: [0.15, 0.4, 0.6, 0.9],
      }
    );

    sections.forEach((s) => observer.observe(s));

    // Do not read or set any URL hash here (intentionally omitted)

    return () => observer.disconnect();
  }, []);

  // small helper to compute link classes
  const linkClass = (id) =>
    `nav-link gradient-underline text-slate-200/90 hover:text-white transition ${active === id ? "text-white font-semibold" : ""}`;

  return (
    <header className="sticky top-0 z-50 w-full">
      <div
        className="
          w-full
          backdrop-blur-[10px]
          bg-[rgba(12,14,22,0.55)]
          border-b border-[rgba(255,255,255,0.04)]
          shadow-[0_6px_20px_rgba(2,6,23,0.45)]
          z-10
        "
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="w-full px-6 py-4 flex items-center">
          <button
            onClick={() => handleNavClick("home")}
            className="flex-1 flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400"
            aria-label="Go to homepage"
          >
            <span
              className="text-2xl md:text-2xl font-extrabold tracking-[0.08em] bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-from)] via-[var(--accent-mid)] to-[var(--accent-to)] transition-transform duration-300 ease-out hover:scale-105"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Aviiishk
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            <nav className="flex items-center gap-8 text-sm" aria-label="Primary">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id, false)}
                  className={linkClass(item.id)}
                  aria-current={active === item.id ? "page" : undefined}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <a
              href={resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-btn"
              aria-label="Open resume (opens in new tab)"
            >
              <span className="resume-inner">
                <span className="resume-text">RESUME</span>
              </span>
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            ref={menuButtonRef}
            className="md:hidden p-2 text-slate-200 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((s) => !s)}
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* MOBILE PANEL */}
      <div
        id="mobile-menu"
        className={`md:hidden px-4 py-3 transition-all duration-300 overflow-hidden z-20 ${
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div className="bg-[rgba(255,255,255,0.03)] backdrop-blur-md rounded-xl p-3 border border-[rgba(255,255,255,0.06)]">
          <nav className="flex flex-col gap-3 text-sm text-white">
            {NAV_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                ref={idx === 0 ? firstMobileLinkRef : undefined}
                onClick={() => handleNavClick(item.id, true)}
                className={`w-full text-left py-2 px-2 rounded hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                  active === item.id ? "bg-white/6 font-semibold" : ""
                }`}
                aria-current={active === item.id ? "page" : undefined}
              >
                {item.label}
              </button>
            ))}

            <a
              href={resumeHref}
              className="mt-3 inline-block w-full text-center rounded-full py-2 bg-gradient-to-r from-[var(--accent-mid)] to-[var(--accent-to)] text-white font-semibold"
            >
              RESUME
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
