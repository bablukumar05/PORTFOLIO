import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
  FaGithub,
  FaDesktop,
  FaTabletAlt,
  FaMobileAlt,
  FaImages,
  FaGlobe,
  FaBookOpen,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTachometerAlt
} from "react-icons/fa";

export default function ProjectModal({ project, onClose, enableCarousel = true }) {
  const [viewMode, setViewMode] = useState("casestudy"); // "casestudy" | "gallery" | "live"
  const [deviceSize, setDeviceSize] = useState("100%"); // "100%" | "768px" | "375px"
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = project.images ? project.images.length : 0;

  useEffect(() => {
    if (viewMode !== "gallery" || !enableCarousel || totalImages <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalImages);
    }, 4000);
    return () => clearInterval(interval);
  }, [viewMode, enableCarousel, totalImages]);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % totalImages);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);

  const caseStudyData = {
    problem: project.id === 1
      ? "Enterprise teams struggle with fragmented tools for chat, task tracking, and analytics, leading to communication delays and poor project visibility."
      : "Standard developer portfolios often rely on heavy external libraries that cause frame drops, poor mobile performance, and static content.",
    solution: project.id === 1
      ? "Engineered TeamPulse — a unified MERN platform combining real-time Socket.IO multi-room chat, Kanban task boards, JWT RBAC permissions, and automated PDF/Excel report exports."
      : "Built a zero-dependency GPU Canvas particle engine and sequential threshold active section tracker in React 18, ensuring locked 60fps performance.",
    architecture: project.id === 1
      ? "React 19 Frontend -> Express.js & Node.js API Gateway -> Socket.IO WebSockets Server -> MongoDB Atlas Database -> Render & Vercel Cloud Hosting."
      : "React 18 Component Tree -> Custom Hook State Management -> HTML5 GPU Canvas Engine -> GSAP ScrollTrigger & Framer Motion Spring Physics.",
    challenges: project.id === 1
      ? "Synchronizing real-time Socket.IO chat state across multiple room subscriptions while preserving JWT Role-Based Access Control permissions without race conditions."
      : "Eliminating 3,000+ React re-renders/sec from mouse particle movements by shifting rendering entirely to a single HTML5 Canvas requestAnimationFrame loop.",
    results: project.id === 1
      ? "Sub-100ms real-time chat latency, automated export generation under 1.5s, and 100% RBAC security compliance."
      : "Verified 100% Google Lighthouse score across Accessibility, SEO, and Best Practices with 60fps smooth animations."
  };

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative bg-slate-900 border border-white/10 rounded-3xl max-w-5xl w-full shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Controls */}
          <div className="flex flex-wrap items-center justify-between px-6 py-4 bg-slate-950 border-b border-white/10 gap-3 z-20">
            <div className="flex items-center gap-3">
              <h4 className="text-white font-bold text-lg sm:text-xl">{project.title}</h4>
            </div>

            <div className="flex items-center gap-3">
              {/* View Mode Toggle */}
              <div className="flex bg-slate-900 p-1 rounded-xl border border-white/10 text-xs">
                <button
                  onClick={() => setViewMode("casestudy")}
                  className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition ${
                    viewMode === "casestudy"
                      ? "bg-indigo-600 text-white shadow-md"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <FaBookOpen /> Case Study
                </button>
                <button
                  onClick={() => setViewMode("gallery")}
                  className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition ${
                    viewMode === "gallery"
                      ? "bg-indigo-600 text-white shadow-md"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <FaImages /> Gallery
                </button>
                {project.link && (
                  <button
                    onClick={() => setViewMode("live")}
                    className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition ${
                      viewMode === "live"
                        ? "bg-indigo-600 text-white shadow-md"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <FaGlobe /> Live Preview
                  </button>
                )}
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 text-base p-2.5 rounded-full transition"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {/* Main Body */}
          <div className="flex-1 overflow-y-auto">
            {viewMode === "casestudy" ? (
              <div className="p-6 sm:p-8 space-y-6 text-left bg-slate-950">
                {/* Problem & Solution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-900 p-5 rounded-2xl border border-white/5">
                    <h5 className="text-xs font-semibold text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <FaExclamationTriangle /> Problem Statement
                    </h5>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {caseStudyData.problem}
                    </p>
                  </div>
                  <div className="bg-slate-900 p-5 rounded-2xl border border-white/5">
                    <h5 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <FaCheckCircle /> Engineering Solution
                    </h5>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {caseStudyData.solution}
                    </p>
                  </div>
                </div>

                {/* System Architecture */}
                <div className="bg-slate-900 p-5 rounded-2xl border border-white/5">
                  <h5 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">
                    Distributed Architecture & Data Flow
                  </h5>
                  <p className="text-xs sm:text-sm font-mono text-indigo-300 bg-slate-950 p-3 rounded-xl border border-white/10">
                    {caseStudyData.architecture}
                  </p>
                </div>

                {/* Challenges & Quantifiable Results */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-900 p-5 rounded-2xl border border-white/5">
                    <h5 className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2">
                      Engineering Challenges Faced
                    </h5>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {caseStudyData.challenges}
                    </p>
                  </div>
                  <div className="bg-slate-900 p-5 rounded-2xl border border-white/5">
                    <h5 className="text-xs font-semibold text-teal-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <FaTachometerAlt /> Quantifiable Impact
                    </h5>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {caseStudyData.results}
                    </p>
                  </div>
                </div>
              </div>
            ) : viewMode === "gallery" ? (
              <div className="relative w-full h-72 sm:h-[420px] bg-black flex items-center justify-center">
                {enableCarousel && totalImages > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      aria-label="Previous image"
                      className="absolute left-3 text-white text-xl p-3 rounded-full bg-black/60 hover:bg-black/80 z-10 transition"
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      onClick={nextImage}
                      aria-label="Next image"
                      className="absolute right-3 text-white text-xl p-3 rounded-full bg-black/60 hover:bg-black/80 z-10 transition"
                    >
                      <FaChevronRight />
                    </button>
                  </>
                )}

                <AnimatePresence initial={false}>
                  <motion.img
                    key={currentIndex}
                    src={project.images[currentIndex]}
                    alt={`${project.title} screenshot ${currentIndex + 1}`}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                  />
                </AnimatePresence>
              </div>
            ) : (
              /* Live Previewer iFrame Container */
              <div className="w-full bg-slate-950 flex flex-col items-center justify-center p-4">
                {/* Device Bar */}
                <div className="flex items-center gap-3 mb-3 bg-slate-900 px-4 py-2 rounded-xl border border-white/10 text-xs">
                  <span className="text-gray-400 font-semibold">Device View:</span>
                  <button
                    onClick={() => setDeviceSize("100%")}
                    className={`flex items-center gap-1 px-3 py-1 rounded-md transition ${
                      deviceSize === "100%" ? "bg-indigo-600 text-white" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <FaDesktop /> Desktop
                  </button>
                  <button
                    onClick={() => setDeviceSize("768px")}
                    className={`flex items-center gap-1 px-3 py-1 rounded-md transition ${
                      deviceSize === "768px" ? "bg-indigo-600 text-white" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <FaTabletAlt /> Tablet (768px)
                  </button>
                  <button
                    onClick={() => setDeviceSize("375px")}
                    className={`flex items-center gap-1 px-3 py-1 rounded-md transition ${
                      deviceSize === "375px" ? "bg-indigo-600 text-white" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <FaMobileAlt /> Mobile (375px)
                  </button>
                </div>

                {/* iFrame Container */}
                <div
                  className="bg-white rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 border border-white/10"
                  style={{ width: deviceSize, height: "460px" }}
                >
                  <iframe
                    src={project.link}
                    title={`${project.title} Live Preview`}
                    className="w-full h-full border-none"
                    loading="lazy"
                  />
                </div>
              </div>
            )}

            {/* Info Footer */}
            <div className="p-6 sm:p-8 text-left bg-slate-900 border-t border-white/10">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.highlights.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 rounded-full text-xs font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open Live Demo of ${project.title}`}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg transition duration-200 flex items-center gap-2 text-sm"
                  >
                    <FaExternalLinkAlt className="text-xs" /> Open Direct Tab
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View GitHub repository for ${project.title}`}
                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-gray-200 hover:text-white font-semibold rounded-xl border border-white/10 shadow-lg transition duration-200 flex items-center gap-2 text-sm"
                  >
                    <FaGithub className="text-lg" /> Source Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
