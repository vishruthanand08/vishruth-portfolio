"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Interests() {
  const HEADER = "Interests";
  const [visible, setVisible] = useState(false);
  const [displayedHeader, setDisplayedHeader] = useState("");
  const [showCard, setShowCard] = useState(false); // 👈 new state

  // Delay section until AdditionalExperience finishes
  useEffect(() => {
    const handler = () => {
      setTimeout(() => setVisible(true), 500); 
    };
    window.addEventListener("section:additional-experience-ready", handler);

    const fallback = setTimeout(() => setVisible(true), 21000);

    return () => {
      window.removeEventListener("section:additional-experience-ready", handler);
      clearTimeout(fallback);
    };
  }, []);

  // Typing animation for header
  useEffect(() => {
    if (!visible) return;
    let i = 0;
    const id = setInterval(() => {
      setDisplayedHeader(HEADER.slice(0, i + 1));
      i++;
      if (i === HEADER.length) {
        clearInterval(id);

        // Fire event once header typing finishes
        setTimeout(() => {
          window.dispatchEvent(new Event("section:interests-ready"));
        }, 600);

        // 👇 delay showing the card by 2 seconds after typing
        setTimeout(() => {
          setShowCard(true);
        }, 800);
      }
    }, 100);
    return () => clearInterval(id);
  }, [visible]);

  if (!visible) return null;

  return (
    <section
      id="interests"
      className="relative flex w-full flex-col items-center justify-center px-6 py-20 sm:px-12"
    >
      {/* Header */}
      <motion.h2
        className="mb-15 text-3xl font-bold text-blue-500 sm:text-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {displayedHeader}
      </motion.h2>

      {/* Card (only shows after delay) */}
      {showCard && (
        <motion.div
          className="relative flex max-w-3xl flex-col items-center gap-6 rounded-3xl 
                     border border-blue-500/30 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 
                     p-8 shadow-xl backdrop-blur-md
                     transition-transform duration-500 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(96,165,250,0.6)]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {/* Sentence */}
          <p className="max-w-4xl text-center text-xl leading-relaxed text-gray-100 dark:text-gray-500">
            Outside of CS, I stay active with lifting, basketball, pickleball, and hiking, and keep creative through Carnatic music, piano, and DJing.
          </p>

          {/* Image Grid */}
          <div className="grid w-full grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-xl border border-blue-300 shadow-md">
              <Image
                src="/hiking.jpg"
                alt="Hiking"
                width={500}
                height={400}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="overflow-hidden rounded-xl border border-blue-300 shadow-md">
              <Image
                src="/piano.jpg"
                alt="Piano"
                width={500}
                height={400}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="overflow-hidden rounded-xl border border-blue-300 shadow-md">
              <Image
                src="/running.jpg"
                alt="Running"
                width={500}
                height={400}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="overflow-hidden rounded-xl border border-blue-300 shadow-md">
              <Image
                src="/dj.jpg"
                alt="DJing"
                width={500}
                height={400}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
