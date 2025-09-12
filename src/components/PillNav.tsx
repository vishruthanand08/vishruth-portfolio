"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";

// --- Toast Component ---
const Toast: React.FC<{ message: string }> = ({ message }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 30 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="fixed bottom-6 right-6 rounded-lg bg-blue-600/90 px-4 py-2 text-white shadow-lg backdrop-blur-md"
  >
    {message}
  </motion.div>
);

// --- Types ---
export type PillNavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export interface PillNavProps {
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
}

// --- Main Component ---
const PillNav: React.FC<PillNavProps> = ({
  items,
  activeHref,
  className = "",
  ease = "power3.out",
}) => {
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const [toast, setToast] = useState("");

  // --- Layout + hover animations (your original GSAP logic) ---
  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle) => {
        if (!circle?.parentElement) return;
        const pill = circle.parentElement as HTMLElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta =
          Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const label = pill.querySelector<HTMLElement>(".pill-label");
        const hoverLabel = pill.querySelector<HTMLElement>(
          ".pill-label-hover"
        );

        if (label) gsap.set(label, { y: 0 });
        if (hoverLabel) gsap.set(hoverLabel, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        const tl = gsap.timeline({ paused: true });
        tl.to(circle, { scale: 1.2, duration: 0.5, ease }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 0.5, ease }, 0);
        }

        if (hoverLabel) {
          tl.to(
            hoverLabel,
            { y: 0, opacity: 1, duration: 0.5, ease },
            0
          );
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();
    window.addEventListener("resize", layout);

    if (document.fonts) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    return () => window.removeEventListener("resize", layout);
  }, [items, ease]);

  const handleEnter = (i: number) => {
    tlRefs.current[i]?.play();
  };

  const handleLeave = (i: number) => {
    tlRefs.current[i]?.reverse();
  };

  // --- Copy to clipboard handler ---
  const handleContactClick = async (
    email: string,
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
      setToast(`Email copied to clipboard: ${email}`);
      setTimeout(() => setToast(""), 2500);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <>
      <nav
        className={`flex items-center justify-center gap-4 ${className}`}
        aria-label="Primary"
      >
        {items.map((item, i) => {
          const isActive = activeHref === item.href;
          const isContact = item.label.toLowerCase() === "contact";

          return (
            <Link
              key={i}
              href={item.href}
              target={
                item.href.startsWith("http") && !isContact ? "_blank" : "_self"
              }
              rel={
                item.href.startsWith("http") && !isContact
                  ? "noopener noreferrer"
                  : ""
              }
              aria-label={item.ariaLabel || item.label}
              className="relative overflow-hidden rounded-full bg-gradient-to-r 
                       from-blue-600 via-indigo-500 to-purple-600
                       px-6 py-2 font-semibold tracking-wide uppercase
                       text-white shadow-lg backdrop-blur-md
                       transition-transform duration-300"
              onClick={
                isContact
                  ? (e) => handleContactClick("vanand64@gatech.edu", e)
                  : undefined
              }
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={() => handleLeave(i)}
            >
              {/* Hover Circle */}
              <span
                ref={(el) => {
  circleRefs.current[i] = el;
}}
                className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none bg-white/20"
              />

              {/* Label stack */}
              <span className="label-stack relative inline-block z-[2]">
                <span className="pill-label relative z-[2] inline-block">
                  {item.label}
                </span>
                <span
                  className="pill-label-hover absolute left-0 top-0 z-[3] inline-block text-white"
                  aria-hidden="true"
                >
                  {item.label}
                </span>
              </span>

              {/* Active indicator */}
              {isActive && (
                <span className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.9)]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Toast */}
      <AnimatePresence>{toast && <Toast message={toast} />}</AnimatePresence>
    </>
  );
};

export default PillNav;
