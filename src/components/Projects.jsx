import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaRocket,
  FaCheckCircle,
  FaLock,
} from "react-icons/fa";

import teampulse from "../assets/teampulse.jpg";
import ventureconnect from "../assets/ventureconnect.jpg";
import expensesplitter from "../assets/expensesplitter.jpg";
import interviewhub from "../assets/interviewhub.jpg";
import creatoros from "../assets/creatoros.png";

const CATEGORIES = ["All", "Enterprise SaaS", "Fintech & PWA"];

const PROJECTS = [
  {
    id: 1,
    num: "01",
    title: "TeamPulse",
    subtitle: "Enterprise Workforce & Project Management Platform",
    category: "Enterprise SaaS, Real-Time",
    badge: "Real-Time MERN",
    mockUrl: "team-pulse.vercel.app",
    description:
      "Scalable MERN SaaS platform featuring multi-room Socket.IO real-time team chat, drag-and-drop Kanban task boards across 8 IT departments, and automated reporting.",
    keyPoints: [
      "Real-time multi-room Socket.IO chat & Kanban boards across IT teams",
      "Custom Express 5 multi-tier RBAC authorization middleware (Admin, Manager, Employee)",
      "Dynamic Recharts analytics with 1-click PDF & Excel metric exports",
    ],
    tags: ["React 18", "Node.js", "Express 5", "MongoDB", "Socket.IO", "Recharts", "Tailwind"],
    live: "https://team-pulse-kam6.vercel.app/",
    github: "https://github.com/bablukumar05/TeamPulse",
    image: teampulse,
  },
  {
    id: 2,
    num: "02",
    title: "VentureConnect",
    subtitle: "Multi-Role Startup Sourcing & Investment SaaS",
    category: "Enterprise SaaS",
    badge: "Startup Sourcing SaaS",
    mockUrl: "venture-connect.vercel.app",
    description:
      "Enterprise SaaS platform connecting founders with investors and mentors. Built with 7 role-based workspaces, real-time deal flow messaging, and startup matchmaking algorithms.",
    keyPoints: [
      "7-Role permission matrix for Founders, Investors, Mentors & Admins",
      "Real-time deal messaging & Kanban transaction pipelines via Socket.IO",
      "Dynamic weighted matchmaking algorithms for Startup Health Scoring",
    ],
    tags: ["React 18", "Node.js", "Express", "MongoDB Atlas", "Socket.IO", "Tailwind CSS", "Recharts"],
    live: "https://venture-connect-beta.vercel.app",
    github: "https://github.com/bablukumar05/VentureConnect",
    image: ventureconnect,
  },
  {
    id: 3,
    num: "03",
    title: "SplitMate",
    subtitle: "Smart Group Expense Sharing & Settlement PWA",
    category: "Fintech & PWA",
    badge: "Fintech Expense PWA",
    mockUrl: "expense-splitter.vercel.app",
    description:
      "Full-stack expense sharing app built to split group bills, track balances, and settle debts with the fewest possible payments using greedy transaction minimization algorithms.",
    keyPoints: [
      "Greedy debt minimization algorithm settling group debts in minimum transactions",
      "Equal, exact, percentage & shares-based splits with zero rounding error",
      "Installable PWA with offline caching & interactive spending analytics",
    ],
    tags: ["React 18", "Tailwind CSS", "TanStack Query", "Node.js", "MongoDB", "PWA", "Recharts"],
    live: "https://expense-splitter-ochre-seven.vercel.app",
    github: "https://github.com/bablukumar05/Expense-Splitter",
    image: expensesplitter,
  },
  {
    id: 4,
    num: "04",
    title: "InterviewHub",
    subtitle: "Technical Interview & Hiring Portal",
    category: "Enterprise SaaS",
    badge: "Technical Hiring Portal",
    mockUrl: "interview-hub.vercel.app",
    description:
      "Full-stack recruitment platform with 4-role access control (Admin, Recruiter, Interviewer, Candidate) to manage postings, applications, interview scheduling, and evaluations.",
    keyPoints: [
      "4-Role RBAC with 1-Click Demo role authentication & JWT security",
      "Live Interviewer Workspace with shared question bank & weighted rubrics",
      "Printable scorecards & interactive Recharts candidate hiring analytics",
    ],
    tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "JWT", "OAuth 2.0", "Zod"],
    live: "https://interview-hub-seven-psi.vercel.app/",
    github: "https://github.com/bablukumar05/InterviewHub",
    image: interviewhub,
  },
  {
    id: 5,
    num: "05",
    title: "CreatorOS",
    subtitle: "Enterprise Creator ERP & Fintech Suite",
    category: "Enterprise SaaS, Fintech & PWA",
    badge: "Enterprise Creator SaaS",
    mockUrl: "creator-os-lake.vercel.app",
    description:
      "All-in-one business operating system for modern creators and talent agencies. Features brand deal CRM, frame-accurate video review studio (Frame.io architecture), ₹4.5M+ milestone escrow vault, neural contract scanner, and 4K streaming.",
    keyPoints: [
      "₹4.5M+ secured milestone escrow vault & cryptographic e-contracts",
      "Frame-by-frame video review studio with canvas drawings (Frame.io architecture)",
      "Direct Cloudflare R2 / S3 4K streaming & 1-click public media kits",
    ],
    tags: ["React 18", "Node.js", "Express", "MongoDB", "Socket.IO", "Cloudflare R2", "Tailwind CSS", "Zustand"],
    live: "https://creator-os-lake.vercel.app",
    github: "https://github.com/bablukumar05/Creator-OS",
    image: creatoros,
  },
];

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === "All") return true;
    return p.category.includes(filter);
  });

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-12 bg-slate-950 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid-mask-center pointer-events-none opacity-60" />
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-48 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wider uppercase mb-4">
            <FaRocket className="text-xs" /> Featured Work
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-indigo-300">Projects</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto leading-relaxed">
            Full-stack MERN & enterprise SaaS applications built for production performance, real-time collaboration, and scale.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                  filter === cat
                    ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30 scale-105"
                    : "bg-slate-900/80 border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Zig-Zag Project Rows */}
        <div className="space-y-20 sm:space-y-28">
          <AnimatePresence>
            {filteredProjects.map((p, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <motion.article
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={`flex flex-col ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  } items-center gap-8 lg:gap-14`}
                >
                  {/* Visual Side: Browser Window Mockup */}
                  <div className="w-full lg:w-7/12">
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block relative rounded-2xl bg-slate-900/90 border border-white/10 hover:border-indigo-500/50 shadow-2xl shadow-black/60 overflow-hidden transition-all duration-500 hover:-translate-y-1.5"
                    >
                      {/* Browser Mockup Top Bar */}
                      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/90 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                        </div>

                        <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-slate-900/90 border border-white/10 text-[11px] font-mono text-gray-400 max-w-[200px] sm:max-w-xs truncate">
                          <FaLock className="text-[9px] text-emerald-400 shrink-0" />
                          <span className="truncate">{p.mockUrl}</span>
                        </div>

                        <div className="w-10 flex justify-end">
                          <FaExternalLinkAlt className="text-gray-500 group-hover:text-indigo-400 transition-colors text-[10px]" />
                        </div>
                      </div>

                      {/* Project Image */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                      </div>
                    </a>
                  </div>

                  {/* Content Side */}
                  <div className="w-full lg:w-5/12 text-left">
                    {/* Number & Badge */}
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono font-bold text-indigo-400 tracking-wider">
                        {p.num}
                      </span>
                      <span className="h-3 w-[1px] bg-white/20" />
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-semibold">
                        {p.badge}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-indigo-400 mb-4">
                      {p.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4">
                      {p.description}
                    </p>

                    {/* Key Highlights */}
                    <div className="space-y-1.5 mb-5 bg-slate-900/50 border border-white/5 p-3 rounded-xl">
                      {p.keyPoints.map((point, kIdx) => (
                        <div key={kIdx} className="flex items-start gap-2 text-xs text-gray-300">
                          <FaCheckCircle className="text-indigo-400 text-[11px] mt-0.5 shrink-0" />
                          <span className="leading-snug">{point}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {p.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.08] text-gray-300 text-[11px] font-mono rounded-lg"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 pt-2">
                      {p.live && (
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Live Demo for ${p.title}`}
                          className="py-2.5 px-5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all"
                        >
                          <FaExternalLinkAlt className="text-xs" /> Live Demo
                        </a>
                      )}
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`GitHub Code for ${p.title}`}
                          className="py-2.5 px-4 bg-slate-900 hover:bg-slate-800 active:scale-95 text-gray-200 hover:text-white border border-white/10 font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
                        >
                          <FaGithub className="text-sm" /> Code
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* GitHub Repositories Banner */}
        <div className="mt-24 max-w-4xl mx-auto p-6 rounded-2xl bg-slate-900/70 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center text-white text-xl shrink-0 shadow-md">
              <FaGithub />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm sm:text-base">Explore All Repositories on GitHub</h4>
              <p className="text-xs sm:text-sm text-gray-400">50+ public repositories, open-source work & active commits</p>
            </div>
          </div>
          <a
            href="https://github.com/bablukumar05"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm transition shrink-0 flex items-center gap-2 shadow-md shadow-indigo-600/30"
          >
            <FaGithub /> Visit GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
}
