"use client";

import { cn } from "@/lib/utils";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

interface WorkItem {
  num: string;
  name: string;
  clipId: string;
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
}

const workItems: WorkItem[] = [
  {
    num: "01",
    name: "Data Analyst",
    clipId: "work-clip-1",
    role: "Data Analyst",
    company: "TI Automotive",
    period: "2025 – Present",
    description:
      "Designed data pipelines and dashboards enabling decisions across engineering and ops. Automated reporting workflows reducing manual effort by 60%.",
    tags: ["Python", "SQL", "Power BI", "Azure"],
  },
  {
    num: "02",
    name: "Full Stack",
    clipId: "work-clip-2",
    role: "Full-Stack Developer",
    company: "Centennial College",
    period: "2025 – 2026",
    description:
      "Built full-stack applications using React, Node.js, and cloud services. Led end-to-end development from architecture to production.",
    tags: ["React", "Node.js", "AWS", "TypeScript"],
  },
  {
    num: "03",
    name: "ML Intern",
    clipId: "work-clip-3",
    role: "ML Intern",
    company: "Remarks Skill",
    period: "2021 – 2022",
    description:
      "Developed ML models for NLP and predictive analytics. Improved accuracy by 18% via feature engineering.",
    tags: ["TensorFlow", "PyTorch", "NLP"],
  },
];

/* ── shared cell style helpers ── */
const cell = (
  left: number,
  top: number,
  width: number,
  height: number,
  bg: string,
  extra: React.CSSProperties = {}
): React.CSSProperties => ({
  position: "absolute",
  left,
  top,
  width,
  height,
  background: bg,
  boxSizing: "border-box",
  overflow: "hidden",
  ...extra,
});

const flex = (
  dir: "row" | "column" = "column",
  align = "center",
  justify = "center"
): React.CSSProperties => ({
  display: "flex",
  flexDirection: dir,
  alignItems: align,
  justifyContent: justify,
});

/* ── label styles ── */
const labelStyle: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 700,
  letterSpacing: "0.28em",
  textTransform: "uppercase",
  color: "rgba(231,8,20,0.55)",
  fontFamily: "'Inter', sans-serif",
};

const tagStyle: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#e70814",
  border: "1px solid rgba(231,8,20,0.22)",
  borderRadius: "4px",
  padding: "5px 10px",
  background: "rgba(231,8,20,0.05)",
  fontFamily: "'Inter', sans-serif",
  whiteSpace: "nowrap",
};

