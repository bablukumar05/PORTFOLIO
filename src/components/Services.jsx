import React from "react";
import { motion } from "framer-motion";
import { FaLaptopCode, FaServer, FaDatabase, FaArrowRight, FaRocket, FaCheckCircle } from "react-icons/fa";

const SERVICES = [
  {
    id: "01",
    title: "Frontend Development",
    icon: <FaLaptopCode className="text-indigo-400" />,
    tech: ["React.js", "JavaScript", "HTML", "CSS"],
    description: "Architecting pixel-perfect, accessible, and responsive user interfaces with smooth 60 FPS animations and fluid state management.",
    accent: "from-indigo-500/20 via-indigo-500/5 to-transparent",
    borderHover: "hover:border-indigo-500/50",
  },
  {
    id: "02",
    title: "Backend Development",
    icon: <FaServer className="text-emerald-400" />,
    tech: ["Node.js", "Express.js", "REST APIs"],
    description: "Building secure, high-concurrency server architectures with JWT authentication, role-based access control, and clean API design.",
    accent: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    borderHover: "hover:border-emerald-500/50",
  },
  {
    id: "03",
    title: "Full Stack Development",
    icon: <FaDatabase className="text-sky-400" />,
    tech: ["MongoDB", "MERN Stack", "Integration"],
    description: "Delivering end-to-end production web applications, from database modeling and real-time WebSockets to automated cloud deployments.",
    accent: "from-sky-500/20 via-sky-500/5 to-transparent",
    borderHover: "hover:border-sky-500/50",
  },
];

export default function Services() {
  const scrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="relative py-24 px-4 sm:px-6 lg:px-12 bg-slate-950 text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-grid-mask-center pointer-events-none opacity-60" />
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-4">
              <FaRocket className="text-xs" /> LET'S BUILD SOMETHING
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
              How can I <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-indigo-300">help you?</span>
            </h2>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
              I build modern, responsive, and user-friendly web applications. Let's turn your ideas into reality.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="#contact"
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition hover:scale-105 active:scale-95"
              >
                Let's Talk <FaArrowRight className="text-xs -rotate-45" />
              </a>

              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-gray-300 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for Q4 2026 Roles
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            {SERVICES.map((service) => (
              <motion.div
                key={service.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`relative p-6 sm:p-7 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 ${service.borderHover} transition-all duration-300 shadow-xl overflow-hidden group text-left`}
              >
                <div className={`absolute top-0 right-0 w-64 h-32 bg-gradient-to-bl ${service.accent} pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-semibold text-gray-400 uppercase tracking-widest block">
                        Service {service.id}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-indigo-300 transition-colors duration-200">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <FaCheckCircle className="text-gray-600 group-hover:text-emerald-400 transition-colors duration-200 text-sm mt-1 shrink-0" />
                </div>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
                  {service.tech.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-slate-950 border border-white/10 rounded-lg text-[11px] font-mono text-indigo-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
