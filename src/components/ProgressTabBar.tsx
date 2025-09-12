"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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

  useEffect(() => {
    const unlock = (id: string) =>
      setUnlocked((prev) => new Set([...prev, id]));

    // Hook into your existing section events
    window.addEventListener("section:experience-ready", () => unlock("experience"));
    window.addEventListener("section:projects-ready", () => unlock("projects"));
    window.addEventListener("section:additional-experience-ready", () => unlock("additional-experience"));
    window.addEventListener("section:interests-ready", () => unlock("interests"));

    return () => {
      window.removeEventListener("section:experience-ready", () => unlock("experience"));
      window.removeEventListener("section:projects-ready", () => unlock("projects"));
      window.removeEventListener("section:additional-experience-ready", () => unlock("additional-experience"));
      window.removeEventListener("section:interests-ready", () => unlock("interests"));
    };
  }, []);

  const handleClick = (id: string) => {
    if (!unlocked.has(id)) return;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
  };

  return (
    <nav className="fixed top-8 left-8 flex flex-col gap-4 z-50">
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
  );
}
