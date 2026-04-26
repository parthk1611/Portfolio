"use client";

import { useState, useEffect } from "react";

const projects = [
  {
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    title: "AI Scheduler",
    category: "FastAPI · React · SQL Server",
    summary: "Dataset-backed scheduling system with async schedule runs, Brampton upload flow, run keys, and SQL Server persistence.",
    stack: "FastAPI / React / SQL Server",
  },
  {
    image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=900&q=80",
    title: "Lid Harmonium",
    category: "SwiftUI Audio Instrument",
    summary: "Mac audio experiment using lid angle, keyboard capture, AVAudioEngine, held notes, bellows behavior, and RMS smoke checks.",
    stack: "SwiftUI / AVFoundation",
  },
  {
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=900&q=80",
    title: "MicroFish",
    category: "LLM Ontology Workflow",
    summary: "Flask and Vue pipeline for ontology generation, provider switching, report polling, and clearer LLM error handling.",
    stack: "Flask / Vue / LLM APIs",
  },
  {
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80",
    title: "car-ed",
    category: "Vehicle Inventory UI",
    summary: "Vite app for collected vehicle inventory snapshots with deployment checks and clear real-time versus snapshot behavior.",
    stack: "Vite / React / Vercel",
  },
  {
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80",
    title: "Android Movie Vault",
    category: "Room · MVVM",
    summary: "Movie and DVD vault app with Room persistence, MVVM flows, validation, duplicate ID handling, and refined Android UI.",
    stack: "Kotlin / Room / MVVM",
  },
  {
    image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=900&q=80",
    title: "Maps & Geofence Lab",
    category: "Android Location",
    summary: "Google Maps lab with fused location, real device position, route polylines, distance, geofencing, and runtime diagnostics.",
    stack: "Kotlin / Maps / GPS",
  },
  {
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80",
    title: "House Price ML",
    category: "Streamlit · Docker",
    summary: "Submission-ready ML app with regression pipeline, Streamlit UI, Docker scaffolding, metrics, and robust dataframe styling.",
    stack: "Python / Streamlit / scikit-learn",
  },
  {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    title: "TensorFlow Labs",
    category: "Neural Network Coursework",
    summary: "Notebook-first TensorFlow assignments with macOS ARM runtime fixes, generated reports, training artifacts, and reproducible commands.",
    stack: "TensorFlow / Jupyter / Python",
  },
  {
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
    title: "TraceTrust AI",
    category: "Business + Product Plan",
    summary: "Digital Product Passport proposal with manufacturing compliance narrative, financial model, break-even logic, and rubric-ready deliverables.",
    stack: "Strategy / Finance / QA",
  },
];

// Expanded card is EXPAND_RATIO× wider than a collapsed card.
// flex distributes space proportionally → always fills 100% at any viewport.
const EXPAND_RATIO = 6;

const ExpandOnHover = () => {
  const [expandedImage, setExpandedImage] = useState(3);
  const [cardHeight, setCardHeight] = useState("28rem");

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 480)       setCardHeight("14rem");
      else if (w < 768)  setCardHeight("18rem");
      else if (w < 1024) setCardHeight("22rem");
      else if (w < 1440) setCardHeight("28rem");
      else if (w < 1920) setCardHeight("34rem");
      else               setCardHeight("40rem");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="w-full py-4">
      <div className="w-full px-3 sm:px-5">
        <div
          className="flex w-full gap-1"
          style={{ height: cardHeight }}
        >
          {projects.map((project, idx) => {
            const isExpanded = idx + 1 === expandedImage;
            return (
              <div
                key={idx}
                className="relative cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl transition-all duration-500 ease-in-out flex-shrink-0"
                style={{
                  flex: isExpanded ? EXPAND_RATIO : 1,
                  minWidth: 0,
                }}
                onMouseEnter={() => setExpandedImage(idx + 1)}
              >
                <img
                  className="w-full h-full object-cover"
                  src={project.image}
                  alt={project.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* expanded text */}
                <div
                  className={`absolute inset-x-0 bottom-0 p-4 sm:p-5 transition-all duration-500 ${
                    isExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                  }`}
                >
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.26em] text-red-500">
                    {project.category}
                  </p>
                  <h3 className="text-lg sm:text-2xl font-bold leading-tight text-white">
                    {project.title}
                  </h3>
                  <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-5 sm:leading-6 text-white/70 max-w-xs hidden sm:block">
                    {project.summary}
                  </p>
                  <p className="mt-2 sm:mt-3 text-xs uppercase tracking-[0.22em] text-white/40 hidden sm:block">
                    {project.stack}
                  </p>
                </div>

                {/* collapsed label */}
                <div
                  className={`absolute bottom-4 left-1/2 -translate-x-1/2 rotate-[-90deg] whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.28em] text-white/50 transition-opacity duration-300 ${
                    isExpanded ? "opacity-0" : "opacity-100"
                  }`}
                >
                  {project.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExpandOnHover;
