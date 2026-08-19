import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFileAlt, FaTimes, FaSearch, FaDownload, FaBriefcase, FaGraduationCap, FaCode, FaFilter, FaAward, FaGlobe, FaEnvelope, FaPhone, FaLinkedin, FaGithub } from "react-icons/fa";

const RESUME_DATA = {
  header: {
    name: "Bablu Kumar",
    role: "MERN Stack & Frontend Developer",
    phone: "+91-8825138188",
    email: "kumarbablu74824@gmail.com",
    linkedin: "https://www.linkedin.com/in/bablu-kumar-145642281",
    github: "https://github.com/bablukumar05",
  },
  summary:
    "Aspiring Full-Stack Developer with hands-on experience in developing modern web applications using the MERN Stack. Skilled in React.js, Node.js, Express.js, MongoDB, REST APIs, JWT Authentication, and Socket.IO. Passionate about creating high-performance, scalable, and user-centric applications while continuously learning new technologies and best practices.",
  skills: {
    MERN: ["JavaScript (ES6+)", "React.js", "Node.js", "Express.js", "MongoDB Atlas", "Socket.IO", "JWT Authentication", "Tailwind CSS", "REST APIs", "Git", "GitHub"],
    Frontend: ["HTML5", "CSS3", "React.js", "Tailwind CSS", "Framer Motion", "JavaScript (ES6+)", "Vite"],
    Backend: ["Node.js", "Express.js", "REST APIs", "JWT Authentication", "Socket.IO", "MongoDB Atlas", "MongoDB", "MySQL", "Postman"],
  },
  projects: [
    {
      title: "TeamPulse – Full-Stack Workforce & Task Management System",
      tech: "React.js, Node.js, Express.js, MongoDB Atlas, Socket.IO, JWT, Tailwind CSS",
      bullets: [
        "Built a MERN-based workforce management platform with RBAC, Kanban task boards, leave management, and real-time team chat using Socket.IO.",
        "Developed analytics dashboards and scalable REST APIs, deployed on Vercel, Render, and MongoDB Atlas."
      ]
    },
    {
      title: "Personal Developer Portfolio",
      tech: "React 18, Tailwind CSS, Framer Motion, Canvas API, Vite",
      bullets: [
        "Built a responsive portfolio with interactive UI, CLI terminal, and smooth Canvas-based animations.",
        "Enhanced performance through lazy loading, code splitting, and optimized rendering techniques."
      ]
    }
  ],
  education: [
    {
      degree: "Bachelor of Technology in Computer Science Engineering",
      institution: "Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV), Bhopal",
      period: "2022 – 2026",
      score: "CGPA: 7.13"
    },
    {
      degree: "Higher Secondary (Class XII)",
      institution: "Bihar School Examination Board (BSEB), Patna",
      period: "2022",
      score: "62.8%"
    },
    {
      degree: "Secondary (Class X)",
      institution: "Bihar School Examination Board (BSEB), Patna",
      period: "2019",
      score: "78.8%"
    }
  ],
  certifications: [
    { title: "Full Stack Web Development (Delta Batch)", issuer: "Apna College", link: "https://www.linkedin.com/feed/update/urn:li:activity:7389172063984566272/" },
    { title: "Data Structures & Algorithms with Java (Alpha Batch)", issuer: "Apna College", link: "https://www.linkedin.com/in/bablu-kumar-145642281/overlay/1772333773001/single-media-viewer/?profileId=ACoAAESdqkUBh7IG2L2pC-qneXe34j42YEqnay8" },
    { title: "Backend Development", issuer: "PW Skills (Physics Wallah)", link: "https://pwskills.com/learn/certificate/fe7c82dd-ff7e-42ac-aa98-6a52c7539f25/" }
  ],
  languages: ["Hindi", "English"]
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
          <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 mb-6 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <FaFileAlt className="text-lg" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Official Interactive Resume Explorer</h3>
                <p className="text-xs text-gray-400">Synchronized with Official Resume PDF</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="/Bablu_Kumar_MERN_Developer_Resume.pdf"
                download="Bablu_Kumar_MERN_Developer_Resume.pdf"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-lg shadow-indigo-600/30"
              >
                <FaDownload /> Download Official PDF
              </a>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 transition"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {/* Contact Bar */}
          <div className="flex flex-wrap gap-4 text-xs text-gray-300 mb-4 bg-slate-950 p-3 rounded-2xl border border-white/5">
            <span className="flex items-center gap-1.5"><FaPhone className="text-indigo-400" /> {RESUME_DATA.header.phone}</span>
            <span className="flex items-center gap-1.5"><FaEnvelope className="text-purple-400" /> {RESUME_DATA.header.email}</span>
            <a href={RESUME_DATA.header.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-indigo-300 hover:underline"><FaLinkedin /> LinkedIn</a>
            <a href={RESUME_DATA.header.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-gray-300 hover:underline"><FaGithub /> GitHub</a>
          </div>

          {/* Role Focus Toggles */}
          <div className="flex items-center gap-2 mb-4 bg-slate-950 p-1.5 rounded-xl border border-white/10 w-max">
            <span className="text-xs font-semibold text-gray-400 px-2 flex items-center gap-1">
              <FaFilter className="text-indigo-400" /> Filter Skill Set:
            </span>
            {["MERN", "Frontend", "Backend"].map((r) => (
              <button
                key={r}
                onClick={() => setRoleFocus(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  roleFocus === r ? "bg-indigo-600 text-white shadow" : "text-gray-400 hover:text-white"
                }`}
              >
                {r} Stack
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative mb-6">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search skills in resume..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          {/* Content */}
          <div className="space-y-5 max-h-[380px] overflow-y-auto pr-2">
            {/* Professional Summary */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-white/5">
              <h4 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">Professional Summary</h4>
              <p className="text-xs text-gray-300 leading-relaxed">{RESUME_DATA.summary}</p>
            </div>

            {/* Skills */}
            <div>
              <h4 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <FaCode /> {roleFocus} Technical Skills
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

            {/* Projects */}
            <div>
              <h4 className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <FaBriefcase /> Key Projects
              </h4>
              <div className="space-y-3">
                {RESUME_DATA.projects.map((proj, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-white/5">
                    <h5 className="font-bold text-white text-sm">{proj.title}</h5>
                    <p className="text-[11px] text-indigo-300 font-mono mt-0.5 mb-2">{proj.tech}</p>
                    <ul className="list-disc list-inside space-y-1 text-xs text-gray-300">
                      {proj.bullets.map((b, bIdx) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <FaGraduationCap /> Education
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {RESUME_DATA.education.map((edu, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded-2xl border border-white/5">
                    <h5 className="font-bold text-white text-xs">{edu.degree}</h5>
                    <p className="text-[11px] text-gray-400 mt-1">{edu.institution}</p>
                    <div className="mt-2 flex justify-between text-[11px] font-mono">
                      <span className="text-indigo-300">{edu.period}</span>
                      <span className="text-emerald-400 font-bold">{edu.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications & Languages */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-white/5">
                <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <FaAward /> Verified Certifications
                </h4>
                <ul className="space-y-1.5 text-xs">
                  {RESUME_DATA.certifications.map((c, idx) => (
                    <li key={idx} className="flex justify-between items-center text-gray-300">
                      <span>{c.title}</span>
                      <a href={c.link} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline font-mono text-[11px]">Verify</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-white/5">
                <h4 className="text-xs font-semibold text-pink-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <FaGlobe /> Languages
                </h4>
                <div className="flex gap-2">
                  {RESUME_DATA.languages.map((l, idx) => (
                    <span key={idx} className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-200 border border-white/10">
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
