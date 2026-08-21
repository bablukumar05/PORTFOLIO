import React, { useState, useRef } from "react";
import Tilt from "react-parallax-tilt";
import ProjectModal from "./ProjectModal";
import ventureconnect from "../assets/ventureconnect.jpg";
import teampulse from "../assets/teampulse.jpg";
import project2 from "../assets/project2.jpg";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaNetworkWired,
  FaCheckCircle,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaRocket,
} from "react-icons/fa";

const PROJECTS = [
  {
    id: 1,
    title: "VentureConnect",
    subtitle: "7-Role Startup Sourcing Platform",
    category: "Full-Stack MERN",
    badge: "🌟 Flagship SaaS",
    description:
      "Multi-tenant SaaS for Founders, Investors, Mentors, Incubators, Legal Advisors & Teams with weighted matchmaking algorithms.",
    impact: [
      "7-Role RBAC System for multi-tenant users",
      "Startup health scoring & investor matchmaking",
      "Socket.IO live chat & Recharts financial analytics"
    ],
    images: [ventureconnect],
    highlights: ["Node.js", "Express", "React", "MongoDB", "Socket.IO", "Tailwind"],
    link: "https://venture-connect-beta.vercel.app",
    github: "https://github.com/bablukumar05/VentureConnect",
  },
  {
    id: 2,
    title: "TeamPulse",
    subtitle: "Workforce & Task Management",
    category: "Full-Stack MERN",
    badge: "🚀 Real-Time MERN",
    description:
      "Workforce management platform featuring Socket.IO multi-room team chat, Kanban task boards with RBAC, and leave management.",
    impact: [
      "Socket.IO multi-room team chat & live notifications",
      "Kanban task board with JWT RBAC permissions",
      "Analytics dashboards & REST APIs on Vercel/Render"
    ],
    images: [teampulse],
    highlights: ["React 19", "Node.js", "Express", "MongoDB", "Socket.IO", "Tailwind"],
    link: "https://team-pulse-three-xi.vercel.app/",
    github: "https://github.com/bablukumar05/TeamPulse",
  },
  {
    id: 3,
    title: "Developer Portfolio",
    subtitle: "60 FPS GPU Motion UX Engine",
    category: "Frontend & Motion UX",
    badge: "⚡ 60 FPS GPU Engine",
    description:
      "High-performance portfolio built with React 18, Tailwind CSS, Framer Motion spring physics, and an optimized GPU Canvas engine.",
    impact: [
      "Responsive portfolio with interactive UI & Canvas animations",
      "Code splitting & lazy loading for 60fps performance",
      "Clean architecture & zero-lag performance"
    ],
    images: [project2],
    highlights: ["React 18", "Tailwind", "Framer Motion", "Canvas API", "Vite"],
    link: "https://bablukumar05.github.io/PORTFOLIO/",
    github: "https://github.com/bablukumar05/PORTFOLIO",
  },
];

