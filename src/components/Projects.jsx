import React, { useRef, useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import ProjectModal from "./ProjectModal";
import teampulse from "../assets/teampulse.jpg";
import project2 from "../assets/project2.jpg";
import { motion, AnimatePresence } from "framer-motion";
import { FaExternalLinkAlt, FaGithub, FaNetworkWired, FaCheckCircle, FaStar } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 1,
    title: "TeamPulse — Workforce & Task Management",
    category: "Full-Stack MERN",
    badge: "🚀 Real-Time MERN",
    description:
      "Enterprise MERN platform featuring Socket.IO multi-room team chat, Kanban task boards, JWT Role-Based Access Control (RBAC), and Recharts dashboards.",
    impact: [
      "Socket.IO multi-room team chat & live notifications",
      "Kanban task board with JWT RBAC permissions & Recharts"
    ],
    images: [teampulse],
    highlights: ["React 19", "Node.js", "Express.js", "MongoDB", "Socket.IO", "Tailwind"],
    link: "https://team-pulse-three-xi.vercel.app/",
    github: "https://github.com/bablukumar05/TeamPulse",
  },
  {
    id: 2,
    title: "Personal Developer Portfolio",
    category: "Frontend & Motion UX",
    badge: "⚡ 60 FPS GPU Engine",
    description: "High-performance portfolio built with React 18, Tailwind CSS, Framer Motion spring physics, and an optimized GPU Canvas particle engine.",
    impact: [
      "GPU Canvas particle engine replacing 3,000 React re-renders/sec",
      "Dual-mode recruiter IDE terminal & interactive live previewer"
    ],
    images: [project2],
    highlights: ["React 18", "Tailwind CSS", "Framer Motion", "Canvas API", "Vite"],
    link: "https://bablukumar05.github.io/PORTFOLIO/",
    github: "https://github.com/bablukumar05/PORTFOLIO",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Projects({ onOpenArchitecture }) {
  const refs = useRef([]);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    refs.current.forEach((card, index) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: index * 0.15,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === "All") return true;
    return p.category.includes(filter);
  });

  return (
    <section
      id="projects"
      className="relative py-20 px-4 sm:px-6 lg:px-12 bg-slate-950 overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] -top-32 -left-32" />
        <div className="absolute w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] -bottom-40 -right-32" />
      </div>

      <div className="relative max-w-7xl mx-auto text-center z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
          FEATURED WORK
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Projects</span>
        </h2>
        {/* <p className="text-gray-400 max-w-xl mx-auto text-xs sm:text-sm mb-8">
          Production-ready web applications built with clean architecture, real-time WebSockets, and modern motion UX.
        </p> */}

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {["All", "Full-Stack MERN", "Frontend & Motion UX"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
                filter === cat
                  ? "bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/30"
                  : "bg-slate-900 border-white/10 text-gray-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Compact Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {filteredProjects.map((p, i) => (
            <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} glareEnable={false} key={p.id}>
              <motion.div
                ref={(el) => (refs.current[i] = el)}
                tabIndex={0}
                className="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-900/90 border border-white/10 text-left flex flex-col h-full group hover:border-indigo-500/40 transition duration-300"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                aria-label={`Project card for ${p.title}`}
              >
                {/* Image */}
                <div className="w-full h-48 sm:h-52 relative overflow-hidden bg-slate-950">
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 ease-in-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-transparent transition-colors duration-300" />
                  
                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-indigo-300 flex items-center gap-1.5">
                    <FaStar className="text-amber-400 text-[10px]" /> {p.badge}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition duration-200">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-2">
                      {p.description}
                    </p>

                    {/* Compact Impact Bullets */}
                    <div className="mt-3 space-y-1">
                      {p.impact.map((bullet, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-[11px] text-gray-400">
                          <FaCheckCircle className="text-indigo-400 text-[10px] mt-0.5 shrink-0" />
                          <span className="line-clamp-1">{bullet}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.highlights.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-full text-[10px] font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sleek Action Buttons */}
                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setSelected(p)}
                      aria-label={`View details for ${p.title}`}
                      className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-md transition duration-200"
                    >
                      Details
                    </button>
                    {onOpenArchitecture && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenArchitecture(p.title);
                        }}
                        aria-label={`View architecture for ${p.title}`}
                        className="px-3.5 py-2 bg-purple-950/80 hover:bg-purple-900 text-purple-300 hover:text-white font-semibold text-xs rounded-xl border border-purple-500/30 flex items-center gap-1.5 transition duration-200"
                      >
                        <FaNetworkWired className="text-xs" /> Architecture
                      </button>
                    )}
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Live Demo for ${p.title}`}
                        className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-indigo-300 hover:text-white font-semibold text-xs rounded-xl border border-indigo-500/30 flex items-center gap-1.5 transition duration-200"
                      >
                        <FaExternalLinkAlt className="text-[10px]" /> Live Demo
                      </a>
                    )}
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`GitHub Repository for ${p.title}`}
                        className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white font-semibold text-xs rounded-xl border border-white/10 flex items-center gap-1.5 transition duration-200"
                      >
                        <FaGithub className="text-xs" /> Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>

        {/* GitHub Quick Action Banner */}
        <div className="mt-12 max-w-5xl mx-auto p-5 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center text-white text-lg">
              <FaGithub />
            </div>
            <div>
              <h4 className="text-white font-bold text-xs sm:text-sm">Explore More Repositories on GitHub</h4>
              <p className="text-[11px] text-gray-400">50+ public repositories, open-source code & active commit history</p>
            </div>
          </div>
          <a
            href="https://github.com/bablukumar05"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition duration-200 shrink-0 flex items-center gap-2"
          >
            <FaGithub /> Visit GitHub Profile
          </a>
        </div>
      </div>

      {/* Modal with carousel */}
      <AnimatePresence>
        {selected && (
          <ProjectModal
            key={selected.id}
            project={selected}
            onClose={() => setSelected(null)}
            enableCarousel
          />
        )}
      </AnimatePresence>
    </section>
  );
}
