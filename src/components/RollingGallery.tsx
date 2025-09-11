"use client";
import React, { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useAnimation,
  PanInfo,
  ResolvedValues,
} from "motion/react";

const projects = [
  {
    title: "GreenPlate",
    description:
      "An Android app that helps people manage meals, recipes, and pantry items with real-time syncing and a clean, interactive design.",
    skills: ["Java", "Android Studio", "Firebase", "UI/UX"],
    link: "https://github.com/vishruthanand08/GreenPlate",
  },
  {
    title: "Freelancer Escrow Smart Contract",
    description:
      "A decentralized Ethereum contract for milestone-based payments between clients and freelancers. Includes trustless escrow deposits, IPFS-linked milestones, and mediator-based dispute resolution.",
    skills: ["Solidity", "Hardhat", "Ethers.js", "IPFS"],
    link: "https://github.com/vishruthanand08/freelancer-escrow",
  },
  {
    title: "IV Skew Trading Strategy",
    description:
      "A statistical arbitrage project using volatility skew and VIX term structure to forecast SPY returns. Combined rule-based signals with logistic regression in a volatility-targeted framework.",
    skills: ["Python", "Pandas", "Scikit-learn", "Quant Finance"],
    link: "https://github.com/vishruthanand08/iv-skew-trading-strategy",
  },
  {
    title: "The Walk of Fire",
    description:
      "A Game Boy Advance adventure written in C where players guide their soul through waves of fire to reach salvation. Features dynamic fireball patterns, karma-based scoring, and an unlockable Impossible Mode.",
    skills: ["C", "Game Boy Advance", "State Machines", "Docker"],
    link: "https://github.com/vishruthanand08/walk-of-fire-gba",
  },
  {
    title: "Spotify Song Success Prediction",
    description:
      "Machine learning project predicting chart longevity of Spotify Top 50 songs using audio features and YouTube engagement data. Built preprocessing pipelines, engineered collaboration and virality features, and trained models including XGBoost.",
    skills: ["Python", "XGBoost", "Scikit-learn", "Data Preprocessing"],
      link: "https://github.com/vishruthanand08/Spotify-Success-Prediction",
      paper: "/report.pdf",
  },
];

const RollingGallery: React.FC = () => {
  const HEADER = "Projects";

  const [visible, setVisible] = useState(false);
  const [typedHeader, setTypedHeader] = useState("");
  const [showGallery, setShowGallery] = useState(false);

  // wait until Experience finishes
  useEffect(() => {
    const handler = () => setVisible(true);
    window.addEventListener("section:experience-ready", handler);
    const fallback = setTimeout(() => setVisible(true), 12000);
    return () => {
      window.removeEventListener("section:experience-ready", handler);
      clearTimeout(fallback);
    };
  }, []);

  // type header then reveal gallery (+ notify Interests)
  useEffect(() => {
    if (!visible) return;
    let i = 0;
    const id = setInterval(() => {
      setTypedHeader(HEADER.slice(0, i + 1));
      i++;
      if (i === HEADER.length) {
        clearInterval(id);
        setTimeout(() => {
          setShowGallery(true);
          window.dispatchEvent(new Event("section:projects-ready"));
        }, 600);
      }
    }, 90);
    return () => clearInterval(id);
  }, [visible]);

  // 3D gallery logic
  const [isScreenSizeSm, setIsScreenSizeSm] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 600);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cylinderWidth = isScreenSizeSm ? 1100 : 2000;
  const faceCount = projects.length;
  const faceWidth = (cylinderWidth / faceCount) * 1.4;
  const radius = cylinderWidth / (2 * Math.PI);

  const dragFactor = 0.01;
  const rotation = useMotionValue(0);
  const controls = useAnimation();

  const startInfiniteSpin = (startAngle: number) => {
    controls.start({
      rotateY: [startAngle, startAngle - 360],
      transition: { duration: 25, ease: "linear", repeat: Infinity },
    });
  };

  // start spin when gallery mounts
  useEffect(() => {
    if (showGallery) startInfiniteSpin(0);
  }, [showGallery]);

  const handleUpdate = (latest: ResolvedValues) => {
    if (typeof latest.rotateY === "number") rotation.set(latest.rotateY);
  };
  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    controls.stop();
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const finalAngle = rotation.get() + info.velocity.x * dragFactor;
    rotation.set(finalAngle);
    startInfiniteSpin(finalAngle);
  };

  if (!visible) return null;

  return (
    <section
      id="projects"
      className="relative flex flex-col items-center justify-center px-6 py-24 sm:px-12"
    >
      {/* Header */}
      <motion.h2
        className="mb-16 text-3xl font-bold text-blue-500 sm:text-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        {typedHeader}
      </motion.h2>

      {/* Gallery */}
      {showGallery && (
        <div className="relative h-[550px] w-full overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-[48px] z-10 bg-gradient-to-l from-transparent to-[#060010]" />
          <div className="absolute top-0 right-0 h-full w-[48px] z-10 bg-gradient-to-r from-transparent to-[#060010]" />

          <div className="flex h-full items-center justify-center [perspective:1400px]">
            <motion.div
              dragListener={false}        
              onPan={handleDrag}          
              onPanEnd={handleDragEnd}
              animate={controls}
              onUpdate={handleUpdate}
              style={{
                rotateY: rotation,
                width: cylinderWidth,
                transformStyle: "preserve-3d",
              }}
              className="flex min-h-[200px] cursor-grab items-center justify-center [transform-style:preserve-3d]"
            >
              {projects.map((project, i) => (
                <div
                  key={i}
                  className="group absolute flex h-fit items-center justify-center [backface-visibility:hidden]"
                  style={{
                    width: `${faceWidth}px`,
                    transform: `rotateY(${(360 / faceCount) * i}deg) translateZ(${radius}px)`,
                  }}
                >
                  {/* Fade + slide on the INNER card only (no transform conflicts) */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: i * 0.15 }}
                    className="w-[500px] sm:w-[400px] bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-10 text-left shadow-xl transition-transform duration-300 ease-out group-hover:scale-105"
                  >
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-300 mb-3 max-w-sm">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-indigo-500/30 to-purple-500/30 text-indigo-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-sm font-medium text-indigo-300 hover:text-indigo-100 transition"
                      >
                        View Project →
                      </a>

                      {project.paper && (
                        <a
                          href={project.paper}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block text-sm font-medium text-purple-300 hover:text-purple-100 transition"
                        >
                          View Paper →
                        </a>
                      )}
                    </div>

                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RollingGallery;
