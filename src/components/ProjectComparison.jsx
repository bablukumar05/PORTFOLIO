import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBalanceScale, FaTimes, FaCheck, FaMinus } from "react-icons/fa";

const MATRIX_FEATURES = [
  { feature: "Role-Based Access Control (RBAC)", teamPulse: true, portfolio: false },
  { feature: "Real-Time WebSockets (Socket.IO)", teamPulse: true, portfolio: false },
  { feature: "Kanban Task Drag & Drop", teamPulse: true, portfolio: false },
  { feature: "GPU Canvas 60fps Particle Engine", teamPulse: false, portfolio: true },
  { feature: "Interactive In-Site Live Previewer", teamPulse: false, portfolio: true },
  { feature: "Automated PDF & Excel Export", teamPulse: true, portfolio: false },
  { feature: "Responsive Glassmorphism UX", teamPulse: true, portfolio: true },
];

export default function ProjectComparison({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-slate-900 border border-white/10 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl my-auto text-white overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <FaBalanceScale className="text-lg" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Project Comparison Matrix</h3>
                <p className="text-xs text-gray-400">Technical Capability & Feature Breakdown</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-full bg-white/5 text-gray-300">
              <FaTimes />
            </button>
          </div>

          {/* Matrix Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 text-gray-400">
                  <th className="py-3 px-4 font-semibold">Technical Feature</th>
                  <th className="py-3 px-4 font-semibold text-center text-indigo-400">TeamPulse (MERN)</th>
                  <th className="py-3 px-4 font-semibold text-center text-purple-400">Developer Portfolio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {MATRIX_FEATURES.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition">
                    <td className="py-3 px-4 text-gray-200 font-medium">{item.feature}</td>
                    <td className="py-3 px-4 text-center">
                      {item.teamPulse ? (
                        <FaCheck className="inline text-emerald-400" />
                      ) : (
                        <FaMinus className="inline text-gray-600" />
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {item.portfolio ? (
                        <FaCheck className="inline text-emerald-400" />
                      ) : (
                        <FaMinus className="inline text-gray-600" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
