"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "additional-experience", label: "Additional" },
  { id: "interests", label: "Interests" },
];

export default function ProgressTabBar() {
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set(["about"]));
  const [active, setActive] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);

  // ---- Unlock sections on your custom events (using stable handlers so cleanup works) ----
  useEffect(() => {
    const unlock = (id: string) =>
      setUnlocked((prev) => new Set([...prev, id]));

    const onExperience = () => unlock("experience");
    const onProjects = () => unlock("projects");
    const onAdditional = () => unlock("additional-experience");
    const onInterests = () => unlock("interests");

    window.addEventListener("section:experience-ready", onExperience);
    window.addEventListener("section:projects-ready", onProjects);
    window.addEventListener("section:additional-experience-ready", onAdditional);
    window.addEventListener("section:interests-ready", onInterests);

    return () => {
      window.removeEventListener("section:experience-ready", onExperience);
      window.removeEventListener("section:projects-ready", onProjects);
      window.removeEventListener("section:additional-experience-ready", onAdditional);
      window.removeEventListener("section:interests-ready", onInterests);
    };
  }, []);

  // ---- Optional: highlight the tab of the section currently in view (keeps your click behavior too) ----
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // pick the most visible unlocked entry
        let best: IntersectionObserverEntry | null = null;
        for (const e of entries) {
          const id = e.target.id;
          if (!unlocked.has(id)) continue;
          if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
        }
        if (best && best.isIntersecting) {
          setActive(best.target.id);
        }
      },
      { threshold: [0.5] } // highlight when at least 50% in view
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [unlocked]);

  const handleClick = (id: string) => {
    if (!unlocked.has(id)) return;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false); // close mobile menu after nav
  };

  // Close menu on ESC (mobile)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Desktop nav (unchanged behavior) */}
      <nav className="hidden sm:flex fixed top-8 left-8 flex-col gap-4 z-50">
        {sections.map((s) => {
          const isUnlocked = unlocked.has(s.id);
          const isActive = active === s.id;

          return (
            <button
              key={s.id}
              onClick={() => handleClick(s.id)}
              disabled={!isUnlocked}
              className={`relative px-4 py-2 rounded-lg font-semibold transition 
                ${isUnlocked ? "text-white" : "text-gray-500 cursor-not-allowed"}
              `}
            >
              {s.label}

              {/* Glow when unlocked */}
              {isUnlocked && (
                <motion.div
                  className="absolute inset-0 rounded-lg bg-blue-500/20 blur-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isActive ? 1 : 0.5 }}
                  transition={{ duration: 0.4 }}
                />
              )}

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Mobile: hamburger (fixed, doesn't move) */}
      <button
        className="sm:hidden fixed top-4 right-4 z-[60] p-2 rounded-md bg-blue-600 text-white shadow-lg"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* Mobile: dropdown (also fixed so the button never shifts) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: 12, y: -8 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 12, y: -8 }}
            transition={{ duration: 0.22 }}
            className="sm:hidden fixed top-14 right-4 z-50 w-[220px] rounded-lg bg-black/85 backdrop-blur-md shadow-xl p-3"
          >
            {sections.map((s) => {
              const isUnlocked = unlocked.has(s.id);
              const isActive = active === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => handleClick(s.id)}
                  disabled={!isUnlocked}
                  className={`relative w-full text-left px-4 py-2 rounded-md font-semibold mb-1
                    ${isUnlocked ? "text-white hover:bg-white/5" : "text-gray-500 cursor-not-allowed"}
                  `}
                >
                  {s.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-blue-400 block rounded" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
