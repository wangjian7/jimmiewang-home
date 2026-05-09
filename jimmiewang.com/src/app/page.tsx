"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";

type ViewMode = "ledger" | "astral";

type Experience = {
  id: string;
  year: number;
  startYear: number;
  endYear: number;
  period: string;
  durationYears: number;
  code: string;
  role: string;
  company: string;
  location: string;
  scope: string;
  summary: string[];
  highlight?: string;
  astralTitle: string;
  astralAccent: string;
};

const experiences: Experience[] = [
  {
    id: "ibm-tech",
    year: 2006,
    startYear: 2006,
    endYear: 2011,
    period: "2006.07 - 2011.09",
    durationYears: 5.2,
    code: "I-2006.7",
    role: "Global Technology Support",
    company: "IBM",
    location: "",
    scope: "Technical support delivery for Japan and Australia projects",
    summary: [
      "Japan. Australia. Support work with a passport mindset.",
      "Nikon, Komatsu, SMBC. Enterprise clients, sharp edges, zero drama.",
      "Learned early how to debug across borders and keep large systems civilized.",
    ],
    highlight: "Early signal: global support, operator instinct, and a taste for technical elegance.",
    astralTitle: "Blue Origin",
    astralAccent: "Japan / Australia support",
  },
  {
    id: "sap-support",
    year: 2011,
    startYear: 2011,
    endYear: 2015,
    period: "2011.09 - 2015.12",
    durationYears: 4.3,
    code: "S-2011.9",
    role: "Active Global Support",
    company: "SAP",
    location: "",
    scope: "Technical consulting and global customer support across Europe, the Americas, Central America, and Oceania",
    summary: [
      "Europe to Oceania. Germany, France, the US, Mexico, Australia, Switzerland. A wide support map.",
      "Corona, Budweiser, Lindt, GM. Different industries, same demand: clarity under pressure.",
      "Technical consulting at global scale, with enterprise tempo and cross-region rhythm.",
    ],
    highlight: "Less help desk, more global control room.",
    astralTitle: "Support Orbit",
    astralAccent: "Global consulting support",
  },
  {
    id: "ant-tech",
    year: 2015,
    startYear: 2015,
    endYear: 2017,
    period: "2015.12 - 2017.10",
    durationYears: 1.8,
    code: "A-2015.12",
    role: "Technology Department",
    company: "Ant Financial",
    location: "",
    scope: "Trillion-scale data processing, big data analytics, and platform monitoring",
    summary: [
      "Trillion-scale data. Big data pipelines. No small numbers, no sleepy systems.",
      "Merchant rails and transaction monitoring, always close to the pulse.",
      "Built a real appetite for telemetry, signal, and platforms that talk in real time.",
    ],
    highlight: "Where fintech stopped being abstract and became infrastructure.",
    astralTitle: "Ant Pulse",
    astralAccent: "Fintech systems",
  },
  {
    id: "mastercard-tech",
    year: 2017,
    startYear: 2017,
    endYear: 2026,
    period: "2017.10 - Present",
    durationYears: 8.6,
    code: "M-2017.10",
    role: "Technology Department",
    company: "Mastercard",
    location: "",
    scope: "Domestic switching and clearing system design, large-scale web delivery, and technical leadership",
    summary: [
      "Designed Mastercard's first domestic switching and clearing system. Heavy-metal architecture.",
      "Led a 50-person team and shipped the full web estate around it.",
      "Payment rails, delivery pressure, and enough moving parts to stay interesting.",
    ],
    highlight: "System design with leadership bandwidth. Less slideware, more launch.",
    astralTitle: "Global Nexus",
    astralAccent: "Global payments",
  },
  {
    id: "nucc-tech",
    year: 2024,
    startYear: 2024,
    endYear: 2026,
    period: "2024 - Present",
    durationYears: 2.0,
    code: "N-2024.0",
    role: "Technology Department",
    company: "NUCC",
    location: "",
    scope: "Switching and clearing system launch assurance, optimization, and ongoing platform improvement",
    summary: [
      "Same clearing bloodline, different chapter: launch, stabilize, iterate.",
      "Took the system live, kept it clean, and tuned it under real traffic.",
      "Post-launch work meant performance, reliability, and the quiet art of continuous improvement.",
    ],
    highlight: "Not just go-live. Stay-live.",
    astralTitle: "Clearing Beacon",
    astralAccent: "Launch and optimization",
  },
];

