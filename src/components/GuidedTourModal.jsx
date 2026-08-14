import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBriefcase, FaTimes, FaArrowRight, FaCheck } from "react-icons/fa";

const TOUR_STEPS = [
  {
    step: 1,
    title: "Welcome Hiring Manager! 👋",
    desc: "Let's take a quick 30-second guided tour through Bablu's core engineering highlights.",
    targetId: "home",
  },
  {
    step: 2,
    title: "Technical Competencies & Skills 🛠️",
    desc: "Categorized proficiency across React 18, Tailwind CSS, Node.js, Express, MongoDB, and Java DSA.",
    targetId: "skills",
  },
  {
    step: 3,
    title: "Production Projects (TeamPulse) 🚀",
    desc: "Inspect real-world MERN applications featuring WebSockets, Socket.IO, RBAC, and Recharts analytics.",
    targetId: "projects",
  },
  {
    step: 4,
    title: "Direct Contact & Resume Download ✉️",
    desc: "Download verified PDF credentials or copy email address with one-click feedback.",
    targetId: "contact",
  },
];

export default function GuidedTourModal({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const handleNext = () => {
    const nextIdx = currentStep + 1;
    if (nextIdx < TOUR_STEPS.length) {
      setCurrentStep(nextIdx);
      const targetEl = document.getElementById(TOUR_STEPS[nextIdx].targetId);
      targetEl?.scrollIntoView({ behavior: "smooth" });
    } else {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-slate-900 border border-white/10 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl text-white text-center"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-mono text-indigo-400 font-bold">
              STEP {TOUR_STEPS[currentStep].step} OF {TOUR_STEPS.length}
            </span>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <FaTimes />
            </button>
          </div>

          <h3 className="text-xl font-extrabold text-white mb-2">
            {TOUR_STEPS[currentStep].title}
          </h3>
          <p className="text-xs text-gray-300 leading-relaxed mb-6">
            {TOUR_STEPS[currentStep].desc}
          </p>

          <button
            onClick={handleNext}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-lg transition"
          >
            {currentStep + 1 < TOUR_STEPS.length ? (
              <>
                Next Tour Stop <FaArrowRight className="text-xs" />
              </>
            ) : (
              <>
                Finish Tour <FaCheck className="text-xs" />
              </>
            )}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