/* ────────────────────────────────────────────────────────────
   CARD 1 — clip-1 horizontal bars (Data Analyst)
   Shapes (approx bounding boxes):
   · arch-top : x=40-459  y=75-196   (role)
   · thin-bar1: x=9-491   y=214-235  (company label)
   · mid-bar  : x=9-491   y=274-336  (description)
   · thin-bar2: x=9-491   y=344-362  (period)
   · bot-bar  : x=40-459  y=387-425  (tags)
──────────────────────────────────────────────────────────── */
const Card1 = ({ item }: { item: WorkItem }) => (
  <>
    {/* arch-top — role */}
    <div style={{ ...cell(40, 75, 420, 122, "#0d0d0d"), ...flex("column") }}>
      <span style={labelStyle}>Role</span>
      <h3
        style={{
          fontSize: "30px",
          fontWeight: 700,
          color: "#f5f5f5",
          fontFamily: "'Playfair Display', serif",
          margin: "6px 0 0",
          lineHeight: 1.1,
          textAlign: "center",
        }}
      >
        {item.role}
      </h3>
    </div>

    {/* thin-bar1 — company */}
    <div
      style={{
        ...cell(9, 214, 482, 21, "rgba(231,8,20,0.07)"),
        ...flex("row", "center", "center"),
        gap: "10px",
      }}
    >
      <span style={{ ...labelStyle, color: "#e70814", letterSpacing: "0.45em" }}>
        {item.company}
      </span>
    </div>

    {/* mid-bar — description */}
    <div
      style={{
        ...cell(9, 274, 482, 62, "#111"),
        ...flex("row", "center", "flex-start"),
        padding: "0 20px",
      }}
    >
      <p
        style={{
          fontSize: "16px",
          lineHeight: 1.6,
          color: "#737373",
          margin: 0,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {item.description}
      </p>
    </div>

    {/* thin-bar2 — period */}
    <div style={{ ...cell(9, 344, 482, 18, "#0d0d0d"), ...flex("row", "center", "center") }}>
      <span style={{ ...labelStyle, color: "#52525b" }}>{item.period}</span>
    </div>

    {/* bot-bar — tags */}
    <div
      style={{
        ...cell(40, 387, 420, 38, "#0d0d0d"),
        ...flex("row", "center", "center"),
        gap: "7px",
      }}
    >
      {item.tags.map((t) => (
        <span key={t} style={tagStyle}>{t}</span>
      ))}
    </div>
  </>
);

/* ────────────────────────────────────────────────────────────
   CARD 2 — clip-2 block layout (Full Stack Dev)
   Shapes:
   · left-tall : x=20  y=20   w=200 h=280  (role)
   · left-bot  : x=20  y=320  w=200 h=160  (company)
   · right-top : x=240 y=20   w=240 h=140  (period)
   · right-ml  : x=240 y=180  w=110 h=160  (tag 0)
   · right-mr  : x=370 y=180  w=110 h=160  (tag 1)
   · right-bot : x=240 y=360  w=240 h=120  (description)
──────────────────────────────────────────────────────────── */
const Card2 = ({ item }: { item: WorkItem }) => (
  <>
    {/* left-tall — role */}
    <div
      style={{
        ...cell(20, 20, 200, 280, "#0d0d0d"),
        ...flex("column", "flex-start", "flex-end"),
        padding: "24px 20px",
      }}
    >
      <span style={labelStyle}>{item.num}</span>
      <h3
        style={{
          fontSize: "26px",
          fontWeight: 700,
          color: "#f5f5f5",
          fontFamily: "'Playfair Display', serif",
          lineHeight: 1.1,
          marginTop: "10px",
        }}
      >
        {item.role.split(" ").join("\n").split("\n").map((w, i) => (
          <span key={i} style={{ display: "block" }}>{w}</span>
        ))}
      </h3>
    </div>

    {/* left-bot — company */}
    <div
      style={{
        ...cell(20, 320, 200, 160, "#111"),
        ...flex("column", "flex-start", "center"),
        padding: "20px",
      }}
    >
      <span style={labelStyle}>Company</span>
      <p
        style={{
          fontSize: "20px",
          fontWeight: 600,
          color: "#737373",
          margin: "8px 0 0",
          fontFamily: "'Inter', sans-serif",
          lineHeight: 1.2,
        }}
      >
        {item.company}
      </p>
    </div>

    {/* right-top — period */}
    <div
      style={{
        ...cell(240, 20, 240, 140, "rgba(231,8,20,0.05)"),
        ...flex("column", "flex-start", "center"),
        padding: "20px",
        borderLeft: "1px solid rgba(231,8,20,0.12)",
      }}
    >
      <span style={labelStyle}>Period</span>
      <p
        style={{
          fontSize: "24px",
          fontWeight: 700,
          color: "#e70814",
          margin: "8px 0 0",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {item.period}
      </p>
    </div>

    {/* right-ml — tag 0 (rotated) */}
    <div style={{ ...cell(240, 180, 110, 160, "#111"), ...flex("column") }}>
      <span
        style={{
          ...tagStyle,
          transform: "rotate(-90deg)",
          whiteSpace: "nowrap",
        }}
      >
        {item.tags[0]}
      </span>
    </div>

    {/* right-mr — tag 1 (rotated) */}
    <div style={{ ...cell(370, 180, 110, 160, "#0d0d0d"), ...flex("column") }}>
      <span
        style={{
          ...tagStyle,
          transform: "rotate(-90deg)",
          whiteSpace: "nowrap",
          color: "#737373",
          borderColor: "rgba(255,255,255,0.07)",
          background: "transparent",
        }}
      >
        {item.tags[1]}
      </span>
    </div>

    {/* right-bot — description */}
    <div
      style={{
        ...cell(240, 360, 240, 120, "#0a0a0a"),
        ...flex("row", "center", "flex-start"),
        padding: "14px 18px",
      }}
    >
      <p
        style={{
          fontSize: "14px",
          lineHeight: 1.6,
          color: "#525252",
          margin: 0,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {item.description}
      </p>
    </div>
  </>
);

/* ────────────────────────────────────────────────────────────
   CARD 3 — clip-3 3×3 squares 140×140 (ML Intern)
   One piece of info per square
──────────────────────────────────────────────────────────── */
const GRID_CELLS = [
  /* row 0 */
  (item: WorkItem) => (
    <span style={{ fontSize: "38px", fontWeight: 900, color: "#e70814", fontFamily: "'Playfair Display', serif" }}>
      {item.num}
    </span>
  ),
  (item: WorkItem) => (
    <span style={{ fontSize: "38px", fontWeight: 900, color: "#f5f5f5", fontFamily: "'Inter', sans-serif", letterSpacing: "-0.02em" }}>
      ML
    </span>
  ),
  (item: WorkItem) => (
    <span style={{ fontSize: "18px", fontWeight: 800, color: "#737373", textTransform: "uppercase" as const, letterSpacing: "0.12em", fontFamily: "'Inter', sans-serif" }}>
      Intern
    </span>
  ),
  /* row 1 */
  (item: WorkItem) => (
    <div style={{ textAlign: "center" as const }}>
      <span style={labelStyle}>Company</span>
      <p style={{ fontSize: "16px", fontWeight: 600, color: "#737373", margin: "6px 0 0", fontFamily: "'Inter', sans-serif" }}>
        {item.company}
      </p>
    </div>
  ),
  (_item: WorkItem) => (
    <div style={{ width: "32px", height: "2px", background: "rgba(231,8,20,0.4)" }} />
  ),
  (item: WorkItem) => (
    <div style={{ textAlign: "center" as const }}>
      <span style={labelStyle}>Period</span>
      <p style={{ fontSize: "16px", fontWeight: 700, color: "#e70814", margin: "6px 0 0", fontFamily: "'Inter', sans-serif" }}>
        {item.period}
      </p>
    </div>
  ),
  /* row 2 — tags */
  (item: WorkItem) => <span style={tagStyle}>{item.tags[0]}</span>,
  (item: WorkItem) => <span style={tagStyle}>{item.tags[1]}</span>,
  (item: WorkItem) => <span style={tagStyle}>{item.tags[2]}</span>,
];

const CELL_BG = ["#0d0d0d", "#111", "#0d0d0d", "#111", "#0d0d0d", "rgba(231,8,20,0.04)", "rgba(231,8,20,0.05)", "rgba(231,8,20,0.05)", "rgba(231,8,20,0.05)"];

const Card3 = ({ item }: { item: WorkItem }) => (
  <>
    {GRID_CELLS.map((render, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      return (
        <div
          key={i}
          style={{
            ...cell(col * 160 + 20, row * 160 + 20, 140, 140, CELL_BG[i]),
            ...flex("column"),
            padding: "12px",
          }}
        >
          {render(item)}
        </div>
      );
    })}
  </>
);

/* ────────────────────────────────────────────────────────────
   MAIN COMPONENT
──────────────────────────────────────────────────────────── */
export const AboutMe = ({ className }: { className?: string }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const mainGroupRef = useRef<SVGGElement>(null);
  const masterTl = useRef<gsap.core.Timeline | null>(null);

  const createLoop = (index: number) => {
    const item = workItems[index];
    const selector = `#${item.clipId} .path`;

    if (masterTl.current) masterTl.current.kill();
    if (mainGroupRef.current)
      mainGroupRef.current.setAttribute("clip-path", `url(#${item.clipId})`);

    gsap.set(selector, { scale: 0, transformOrigin: "50% 50%" });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    tl.to(selector, { scale: 1, duration: 0.8, stagger: { amount: 0.4, from: "random" }, ease: "expo.out" })
      .to(selector, { scale: 1.05, duration: 1.5, yoyo: true, repeat: 1, ease: "sine.inOut", stagger: { amount: 0.2, from: "center" } })
      .to(selector, { scale: 0, duration: 0.6, stagger: { amount: 0.3, from: "edges" }, ease: "expo.in" });

    masterTl.current = tl;
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => { createLoop(0); }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleItemHover = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    createLoop(index);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex flex-col md:flex-row items-center justify-between w-full overflow-hidden",
        "py-10 md:py-20 px-2 sm:px-6 md:px-0",
        className
      )}
    >
      {/* LEFT */}
      <div className="z-20 w-full md:w-1/2">
        <nav>
          <ul className="flex flex-col gap-7 sm:gap-10 md:gap-14">
            {workItems.map((item, index) => (
              <li key={item.num} onMouseEnter={() => handleItemHover(index)} className="group cursor-pointer">
                <div className="flex items-start gap-4 sm:gap-6">
                  <span className={cn("text-lg sm:text-2xl font-bold transition-all duration-500 mt-1 sm:mt-2 shrink-0",
                    activeIndex === index ? "text-red-600 scale-110" : "text-zinc-700"
                  )}>
                    {item.num}
                  </span>
                  <div>
                    <h2
                      className={cn(
                        "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.85] transition-all duration-700",
                        activeIndex === index ? "text-white opacity-100 sm:translate-x-4" : "opacity-40 translate-x-0 text-transparent"
                      )}
                      style={activeIndex !== index ? { WebkitTextStroke: "1.5px #52525b" } : undefined}
                    >
                      {item.name.split(" ")[0]}<br />{item.name.split(" ")[1]}
                    </h2>
                    <p className={cn("mt-1.5 text-[10px] font-semibold tracking-[0.35em] uppercase transition-all duration-500",
                      activeIndex === index ? "opacity-100 text-red-600/70" : "opacity-0"
                    )}>
                      {item.company} · {item.period}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* RIGHT */}
      <div className="relative w-full md:w-1/2 flex justify-center items-center mt-8 sm:mt-12 md:mt-0">
        <div className="absolute w-[120%] h-[120%] bg-red-600/5 blur-[100px] rounded-full" />
        <svg
          viewBox="0 0 500 500"
          className="w-full max-w-[260px] sm:max-w-[340px] md:max-w-[400px] lg:max-w-[440px] xl:max-w-[520px] 2xl:max-w-[580px] h-auto z-10"
        >
          <defs>
            <clipPath id="work-clip-1">
              <path className="path" d="M480.6,235H19.4c-6,0-10.8-4.9-10.8-10.8v-9.5c0-6,4.9-10.8,10.8-10.8h461.1c6,0,10.8,4.9,10.8,10.8v9.5C491.4,230.2,486.6,235,480.6,235z" />
              <path className="path" d="M483.1,362.4H16.9c-4.6,0-8.3-3.7-8.3-8.3v-1.8c0-4.6,3.7-8.3,8.3-8.3h466.1c4.6,0,8.3,3.7,8.3,8.3v1.8C491.4,358.7,487.7,362.4,483.1,362.4z" />
              <path className="path" d="M460.3,336.3H39.7c-17.2,0-31.1-13.9-31.1-31.1v-31.5c0-17.2,13.9-31.1,31.1-31.1h420.7c17.2,0,31.1,13.9,31.1,31.1v31.5C491.4,322.4,477.5,336.3,460.3,336.3z" />
              <path className="path" d="M459.2,196.2H40.8v-35c0-47.5,38.5-86,86-86h246.5c47.5,0,86,38.5,86,86V196.2z" />
              <path className="path" d="M441.9,424.9H58.1c-9.6,0-17.3-7.8-17.3-17.3v-37.4h418.5v37.4C459.2,417.1,451.5,424.9,441.9,424.9z" />
            </clipPath>
            <clipPath id="work-clip-2">
              <rect className="path" x="20" y="20" width="200" height="280" rx="12" />
              <rect className="path" x="20" y="320" width="200" height="160" rx="12" />
              <rect className="path" x="240" y="20" width="240" height="140" rx="12" />
              <rect className="path" x="240" y="180" width="110" height="160" rx="12" />
              <rect className="path" x="370" y="180" width="110" height="160" rx="12" />
              <rect className="path" x="240" y="360" width="240" height="120" rx="12" />
            </clipPath>
            <clipPath id="work-clip-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <rect key={i} className="path" x={(i % 3) * 160 + 20} y={Math.floor(i / 3) * 160 + 20} width="140" height="140" rx="4" />
              ))}
            </clipPath>
          </defs>

          <g ref={mainGroupRef} clipPath="url(#work-clip-1)">
            <foreignObject width="500" height="500">
              <div style={{ position: "relative", width: "500px", height: "500px", overflow: "hidden" }}>
                {activeIndex === 0 && <Card1 item={workItems[0]} />}
                {activeIndex === 1 && <Card2 item={workItems[1]} />}
                {activeIndex === 2 && <Card3 item={workItems[2]} />}
              </div>
            </foreignObject>
          </g>
        </svg>
      </div>
    </div>
  );
};
