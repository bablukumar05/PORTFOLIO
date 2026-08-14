import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaCode, FaRocket, FaBuilding } from "react-icons/fa";

const TIMELINE_STEPS = [
  {
    year: "2019",
    title: "BSEB Patna — Secondary (10th)",
    institution: "Board of Secondary Education, Bihar",
    desc: "Completed 10th Secondary Board examinations with strong logical fundamentals.",
    score: "Percentage: 78.8%",
    icon: <FaGraduationCap className="text-indigo-400" />,
  },
  {
    year: "2022",
    title: "BSEB Patna — Higher Secondary (12th)",
    institution: "Board of Secondary Education, Bihar",
    desc: "Completed 12th Higher Secondary Board examinations in Science stream.",
    score: "Percentage: 62.8%",
    icon: <FaGraduationCap className="text-purple-400" />,
  },
  {
    year: "2022 - 2026",
    title: "RGPV University, Bhopal",
    institution: "Rajiv Gandhi Proudyogiki Vishwavidyalaya",
    desc: "Bachelor of Technology (B.Tech) in Computer Science & Engineering. Core focus on Java DSA, OOP, and Web Architecture.",
    score: "CGPA: 7.13",
    icon: <FaCode className="text-pink-400" />,
  },
  {
    year: "2024 - Present",
    title: "Full Stack MERN & Deployments",
    institution: "Apna College & PW Skills",
    desc: "Completed Delta Full Stack & PW Skills Backend certifications. Deployed TeamPulse & Developer Portfolio.",
    score: "3 Verified Certifications",
    icon: <FaRocket className="text-emerald-400" />,
  },
];

export default function CareerTimeline() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-12 bg-slate-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto text-center z-10 relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-semibold mb-4">
          ACADEMIC & DEVELOPER JOURNEY
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Timeline</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg mb-16">
          Official academic records and full-stack engineering milestones.
        </p>

        {/* Horizontal Timeline Grid / Scrollable Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto text-left">
          {TIMELINE_STEPS.map((step, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-slate-900/80 border border-white/10 p-6 rounded-3xl flex flex-col justify-between shadow-2xl relative group hover:border-purple-500/40 transition duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg">
                    {step.icon}
                  </div>
                  <span className="text-xs font-mono text-indigo-300 px-3 py-1 bg-indigo-500/10 rounded-full border border-indigo-500/20">
                    {step.year}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-purple-300 transition duration-200">
                  {step.title}
                </h3>
                <p className="text-xs text-gray-400 font-medium mb-3">{step.institution}</p>
                <p className="text-xs text-gray-300 leading-relaxed mb-4">{step.desc}</p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-bold">{step.score}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
