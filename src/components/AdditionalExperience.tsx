"use client";

import { motion, useMotionValue } from "framer-motion";
import { useState, useEffect } from "react";

interface CardRotateProps {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
}

function CardRotate({ children, onSendToBack, sensitivity }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  function handleDragEnd(_: never, info: { offset: { x: number; y: number } }) {
    if (
      Math.abs(info.offset.x) > sensitivity ||
      Math.abs(info.offset.y) > sensitivity
    ) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className="absolute cursor-grab"
      style={{ x, y }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.5}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

export default function AdditionalExperience() {
  const [visible, setVisible] = useState(false);
  const [typedHeader, setTypedHeader] = useState("");

  // Trigger only AFTER projects section
  useEffect(() => {
    const handler = () => setVisible(true);
    window.addEventListener("section:projects-ready", handler);
    return () => window.removeEventListener("section:projects-ready", handler);
  }, []);

  // Typing effect for header + dispatch ready event
  useEffect(() => {
    if (!visible) return;
    const HEADER = "Additional Experience";
    let i = 0;
    const id = setInterval(() => {
      setTypedHeader(HEADER.slice(0, i + 1));
      i++;
      if (i === HEADER.length) {
        clearInterval(id);
        setTimeout(() => {
          window.dispatchEvent(new Event("section:additional-experience-ready"));
        }, 600);
      }
    }, 90);
    return () => clearInterval(id);
  }, [visible]);

  const [cards, setCards] = useState([
    {
      id: 1,
      title: "Research Intern",
      org: "KEYS Program, University of Arizona",
      date: "Summer 2022",
      bullets: [
        "Conducted hippocampal subfield analysis on MRI scans of neurotypical and Down syndrome youth using ITK-Snap and R.",
        "Contributed to a forthcoming publication and presented results at the AZBio Awards, gaining experience in neuroimaging, data analysis, and scientific communication.",
      ],
      logo: "/keys.jpeg",
      links: [
        { label: "View Poster →", href: "/poster.pdf" },
        { label: "Watch Video →", href: "https://www.youtube.com/watch?v=Ylt5RcG_9q4" },
      ],
    },
    {
      id: 2,
      title: "Workshop Lead & Teaching Assistant",
      org: "East Valley Yamaha Music School",
      date: "Jan 2021 – May 2023",
      bullets: [
        "Assisted weekly classes and workshops in piano and music theory.",
        "Helped prepare students for grade exams through guided practice and group sessions.",
      ],
      logo: "/yamaha.png",
    },
    {
      id: 3,
      title: "Teacher & Grader",
      org: "Best Brains Learning Center",
      date: "Dec 2021 – Mar 2023",
      bullets: [
        "Supported instructors by grading assignments and organizing classroom activities.",
        "Reinforced lessons in math and English while tracking student progress.",
      ],
      logo: "/bb.jpeg",
    },
    {
      id: 4,
      title: "Peer Tutor",
      org: "Knack, Georgia Tech",
      date: "2023 – Present",
      bullets: [
        "Tutored undergrads in CS and Math courses including DSA, Linear Algebra, and OOP.",
        "Completed 300+ hours of one-on-one sessions with 4.98/5 rating.",
      ],
      logo: "/knack.png",
    },
    {
      id: 5,
      title: "Grand Treasurer",
      org: "Kappa Sigma Fraternity",
      date: "Nov 2024 – Present",
      bullets: [
        "Manage six-figure budgets, dues, and tax filings for 100+ members.",
        "Develop policies to optimize cash flow and sustain chapter growth.",
      ],
      logo: "/kss.png",
    },
  ]);

  const sendToBack = (id: number) => {
    setCards((prev) => {
      const newCards = [...prev];
      const index = newCards.findIndex((card) => card.id === id);
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card);
      return newCards;
    });
  };

  if (!visible) return null;

  return (
    <section
      id="additional-experience"
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

      {/* Card Stack */}
      <div
        className="relative flex flex-col items-center"
        style={{
          width: 700,
          height: 600, // shorter height to reduce whitespace
          perspective: 1200,
        }}
      >
        {cards.map((card, index) => (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={200}
          >
            <motion.div
              className="rounded-2xl border-2 border-purple-500/70 bg-black p-10 shadow-lg text-white hover:shadow-[0_0_60px_rgba(59,130,246,0.9)] flex flex-col justify-between"
              animate={{
                scale: 1 + index * 0.02 - cards.length * 0.02,
                y: index * 12,
              }}
              initial={false}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              style={{
                width: 700,
                height: 600,
              }}
            >
              <div>
                <h3 className="text-4xl font-bold mb-6">{card.title}</h3>
                <p className="text-xl italic text-blue-300 mb-8">
                  {card.org} • {card.date}
                </p>
                <ul className="list-disc space-y-4 pl-6 text-xl text-gray-200 leading-relaxed">
                  {card.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>

              {/* Logo + Links */}
              <div className="mt-10 flex flex-col items-center justify-center gap-6">
                {card.logo && (
                  <img
                    src={card.logo}
                    alt={`${card.org} logo`}
                    className="h-39 w-auto object-contain mx-auto"
                  />
                )}
                {card.links && (
                  <div className="flex gap-12">
                    {card.links.map((link, i) => (
                      <a
                        key={i}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl font-bold text-blue-400 hover:text-blue-200 transition"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </CardRotate>
        ))}

        {/* Drag Hint */}
        <motion.p
          className="absolute -bottom-18 text-gray-400 text-2xl italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        >
          ↔ drag to explore
        </motion.p>
      </div>
    </section>
  );
}
