import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import profile from "../assets/profile.jpg";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaDownload,
  FaArrowRight,
  FaReact,
  FaNodeJs,
  FaCode,
  FaUserAlt,
} from "react-icons/fa";
import { SiTailwindcss, SiJavascript } from "react-icons/si";

export default function Hero({ onOpenGuidedTour }) {
  const [activeTab, setActiveTab] = useState("profile");
  const resumePath = "/Bablu_Kumar_MERN_Developer_Resume.pdf";

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const navbarHeight = document.querySelector("nav")?.offsetHeight || 75;
    const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const socialLinks = [
    { Icon: FaGithub, url: "https://github.com/bablukumar05", name: "GitHub" },
    { Icon: FaLinkedin, url: "https://www.linkedin.com/in/bablu-kumar-145642281/", name: "LinkedIn" },
    { Icon: FaTwitter, url: "https://twitter.com/bablu_kumar", name: "Twitter" },
    { Icon: FaInstagram, url: "https://www.instagram.com/bablu_yadav__2024/", name: "Instagram" },
  ];

  const metrics = [
    { label: "Core Tech", value: "MERN Stack" },
    { label: "Motion UX", value: "60 FPS Smooth" },
    { label: "Responsive", value: "100% Mobile Ready" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 lg:px-16 pt-24 pb-16 bg-slate-950 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-pink-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl w-full mx-auto grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-medium mb-6 backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            Available for MERN & Frontend Roles
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Bablu Kumar</span>
          </h1>

          {/* Subtitle / Typewriter */}
          <div className="mt-4 text-indigo-300 font-semibold text-xl sm:text-2xl min-h-[36px] flex items-center">
            <Typewriter
              words={[
                "MERN Stack & Frontend Developer",
                "React.js",
                "GSAP & Motion UX Engineer",
                "Java DSA Problem Solver",
              ]}
              loop
              cursor
              cursorStyle="▍"
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={1600}
            />
          </div>

          {/* Value Proposition Description */}
          <p className="mt-5 text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl">
            Aspiring MERN & Frontend Developer based in India, dedicated to building responsive, accessible web applications using React 18, Tailwind CSS, Node.js, and Java DSA algorithms.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start w-full sm:w-auto">
            {onOpenGuidedTour && (
              <button
                onClick={onOpenGuidedTour}
                aria-label="View My Best Work Guided Tour"
                className="px-7 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-lg shadow-emerald-500/30 transition duration-300 hover:scale-[1.03] active:scale-[0.98] flex items-center gap-2 text-sm sm:text-base"
              >
                🚀 View My Best Work (30s Tour)
              </button>
            )}
            <button
              onClick={() => scrollTo("projects")}
              aria-label="Explore Projects"
              className="px-7 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-600/30 transition duration-300 hover:scale-[1.03] active:scale-[0.98] flex items-center gap-2 text-sm sm:text-base"
            >
              Explore Projects <FaArrowRight className="text-xs" />
            </button>
            <a
              href={resumePath}
              download="Bablu_Kumar_MERN_Developer_Resume.pdf"
              aria-label="Download Resume"
              className="px-7 py-3.5 rounded-xl font-semibold text-gray-200 bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-indigo-500/40 shadow-lg transition duration-300 hover:scale-[1.03] active:scale-[0.98] flex items-center gap-2 text-sm sm:text-base"
            >
              <FaDownload className="text-xs text-indigo-400" /> Download Resume
            </a>
          </div>

          {/* Metrics Row */}
          <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-3 gap-4 sm:gap-8 w-full max-w-lg">
            {metrics.map((m, idx) => (
              <div key={idx} className="text-center lg:text-left">
                <p className="text-lg sm:text-xl font-bold text-white tracking-tight">{m.value}</p>
                <p className="text-xs text-gray-400 mt-1 font-medium">{m.label}</p>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="mt-8 flex items-center gap-4">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Connect:</span>
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, url, name }, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit Bablu Kumar's ${name}`}
                  className="w-10 h-10 rounded-xl bg-slate-900/80 border border-white/10 flex items-center justify-center text-gray-300 hover:text-indigo-400 hover:border-indigo-500/40 hover:scale-110 transition duration-200"
                >
                  <Icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column (5 cols): Dual-Mode Recruiter Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center w-full"
        >
          <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
            {/* Mac OS Window Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex bg-slate-950 p-1 rounded-xl border border-white/10 text-xs">
                <button
                  onClick={() => setActiveTab("profile")}
                  aria-label="Profile View"
                  className={`px-3 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition ${
                    activeTab === "profile"
                      ? "bg-indigo-600 text-white shadow-md"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <FaUserAlt className="text-xs" /> Avatar
                </button>
                <button
                  onClick={() => setActiveTab("code")}
                  aria-label="Code View"
                  className={`px-3 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition ${
                    activeTab === "code"
                      ? "bg-indigo-600 text-white shadow-md"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <FaCode className="text-xs" /> developer.js
                </button>
              </div>
            </div>

            {/* Window Content */}
            <div className="p-6 min-h-[340px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {activeTab === "profile" ? (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="relative flex items-center justify-center w-full py-4"
                  >
                    <div className="relative w-56 h-56 sm:w-64 sm:h-64">
                      {/* Ambient Glow */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 opacity-30 blur-2xl animate-pulse" />

                      {/* Image Frame */}
                      <div className="relative w-full h-full rounded-full p-2 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-2xl">
                        <div className="w-full h-full rounded-full overflow-hidden bg-slate-950">
                          <img
                            src={profile}
                            alt="Bablu Kumar Profile"
                            className="w-full h-full object-cover transform transition duration-500 hover:scale-105"
                            loading="eager"
                          />
                        </div>
                      </div>

                      {/* Tech Badges */}
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-2 -left-2 px-3 py-1.5 rounded-xl bg-slate-950/90 border border-white/10 shadow-xl flex items-center gap-2 text-xs font-semibold text-cyan-400"
                      >
                        <FaReact className="text-sm animate-spin-slow" /> React 18
                      </motion.div>
                      <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute -bottom-2 -right-2 px-3 py-1.5 rounded-xl bg-slate-950/90 border border-white/10 shadow-xl flex items-center gap-2 text-xs font-semibold text-emerald-400"
                      >
                        <FaNodeJs className="text-sm" /> Node.js
                      </motion.div>
                      <motion.div
                        animate={{ x: [0, 6, 0] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="absolute top-1/2 -right-4 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-slate-950/90 border border-white/10 shadow-xl flex items-center gap-2 text-xs font-semibold text-sky-400"
                      >
                        <SiTailwindcss className="text-sm" /> Tailwind
                      </motion.div>
                      <motion.div
                        animate={{ x: [0, -6, 0] }}
                        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                        className="absolute bottom-4 -left-4 px-3 py-1.5 rounded-xl bg-slate-950/90 border border-white/10 shadow-xl flex items-center gap-2 text-xs font-semibold text-yellow-400"
                      >
                        <SiJavascript className="text-sm" /> ES6+ JS
                      </motion.div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="code"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="w-full text-left font-mono text-xs sm:text-sm text-gray-300 leading-relaxed"
                  >
                    <p className="text-gray-500 mb-2">// Recruiter Developer Profile</p>
                    <p><span className="text-pink-400">const</span> <span className="text-indigo-300">developer</span> = &#123;</p>
                    <p className="pl-4"><span className="text-purple-300">name</span>: <span className="text-emerald-300">"Bablu Kumar"</span>,</p>
                    <p className="pl-4"><span className="text-purple-300">role</span>: <span className="text-emerald-300">"MERN Stack Developer"</span>,</p>
                    <p className="pl-4"><span className="text-purple-300">status</span>: <span className="text-emerald-300">"🟢 Open for Hire"</span>,</p>
                    <p className="pl-4"><span className="text-purple-300">coreStack</span>: [</p>
                    <p className="pl-8"><span className="text-yellow-300">"React 18"</span>, <span className="text-yellow-300">"Tailwind CSS"</span>,</p>
                    <p className="pl-8"><span className="text-yellow-300">"Node.js"</span>, <span className="text-yellow-300">"Java DSA"</span></p>
                    <p className="pl-4">],</p>
                    <p className="pl-4"><span className="text-purple-300">hireable</span>: <span className="text-orange-400">true</span>,</p>
                    <p className="pl-4"><span className="text-purple-300">location</span>: <span className="text-emerald-300">"India"</span></p>
                    <p>&#125;;</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
