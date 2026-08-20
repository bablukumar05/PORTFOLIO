import React from "react";
import { motion } from "framer-motion";
import { FaRocket, FaBolt, FaBrain, FaCode, FaCheckCircle, FaLaptopCode, FaGraduationCap, FaPaperPlane } from "react-icons/fa";

export default function CandidateManifesto() {
  return (
    <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10">
        {/* Section Badge */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <FaRocket className="text-indigo-400" /> Candidate Manifesto
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Hire Bablu? <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Dedication & Impact</span>
          </h2>
          <p className="mt-3 text-gray-300 text-sm sm:text-base leading-relaxed">
            I am a deeply motivated, fast-learning software engineer driven by a passion for clean code, sub-second performance, and solving complex problems.
          </p>
        </div>

        {/* 3 Core Candidate Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Pillar 1 */}
          <motion.div
            whileHover={{ y: -6 }}
            className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-xl mb-4">
                <FaBolt />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Day-1 Production Readiness</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                I absorb existing codebases rapidly, follow clean git workflows, write modular code, and start shipping features from week one.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-[11px] text-indigo-300 font-mono">
              <FaCheckCircle className="text-emerald-400" /> Fast Onboarding Guarantee
            </div>
          </motion.div>

          {/* Pillar 2 */}
          <motion.div
            whileHover={{ y: -6 }}
            className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 text-xl mb-4">
                <FaBrain />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Algorithmic Problem Solving</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Strong foundation in Java Data Structures & Algorithms (DSA), OOP principles, space/time complexity optimization, and system logic.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-[11px] text-purple-300 font-mono">
              <FaCheckCircle className="text-emerald-400" /> Alpha Java DSA Certified
            </div>
          </motion.div>

          {/* Pillar 3 */}
          <motion.div
            whileHover={{ y: -6 }}
            className="p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 text-xl mb-4">
                <FaCode />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Obsession with Performance</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Focused on 60fps animations, zero-CPU canvas rendering, lazy loading, and sub-second WebSockets API responsiveness.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-[11px] text-pink-300 font-mono">
              <FaCheckCircle className="text-emerald-400" /> 100% Lighthouse Score
            </div>
          </motion.div>
        </div>

        {/* Daily Growth & Learning Pulse Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 flex flex-wrap items-center justify-between gap-6 shadow-2xl">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              ACTIVE LEARNING ROADMAP
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-white">Daily Growth & Technical Discipline</h4>
            <p className="text-xs text-gray-300 mt-2 leading-relaxed">
              Continuously sharpening skills in TypeScript, Advanced Microservices, and System Design patterns to deliver resilient web applications.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition hover:scale-105"
            >
              <FaPaperPlane /> Request Interview
            </a>
            <a
              href="./MERN_Developer_Resume.pdf"
              download="MERN_Developer_Resume.pdf"
              className="px-5 py-3 rounded-xl bg-slate-900 border border-white/10 hover:border-indigo-500/40 text-gray-200 font-semibold text-xs flex items-center gap-2 transition"
            >
              <FaGraduationCap className="text-indigo-400" /> Official Resume PDF
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
