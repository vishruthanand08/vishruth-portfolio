"use client";
import Aurora from "./Aurora";


import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NAME = "Vishruth Anand";
const TAGLINE = "Software Engineer • CS @ Georgia Tech";

export function Hero() {
  const [displayedName, setDisplayedName] = useState("");
  const [displayedTagline, setDisplayedTagline] = useState("");
  const [nameDone, setNameDone] = useState(false);

  // --- Name typing ---
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setDisplayedName(NAME.slice(0, i + 1));
      i++;
      if (i === NAME.length) {
        clearInterval(id);
        setTimeout(() => setNameDone(true), 300); // trigger effects
      }
    }, 80);
    return () => clearInterval(id);
  }, []);

  // --- Tagline typing ---
  useEffect(() => {
    if (!nameDone) return;
    let i = 0;
    const id = setInterval(() => {
      setDisplayedTagline(TAGLINE.slice(0, i + 1));
      i++;
      if (i === TAGLINE.length) clearInterval(id);
    }, 50);
    return () => clearInterval(id);
  }, [nameDone]);

  return (
    <section className="relative flex h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Aurora background */}
      <div className="absolute inset-0 -z-10">
        <Aurora
          colorStops={["#3A29FF", "#7cff67", "#5227FF"]}
          amplitude={1.0}
          blend={0.5}
          speed={0.5}
        />
      </div>

      {/* Your Hero content */}
      <div className="relative inline-block z-10">
        {/* Name typing with bounce + glitch */}
        <motion.h1
          className="mb-2 flex items-baseline justify-center text-4xl font-extrabold tracking-tight sm:text-6xl"
          animate={nameDone ? { y: [0, -10, 0] } : {}}
          transition={nameDone ? { duration: 0.5, ease: "easeOut" } : {}}
        >
          {displayedName.split("").map((char, i) => {
            const isGlitchLetter = Math.random() < 0.12;
            return (
              <span key={i} className="relative mx-[1px]">
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0 }}
                  animate={
                    isGlitchLetter
                      ? { opacity: [1, 0.4, 1], x: [0, -2, 2, 0] }
                      : { opacity: 1 }
                  }
                  transition={{
                    delay: i * 0.08,
                    duration: isGlitchLetter ? 0.25 : 0.15,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              </span>
            );
          })}
        </motion.h1>

        {/* Gradient underline with shimmer */}
        {nameDone && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 origin-left rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-yellow-400"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              className="h-1 w-1/4 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-70"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "400%", opacity: [0, 1, 0] }}
              transition={{ duration: 1, delay: 0.6 }}
            />
          </motion.div>
        )}
      </div>

      {/* Tagline typing */}
      {nameDone && (
        <h2 className="mt-6 text-lg font-medium text-blue-600 dark:text-blue-400 sm:text-2xl relative z-10">
          {displayedTagline.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.1 }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h2>
      )}
    </section>
  );
}
