import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { FaChartLine, FaDownload } from "react-icons/fa";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "code", label: "Code" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({ onOpenAnalytics }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const navRef = useRef(null);
  const [underlineProps, setUnderlineProps] = useState({ left: 0, width: 0 });
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(Boolean);
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec.offsetTop <= scrollPos) {
          setActive(sec.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const activeEl = document.getElementById(`nav-${active}`);
    if (activeEl && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const activeRect = activeEl.getBoundingClientRect();
      setUnderlineProps({
        left: activeRect.left - navRect.left,
        width: activeRect.width,
      });
    }
  }, [active]);

  const goTo = (id) => {
    setOpen(false);
    setActive(id);
    const el = document.getElementById(id);
    if (!el) return;

    const navOffset = 80;
    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - navOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${hasScrolled ? "bg-slate-950/90 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3" : "py-5"}`}>
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <button
            onClick={() => goTo("home")}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 text-base">
                  BK
                </span>
              </div>
            </div>
            <div>
              <span className="text-sm font-bold text-white tracking-wide block group-hover:text-indigo-400 transition">
                Bablu Kumar
              </span>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for Roles
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav ref={navRef} className="hidden md:flex items-center gap-1 bg-slate-900/80 border border-white/10 p-1.5 rounded-2xl backdrop-blur-md relative shadow-inner">
            {NAV_ITEMS.map((n) => (
              <button
                key={n.id}
                id={`nav-${n.id}`}
                onClick={() => goTo(n.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-200 relative z-10 ${
                  active === n.id ? "text-white font-bold" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {n.label}
              </button>
            ))}

            <motion.div
              className="absolute bottom-1.5 top-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl z-0 shadow-md"
              initial={false}
              animate={{
                left: underlineProps.left,
                width: underlineProps.width,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={onOpenAnalytics}
              aria-label="Open Recruiter Analytics"
              className="px-3.5 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition duration-200 shadow-sm"
            >
              <FaChartLine /> Insights
            </button>
            <a
              href="./Bablu_Kumar_MERN_Developer_Resume.pdf"
              download="Bablu_Kumar_MERN_Developer_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Resume"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 transition duration-200 shadow-lg shadow-indigo-600/30"
            >
              <FaDownload className="text-xs" /> Download Resume PDF
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none z-10"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-slate-950/95 backdrop-blur-2xl px-6 pb-6 pt-2 border-b border-white/10 overflow-hidden relative z-50"
          >
            <ul className="flex flex-col gap-2 text-gray-200 text-sm font-medium mb-4">
              {NAV_ITEMS.map((n) => (
                <li key={n.id}>
                  <button
                    type="button"
                    onClick={() => goTo(n.id)}
                    className={`block w-full text-left py-3 px-4 rounded-xl transition ${
                      active === n.id ? "bg-indigo-600/20 text-indigo-300 font-bold" : "hover:bg-white/5"
                    }`}
                  >
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
              <button
                onClick={() => { setOpen(false); onOpenAnalytics(); }}
                className="flex-1 py-2.5 px-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <FaChartLine /> Insights
              </button>
              <a
                href="./Bablu_Kumar_MERN_Developer_Resume.pdf"
                download="Bablu_Kumar_MERN_Developer_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 mt-1"
              >
                <FaDownload /> Download Resume PDF
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
