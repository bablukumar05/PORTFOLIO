import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuestionCircle, FaTimes, FaPaperPlane, FaUserCheck } from "react-icons/fa";

const BOT_QA = [
  { keywords: ["skill", "stack", "tech"], answer: "Bablu's technical stack includes React 18, Tailwind CSS, Node.js, Express.js, MongoDB, Socket.IO WebSockets, and Java (DSA)." },
  { keywords: ["project", "work", "ventureconnect", "teampulse"], answer: "His key projects are VentureConnect (7-Role Startup Sourcing & Investment Platform), TeamPulse (MERN Workforce App with Socket.IO & Kanban), and his 60fps GPU Canvas Portfolio." },
  { keywords: ["education", "college", "cgpa"], answer: "Bablu is pursuing B.Tech in Computer Science at RGPV University, Bhopal (2022-2026) with a 7.13 CGPA." },
  { keywords: ["contact", "email", "phone"], answer: "You can reach Bablu directly at kumarbablu74824@gmail.com or +91 8825138188." },
];

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Welcome! I am Bablu's interactive portfolio assistant. Ask me any quick questions about his skills, projects, or background!" },
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    const newMsgs = [...messages, { sender: "user", text: userMsg }];
    setInput("");

    const query = userMsg.toLowerCase();
    let reply = "Bablu is a MERN Stack Developer skilled in React 18, Tailwind, Node, and Java DSA. Feel free to download his resume or scroll to the projects section!";

    for (let qa of BOT_QA) {
      if (qa.keywords.some((k) => query.includes(k))) {
        reply = qa.answer;
        break;
      }
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 350);

    setMessages(newMsgs);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Recruiter FAQ"
        className="fixed bottom-8 left-8 z-[9990] w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center text-xl shadow-2xl hover:scale-110 active:scale-95 transition border border-white/20"
      >
        <FaQuestionCircle />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 left-8 z-[9999] w-80 sm:w-96 bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden text-white text-xs sm:text-sm flex flex-col h-[400px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                  <FaUserCheck />
                </div>
                <span className="font-bold text-white">Quick Recruiter Q&A</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                <FaTimes />
              </button>
            </div>

            {/* Message Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      m.sender === "user"
                        ? "bg-indigo-600 text-white rounded-br-none"
                        : "bg-slate-950 text-gray-200 border border-white/10 rounded-bl-none"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 bg-slate-950 border-t border-white/10 flex gap-2">
              <input
                type="text"
                placeholder="Ask about skills, projects, contact..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
              <button type="submit" className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white">
                <FaPaperPlane className="text-xs" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
