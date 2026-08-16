import { Row } from "./Row";

export function Experience() {
  return (
    <section className="sec shell" id="experience">
      <div className="sec__head">
        <span className="t">Experience</span>
      </div>
      <div className="rows">
        <Row
          index="01"
          title="Software Engineer Intern"
          sub="Databricks · Metadata Intelligence (Data Lineage)"
          right="May 2026 – Aug 2026"
          logo={{ src: "/databricks.png", alt: "Databricks" }}
          defaultOpen
        >
          <ul className="bul">
            <li>
              Extended Unity Catalog data lineage from tables to Volumes,
              widening the core abstraction from a table-centric model to a
              generic typed node graph across the event schema, the ingestion
              consumers, and both storage backends.
            </li>
            <li>
              Landed the change as a behavior-identical no-op under a zero-diff
              deploy rule, building the file path and volume layers
              incrementally behind feature flags, with a dual-write path so a
              single event produces both a legacy string-keyed row and a
              UUID-identified graph node, handling volume-to-path fan-out and
              deduplication at ingestion.
            </li>
            <li>
              Moved volume validity enforcement out of consumer-side inference
              and into construction time, establishing a single source of truth
              and reducing the cost of adding future securable types.
            </li>
          </ul>
          <div className="metrics">
            <span className="metric">
              <span className="n">#1</span>
              <span className="l">Requested lineage feature</span>
            </span>
            <span className="metric">
              <span className="n">#6</span>
              <span className="l">Requested Volumes feature</span>
            </span>
          </div>
        </Row>

        <Row
          index="02"
          title="Software Engineering Intern"
          sub="Amazon Web Services · DCV (Desktop Cloud Visualization)"
          right="Summer 2025"
          logo={{ src: "/aws.jpeg", alt: "Amazon Web Services" }}
        >
          <ul className="bul">
            <li>
              Built a high-performance video overlay redirection system for the
              DCV Web Client, supporting multi-monitor setups with 120 FPS
              rendering and 0.15 ms latency.
            </li>
            <li>
              Developed a fault-tolerant communication layer between Chrome
              extension, proxy, and client to keep overlays stable during tab
              detachment and multi-display movement.
            </li>
          </ul>
          <div className="metrics">
            <span className="metric">
              <span className="n">120</span>
              <span className="l">FPS rendering</span>
            </span>
            <span className="metric">
              <span className="n">0.15 ms</span>
              <span className="l">Latency</span>
            </span>
          </div>
        </Row>

        <Row
          index="03"
          title="Undergraduate Machine Learning Researcher"
          sub="Georgia Tech VIP Program · Robotic Musicianship Lab"
          right="Fall 2023 – Fall 2024"
          logo={{ src: "/gt.png", alt: "Georgia Tech" }}
        >
          <ul className="bul">
            <li>
              Built a MuseScore plugin that integrated transformer-based music
              generation, enabling AI-assisted composition with real-time melody
              generation, style transfer, and sequence prediction.
            </li>
            <li>
              Developed large-scale data pipelines and visualization tools,
              working with 550k+ MIDI files, Python, SQL, and transformer models
              to evaluate accuracy, latency, and output diversity.
            </li>
          </ul>
          <div className="metrics">
            <span className="metric">
              <span className="n">550k+</span>
              <span className="l">MIDI files</span>
            </span>
            <span className="metric">
              <span className="n">8+</span>
              <span className="l">SOTA models evaluated</span>
            </span>
          </div>
        </Row>

        <Row
          index="04"
          title="Software Engineering Intern"
          sub="PyPs · Core Product"
          right="Summer 2024"
          logo={{ src: "/pyps.png", alt: "PyPs" }}
        >
          <ul className="bul">
            <li>
              Built and shipped a Chrome extension that automated LinkedIn post
              and comment engagement with Gemini, cutting manual outreach time
              and boosting reply rates.
            </li>
            <li>
              Developed full-stack integrations across LinkedIn, Gemini, and AWS
              Amplify APIs, using Node.js, Express, and React/TypeScript to
              support advanced features like personalized comments and history
              tracking.
            </li>
          </ul>
          <div className="metrics">
            <span className="metric">
              <span className="n">45%</span>
              <span className="l">More business outreach</span>
            </span>
            <span className="metric">
              <span className="n">33%</span>
              <span className="l">Lower model costs</span>
            </span>
          </div>
        </Row>
      </div>
    </section>
  );
}
