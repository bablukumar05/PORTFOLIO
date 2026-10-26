import React from "react";
import { motion } from "framer-motion";
import {
  FaLaptopCode,
  FaServer,
  FaDatabase,
  FaTools,
  FaLayerGroup,
  FaCubes,
  FaInfinity,
  FaProjectDiagram,
  FaLock,
} from "react-icons/fa";
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiFramer,
  SiHtml5,
  SiCss3,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiSocketdotio,
  SiJsonwebtokens,
  SiMongodb,
  SiMysql,
  SiDocker,
  SiGit,
  SiGithub,
  SiPostman,
  SiVercel,
  SiRender,
  SiPython,
} from "react-icons/si";

const SKILL_CATEGORIES = [
  {
    title: "Frontend Development",
    icon: <FaLaptopCode className="text-indigo-400" />,
    skills: [
      { name: "React.js", icon: <SiReact />, color: "#61DAFB" },
      { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
      { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E" },
      { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#06B6D4" },
      { name: "Framer Motion", icon: <SiFramer />, color: "#EA4C89" },
      { name: "HTML5", icon: <SiHtml5 />, color: "#E34F26" },
      { name: "CSS3", icon: <SiCss3 />, color: "#1572B6" },
    ],
  },
  {
    title: "State Management",
    icon: <FaLayerGroup className="text-indigo-400" />,
    skills: [
      { name: "Redux Toolkit", icon: <SiRedux />, color: "#764ABC" },
      { name: "Redux", icon: <SiRedux />, color: "#764ABC" },
      { name: "React Context API", icon: <SiReact />, color: "#61DAFB" },
    ],
  },
  {
    title: "Backend & Real-Time APIs",
    icon: <FaServer className="text-indigo-400" />,
    skills: [
      { name: "Node.js", icon: <SiNodedotjs />, color: "#5FA04E" },
      { name: "Express.js", icon: <SiExpress />, color: "#E2E8F0" },
      { name: "REST APIs", icon: <FaServer />, color: "#818CF8" },
      { name: "JWT", icon: <SiJsonwebtokens />, color: "#FB015B" },
      { name: "Socket.IO", icon: <SiSocketdotio />, color: "#FFFFFF" },
    ],
  },
  {
    title: "Databases & Storage",
    icon: <FaDatabase className="text-indigo-400" />,
    skills: [
      { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
      { name: "MongoDB Atlas", icon: <SiMongodb />, color: "#00ED64" },
      { name: "MySQL", icon: <SiMysql />, color: "#4479A1" },
    ],
  },
  {
    title: "DevOps & Cloud Tools",
    icon: <FaTools className="text-indigo-400" />,
    skills: [
      { name: "Docker", icon: <SiDocker />, color: "#2496ED" },
      { name: "Git", icon: <SiGit />, color: "#F05032" },
      { name: "GitHub", icon: <SiGithub />, color: "#FFFFFF" },
      { name: "CI/CD", icon: <FaInfinity />, color: "#10B981" },
      { name: "VS Code", icon: <FaLaptopCode />, color: "#007ACC" },
      { name: "Postman", icon: <SiPostman />, color: "#FF6C37" },
      { name: "Vercel", icon: <SiVercel />, color: "#FFFFFF" },
      { name: "Render", icon: <SiRender />, color: "#46E3B7" },
    ],
  },
  {
    title: "Core CS & Languages",
    icon: <FaCubes className="text-indigo-400" />,
    skills: [
      { name: "Data Structures & Algorithms", icon: <FaProjectDiagram />, color: "#F87171" },
      { name: "OOP", icon: <FaCubes />, color: "#FBBF24" },
      { name: "Python", icon: <SiPython />, color: "#3776AB" },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-14 sm:py-16 px-4 sm:px-6 lg:px-12 bg-slate-950 text-white overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid-mask-center pointer-events-none opacity-60" />
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-indigo-300">Technologies</span>
          </h2>
       
        </div>

        {/* Categorized Sleek Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {SKILL_CATEGORIES.map((cat, catIdx) => (
            <motion.div
              key={catIdx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: catIdx * 0.08 }}
              className="p-6 sm:p-7 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-indigo-500/40 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-base">
                      {cat.icon}
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {cat.title}
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-indigo-300/80 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-md">
                    {cat.skills.length}
                  </span>
                </div>

                {/* Sleek Badge Pills with Official Icons */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, sIdx) => (
                    <motion.div
                      key={sIdx}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-white/10 hover:border-indigo-500/40 transition-all duration-200 shadow-sm cursor-default group/pill"
                    >
                      <span
                        className="text-base shrink-0 transition-transform duration-200 group-hover/pill:scale-110"
                        style={{ color: skill.color }}
                      >
                        {skill.icon}
                      </span>
                      <span className="text-xs font-semibold text-slate-200 group-hover/pill:text-white transition-colors">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
