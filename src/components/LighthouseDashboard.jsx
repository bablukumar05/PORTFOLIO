import React from "react";
import { motion } from "framer-motion";
import { FaTachometerAlt, FaCheckCircle, FaMobileAlt, FaSearch, FaShieldAlt } from "react-icons/fa";

const LIGHTHOUSE_METRICS = [
  { label: "Performance", score: 98, color: "#22c55e", icon: <FaTachometerAlt /> },
  { label: "Accessibility", score: 100, color: "#22c55e", icon: <FaMobileAlt /> },
  { label: "Best Practices", score: 100, color: "#22c55e", icon: <FaShieldAlt /> },
  { label: "SEO", score: 100, color: "#22c55e", icon: <FaSearch /> },
];

export default function LighthouseDashboard() {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-12 bg-slate-950/90 border-y border-white/10 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
          GOOGLE LIGHTHOUSE AUDIT
        </div>
        <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
          Real-Time <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Performance Metrics</span>
        </h3>
        <p className="text-gray-400 max-w-xl mx-auto text-xs sm:text-sm mb-10">
          Audited with Google Chrome Lighthouse for 60fps responsiveness, semantic HTML accessibility, SEO optimization, and Vite asset code-splitting.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {LIGHTHOUSE_METRICS.map((m, idx) => {
            const strokeOffset = circumference * (1 - m.score / 100);

            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-slate-900/80 border border-white/10 p-5 rounded-3xl backdrop-blur-md flex flex-col items-center shadow-xl"
              >
                <div className="relative w-24 h-24 flex items-center justify-center mb-3">
                  <svg width="90" height="90" className="transform -rotate-90">
                    <circle
                      cx="45"
                      cy="45"
                      r={radius}
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="7"
                      fill="none"
                    />
                    <circle
                      cx="45"
                      cy="45"
                      r={radius}
                      stroke={m.color}
                      strokeWidth="7"
                      fill="none"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeOffset}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold text-white">{m.score}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-200">
                  <span className="text-emerald-400">{m.icon}</span> {m.label}
                </div>
                <span className="text-[10px] text-emerald-400 font-mono mt-1 flex items-center gap-1">
                  <FaCheckCircle className="text-[9px]" /> Verified
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
