import React from "react";
import { motion } from "framer-motion";
import { FaLaptopCode, FaGithub, FaLayerGroup, FaCloudUploadAlt } from "react-icons/fa";

const BENCHMARKS = [
  { label: "Completed Projects", value: "10+", icon: <FaLaptopCode className="text-indigo-400" /> },
  { label: "GitHub Repositories", value: "5+", icon: <FaGithub className="text-purple-400" /> },
  { label: "Tech Stack Tools", value: "15+", icon: <FaLayerGroup className="text-pink-400" /> },
  { label: "Deployments", value: "3+", icon: <FaCloudUploadAlt className="text-emerald-400" /> },
];

export default function BenchmarkCounters() {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-12 bg-slate-950/90 border-y border-white/10 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {BENCHMARKS.map((b, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-slate-900/60 border border-white/5 rounded-3xl backdrop-blur-md flex flex-col items-center justify-center shadow-lg"
          >
            <div className="text-2xl mb-2">{b.icon}</div>
            <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{b.value}</span>
            <span className="text-xs text-gray-400 mt-1 font-medium">{b.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
