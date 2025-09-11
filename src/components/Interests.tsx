"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Interests() {
  const HEADER = "Interests";
  const [visible, setVisible] = useState(false);
  const [displayedHeader, setDisplayedHeader] = useState("");

  // Delay section until Experience finishes
  useEffect(() => {
    const handler = () => setVisible(true);
    window.addEventListener("section:projects-ready", handler);

    // fallback in case event doesn’t fire
    const fallback = setTimeout(() => setVisible(true), 16000);

    return () => {
      window.removeEventListener("section:projects-ready", handler);
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

        //  Fire event once header typing finishes
        setTimeout(() => {
          window.dispatchEvent(new Event("section:interests-ready"));
        }, 600); // buffer after typing
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

      {/* Card */}
      <motion.div
  className="flex w-full max-w-4xl flex-col items-center gap-8 rounded-3xl 
             border border-blue-400 bg-gradient-to-br from-white via-blue-50 to-blue-100 
             p-8 shadow-xl backdrop-blur-md
             dark:border-blue-500 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900
             transition-transform duration-500 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(96,165,250,0.9)]"
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1.5, ease: "easeOut" }}
>

        {/* Sentence */}
        <p className="max-w-4xl text-center text-xl  leading-relaxed text-gray-700 dark:text-gray-200">
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
    </section>
  );
}