export default function Projects({ onOpenArchitecture }) {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");
  const scrollRef = useRef(null);

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === "All") return true;
    return p.category.includes(filter);
  });

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 340;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="projects"
      className="relative py-16 px-4 sm:px-6 lg:px-8 bg-slate-950 overflow-hidden"
    >
      {/* Background ambient light */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] -top-32 -left-32" />
        <div className="absolute w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] -bottom-40 -right-32" />
      </div>

      <div className="relative max-w-7xl mx-auto text-center z-10">
        {/* Section Title */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
          <FaRocket className="text-indigo-400 text-xs" /> FEATURED WORK
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Projects</span>
        </h2>
        <p className="text-gray-400 max-w-md mx-auto text-xs sm:text-sm mb-6">
          Production applications displaying full-stack architecture, real-time WebSockets, and modern motion UX.
        </p>

        {/* Filter Pills & Slider Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 max-w-6xl mx-auto px-2">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {["All", "Full-Stack MERN", "Frontend & Motion UX"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
                  filter === cat
                    ? "bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/30 scale-105"
                    : "bg-slate-900 border-white/10 text-gray-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Slide Arrow Navigation Buttons */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-[11px] font-mono text-gray-400 mr-2 hidden sm:inline-block">
              Slide Projects
            </span>
            <button
              onClick={() => scroll("left")}
              aria-label="Slide Left"
              className="w-8 h-8 rounded-xl bg-slate-900 border border-white/10 hover:border-indigo-500/40 text-gray-300 hover:text-white flex items-center justify-center transition hover:scale-110 active:scale-95 shadow-md"
            >
              <FaChevronLeft className="text-xs" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Slide Right"
              className="w-8 h-8 rounded-xl bg-slate-900 border border-white/10 hover:border-indigo-500/40 text-gray-300 hover:text-white flex items-center justify-center transition hover:scale-110 active:scale-95 shadow-md"
            >
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        </div>

        {/* Responsive Slidable Projects Grid / Row */}
        <div
          ref={scrollRef}
          className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 pt-2 max-w-6xl mx-auto px-2"
          style={{ scrollBehavior: "smooth" }}
        >
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="min-w-[290px] sm:min-w-[320px] md:min-w-0 snap-center flex"
            >
              <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} glareEnable={false} className="w-full flex">
                {/* Stylish Compact Outer Gradient Border Card */}
                <div className="p-[1px] rounded-2xl bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-pink-500/30 hover:from-indigo-500 hover:to-pink-500 transition-all duration-300 w-full flex flex-col shadow-xl group">
                  <div className="bg-slate-900/95 backdrop-blur-xl rounded-[15px] p-4 text-left flex flex-col justify-between h-full border border-white/10">
                    
                    {/* Compact Image Banner */}
                    <div className="w-full h-36 sm:h-40 relative rounded-xl overflow-hidden bg-slate-950 mb-3">
                      <img
                        src={p.images[0]}
                        alt={p.title}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                      
                      {/* Top Badge */}
                      <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-indigo-500/30 text-[10px] font-semibold text-indigo-300 flex items-center gap-1">
                        <FaStar className="text-amber-400 text-[9px]" /> {p.badge}
                      </div>
                    </div>

                    {/* Card Content Header */}
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition duration-200 leading-snug">
                        {p.title}
                      </h3>
                      <p className="text-[11px] font-medium text-indigo-400 mb-1.5">
                        {p.subtitle}
                      </p>
                      <p className="text-gray-300 text-xs leading-relaxed line-clamp-2 mb-3">
                        {p.description}
                      </p>

                      {/* Compact Impact Bullets */}
                      <div className="space-y-1 mb-3">
                        {p.impact.map((bullet, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-[11px] text-gray-300">
                            <FaCheckCircle className="text-indigo-400 text-[10px] mt-0.5 shrink-0" />
                            <span className="line-clamp-1">{bullet}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack Badges */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {p.highlights.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-md text-[10px] font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Compact Action CTAs */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-white/10 mt-auto">
                      {p.link && (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Live Demo for ${p.title}`}
                          className="flex-1 px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-[11px] rounded-lg shadow-md flex items-center justify-center gap-1 transition hover:scale-102"
                        >
                          <FaExternalLinkAlt className="text-[9px]" /> Live Demo
                        </a>
                      )}
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`GitHub Code for ${p.title}`}
                          className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-gray-200 font-semibold text-[11px] rounded-lg border border-white/10 flex items-center gap-1 transition"
                        >
                          <FaGithub className="text-xs" /> Code
                        </a>
                      )}
                      {onOpenArchitecture && (
                        <button
                          onClick={() => onOpenArchitecture(p.title)}
                          aria-label={`Architecture for ${p.title}`}
                          className="p-1.5 bg-purple-950/60 hover:bg-purple-900 text-purple-300 rounded-lg border border-purple-500/30 transition"
                          title="View Architecture"
                        >
                          <FaNetworkWired className="text-xs" />
                        </button>
                      )}
                      <button
                        onClick={() => setSelected(p)}
                        aria-label={`Details for ${p.title}`}
                        className="px-2 py-1.5 bg-slate-800/80 hover:bg-slate-700 text-gray-300 text-[11px] font-semibold rounded-lg border border-white/10 transition ml-auto"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </Tilt>
            </div>
          ))}
        </div>

        {/* GitHub Profile Banner */}
        <div className="mt-8 max-w-6xl mx-auto p-4 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center text-white text-base shrink-0">
              <FaGithub />
            </div>
            <div>
              <h4 className="text-white font-bold text-xs sm:text-sm">Explore All Repositories on GitHub</h4>
              <p className="text-[11px] text-gray-400">50+ public repositories & active commit history</p>
            </div>
          </div>
          <a
            href="https://github.com/bablukumar05"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition shrink-0 flex items-center gap-1.5 shadow-md"
          >
            <FaGithub /> Visit GitHub Profile
          </a>
        </div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal
            key={selected.id}
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
