"use client";

import { useEffect, useState } from "react";

const RESUME = "https://www.vishruthanand.com/resume.pdf";

const navItems = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "additional", label: "Additional" },
  { id: "about", label: "About" },
  { id: "interests", label: "Interests" },
];

export function SiteHeader() {
  // Empty until the observer fires, so server and client agree on first render.
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-25% 0px -65% 0px" }
    );

    for (const { id } of navItems) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site">
      <div className="shell site__in">
        <span className="site__name">Vishruth Anand</span>
        <nav className="site__nav">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={active === item.id ? "is-active" : undefined}
              aria-current={active === item.id ? "true" : undefined}
            >
              {item.label}
            </a>
          ))}
          <a href={RESUME} target="_blank" rel="noopener noreferrer">
            Resume <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
