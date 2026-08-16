"use client";

import { useEffect, useState } from "react";

const TAG = "CS @ Georgia Tech";
const RESUME = "https://www.vishruthanand.com/resume.pdf";

export function Hero() {
  // Starts empty on both server and client, so the first client render matches
  // the server HTML; the effect below is what fills it in.
  const [typed, setTyped] = useState("");
  const [showCaret, setShowCaret] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setTyped(TAG);
      setShowCaret(false);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(TAG.slice(0, i));
      if (i >= TAG.length) clearInterval(id);
    }, 55);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero shell">
      <h1>Software Engineer</h1>
      <p className="hero__type">
        <span>{typed}</span>
        {showCaret && <span className="caret">&nbsp;</span>}
      </p>

      <ul className="hero__edu">
        <li>
          <span className="deg">
            M.S. Computer Science{" "}
            <span className="min">· ML</span>
          </span>
          <span className="when">Jan 2026 – Dec 2026</span>
        </li>
        <li>
          <span className="deg">
            B.S. Computer Science <span className="min">· FinTech minor</span>
          </span>
          <span className="when">Aug 2023 – Dec 2025</span>
        </li>
      </ul>

      <div className="hero__links">
        <a href={RESUME} target="_blank" rel="noopener noreferrer">
          Resume{" "}
          <span className="arw" aria-hidden="true">
            ↗
          </span>
        </a>
        <a
          href="https://linkedin.com/in/vishruth-anand"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn{" "}
          <span className="arw" aria-hidden="true">
            ↗
          </span>
        </a>
        <a
          href="https://github.com/vishruthanand08"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub{" "}
          <span className="arw" aria-hidden="true">
            ↗
          </span>
        </a>
        <a href="mailto:vanand64@gatech.edu">Contact</a>
      </div>
    </section>
  );
}
