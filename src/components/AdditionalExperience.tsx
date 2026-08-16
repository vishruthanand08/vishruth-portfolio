import { Row, type RowLogo } from "./Row";

type Entry = {
  title: string;
  sub: string;
  date: string;
  logo: RowLogo;
  bullets: string[];
  metrics?: { n: string; l: string }[];
  links?: { label: string; href: string }[];
};

const entries: Entry[] = [
  {
    title: "WaitWhat",
    sub: "NexHacks 2026 (2x Winner)",
    date: "Jan 2026",
    logo: { src: "/waitwhat.jpeg", alt: "WaitWhat" },
    bullets: [
      "Built a low-latency AI lecture copilot that streams live microphone audio for real-time transcription and in-class LLM Q&A, generating personalized notes, quizzes, and instructor insights.",
      "Engineered a full-stack system (React, Node.js, Convex, LiveKit, Gemini) to process long lecture sessions, detect confusion spikes, extract key concepts, and surface engagement trends.",
      "Designed a transcript chunking + compression pipeline reducing prompt token usage ~70% while preserving real-time responsiveness for extended sessions.",
    ],
    metrics: [{ n: "~70%", l: "Fewer prompt tokens" }],
    links: [
      { label: "Devpost →", href: "https://devpost.com/software/wait-what" },
      { label: "Website →", href: "https://waitwhat.tech" },
    ],
  },
  {
    title: "Code for Good Hackathon",
    sub: "JPMorgan Chase",
    date: "Oct 2025",
    logo: { src: "/jpm.jpeg", alt: "JPMorgan Chase" },
    bullets: [
      "Engineered a full-stack React + Spring Boot platform for International Girls Academy, transforming their outreach with scalable program management and high-engagement learning tools.",
      "Built secure auth, role-based dashboards, personalized course progression, and interactive modules that significantly improved usability for students and staff.",
    ],
  },
  {
    title: "Peer Tutor",
    sub: "Knack, Georgia Tech",
    date: "2023 – Present",
    logo: { src: "/knack.png", alt: "Knack" },
    bullets: [
      "Tutored undergrads in CS and Math courses including DSA, Linear Algebra, and OOP.",
      "Completed 300+ hours of one-on-one sessions with 4.98/5 rating.",
    ],
    metrics: [
      { n: "300+", l: "Hours" },
      { n: "4.98/5", l: "Rating" },
    ],
  },
  {
    title: "Grand Treasurer",
    sub: "Kappa Sigma Fraternity",
    date: "Nov 2024 – Present",
    logo: { src: "/kss.png", alt: "Kappa Sigma" },
    bullets: [
      "Manage six-figure budgets, dues, and tax filings for 100+ members.",
      "Develop policies to optimize cash flow and sustain chapter growth.",
    ],
  },
  {
    title: "Research Intern",
    sub: "KEYS Program, University of Arizona",
    date: "Summer 2022",
    logo: { src: "/keys.jpeg", alt: "KEYS Program" },
    bullets: [
      "Conducted hippocampal subfield analysis on MRI scans of neurotypical and Down syndrome youth using ITK-Snap and R.",
      "Contributed to a forthcoming publication and presented results at the AZBio Awards, gaining experience in neuroimaging, data analysis, and scientific communication.",
    ],
    links: [
      { label: "View Poster →", href: "/poster.pdf" },
      {
        label: "Watch Video →",
        href: "https://www.youtube.com/watch?v=Ylt5RcG_9q4",
      },
    ],
  },
  {
    title: "Workshop Lead & Teaching Assistant",
    sub: "East Valley Yamaha Music School",
    date: "Jan 2021 – May 2023",
    logo: { src: "/yamaha.png", alt: "Yamaha Music School" },
    bullets: [
      "Assisted weekly classes and workshops in piano and music theory.",
      "Helped prepare students for grade exams through guided practice and group sessions.",
    ],
  },
  {
    title: "Teacher & Grader",
    sub: "Best Brains Learning Center",
    date: "Dec 2021 – Mar 2023",
    logo: { src: "/bb.jpeg", alt: "Best Brains" },
    bullets: [
      "Supported instructors by grading assignments and organizing classroom activities.",
      "Reinforced lessons in math and English while tracking student progress.",
    ],
  },
];

export function AdditionalExperience() {
  return (
    <section className="sec shell" id="additional">
      <div className="sec__head">
        <span className="t">Additional Experience</span>
      </div>
      <div className="rows">
        {entries.map((entry, i) => (
          <Row
            key={entry.title}
            index={String(i + 1).padStart(2, "0")}
            title={entry.title}
            sub={entry.sub}
            right={entry.date}
            logo={entry.logo}
          >
            <ul className="bul">
              {entry.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            {entry.metrics ? (
              <div className="metrics">
                {entry.metrics.map((metric) => (
                  <span className="metric" key={metric.l}>
                    <span className="n">{metric.n}</span>
                    <span className="l">{metric.l}</span>
                  </span>
                ))}
              </div>
            ) : null}
            {entry.links ? (
              <div className="row__foot">
                {entry.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ) : null}
          </Row>
        ))}
      </div>
    </section>
  );
}
