import { Row } from "./Row";

type Project = {
  title: string;
  sub: string;
  description: string;
  /** Italic muted aside rendered under the description. */
  note?: string;
  metrics?: { n: string; l: string }[];
  links?: { label: string; href: string }[];
};

const projects: Project[] = [
  {
    title: "Hidden Markov Models for Dynamic Portfolio Optimization",
    sub: "Python · HMM · PCA · Quant Research",
    description:
      "Developed a portfolio optimization framework using Hidden Markov Models to detect latent market regimes from engineered financial features. Built a walk-forward machine learning pipeline with PCA-based dimensionality reduction and regime-aware mean-variance optimization to dynamically rebalance ETF portfolios. Evaluated over 84,000+ strategy configurations across a 14-year out-of-sample backtest, validating improved risk-adjusted performance and reduced downside risk through robust regime-aware asset allocation.",
    note: "Received funding to implement this strategy from Georgia Tech’s Investments Decision Group.",
    metrics: [
      { n: "84,000+", l: "Configurations" },
      { n: "14 yr", l: "Out-of-sample backtest" },
    ],
    links: [{ label: "Whitepaper →", href: "/hmm.pdf" }],
  },
  {
    title: "IV Skew Trading Strategy",
    sub: "Python · Pandas · Scikit-learn · Quant Finance",
    description:
      "A statistical arbitrage project using volatility skew and VIX term structure to forecast SPY returns. Combined rule-based signals with logistic regression in a volatility-targeted framework.",
    links: [
      {
        label: "View Project →",
        href: "https://github.com/vishruthanand08/iv-skew-trading-strategy",
      },
      { label: "View Paper →", href: "/spy.pdf" },
    ],
  },
  {
    title: "Overnight Volatility Forecasting",
    sub: "Python · Pandas · Statsmodels · GARCH · Quant Research",
    description:
      "A quantitative research project analyzing whether overnight price gaps predict next-day realized volatility in SPY. Includes 20 years of data, volatility estimators, OLS regression, GARCH modeling, and rolling correlation analysis.",
    links: [
      {
        label: "View Project →",
        href: "https://github.com/vishruthanand08/overnight-return-volatility",
      },
      { label: "View Paper →", href: "/overnight.pdf" },
    ],
  },
  {
    title: "Spotify Song Success Prediction",
    sub: "Python · XGBoost · Scikit-learn · Data Preprocessing",
    description:
      "Machine learning project predicting chart longevity of Spotify Top 50 songs using audio features and YouTube engagement data. Built preprocessing pipelines, engineered collaboration and virality features, and trained models including XGBoost.",
    links: [
      {
        label: "View Project →",
        href: "https://github.com/vishruthanand08/Spotify-Success-Prediction",
      },
      { label: "View Paper →", href: "/report.pdf" },
    ],
  },
  {
    title: "Freelancer Escrow Smart Contract",
    sub: "Solidity · Hardhat · Ethers.js · IPFS",
    description:
      "A decentralized Ethereum contract for milestone-based payments between clients and freelancers. Includes trustless escrow deposits, IPFS-linked milestones, and mediator-based dispute resolution.",
    links: [
      {
        label: "View Project →",
        href: "https://github.com/vishruthanand08/freelancer-escrow",
      },
    ],
  },
  {
    title: "The Walk of Fire",
    sub: "C · Game Boy Advance · State Machines · Docker",
    description:
      "A Game Boy Advance adventure written in C where players guide their soul through waves of fire to reach salvation. Features dynamic fireball patterns, karma-based scoring, and an unlockable Impossible Mode.",
    links: [
      {
        label: "View Project →",
        href: "https://github.com/vishruthanand08/walk-of-fire-gba",
      },
    ],
  },
  {
    title: "GreenPlate",
    sub: "Java · Android Studio · Firebase · UI/UX",
    description:
      "An Android app that helps people manage meals, recipes, and pantry items with real-time syncing and a clean, interactive design.",
    links: [
      {
        label: "View Project →",
        href: "https://github.com/riapat/CS2340A_Team13",
      },
    ],
  },
];

export function Projects() {
  return (
    <section className="sec shell" id="projects">
      <div className="sec__head">
        <span className="t">Projects</span>
      </div>
      <div className="rows">
        {projects.map((project, i) => (
          <Row
            key={project.title}
            index={String(i + 1).padStart(2, "0")}
            title={project.title}
            sub={project.sub}
          >
            <p className="prose">{project.description}</p>
            {project.note ? (
              <p className="prose">
                <span className="note">{project.note}</span>
              </p>
            ) : null}
            {project.metrics ? (
              <div className="metrics">
                {project.metrics.map((metric) => (
                  <span className="metric" key={metric.l}>
                    <span className="n">{metric.n}</span>
                    <span className="l">{metric.l}</span>
                  </span>
                ))}
              </div>
            ) : null}
            {project.links ? (
              <div className="row__foot">
                {project.links.map((link) => (
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