export default function Home() {
  const [viewMode, setViewMode] = useState<ViewMode>("ledger");
  const years = useMemo(
    () => [...new Set(experiences.map((item) => item.year))].sort((a, b) => a - b),
    [],
  );
  const [activeYear, setActiveYear] = useState<number>(experiences[0].year);
  const [selectedExperienceId, setSelectedExperienceId] = useState<string>(experiences[0].id);

  useEffect(() => {
    if (viewMode !== "ledger") {
      return;
    }

    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-year]"));

    if (!sections.length) {
      return;
    }

    const updateActiveYear = () => {
      const viewportAnchor = window.innerHeight * 0.38;
      let closestYear = experiences[0].year;
      let closestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section) => {
        const year = Number(section.dataset.year);
        const rect = section.getBoundingClientRect();
        const sectionAnchor = rect.top + rect.height * 0.35;
        const distance = Math.abs(sectionAnchor - viewportAnchor);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestYear = year;
        }
      });

      setActiveYear((previous) => (previous === closestYear ? previous : closestYear));
    };

    updateActiveYear();
    window.addEventListener("scroll", updateActiveYear, { passive: true });
    window.addEventListener("resize", updateActiveYear);

    return () => {
      window.removeEventListener("scroll", updateActiveYear);
      window.removeEventListener("resize", updateActiveYear);
    };
  }, [viewMode]);

  const activeIndex = Math.max(years.indexOf(activeYear), 0);
  const stats = [
    {
      value: `${Math.floor(experiences.reduce((total, item) => total + item.durationYears, 0))}+`,
      label: "YEARS",
    },
    { value: String(new Set(experiences.map((item) => item.company)).size).padStart(2, "0"), label: "COMPANIES" },
    { value: String(experiences.length).padStart(2, "0"), label: "CHAPTERS" },
  ];
  const pointerClasses = [
    styles.pointer0,
    styles.pointer1,
    styles.pointer2,
    styles.pointer3,
    styles.pointer4,
  ];
  const pointerClass = pointerClasses[activeIndex] ?? styles.pointer0;
  const selectedExperience =
    experiences.find((item) => item.id === selectedExperienceId) ?? experiences[0];
  const orbitPositionClasses = [
    styles.orbit0,
    styles.orbit1,
    styles.orbit2,
    styles.orbit3,
    styles.orbit4,
  ];
  const orbitLabelClasses = [
    styles.orbitLabel0,
    styles.orbitLabel1,
    styles.orbitLabel2,
    styles.orbitLabel3,
    styles.orbitLabel4,
  ];
  const orbitToneClasses = [
    styles.orbitTone0,
    styles.orbitTone1,
    styles.orbitTone2,
    styles.orbitTone3,
    styles.orbitTone4,
  ];
  const durationRange = useMemo(() => {
    const durations = experiences.map((item) => item.durationYears);

    return {
      min: Math.min(...durations),
      max: Math.max(...durations),
    };
  }, []);

  const formatCompanyMeta = (company: string, location: string) => {
    return location ? `${company} · ${location}` : company;
  };

  const getOrbSizeStyle = (durationYears: number): CSSProperties => {
    const { min, max } = durationRange;

    if (max === min) {
      return {
        "--orb-size": "132px",
        "--orb-size-mobile": "102px",
      } as CSSProperties;
    }

    const ratio = (durationYears - min) / (max - min);
    const desktopSize = 88 + ratio * 104;
    const mobileSize = 74 + ratio * 72;

    return {
      "--orb-size": `${desktopSize.toFixed(1)}px`,
      "--orb-size-mobile": `${mobileSize.toFixed(1)}px`,
    } as CSSProperties;
  };

  return (
    <div className={viewMode === "astral" ? `${styles.page} ${styles.pageAstral}` : styles.page}>
      <main className={viewMode === "astral" ? `${styles.shell} ${styles.shellAstral}` : styles.shell}>
        <header className={styles.topbar}>
          <div className={styles.identity}>
            <span className={styles.ring} aria-hidden="true" />
            <span className={styles.crumb}>Portfolio</span>
            <span className={styles.separator}>/</span>
            <span className={styles.crumb}>
              {viewMode === "ledger" ? "Experience Ledger" : "Astral voyager"}
            </span>
            <span className={styles.separator}>/</span>
            <strong className={styles.name}>Jimmie Wang</strong>
          </div>
          <div className={styles.toolbar}>
            <div className={styles.modeSwitch} aria-label="Choose experience view">
              <button
                type="button"
                className={viewMode === "ledger" ? `${styles.modeButton} ${styles.modeButtonActive}` : styles.modeButton}
                onClick={() => setViewMode("ledger")}
              >
                Experience Ledger
              </button>
              <button
                type="button"
                className={viewMode === "astral" ? `${styles.modeButton} ${styles.modeButtonActive}` : styles.modeButton}
                onClick={() => setViewMode("astral")}
              >
                Astral voyager
              </button>
            </div>
            <button type="button" className={styles.statusPill} aria-label="Current viewing mode">
              {viewMode === "ledger" ? "Chronicle view online" : "Syncing stellar archive"}
            </button>
          </div>
        </header>

        {viewMode === "ledger" ? (
          <>
            <section className={styles.hero}>
              <div>
                <p className={styles.kicker}>Chronicle Grid</p>
                <h1 className={styles.title}>Jimmie&apos;s Ledger</h1>
              </div>
              <p className={styles.lead}>
                A quiet record of systems, scale, and long-range technical work. Precise on time. Light on noise.
              </p>
            </section>

            <section className={styles.table} aria-label="Resume timeline">
              {experiences.map((item) => (
                <article key={item.year} className={styles.row} data-year={item.year}>
                  <div className={styles.yearCell}>
                    <span className={styles.year}>{item.year}</span>
                  </div>
                  <div className={styles.roleCell}>
                    <span className={styles.dot} aria-hidden="true" />
                    <div>
                      <h2 className={styles.role}>{item.role}</h2>
                      <p className={styles.meta}>
                        {formatCompanyMeta(item.company, item.location)}
                      </p>
                      <p className={styles.scope}>{item.scope}</p>
                    </div>
                  </div>
                  <div className={styles.contentCell}>
                    {item.summary.map((line) => (
                      <p key={line} className={styles.summary}>
                        {line}
                      </p>
                    ))}
                    {item.highlight ? <p className={styles.highlight}>{item.highlight}</p> : null}
                  </div>
                </article>
              ))}
            </section>
            <div className={styles.scrollTail} aria-hidden="true" />
          </>
        ) : (
          <section className={styles.astralLayout} aria-label="Astral voyager experience map">
            <div className={styles.spacePanel}>
              <div className={styles.astralCopy}>
                <p className={styles.astralSystem}>System.04 // Dream Matrix</p>
                <h1 className={styles.astralHeading}>Astral voyager</h1>
                <p className={styles.astralLead}>
                  A darker ledger of systems, gravity, and signal. Tenure becomes mass. Motion stays precise.
                </p>
              </div>

              <svg className={styles.constellation} viewBox="0 0 1000 680" aria-hidden="true">
                <line x1="860" y1="160" x2="770" y2="278" />
                <line x1="770" y1="278" x2="470" y2="468" />
                <line x1="470" y1="468" x2="200" y2="420" />
                <line x1="200" y1="420" x2="320" y2="270" />
              </svg>

              {experiences.map((item, index) => (
                <div key={item.id}>
                  <button
                    type="button"
                    className={`${styles.orbitNode} ${orbitPositionClasses[index]} ${orbitToneClasses[index]} ${
                      selectedExperience.id === item.id ? styles.orbitNodeActive : ""
                    }`}
                    style={getOrbSizeStyle(item.durationYears)}
                    onClick={() => setSelectedExperienceId(item.id)}
                    aria-label={`Open ${item.role} details`}
                  >
                    <span className={styles.orbitCore} />
                  </button>
                  <div className={`${styles.orbitLabel} ${orbitLabelClasses[index]}`}>
                    <p className={styles.orbitCode}>[ {item.code} ]</p>
                    <p className={styles.orbitName}>{item.astralTitle}</p>
                  </div>
                </div>
              ))}
            </div>

            <aside className={styles.detailPanel}>
              <p className={styles.detailEyebrow}>{selectedExperience.period}</p>
              <h2 className={styles.detailTitle}>{selectedExperience.role}</h2>
              <p className={styles.detailMeta}>
                {formatCompanyMeta(selectedExperience.company, selectedExperience.location)}
              </p>
              <p className={styles.detailScope}>{selectedExperience.scope}</p>

              <div className={styles.detailMetrics}>
                <div className={styles.detailMetric}>
                  <strong>{selectedExperience.durationYears.toFixed(1)}y</strong>
                  <span>Tenure</span>
                </div>
                <div className={styles.detailMetric}>
                  <strong>{selectedExperience.year}</strong>
                  <span>Anchor year</span>
                </div>
                <div className={styles.detailMetric}>
                  <strong>{selectedExperience.astralAccent}</strong>
                  <span>Signal</span>
                </div>
              </div>

              <div className={styles.detailSummary}>
                {selectedExperience.summary.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>

              {selectedExperience.highlight ? (
                <p className={styles.detailHighlight}>{selectedExperience.highlight}</p>
              ) : null}
            </aside>
          </section>
        )}
      </main>

      {viewMode === "ledger" ? (
        <aside className={styles.ruler} aria-label="Timeline ruler">
          <div className={styles.rulerCard}>
            <div className={styles.rulerTop}>
              <div>
                <p className={styles.rulerLabel}>EXPERIENCE</p>
                <p className={styles.activeYear}>{activeYear}</p>
              </div>
                <div className={styles.rulerControls}>
                  <div className={styles.stats}>
                    {stats.map((stat) => (
                      <div key={stat.label} className={styles.stat}>
                        <strong>{stat.value}</strong>
                        <span>{stat.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className={styles.rulerActions} aria-label="Quick actions">
                    <a
                      className={styles.actionButton}
                      href="mailto:hi@jimmiewang.com?subject=Jimmie%27s%20Ledger"
                      aria-label="Send email"
                      title="Send email"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M4 6.75h16a.75.75 0 0 1 .75.75v9a1.5 1.5 0 0 1-1.5 1.5h-14.5a1.5 1.5 0 0 1-1.5-1.5v-9A.75.75 0 0 1 4 6.75Z" />
                        <path d="m4.5 7.5 7.02 5.27a.8.8 0 0 0 .96 0L19.5 7.5" />
                      </svg>
                    </a>
                    <button
                      type="button"
                      className={`${styles.actionButton} ${styles.actionButtonPrimary}`}
                      onClick={() => window.print()}
                      aria-label="Download as PDF"
                      title="Download as PDF"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 4.5a.75.75 0 0 1 .75.75v7.19l2.47-2.47a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0l-3.75-3.75a.75.75 0 0 1 1.06-1.06l2.47 2.47V5.25A.75.75 0 0 1 12 4.5Z" />
                        <path d="M5.25 15.75A.75.75 0 0 1 6 16.5v1.25c0 .14.11.25.25.25h11.5c.14 0 .25-.11.25-.25V16.5a.75.75 0 0 1 1.5 0v1.25a1.75 1.75 0 0 1-1.75 1.75H6.25A1.75 1.75 0 0 1 4.5 17.75V16.5a.75.75 0 0 1 .75-.75Z" />
                      </svg>
                    </button>
                  </div>
                </div>
            </div>

            <div className={styles.scale}>
              <div className={styles.scaleTrack} />
              <div className={`${styles.pointer} ${pointerClass}`}>
                <span className={styles.pointerDot} />
              </div>
              <div className={styles.scaleYears}>
                {years.map((year) => (
                  <span
                    key={year}
                    className={year === activeYear ? `${styles.scaleYear} ${styles.scaleYearActive}` : styles.scaleYear}
                  >
                    {year}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </aside>
      ) : null}
    </div>
  );
}
