import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTerminal, FaTimes } from "react-icons/fa";

export default function TerminalModal({ isOpen, onClose }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { type: "sys", text: "Bablu Kumar Developer Terminal v2.4.0" },
    { type: "sys", text: "Type 'help' to see available commands." },
  ]);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { type: "user", text: `$ ${input}` }];

    switch (cmd) {
      case "help":
        newHistory.push({
          type: "sys",
          text: `Available Commands:
  help       - List commands
  projects   - Scroll to Featured Projects
  skills     - Scroll to Skills Section
  contact    - Scroll to Contact Section
  resume     - Download PDF Resume
  clear      - Clear terminal window`,
        });
        break;
      case "projects":
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        newHistory.push({ type: "sys", text: "Navigating to #projects..." });
        onClose();
        break;
      case "skills":
        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
        newHistory.push({ type: "sys", text: "Navigating to #skills..." });
        onClose();
        break;
      case "contact":
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        newHistory.push({ type: "sys", text: "Navigating to #contact..." });
        onClose();
        break;
      case "resume":
        window.open("/resume.pdf", "_blank");
        newHistory.push({ type: "sys", text: "Opening resume.pdf..." });
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      default:
        newHistory.push({
          type: "err",
          text: `Command not found: '${cmd}'. Type 'help' for available commands.`,
        });
    }

    setHistory(newHistory);
    setInput("");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-slate-950 border border-white/10 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden text-white font-mono text-xs sm:text-sm"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="text-xs text-gray-400 font-semibold ml-2 flex items-center gap-1.5">
                <FaTerminal className="text-indigo-400" /> developer-cli ~ zsh
              </span>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition">
              <FaTimes />
            </button>
          </div>

          {/* Terminal Output */}
          <div className="p-6 h-80 overflow-y-auto space-y-2">
            {history.map((item, idx) => (
              <div
                key={idx}
                className={
                  item.type === "user"
                    ? "text-indigo-300 font-bold"
                    : item.type === "err"
                    ? "text-red-400"
                    : "text-gray-300 whitespace-pre-wrap leading-relaxed"
                }
              >
                {item.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input Bar */}
          <form onSubmit={handleCommand} className="flex items-center px-6 py-3 bg-slate-900 border-t border-white/10">
            <span className="text-emerald-400 font-bold mr-2">$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a command (e.g. help, projects, resume)..."
              className="w-full bg-transparent text-white focus:outline-none text-xs sm:text-sm"
              autoFocus
            />
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
