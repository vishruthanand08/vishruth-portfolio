"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export function About() {
  const HEADER = "About Me";
  const [displayedHeader, setDisplayedHeader] = useState("");
  const [headerVisible, setHeaderVisible] = useState(false);
  const [headerDone, setHeaderDone] = useState(false);

  // Typing effect once section enters viewport
  useEffect(() => {
    if (!headerVisible) return;

    const timeout = setTimeout(() => {
      let i = 0;
      const id = setInterval(() => {
        setDisplayedHeader(HEADER.slice(0, i + 1));
        i++;
        if (i === HEADER.length) {
          clearInterval(id);
          setTimeout(() => setHeaderDone(true), 300); // trigger card fade-in
        }
      }, 100);
      return () => clearInterval(id);
    }, 6000); // wait 7s before typing starts

    return () => clearTimeout(timeout);
  }, [headerVisible]);

  return (
    <section
      id="about"
      className="relative flex flex-col items-center justify-center px-6 -mt-40 pb-16 sm:px-12"
    >
      {/* Typing Header */}
      <motion.h2
        className="absolute -top-25 text-3xl font-bold text-blue-500 sm:text-4xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        onViewportEnter={() => setHeaderVisible(true)}
      >
        {displayedHeader}
      </motion.h2>

      {/* Floating Card (fades in only after header typing) */}
      {headerDone && (
        <motion.div
  className="relative flex max-w-3xl flex-col items-center gap-6 rounded-3xl 
             border border-blue-400 bg-gradient-to-br from-white via-blue-50 to-blue-100 
             p-8 shadow-xl backdrop-blur-md
             dark:border-blue-500 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 
             transition-transform duration-500 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(96,165,250,0.9)]"
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1.5, ease: "easeOut" }}
          whileHover={{
            y: -6,
            boxShadow: "0 0 30px rgba(96,165,250,0.9)",
          }}
        >
          {/* Profile Picture */}
          <Image
            src="/me.jpg"
            alt="Vishruth Anand"
            width={700}
            height={500}
            className="rounded-2xl border border-blue-300 shadow-lg object-cover"
          />

          {/* About Me Text */}
          <p className="mt-6 max-w-2xl text-center text-xl  leading-relaxed tracking-wide text-gray-300 font-inter">
            Hi, I’m Vishruth, a CS major at Georgia Tech with a FinTech minor,
            originally from Arizona. For me, CS is where structure meets freedom,
             it pushes me to think with precision while giving me the space to
            turn ideas into reality. Down the line, I see myself working in SWE
            or quant and eventually launching something of my own.
          </p>
        </motion.div>
      )}
    </section>
  );
}
