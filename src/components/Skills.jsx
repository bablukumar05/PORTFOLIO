import React, { useState } from "react";
import {
  FaReact,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaCode,
  FaNodeJs,
  FaGitAlt,
  FaJava,
  FaDatabase,
  FaLaptopCode,
  FaTools,
} from "react-icons/fa";
import { SiTailwindcss, SiMongodb, SiGreensock, SiMysql, SiExpress, SiVite } from "react-icons/si";

const SKILL_CATEGORIES = [
  {
    title: "Frontend Engineering (Core Specialty)",
    icon: <FaLaptopCode className="text-indigo-400" />,
    skills: [
      {
        id: "react",
        name: "React 18",
        icon: <FaReact />,
        level: 85,
        color: "#61dafb",
        tree: ["Custom Hooks", "Context API", "Render Optimization", "Component Design", "Framer Physics"],
        details: "React 18 concurrent rendering, state architecture & custom hook patterns."
      },
      {
        id: "js",
        name: "JavaScript (ES6+)",
        icon: <FaJs />,
        level: 82,
        color: "#f7df1e",
        tree: ["Async/Await", "Promises", "Event Loop", "Closure Scope", "Canvas API"],
        details: "Deep understanding of ES6+, event loop, memory execution & async flow."
      },
      {
        id: "tailwind",
        name: "Tailwind CSS",
        icon: <SiTailwindcss />,
        level: 80,
        color: "#38bdf8",
        tree: ["Responsive Layouts", "Flex & Grid", "Glassmorphism", "Custom Configs"],
        details: "Utility-first design systems, design tokens & responsive breakpoints."
      },
      {
        id: "gsap",
        name: "GSAP & Motion",
        icon: <SiGreensock />,
        level: 75,
        color: "#88ce02",
        tree: ["ScrollTrigger", "Timelines", "Spring Physics", "Micro-Interactions"],
        details: "Smooth scroll interactions, ScrollTrigger timelines & 60fps animations."
      },
    ],
  },
  {
    title: "Backend Architecture & MERN Stack",
    icon: <FaDatabase className="text-pink-400" />,
    skills: [
      {
        id: "node",
        name: "Node.js",
        icon: <FaNodeJs />,
        level: 60,
        color: "#3c873a",
        tree: ["Event-Driven I/O", "REST Endpoints", "Middleware", "Socket.IO"],
        details: "Asynchronous I/O runtime, API routes & WebSockets real-time server."
      },
      {
        id: "express",
        name: "Express.js",
        icon: <SiExpress />,
        level: 55,
        color: "#e2e8f0",
        tree: ["REST API Design", "JWT Auth", "RBAC Permissions", "Error Handling"],
        details: "Scalable HTTP server routing, JWT authentication & role middleware."
      },
      {
        id: "mongodb",
        name: "MongoDB Atlas",
        icon: <SiMongodb />,
        level: 50,
        color: "#47a248",
        tree: ["Document Schemas", "Mongoose ORM", "Aggregation Pipelines"],
        details: "NoSQL document database modeling & cloud cluster deployment."
      },
    ],
  },
  {
    title: "Computer Science & Data Structures (Java)",
    icon: <FaCode className="text-purple-400" />,
    skills: [
      {
        id: "dsa",
        name: "Java DSA",
        icon: <FaCode />,
        level: 75,
        color: "#ff6b6b",
        tree: ["Arrays & HashMaps", "Recursion & Trees", "Graph Algorithms", "Sorting & Searching"],
        details: "Strong problem solving in Data Structures & Algorithmic complexity analysis."
      },
      {
        id: "java",
        name: "Java Core",
        icon: <FaJava />,
        level: 70,
        color: "#f89820",
        tree: ["OOP Principles", "Inheritance", "Polymorphism", "Collections Framework"],
        details: "Object-Oriented Programming, Encapsulation, and Java Collections Framework."
      },
    ],
  },
];

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState(null);

  const radius = 42;
  const circumference = 2 * Math.PI * radius;

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-12 bg-slate-950 text-white overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
            INTERACTIVE SKILLS GRAPH
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Depth-Oriented <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Skill Trees</span>
          </h2>
          <p className="mt-4 text-gray-400 text-base sm:text-lg">
            Hover over any core technology to inspect sub-skill branches, architecture patterns, and technical depth.
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-12">
          {SKILL_CATEGORIES.map((cat, catIdx) => (
            <div key={catIdx} className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
              {/* Category Header */}
              <div className="flex items-center gap-3.5 mb-8 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl">
                  {cat.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                  {cat.title}
                </h3>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cat.skills.map((skill) => {
                  const strokeOffset = circumference * (1 - skill.level / 100);
                  const isActive = activeSkill === skill.id;

                  return (
                    <div
                      key={skill.id}
                      onMouseEnter={() => setActiveSkill(skill.id)}
                      onMouseLeave={() => setActiveSkill(null)}
                      className={`bg-slate-950 p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                        isActive ? "border-indigo-500/50 shadow-xl shadow-indigo-600/10 bg-slate-900/90" : "border-white/5"
                      }`}
                    >
                      <div>
                        {/* Top Icon & Name */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl" style={{ color: skill.color }}>
                              {skill.icon}
                            </div>
                            <span className="font-bold text-white text-base">{skill.name}</span>
                          </div>
                          <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                            {skill.level}%
                          </span>
                        </div>

                        <p className="text-xs text-gray-400 mb-4">{skill.details}</p>

                        {/* Sub-skill tree branches */}
                        <div className="space-y-1.5 pt-3 border-t border-white/5">
                          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1">
                            └ Sub-skill Branches
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {skill.tree.map((branch, bIdx) => (
                              <span
                                key={bIdx}
                                className="px-2.5 py-1 bg-slate-900 border border-white/10 text-gray-300 rounded-lg text-[11px] font-medium"
                              >
                                {branch}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
