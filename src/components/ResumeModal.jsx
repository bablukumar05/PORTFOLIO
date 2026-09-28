import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFilePdf, FaExternalLinkAlt, FaDownload, FaTimes } from "react-icons/fa";

export default function ResumeModal({ isOpen, onClose }) {
  const resumePath = "./Bablu_Kumar_MERN_Developer_Resume.pdf";

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="bg-slate-900 border border-white/15 rounded-2xl sm:rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 bg-slate-950 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-lg shrink-0">
                <FaFilePdf />
              </div>
              <div className="text-left">
                <h3 className="text-xs sm:text-sm font-bold text-white leading-tight">
                  Bablu_Kumar_MERN_Developer_Resume.pdf
                </h3>
                <p className="text-[11px] text-gray-400 font-mono">
                  Official Verified Resume • MERN Stack & Java DSA
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <a
                href={resumePath}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Resume Fullscreen in New Tab"
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-gray-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition duration-200"
              >
                <span className="hidden sm:inline">Open Fullscreen</span>
                <span className="sm:hidden">Fullscreen</span>
                <FaExternalLinkAlt className="text-[10px] text-indigo-400" />
              </a>

              <a
                href={resumePath}
                download="Bablu_Kumar_MERN_Developer_Resume.pdf"
                aria-label="Download Resume PDF"
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition duration-200"
              >
                <FaDownload className="text-xs" />
                <span>Download PDF</span>
              </a>

              <button
                onClick={onClose}
                aria-label="Close Resume Preview"
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/40 text-gray-400 hover:text-rose-300 transition duration-200 ml-1"
              >
                <FaTimes className="text-sm" />
              </button>
            </div>
          </div>

          <div className="relative w-full h-[72vh] sm:h-[78vh] bg-slate-950 flex flex-col items-center justify-center">
            <iframe
              src={`${resumePath}#view=FitH`}
              title="Bablu Kumar Resume PDF Preview"
              className="w-full h-full border-0"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
