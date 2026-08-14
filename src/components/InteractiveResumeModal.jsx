import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFileAlt, FaTimes, FaSearch, FaDownload, FaBriefcase, FaGraduationCap, FaCode, FaFilter } from "react-icons/fa";

const RESUME_DATA = {
  header: {
    name: "Bablu Kumar",
    role: "MERN Stack & Frontend Developer",
    location: "India",
    email: "kumarbablu74824@gmail.com",
    phone: "+91 8825138188",
  },
  skills: {
    Frontend: ["React 18", "JavaScript (ES6+)", "Tailwind CSS", "GSAP", "Framer Motion", "HTML5/CSS3", "Vite"],
    Backend: ["Node.js", "Express.js", "MongoDB Atlas", "REST APIs", "Socket.IO", "JWT Auth", "Java (DSA)"],
    MERN: ["React 18", "Node.js", "Express.js", "MongoDB", "Socket.IO", "Tailwind CSS", "Git & GitHub"]
  },
  experience: [
    {
      role: "MERN & Full-Stack Developer",
      period: "2024 - Present",
      description: "Engineered TeamPulse (Socket.IO Workforce App) and 60fps GPU Canvas Portfolio."
    }
  ],
  education: [
    {
      degree: "B.Tech Computer Science",
      institution: "RGPV University, Bhopal",
      period: "2022 - 2026",
      details: "CGPA: 7.13 | Core focus on Java DSA, OOP, and Web Systems."
    }
  ]
};

export default function InteractiveResumeModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFocus, setRoleFocus] = useState("MERN");

  if (!isOpen) return null;

  const currentSkills = RESUME_DATA.skills[roleFocus] || RESUME_DATA.skills.MERN;
  const filteredSkills = currentSkills.filter((s) =>
    s.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                <FaFileAlt className="text-lg" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Dynamic Role-Based Resume Explorer</h3>
                <p className="text-xs text-gray-400">JSON-Driven Resume Engine with Role Toggles</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="/resume.pdf"
                download="resume.pdf"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <FaDownload /> Download PDF
              </a>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 transition"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {/* Role Focus Toggles */}
          <div className="flex items-center gap-2 mb-4 bg-slate-950 p-1.5 rounded-xl border border-white/10 w-max">
            <span className="text-xs font-semibold text-gray-400 px-2 flex items-center gap-1">
              <FaFilter className="text-indigo-400" /> Target Role:
            </span>
            {["MERN", "Frontend", "Backend"].map((r) => (
              <button
                key={r}
                onClick={() => setRoleFocus(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  roleFocus === r ? "bg-indigo-600 text-white shadow" : "text-gray-400 hover:text-white"
                }`}
              >
                {r} Engineer
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative mb-6">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search skills in selected role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          {/* Content */}
          <div className="space-y-6 max-h-[380px] overflow-y-auto pr-2">
            {/* Skills */}
            <div>
              <h4 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <FaCode /> {roleFocus} Technical Focus Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {filteredSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-full text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <h4 className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <FaBriefcase /> Engineering Experience & Projects
              </h4>
              {RESUME_DATA.experience.map((exp, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-white/5">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-white text-sm">{exp.role}</span>
                    <span className="text-xs text-indigo-300 font-mono">{exp.period}</span>
                  </div>
                  <p className="text-xs text-gray-300">{exp.description}</p>
                </div>
              ))}
            </div>

            {/* Education */}
            <div>
              <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <FaGraduationCap /> Official Education
              </h4>
              {RESUME_DATA.education.map((edu, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-white/5">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-white text-sm">{edu.degree} — {edu.institution}</span>
                    <span className="text-xs text-emerald-400 font-mono">{edu.period}</span>
                  </div>
                  <p className="text-xs text-gray-300">{edu.details}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
