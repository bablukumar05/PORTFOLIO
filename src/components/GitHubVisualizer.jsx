import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaCodeBranch, FaFire, FaTerminal } from "react-icons/fa";

const LANG_BREAKDOWN = [
  { name: "JavaScript", percent: 48, color: "#f7df1e" },
  { name: "React 18 / JSX", percent: 32, color: "#61dafb" },
  { name: "Java (DSA)", percent: 12, color: "#ff6b6b" },
  { name: "HTML & CSS", percent: 8, color: "#38bdf8" },
];

export default function GitHubVisualizer() {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-12 bg-slate-950/80 border-t border-white/10 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-slate-900/90 border border-white/10 p-6 sm:p-8 rounded-3xl backdrop-blur-md shadow-2xl">
          {/* Left Stats */}
          <div className="flex-1 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-white/10 text-indigo-400 text-xs font-semibold mb-3">
              <FaGithub /> GITHUB TELEMETRY
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Open-Source Activity & Commit Streak
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm mt-2 max-w-md">
              Over 50+ repositories hosted on GitHub with daily commits across MERN stack apps and Java algorithms.
            </p>

            <div className="flex flex-wrap gap-6 mt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-lg">
                  <FaFire />
                </div>
                <div>
                  <span className="text-lg font-bold text-white block">Active Streak</span>
                  <span className="text-xs text-gray-400">Daily Commits</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-lg">
                  <FaCodeBranch />
                </div>
                <div>
                  <span className="text-lg font-bold text-white block">50+ Repos</span>
                  <span className="text-xs text-gray-400">GitHub Profile</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Language Bars */}
          <div className="w-full md:w-80 bg-slate-950 p-5 rounded-2xl border border-white/5 space-y-3">
            <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FaTerminal className="text-indigo-400" /> Language Distribution
            </h4>

            {LANG_BREAKDOWN.map((lang, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300 font-medium">{lang.name}</span>
                  <span className="text-gray-400 font-mono">{lang.percent}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: lang.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
