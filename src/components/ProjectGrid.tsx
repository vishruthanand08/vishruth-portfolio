"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const projects = [
  {
    title: "Freelancer Escrow Smart Contract",
    description:
      "A decentralized Ethereum contract for milestone-based payments between clients and freelancers. Includes trustless escrow deposits, IPFS-linked milestones, and mediator-based dispute resolution.",
    skills: ["Solidity", "Hardhat", "Ethers.js", "IPFS"],
    link: "https://github.com/vishruthanand08/freelancer-escrow",
  },
  {
    title: "GreenPlate",
    description:
      "An Android app that helps people manage meals, recipes, and pantry items with real-time syncing and a clean, interactive design.",
    skills: ["Java", "Android Studio", "Firebase", "UI/UX"],
    link: "https://github.com/riapat/CS2340A_Team13",
  },
  {
    title: "IV Skew Trading Strategy",
    description:
      "A statistical arbitrage project using volatility skew and VIX term structure to forecast SPY returns. Combined rule-based signals with logistic regression in a volatility-targeted framework.",
    skills: ["Python", "Pandas", "Scikit-learn", "Quant Finance"],
    link: "https://github.com/vishruthanand08/iv-skew-trading-strategy",
    paper: "/spy.pdf",
  },
  {
    title: "Overnight Volatility Forecasting",
    description:
      "A quantitative research project analyzing whether overnight price gaps predict next-day realized volatility in SPY. Includes 20 years of data, volatility estimators, OLS regression, GARCH modeling, and rolling correlation analysis.",
    skills: ["Python", "Pandas", "Statsmodels", "GARCH", "Quant Research"],
    link: "https://github.com/vishruthanand08/overnight-return-volatility",
    paper: "/overnight.pdf",
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

export default function ProjectsGrid() {
  const HEADER = "Projects";
  const [visible, setVisible] = useState(false);
  const [typedHeader, setTypedHeader] = useState("");
  const [showGrid, setShowGrid] = useState(false);

  useEffect(() => {
    const handler = () => {
      setTimeout(() => setVisible(true), 1500);
    };
    window.addEventListener("section:experience-ready", handler);

    const fallback = setTimeout(() => setVisible(true), 12000);

    return () => {
      window.removeEventListener("section:experience-ready", handler);
      clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    let i = 0;
    const id = setInterval(() => {
      setTypedHeader(HEADER.slice(0, i + 1));
      i++;
      if (i === HEADER.length) {
        clearInterval(id);
        setTimeout(() => {
          setShowGrid(true);
          window.dispatchEvent(new Event("section:projects-ready"));
        }, 600);
      }
    }, 90);
    return () => clearInterval(id);
  }, [visible]);

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

      {/* Unified Grid */}
      {showGrid && (
        <div className="w-full max-w-7xl xl:ml-24"> 
          {/* SHIFT RIGHT on desktop to avoid sidebar overlap */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative rounded-2xl border-2 border-purple-500/70 
                           shadow-[0_0_25px_rgba(168,85,247,0.8)] bg-black/50 p-8 backdrop-blur-md 
                           flex flex-col justify-between hover:shadow-[0_0_40px_rgba(59,130,246,0.9)] 
                           transition-shadow w-full max-w-[380px] min-h-[320px]"
              >
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {project.title}
                </h3>

                <p className="text-lg text-gray-300 mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-sm rounded-full bg-purple-600/30 text-purple-200 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex gap-6">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-blue-400 hover:text-blue-200 transition"
                  >
                    View Project →
                  </a>

                  {project.paper && (
                    <a
                      href={project.paper}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-blue-400 hover:text-blue-200 transition"
                    >
                      View Paper →
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
