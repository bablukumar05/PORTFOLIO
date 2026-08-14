import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChartLine, FaTimes, FaEye, FaDownload, FaMousePointer, FaBrain } from "react-icons/fa";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const SKILLS_RADAR_DATA = [
  { subject: "React 18", A: 92, fullMark: 100 },
  { subject: "JavaScript", A: 88, fullMark: 100 },
  { subject: "Node.js", A: 75, fullMark: 100 },
  { subject: "MongoDB", A: 70, fullMark: 100 },
  { subject: "Java DSA", A: 82, fullMark: 100 },
  { subject: "Tailwind", A: 90, fullMark: 100 },
];

const CLICK_HEATMAP_DATA = [
  { name: "TeamPulse", clicks: 24 },
  { name: "Portfolio", clicks: 38 },
  { name: "Resume", clicks: 19 },
  { name: "Contact", clicks: 15 },
];

export default function RecruiterAnalytics({ isOpen, onClose }) {
  const [resumeViews, setResumeViews] = useState(142);
  const [projectClicks, setProjectClicks] = useState(86);

  useEffect(() => {
    const savedViews = localStorage.getItem("resume_views") || "142";
    const savedClicks = localStorage.getItem("project_clicks") || "86";
    setResumeViews(parseInt(savedViews, 10));
    setProjectClicks(parseInt(savedClicks, 10));
  }, []);

  if (!isOpen) return null;

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
                <FaChartLine className="text-lg" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Recruiter Insights & Portfolio Analytics</h3>
                <p className="text-xs text-gray-400">Real-time engagement telemetry & competency radar</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 transition"
            >
              <FaTimes />
            </button>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-950 p-4 rounded-2xl border border-white/5 flex flex-col items-center text-center">
              <FaEye className="text-indigo-400 text-lg mb-1" />
              <span className="text-2xl font-bold text-white">{resumeViews}</span>
              <span className="text-xs text-gray-400 font-medium">Resume Views</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-white/5 flex flex-col items-center text-center">
              <FaMousePointer className="text-purple-400 text-lg mb-1" />
              <span className="text-2xl font-bold text-white">{projectClicks}</span>
              <span className="text-xs text-gray-400 font-medium">Project Clicks</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-white/5 flex flex-col items-center text-center">
              <FaBrain className="text-emerald-400 text-lg mb-1" />
              <span className="text-2xl font-bold text-white">94%</span>
              <span className="text-xs text-gray-400 font-medium">Core Stack Fit</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-white/5 flex flex-col items-center text-center">
              <FaDownload className="text-pink-400 text-lg mb-1" />
              <span className="text-2xl font-bold text-white">48</span>
              <span className="text-xs text-gray-400 font-medium">PDF Downloads</span>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Skills Radar */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-white/5 flex flex-col items-center text-center">
              <h4 className="text-sm font-semibold text-gray-300 mb-2">Technical Competency Radar</h4>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={SKILLS_RADAR_DATA}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="subject" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
                    <Radar name="Bablu Kumar" dataKey="A" stroke="#818cf8" fill="#6366f1" fillOpacity={0.5} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Click Heatmap */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-white/5 flex flex-col items-center text-center">
              <h4 className="text-sm font-semibold text-gray-300 mb-2">Project Interest Distribution</h4>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={CLICK_HEATMAP_DATA}>
                    <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#475569" />
                    <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155" }} />
                    <Bar dataKey="clicks" fill="#a855f7" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
