import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCogs, FaTimes, FaLayerGroup, FaBolt, FaMagic, FaCheckCircle } from "react-icons/fa";

export default function HowIBuiltThis({ isOpen, onClose }) {
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
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <FaCogs className="text-lg" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">How I Built This Portfolio — Engineering Case Study</h3>
                <p className="text-xs text-gray-400">Component Architecture, GPU Canvas Engine & Performance Math</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-full bg-white/5 text-gray-300">
              <FaTimes />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-h-[440px] overflow-y-auto pr-2">
            {/* Card 1: GPU Canvas Engine */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-lg mb-3">
                  <FaBolt />
                </div>
                <h4 className="font-bold text-white text-base mb-2">0% CPU GPU Particles</h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Replaced 50 React setInterval timers (which triggered 3,000 state re-renders/sec) with a single GPU HTML5 Canvas requestAnimationFrame loop.
                </p>
              </div>
              <span className="mt-4 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <FaCheckCircle /> 60 FPS Locked
              </span>
            </div>

            {/* Card 2: Viewport Scroll Indicator */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-lg mb-3">
                  <FaLayerGroup />
                </div>
                <h4 className="font-bold text-white text-base mb-2">Sequential Viewport Math</h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Implemented bounding threshold calculations using BoundingClientRect so active navbar indicators glide step-by-step without skipping.
                </p>
              </div>
              <span className="mt-4 text-[10px] font-mono text-purple-400 flex items-center gap-1">
                <FaCheckCircle /> Framer Spring Physics
              </span>
            </div>

            {/* Card 3: In-Site Previewer */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center text-lg mb-3">
                  <FaMagic />
                </div>
                <h4 className="font-bold text-white text-base mb-2">In-Site Web Previewer</h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Built responsive iframe sandboxes allowing recruiters to test live deployed web applications across Desktop, Tablet, and Mobile views.
                </p>
              </div>
              <span className="mt-4 text-[10px] font-mono text-pink-400 flex items-center gap-1">
                <FaCheckCircle /> Zero Outer Tabs Required
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
