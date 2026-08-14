import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaNetworkWired, FaTimes, FaServer, FaDatabase, FaMobileAlt, FaBolt } from "react-icons/fa";

export default function SystemArchitectureModal({ isOpen, onClose, projectTitle = "TeamPulse" }) {
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
                <FaNetworkWired className="text-lg" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{projectTitle} — System Architecture & Data Flow</h3>
                <p className="text-xs text-gray-400">Production MERN Stack Distributed Topology</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 transition"
            >
              <FaTimes />
            </button>
          </div>

          {/* Animated System Diagram */}
          <div className="relative bg-slate-950 p-6 rounded-2xl border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 my-4">
            {/* Node 1: Client */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex-1 bg-slate-900 border border-indigo-500/30 p-5 rounded-2xl flex flex-col items-center text-center shadow-lg w-full"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-2xl mb-3">
                <FaMobileAlt />
              </div>
              <h4 className="font-bold text-white text-base">Client Tier</h4>
              <p className="text-xs text-gray-400 mt-1">React 19 SPA + Tailwind CSS</p>
              <span className="mt-3 px-2.5 py-1 bg-indigo-500/10 text-indigo-300 text-[10px] font-semibold rounded-full border border-indigo-500/20">
                Vercel CDN
              </span>
            </motion.div>

            {/* Connection Arrow 1 */}
            <div className="flex flex-col items-center text-indigo-400">
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="hidden md:block text-xl"
              >
                <FaBolt />
              </motion.div>
              <span className="text-[10px] text-gray-400 font-mono mt-1">HTTPS / WSS</span>
            </div>

            {/* Node 2: Real-time Gateway */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex-1 bg-slate-900 border border-purple-500/30 p-5 rounded-2xl flex flex-col items-center text-center shadow-lg w-full"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-2xl mb-3">
                <FaServer />
              </div>
              <h4 className="font-bold text-white text-base">API & Real-time</h4>
              <p className="text-xs text-gray-400 mt-1">Node.js + Express + Socket.IO</p>
              <span className="mt-3 px-2.5 py-1 bg-purple-500/10 text-purple-300 text-[10px] font-semibold rounded-full border border-purple-500/20">
                Render Cloud
              </span>
            </motion.div>

            {/* Connection Arrow 2 */}
            <div className="flex flex-col items-center text-purple-400">
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                className="hidden md:block text-xl"
              >
                <FaBolt />
              </motion.div>
              <span className="text-[10px] text-gray-400 font-mono mt-1">Mongoose ODM</span>
            </div>

            {/* Node 3: Database */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex-1 bg-slate-900 border border-emerald-500/30 p-5 rounded-2xl flex flex-col items-center text-center shadow-lg w-full"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl mb-3">
                <FaDatabase />
              </div>
              <h4 className="font-bold text-white text-base">Database Tier</h4>
              <p className="text-xs text-gray-400 mt-1">MongoDB Atlas Cluster</p>
              <span className="mt-3 px-2.5 py-1 bg-emerald-500/10 text-emerald-300 text-[10px] font-semibold rounded-full border border-emerald-500/20">
                Replica Sets
              </span>
            </motion.div>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 leading-relaxed">
            <span className="font-semibold text-white">Architecture Highlights:</span> Multi-room WebSocket communication for instant chat notifications, JWT authentication middleware with role claims, and automated Recharts analytics aggregation.
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
