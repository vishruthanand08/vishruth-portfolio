"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const experiences = [
  {
    title: "Software Engineering Intern",
    org: "Amazon Web Services",
    date: "Summer 2025",
    logo: "/aws.jpeg",
    bullets: [
      "Built a high-performance video overlay redirection system for the DCV Web Client, supporting multi-monitor setups with 120 FPS rendering and 0.15 ms latency.",
      "Developed a fault-tolerant communication layer between Chrome extension, proxy, and client to keep overlays stable during tab detachment and multi-display movement.",
    ],
  },
  {
    title: "Undergraduate Machine Learning Researcher",
    org: "Georgia Tech VIP Program",
    date: "Fall 2023 – Fall 2024",
    logo: "/gt.png",
    bullets: [
      "Built a MuseScore plugin that integrated transformer-based music generation, enabling AI-assisted composition with real-time melody generation, style transfer, and sequence prediction.",
      "Developed large-scale data pipelines and visualization tools, working with 550k+ MIDI files, Python, SQL, and transformer models to evaluate accuracy, latency, and output diversity.",
    ],
  },
  {
    title: "Software Engineering Intern",
    org: "PyPs",
    date: "Summer 2024",
    logo: "/pyps.png",
    bullets: [
      "Built and shipped a Chrome extension that automated LinkedIn post and comment engagement with Gemini, cutting manual outreach time and boosting reply rates.",
      "Developed full-stack integrations across LinkedIn, Gemini, and AWS Amplify APIs, using Node.js, Express, and React/TypeScript to support advanced features like personalized comments and history tracking.",
    ],
  },
] as const;

export function Experience() {
  const HEADER = "Experience";

  const [triggered, setTriggered] = useState(false);
  const [typed, setTyped] = useState("");
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    const onReady = () => {
      setTimeout(() => setTriggered(true), 2800);
    };

    window.addEventListener("section:interests-ready", onReady);
    const fallback = setTimeout(() => setTriggered(true), 8500);

    return () => {
      window.removeEventListener("section:interests-ready", onReady);
      clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    if (!triggered) return;
    let i = 0;
    const id = setInterval(() => {
      setTyped(HEADER.slice(0, i + 1));
      i++;
      if (i === HEADER.length) {
        clearInterval(id);
        setTimeout(() => setShowCards(true), 600);
      }
    }, 90);
    return () => clearInterval(id);
  }, [triggered]);

  if (!triggered) return null;

  return (
    <section
      id="experience"
      className="relative flex flex-col items-center justify-center px-6 py-24 sm:px-12"
    >
      {/* Header */}
      <motion.h2
        className="mb-16 text-3xl font-bold text-blue-500 sm:text-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: triggered ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        {typed}
      </motion.h2>

      {/* Timeline container */}
      {showCards && (
        <div className="relative w-full max-w-6xl">
          {/* Central glowing line */}
          <motion.div
            className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2
                       bg-gradient-to-b from-blue-400 via-purple-500 to-yellow-400 opacity-70"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
          />

          {/* Cards */}
          <div className="space-y-20">
            {experiences.map((exp, i) => {
              const fromLeft = i % 2 !== 0; // alternate side for card
              return (
                <motion.div
                  key={i}
                  className="relative w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                    delay: i * 0.3,
                  }}
                >
                  {/* Timeline node */}
                  <motion.div
                    className="absolute left-1/2 top-6 h-3 w-3 -translate-x-1/2 rounded-full bg-blue-400
                               shadow-[0_0_18px_rgba(59,130,246,0.9)]"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.3 }}
                  />

                  {/* Flex wrapper: card + logo */}
                  <div
                    className={`relative sm:w-[70%] w-full flex items-center gap-6
                                ${
                                  fromLeft
                                    ? "sm:ml-0 sm:mr-auto flex-row-reverse"
                                    : "sm:ml-auto sm:mr-0 flex-row"
                                }`}
                  >
                    {/* Logo */}
                    <motion.div
                      initial={{ x: fromLeft ? -80 : 80, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.3 }}
                      className="flex-shrink-0"
                    >
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl border-2 border-blue-400/60 bg-white/10 shadow-md overflow-hidden flex items-center justify-center">
                        <Image
                          src={exp.logo}
                          alt={`${exp.org} logo`}
                          width={112} // matches w-28
                          height={112}
                          className="object-contain w-full h-full"
                        />
                      </div>
                    </motion.div>


                    {/* Experience card */}
                    <motion.div
                      initial={{ x: fromLeft ? 120 : -120, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.3 }}
                      className="rounded-2xl border-2 border-blue-400/70 bg-black/60 p-8
                                 shadow-lg backdrop-blur-md
                                 transition-transform duration-300 hover:scale-[1.03]
                                 hover:shadow-[0_0_40px_rgba(96,165,250,0.7)] w-full"
                    >
                      <h3 className="text-2xl font-semibold text-white">
                        {exp.title}
                      </h3>
                      <p className="text-lg italic text-blue-300">
                        {exp.org} • {exp.date}
                      </p>
                      {exp.bullets?.length ? (
                        <ul className="mt-4 list-disc space-y-2 pl-5 text-lg text-gray-300">
                          {exp.bullets.map((b, j) => (
                            <li key={j}>{b}</li>
                          ))}
                        </ul>
                      ) : null}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
