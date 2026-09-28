import React, { useState } from "react";
import {
  FaReact,
  FaJs,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaCode,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaDatabase,
  FaLaptopCode,
  FaTools,
  FaServer,
  FaLock,
  FaBolt,
  FaCloud,
  FaRocket,
  FaPaperPlane,
  FaProjectDiagram,
  FaCubes,
} from "react-icons/fa";
import { SiTailwindcss, SiMongodb, SiMysql, SiExpress } from "react-icons/si";

const SKILL_CATEGORIES = [
  {
    title: "Programming Languages",
    icon: <FaCode className="text-indigo-400" />,
    cols: "md:grid-cols-2",
    skills: [
      {
        id: "js",
        name: "JavaScript (ES6+)",
        icon: <FaJs />,
        level: 88,
        color: "#f7df1e",
        tree: ["Async/Await", "Promises", "Closures", "Event Loop", "DOM & Fetch API"],
        details: "Modern ES6+ syntax, asynchronous programming, closures, and browser execution."
      },
      {
        id: "python",
        name: "Python",
        icon: <FaPython />,
        level: 78,
        color: "#38bdf8",
        tree: ["Scripting & Automation", "Data Structures", "OOP in Python", "Problem Solving"],
        details: "Clean, expressive scripting, algorithmic problem solving, and backend logic."
      },
    ],
  },
  {
    title: "Frontend Development",
    icon: <FaLaptopCode className="text-indigo-400" />,
    cols: "md:grid-cols-2 lg:grid-cols-3",
    skills: [
      {
        id: "react",
        name: "React.js",
        icon: <FaReact />,
        level: 88,
        color: "#61dafb",
        tree: ["Custom Hooks", "Context API", "Code Splitting", "State Management"],
        details: "Component-driven SPA architecture, React 18 hooks, and performance optimization."
      },
      {
        id: "tailwind",
        name: "Tailwind CSS",
        icon: <SiTailwindcss />,
        level: 86,
        color: "#38bdf8",
        tree: ["Responsive Design", "Glassmorphism", "Custom Themes", "Dark UI Systems"],
        details: "Utility-first responsive layouts, design tokens, and modern dark-mode interfaces."
      },
      {
        id: "framer",
        name: "Framer Motion",
        icon: <FaBolt />,
        level: 82,
        color: "#a855f7",
        tree: ["Spring Physics", "Layout Transitions", "AnimatePresence", "Gesture UX"],
        details: "Fluid 60fps micro-interactions, modal transitions, and interactive motion UX."
      },
      {
        id: "html5",
        name: "HTML5",
        icon: <FaHtml5 />,
        level: 92,
        color: "#e34f26",
        tree: ["Semantic Markup", "Web Accessibility (a11y)", "SEO Meta Tags", "Canvas API"],
        details: "Semantic document structure, ARIA accessibility standards, and SEO optimization."
      },
      {
        id: "css3",
        name: "CSS3",
        icon: <FaCss3Alt />,
        level: 88,
        color: "#1572b6",
        tree: ["Flexbox & CSS Grid", "Keyframe Animations", "Custom Properties", "Media Queries"],
        details: "Modern layout engines, hardware-accelerated transitions, and responsive breakpoints."
      },
    ],
  },
  {
    title: "Backend & Real-Time APIs",
    icon: <FaServer className="text-indigo-400" />,
    cols: "md:grid-cols-2 lg:grid-cols-3",
    skills: [
      {
        id: "node",
        name: "Node.js",
        icon: <FaNodeJs />,
        level: 82,
        color: "#3c873a",
        tree: ["Event-Driven Runtime", "Async I/O", "Streams & Buffers", "Modular Architecture"],
        details: "Scalable server-side JavaScript runtime for high-concurrency backend services."
      },
      {
        id: "express",
        name: "Express.js",
        icon: <SiExpress />,
        level: 84,
        color: "#e2e8f0",
        tree: ["Middleware Chains", "MVC Controllers", "Rate Limiting", "Central Error Handling"],
        details: "Fast, modular web framework for building structured RESTful APIs and middleware."
      },
      {
        id: "rest",
        name: "REST APIs",
        icon: <FaServer />,
        level: 86,
        color: "#6366f1",
        tree: ["CRUD Endpoints", "Zod Validation", "Status Codes", "Pagination & Filtering"],
        details: "Clean resource-oriented API architecture with schema validation and predictable responses."
      },
      {
        id: "jwt",
        name: "JWT",
        icon: <FaLock />,
        level: 85,
        color: "#f59e0b",
        tree: ["Role-Based Access (RBAC)", "Token Verification", "OAuth 2.0 Flows", "Protected Routes"],
        details: "Stateless authentication and multi-role authorization middleware (Admin/Recruiter/User)."
      },
      {
        id: "socketio",
        name: "Socket.IO",
        icon: <FaBolt />,
        level: 80,
        color: "#10b981",
        tree: ["Bi-Directional Events", "Multi-Room Chat", "Live Notifications", "Presence Sync"],
        details: "Low-latency WebSockets engine for real-time team chat and live deal/task updates."
      },
    ],
  },
  {
    title: "Databases & Cloud Storage",
    icon: <FaDatabase className="text-indigo-400" />,
    cols: "md:grid-cols-3",
    skills: [
      {
        id: "mongodb",
        name: "MongoDB",
        icon: <SiMongodb />,
        level: 84,
        color: "#47a248",
        tree: ["Mongoose ODM", "Schema Modeling", "Indexing", "Aggregation Pipelines"],
        details: "NoSQL document database design, relational population, and query optimization."
      },
      {
        id: "atlas",
        name: "MongoDB Atlas",
        icon: <FaCloud />,
        level: 82,
        color: "#10b981",
        tree: ["Cloud Clusters", "Connection Pooling", "IP Whitelisting", "Replica Sets"],
        details: "Managed cloud database deployment, automated backups, and secure cluster access."
      },
      {
        id: "mysql",
        name: "MySQL",
        icon: <SiMysql />,
        level: 76,
        color: "#00758f",
        tree: ["Relational Schemas", "SQL Joins", "ACID Transactions", "Normalization"],
        details: "Structured relational database management, complex SQL queries, and data integrity."
      },
    ],
  },
  {
    title: "Developer Tools & Cloud Deployment",
    icon: <FaTools className="text-indigo-400" />,
    cols: "md:grid-cols-2 lg:grid-cols-3",
    skills: [
      {
        id: "git",
        name: "Git",
        icon: <FaGitAlt />,
        level: 86,
        color: "#f05032",
        tree: ["Branching Workflows", "Merge & Rebase", "Conflict Resolution", "Version History"],
        details: "Distributed version control for clean commit histories and collaborative development."
      },
      {
        id: "github",
        name: "GitHub",
        icon: <FaGithub />,
        level: 88,
        color: "#ffffff",
        tree: ["Pull Requests", "GitHub Pages", "CI/CD Actions", "Repository Management"],
        details: "Code hosting, open-source collaboration, issue tracking, and automated workflows."
      },
      {
        id: "postman",
        name: "Postman",
        icon: <FaPaperPlane />,
        level: 85,
        color: "#ff6c37",
        tree: ["API Collections", "Bearer Auth Testing", "Environment Variables", "Payload Debugging"],
        details: "Comprehensive REST endpoint testing, automated request collections, and debugging."
      },
      {
        id: "vscode",
        name: "VS Code",
        icon: <FaLaptopCode />,
        level: 90,
        color: "#007acc",
        tree: ["ESLint & Prettier", "Integrated Terminal", "GitLens", "Live Debugging"],
        details: "High-efficiency development environment configured with linting and debugging workflows."
      },
      {
        id: "vercel",
        name: "Vercel",
        icon: <FaRocket />,
        level: 86,
        color: "#e2e8f0",
        tree: ["Edge CDN Deploys", "Preview Branches", "SPA Routing Rewrites", "Env Configuration"],
        details: "Zero-downtime frontend and full-stack deployments with instant global CDN caching."
      },
      {
        id: "render",
        name: "Render",
        icon: <FaCloud />,
        level: 82,
        color: "#38bdf8",
        tree: ["Node/Express Hosting", "WebSocket Support", "Auto-Deploy Hooks", "Health Checks"],
        details: "Cloud hosting for persistent Node.js REST APIs and real-time Socket.IO servers."
      },
    ],
  },
  {
    title: "Computer Science Fundamentals",
    icon: <FaCubes className="text-indigo-400" />,
    cols: "md:grid-cols-2",
    skills: [
      {
        id: "dsa",
        name: "DSA (Data Structures & Algorithms)",
        icon: <FaProjectDiagram />,
        level: 80,
        color: "#ff6b6b",
        tree: ["Arrays & Strings", "HashMaps & Trees", "Sorting & Searching", "Time/Space Complexity"],
        details: "Algorithmic problem-solving, Big-O optimization, and core data structure mastery."
      },
      {
        id: "oop",
        name: "OOP (Object-Oriented Programming)",
        icon: <FaCubes />,
        level: 84,
        color: "#f59e0b",
        tree: ["Encapsulation", "Inheritance", "Polymorphism", "Abstraction & Modular Design"],
        details: "Designing clean, reusable, and maintainable software architectures using OOP principles."
      },
    ],
  },
];

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState(null);

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-12 bg-slate-950 text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-grid-mask-center pointer-events-none opacity-70" />
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-slate-800/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
            INTERACTIVE SKILLS GRAPH
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Depth-Oriented <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-indigo-300">Skill Trees</span>
          </h2>
        </div>

        <div className="space-y-8">
          {SKILL_CATEGORIES.map((cat, catIdx) => (
            <div key={catIdx} className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between gap-3.5 mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl">
                    {cat.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                    {cat.title}
                  </h3>
                </div>
                <span className="text-xs font-mono text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full hidden sm:inline-block">
                  {cat.skills.length} {cat.skills.length === 1 ? "Skill" : "Skills"}
                </span>
              </div>

              <div className={`grid grid-cols-1 ${cat.cols} gap-5`}>
                {cat.skills.map((skill) => {
                  const isActive = activeSkill === skill.id;

                  return (
                    <div
                      key={skill.id}
                      onMouseEnter={() => setActiveSkill(skill.id)}
                      onMouseLeave={() => setActiveSkill(null)}
                      className={`bg-slate-950 p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                        isActive ? "border-indigo-500/50 shadow-xl shadow-indigo-600/10 bg-slate-900/90 -translate-y-0.5" : "border-white/5"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
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

                        <p className="text-xs text-gray-400 mb-4 leading-relaxed">{skill.details}</p>

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
