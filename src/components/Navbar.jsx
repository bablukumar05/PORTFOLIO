import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { FaTerminal, FaChartLine, FaDownload } from "react-icons/fa";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "code", label: "Code" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const BLOB_LAYERS = [
  { count: 4, size: 120, speed: 0.5, opacity: 0.35, parallax: 0.12 },
  { count: 3, size: 90, speed: 0.35, opacity: 0.25, parallax: 0.08 },
  { count: 3, size: 60, speed: 0.2, opacity: 0.15, parallax: 0.04 },
];

const PARTICLE_LAYERS = [
  { count: 15, minSize: 2, maxSize: 4, parallax: 0.1 },
  { count: 20, minSize: 1, maxSize: 3, parallax: 0.05 },
  { count: 15, minSize: 0.5, maxSize: 2, parallax: 0.02 },
];

export default function Navbar({ onOpenTerminal, onOpenAnalytics }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const navRef = useRef(null);
  const [underlineProps, setUnderlineProps] = useState({ left: 0, width: 0 });
  const [hasScrolled, setHasScrolled] = useState(false);

  const cursor = useRef({ x: 0, y: 0 });
  const lastCursor = useRef({ x: 0, y: 0 });
  const scrollY = useRef(0);

  const blobRefs = useRef([]);
  const particleRefs = useRef([]);

  // Active section tracking & scroll detection (Sequential one-by-one tracking)
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
      scrollY.current = window.scrollY;

      const viewportThreshold = window.innerHeight * 0.35;
      const navOffset = 100;

      const sections = NAV_ITEMS.map((item) => {
        const el = document.getElementById(item.id);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return {
          id: item.id,
          top: rect.top,
          bottom: rect.bottom,
        };
      }).filter(Boolean);

      let currentSection = "home";

      for (let i = 0; i < sections.length; i++) {
        const sec = sections[i];
        if (sec.top <= viewportThreshold && sec.bottom > navOffset) {
          currentSection = sec.id;
        }
      }

      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 30;
      if (isAtBottom) {
        currentSection = "contact";
      }

      setActive(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Underline position calculation
  useEffect(() => {
    const updateUnderline = () => {
      const el = navRef.current?.querySelector(`[data-id="${active}"]`);
      if (el && navRef.current) {
        const rect = el.getBoundingClientRect();
        const parentRect = navRef.current.getBoundingClientRect();
        setUnderlineProps({ left: rect.left - parentRect.left, width: rect.width });
      }
    };

    updateUnderline();
    window.addEventListener("resize", updateUnderline);
    return () => window.removeEventListener("resize", updateUnderline);
  }, [active]);

  // Cursor tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      cursor.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animation loop
  useEffect(() => {
    let animationFrame;
    const start = Date.now();

    const animate = () => {
      const t = (Date.now() - start) / 1000;
      lastCursor.current.x += (cursor.current.x - lastCursor.current.x) * 0.05;
      lastCursor.current.y += (cursor.current.y - lastCursor.current.y) * 0.05;

      let blobIndex = 0;
      BLOB_LAYERS.forEach((layer) => {
        for (let i = 0; i < layer.count; i++, blobIndex++) {
          const blob = blobRefs.current[blobIndex];
          if (!blob) continue;

          const xOffset =
            Math.sin(t * layer.speed + i) * 20 +
            lastCursor.current.x * 0.03 +
            scrollY.current * layer.parallax;
          const yOffset =
            Math.cos(t * layer.speed + i) * 20 +
            lastCursor.current.y * 0.03 +
            scrollY.current * layer.parallax * 0.5;
          const rotate = Math.sin(t * layer.speed + i) * 15;

          const scrollScale = 1 + Math.sin(scrollY.current * 0.002 + i) * 0.08;

          const dx = lastCursor.current.x - blob.offsetLeft - blob.offsetWidth / 2;
          const dy = lastCursor.current.y - blob.offsetTop - blob.offsetHeight / 2;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const hoverScale = dist < 120 ? 1 + (120 - dist) / 500 : 1;
          const hoverRotate = dist < 120 ? (120 - dist) / 3 : 0;
          const glow = dist < 120 ? (120 - dist) / 200 : 0;

          const r = Math.floor(150 + Math.sin(t * 0.5 + i) * 50);
          const g = Math.floor(50 + Math.sin(t * 0.7 + i) * 80);
          const b = Math.floor(200 + Math.sin(t * 0.9 + i) * 50);
          blob.style.background = `radial-gradient(circle at 30% 30%, rgba(${r},${g},${b},${layer.opacity}), rgba(0,0,0,0))`;

          blob.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0) rotate(${
            rotate + hoverRotate
          }deg) scale(${scrollScale * hoverScale})`;
          blob.style.boxShadow = `0 0 ${10 + glow * 20}px rgba(168,139,250,${layer.opacity})`;
        }
      });

      let pIndex = 0;
      PARTICLE_LAYERS.forEach((layer) => {
        for (let i = 0; i < layer.count; i++, pIndex++) {
          const p = particleRefs.current[pIndex];
          if (!p) continue;
          const pos = p._pos || (p._pos = {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
          });

          pos.x += pos.vx;
          pos.y += pos.vy;

          if (pos.x < 0 || pos.x > window.innerWidth) pos.vx *= -1;
          if (pos.y < 0 || pos.y > window.innerHeight) pos.vy *= -1;

          const dx = lastCursor.current.x - pos.x;
          const dy = lastCursor.current.y - pos.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            pos.vx += dx * 0.0005;
            pos.vy += dy * 0.0005;
          }

          p.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
        }
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  function goTo(id) {
    setOpen(false);
    setActive(id);

    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;

      const navbarHeight = 70;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }, 50);
  }

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        hasScrolled
          ? "bg-slate-950/85 backdrop-blur-md border-b border-indigo-500/20 shadow-xl shadow-indigo-950/20 py-2.5"
          : "bg-slate-950/40 backdrop-blur-sm py-3.5"
      }`}
    >
      {/* Background blobs and particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLE_LAYERS.map((layer, layerIdx) =>
          [...Array(layer.count)].map((_, i) => {
            const index =
              PARTICLE_LAYERS.slice(0, layerIdx).reduce((acc, l) => acc + l.count, 0) + i;
            const size = Math.random() * (layer.maxSize - layer.minSize) + layer.minSize;
            return (
              <div
                key={index}
                ref={(el) => (particleRefs.current[index] = el)}
                className="absolute rounded-full bg-indigo-400 opacity-50 blur-sm"
                style={{ width: size, height: size, transform: "translate3d(0,0,0)" }}
              />
            );
          })
        )}
        {BLOB_LAYERS.map((layer, layerIdx) =>
          [...Array(layer.count)].map((_, i) => {
            const index =
              BLOB_LAYERS.slice(0, layerIdx).reduce((acc, l) => acc + l.count, 0) + i;
            return (
              <div
                key={index}
                ref={(el) => (blobRefs.current[index] = el)}
                className="absolute rounded-full filter blur-3xl mix-blend-screen"
                style={{
                  width: layer.size,
                  height: layer.size,
                  transform: "translate3d(0,0,0)",
                }}
              />
            );
          })
        )}
      </div>

      {/* Navbar content */}
      <div className="relative max-w-7xl mx-auto px-6 py-1 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-3 cursor-pointer focus:outline-none rounded z-10"
            onClick={() => goTo("home")}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 p-0.5 shadow-lg shadow-indigo-600/30">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-indigo-300 font-extrabold text-lg select-none">
                B
              </div>
            </div>
            <span className="text-white font-bold text-lg select-none tracking-tight">Bablu Kumar</span>
          </button>

          {/* Status Badge */}
          <span className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Open for Roles
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6" ref={navRef}>
          <div className="flex gap-6 text-gray-300 text-sm font-medium select-none">
            {NAV_ITEMS.map((n) => (
              <motion.button
                key={n.id}
                data-id={n.id}
                onClick={() => goTo(n.id)}
                className={`py-2 focus:outline-none rounded transition-colors ${
                  active === n.id ? "text-indigo-400 font-bold" : "hover:text-white"
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {n.label}
              </motion.button>
            ))}
          </div>

          <motion.div
            className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 rounded-full shadow-[0_0_10px_rgba(129,140,248,0.8)]"
            animate={{
              x: underlineProps.left,
              width: underlineProps.width,
            }}
            transition={{ type: "spring", stiffness: 450, damping: 30 }}
          />

          {/* Recruiter Action Group */}
          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={onOpenTerminal}
              aria-label="Open Terminal CLI"
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 hover:border-indigo-500/40 text-gray-300 hover:text-white text-xs font-mono font-semibold flex items-center gap-1.5 transition duration-200 shadow-sm"
            >
              <FaTerminal className="text-indigo-400" /> CLI
            </button>
            <button
              onClick={onOpenAnalytics}
              aria-label="Open Recruiter Analytics"
              className="px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition duration-200 shadow-sm"
            >
              <FaChartLine /> Insights
            </button>
            <a
              href="./Bablu_Kumar_MERN_Developer_Resume.pdf"
              download="Bablu_Kumar_MERN_Developer_Resume.pdf"
              aria-label="Download Resume"
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 transition duration-200 shadow-md shadow-indigo-600/30"
            >
              <FaDownload className="text-xs" /> Resume
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none z-10"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-slate-950/95 backdrop-blur-2xl px-6 pb-6 pt-2 border-b border-white/10 overflow-hidden relative z-50 pointer-events-auto"
          >
            <ul className="flex flex-col gap-3 text-gray-200 select-none text-sm font-medium mb-4">
              {NAV_ITEMS.map((n) => (
                <li key={n.id}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      goTo(n.id);
                    }}
                    className={`block w-full text-left py-2.5 px-3 rounded-xl transition cursor-pointer active:scale-98 ${
                      active === n.id ? "bg-indigo-600/20 text-indigo-300 font-bold border border-indigo-500/30" : "hover:bg-white/5 text-gray-200"
                    }`}
                  >
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
              <button
                onClick={() => { setOpen(false); onOpenTerminal(); }}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-900 border border-white/10 text-gray-300 text-xs font-mono font-semibold flex items-center justify-center gap-1.5"
              >
                <FaTerminal className="text-indigo-400" /> CLI
              </button>
              <button
                onClick={() => { setOpen(false); onOpenAnalytics(); }}
                className="flex-1 py-2 px-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <FaChartLine /> Insights
              </button>
              <a
                href="./MERN_Developer_Resume.pdf"
                download="MERN_Developer_Resume.pdf"
                className="w-full py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 mt-1"
              >
                <FaDownload /> Download Resume PDF
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
