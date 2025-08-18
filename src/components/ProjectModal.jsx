import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ProjectModal({ project, onClose, enableCarousel = true }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = project.images.length;

  useEffect(() => {
    if (!enableCarousel || totalImages <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalImages);
    }, 4000);
    return () => clearInterval(interval);
  }, [enableCarousel, totalImages]);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % totalImages);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative bg-gray-900 rounded-2xl max-w-4xl w-full mx-4 sm:mx-6 shadow-2xl overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white text-xl p-2 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <FaTimes />
          </button>

          {/* Carousel */}
          <div className="relative w-full h-64 sm:h-96 bg-black flex items-center justify-center">
            {enableCarousel && totalImages > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 text-white text-2xl p-2 rounded-full bg-black/40 hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 text-white text-2xl p-2 rounded-full bg-black/40 hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
          </div>

          {/* Info */}
          <div className="p-6 text-left">
            <h3 className="text-3xl font-bold text-white">{project.title}</h3>
            <p className="mt-3 text-gray-300 leading-relaxed">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.highlights.map((tech, idx) => (
                <span key={idx} className="px-3 py-1 bg-indigo-600 text-white rounded-full text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
            {project.link && (
              <div className="mt-6">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg transition-transform duration-200 ease-in-out transform hover:scale-105"
                >
                  Visit Project
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
