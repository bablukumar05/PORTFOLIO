import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCode, FaCopy, FaCheck, FaTerminal } from "react-icons/fa";

const CODE_SAMPLES = [
  {
    id: "canvas",
    filename: "CanvasParticleEngine.jsx",
    language: "JavaScript / React",
    description: "GPU-accelerated HTML5 Canvas particle engine replacing 3,000+ React state re-renders/sec.",
    code: `const CanvasParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const count = window.innerWidth < 768 ? 25 : 50;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = \`rgba(255, 255, 255, \${p.opacity})\`;
        ctx.fill();
      });
      animId = requestAnimationFrame(loop);
    };

    loop();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};`,
  },
  {
    id: "rbac",
    filename: "RoleBasedAuth.js",
    language: "JavaScript / MERN",
    description: "Role-Based Access Control (RBAC) middleware verifying Admin vs Employee session tokens.",
    code: `export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: \`Role (\${req.user?.role}) is not authorized to access this resource\`,
      });
    }
    next();
  };
};

export const verifyDashboardAccess = (user, targetRoute) => {
  const adminRoutes = ["/admin/dashboard", "/admin/employees", "/admin/settings"];
  if (adminRoutes.includes(targetRoute) && user.role !== "admin") {
    return { authorized: false, redirect: "/employee/dashboard" };
  }
  return { authorized: true, redirect: targetRoute };
};`,
  },
  {
    id: "spring",
    filename: "SpringActiveTracker.jsx",
    language: "JavaScript / Framer Motion",
    description: "Real-time viewport BoundingClientRect section tracking & spring-physics tab indicator.",
    code: `useEffect(() => {
  const handleScroll = () => {
    const viewportThreshold = window.innerHeight * 0.35;
    const sections = NAV_ITEMS.map((item) => {
      const el = document.getElementById(item.id);
      if (!el) return null;
      return { id: item.id, top: el.getBoundingClientRect().top };
    }).filter(Boolean);

    let current = "home";
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].top <= viewportThreshold) {
        current = sections[i].id;
      }
    }
    setActive(current);
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);`,
  },
];

export default function CodeShowcase() {
  const [activeSample, setActiveSample] = useState(CODE_SAMPLES[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSample.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-12 bg-slate-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold mb-4">
            ARCHITECTURE & CODE QUALITY
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Code <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Showcase</span>
          </h2>
          <p className="mt-4 text-gray-400 text-base sm:text-lg">
            Inspect production-grade code snippets demonstrating frontend optimization, state management, and backend security.
          </p>
        </div>

        {/* IDE Explorer Container */}
        <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden max-w-5xl mx-auto">
          {/* Top Window Bar */}
          <div className="flex flex-wrap items-center justify-between px-6 py-4 bg-slate-900 border-b border-white/10 gap-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs font-mono text-gray-400 flex items-center gap-2 ml-2">
                <FaTerminal className="text-indigo-400" /> {activeSample.filename}
              </span>
            </div>

            {/* Tab Selector Buttons */}
            <div className="flex flex-wrap bg-slate-950 p-1 rounded-xl border border-white/10 gap-1">
              {CODE_SAMPLES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => setActiveSample(sample)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    activeSample.id === sample.id
                      ? "bg-indigo-600 text-white shadow-md"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {sample.filename}
                </button>
              ))}
            </div>
          </div>

          {/* Code Body */}
          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-indigo-300 font-mono">{activeSample.description}</p>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-indigo-600 text-gray-300 hover:text-white text-xs font-medium transition duration-200"
              >
                {copied ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                {copied ? "Copied" : "Copy Code"}
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeSample.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-slate-950 p-6 rounded-2xl border border-white/5 overflow-x-auto text-left font-mono text-xs sm:text-sm text-gray-300 leading-relaxed max-h-[380px]"
              >
                <pre><code>{activeSample.code}</code></pre>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
