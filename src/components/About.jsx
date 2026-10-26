import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaRocket,
  FaCode,
  FaMapMarkerAlt,
  FaEye,
  FaEnvelope,
  FaLightbulb,
} from "react-icons/fa";

const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;

const CanvasParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const count = isMobile ? 20 : 40;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.35 + 0.08,
    }));

    let isVisible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animId) {
          animId = requestAnimationFrame(loop);
        } else if (!isVisible && animId) {
          cancelAnimationFrame(animId);
          animId = null;
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const loop = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(loop);
    };

    return () => {
      window.removeEventListener("resize", resize);
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-70" />;
};

const QUICK_FACTS = [
  {
    icon: <FaGraduationCap className="text-indigo-400" />,
    tag: "EDUCATION",
    title: "B.Tech in Computer Science",
    subtitle: "RGPV University, Bhopal (2022 – 2026)",
    detail: "Core study in Java Data Structures, Algorithms, Database Management, and Web Architecture with a 7.13 CGPA.",
    border: "hover:border-indigo-500/40",
  },
  {
    icon: <FaRocket className="text-cyan-400" />,
    tag: "PRIMARY SPECIALTY",
    title: "Full-Stack & MERN Stack Development",
    subtitle: "Production Web Applications",
    detail: "Building end-to-end real-time SaaS suites with React 18, Node.js, Express, MongoDB Atlas, and Socket.IO.",
    border: "hover:border-cyan-500/40",
  },
  {
    icon: <FaCode className="text-emerald-400" />,
    tag: "FOUNDATION",
    title: "Algorithmic Problem Solving",
    subtitle: "Core Java DSA & OOP",
    detail: "Disciplined problem solver focusing on time/space complexity optimization, recursion, and clean modular code.",
    border: "hover:border-emerald-500/40",
  },
  {
    icon: <FaMapMarkerAlt className="text-amber-400" />,
    tag: "AVAILABILITY",
    title: "India",
    subtitle: "Work Model Flexibility",
    detail: "Open to Remote, Hybrid, or On-Site opportunities with willingness to relocate across major Indian tech hubs.",
    border: "hover:border-amber-500/40",
  },
];

export default function About({ onOpenResume }) {
  const scrollToContact = (e) => {
    e.preventDefault();
    const el = document.getElementById("contact");
    if (el) {
      const navbarHeight = document.querySelector("nav")?.offsetHeight || 75;
      const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section id="about" className="relative py-14 sm:py-16 px-4 sm:px-6 lg:px-12 bg-slate-950 text-white overflow-hidden" aria-label="About Me Section">
      <CanvasParticles />

      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            ABOUT{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-indigo-300">
              ME
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for SDE Roles & Internships
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
              Hi, I'm Bablu Kumar.
            </h3>

            <div className="space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed">
              <p>
                I am a Computer Science graduate at <span className="text-white font-medium">Radharaman Institute of Technology & Science (RITS), BHOPAL(2022–2026)</span> with a strong passion for architecting scalable, production-grade web applications. I bridge the gap between high-performance frontend interfaces and robust distributed backend architectures.
              </p>
              <p>
                Through building platforms like <span className="text-indigo-300 font-medium">SplitMate</span> (a smart group expense sharing & settlement PWA) and <span className="text-indigo-300 font-medium">TeamPulse</span> (a multi-room real-time collaboration tool), I focus on clean modular code, RESTful API design, WebSockets, and state-driven architecture.
              </p>
              <p>
                Beyond modern web stacks, I hold a solid foundation in <span className="text-white font-medium">Java Data Structures & Algorithms (DSA)</span> and Object-Oriented Programming (OOP). This algorithmic discipline enables me to analyze time-space trade-offs and write optimized, maintainable code.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-6 mt-6 border-t border-white/10">
              {onOpenResume && (
                <button
                  onClick={onOpenResume}
                  aria-label="View Full Resume"
                  className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <FaEye /> View Resume
                </button>
              )}
              <a
                href="#contact"
                onClick={scrollToContact}
                aria-label="Contact Bablu Kumar"
                className="py-2.5 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-gray-200 hover:text-white border border-white/10 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md hover:border-white/20 active:scale-[0.98]"
              >
                <FaEnvelope className="text-xs text-indigo-400" /> Get in Touch
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {QUICK_FACTS.map((fact, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`p-5 sm:p-6 rounded-2xl bg-slate-900/70 border border-white/10 ${fact.border} backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-800/80 border border-white/10 flex items-center justify-center text-lg shadow-sm">
                      {fact.icon}
                    </div>
                    <span className="text-[10px] font-mono tracking-wider text-gray-400 uppercase bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded-md">
                      {fact.tag}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors mb-1">
                    {fact.title}
                  </h4>
                  <p className="text-xs font-medium text-indigo-400 mb-2.5">
                    {fact.subtitle}
                  </p>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {fact.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16 max-w-4xl mx-auto p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl flex items-center gap-4 text-left shadow-xl">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 text-lg">
            <FaLightbulb />
          </div>
          <p className="text-xs sm:text-sm text-gray-300 italic leading-relaxed">
            "My engineering focus is simple: write clean, maintainable code, build sub-second latency APIs, and create digital experiences that deliver real, measurable user value."
          </p>
        </div>
      </div>
    </section>
  );
}
