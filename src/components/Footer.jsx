import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaHeart, FaDownload, FaArrowUp } from "react-icons/fa";

export default function Footer() {
  const scrollTo = (id) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    const navbarHeight = document.querySelector("nav")?.offsetHeight || 75;
    const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-slate-950 border-t border-white/10 text-gray-400 pt-16 pb-12 px-6 sm:px-12 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-12">
        {/* Top Row: Brand & Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between">
          {/* Brand */}
          <div className="md:col-span-6 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg select-none shadow-lg shadow-indigo-600/30">
                B
              </div>
              <span className="text-white font-extrabold text-xl tracking-tight">Bablu Kumar</span>
            </div>
            <p className="text-gray-400 text-sm max-w-md leading-relaxed">
              MERN Stack & Frontend Developer specializing in building high-performance, responsive web applications with React 18, Tailwind CSS, and smooth motion UX.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 flex flex-col gap-2.5">
            <p className="text-xs font-semibold text-white uppercase tracking-wider mb-1">Navigation</p>
            {["home", "about", "skills", "projects", "contact"].map((nav) => (
              <button
                key={nav}
                onClick={() => scrollTo(nav)}
                className="text-left text-sm text-gray-400 hover:text-indigo-400 transition duration-200 capitalize w-max"
              >
                {nav}
              </button>
            ))}
          </div>

          {/* Connect */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <p className="text-xs font-semibold text-white uppercase tracking-wider mb-1">Recruiter Links</p>
            <a
              href="./Bablu_Kumar_MERN_Developer_Resume.pdf"
              download="Bablu_Kumar_MERN_Developer_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Resume"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-semibold transition duration-200 w-max"
            >
              <FaDownload className="text-xs" /> Download Resume
            </a>
            <div className="flex gap-3 mt-1">
              <a
                href="https://github.com/bablukumar05"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-indigo-600 text-gray-300 hover:text-white transition duration-200"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/bablu-kumar-145642281/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-blue-600 text-gray-300 hover:text-white transition duration-200"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://twitter.com/bablu_kumar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter Profile"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-sky-500 text-gray-300 hover:text-white transition duration-200"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Row: Copyright & Back to Top */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-gray-400 text-center sm:text-left">
            © {new Date().getFullYear()} Bablu Kumar. Built with React 18, Tailwind CSS & Framer Motion.
          </p>
          <button
            onClick={() => scrollTo("top")}
            aria-label="Back to top"
            className="flex items-center gap-1.5 text-gray-400 hover:text-indigo-400 transition duration-200"
          >
            Back to Top <FaArrowUp className="text-xs" />
          </button>
        </div>
      </div>
    </footer>
  );
}
