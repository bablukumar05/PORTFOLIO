import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGraduationCap, FaTimes, FaCheck, FaTimesCircle } from "react-icons/fa";

const QUIZ_QUESTIONS = [
  {
    q: "What causes unnecessary re-renders in React functional components?",
    options: [
      "Inline object/function references without useMemo/useCallback",
      "Using pure CSS modules",
      "Declaring constants outside component scope",
      "Importing icons from react-icons",
    ],
    answer: 0,
  },
  {
    q: "Which HTTP status code is returned by RBAC authorization middleware when access is forbidden?",
    options: ["200 OK", "401 Unauthorized", "403 Forbidden", "500 Internal Error"],
    answer: 2,
  },
  {
    q: "What is the primary advantage of HTML5 Canvas over React DOM node rendering for particle systems?",
    options: [
      "Direct GPU pixel buffer rendering with 0 React state re-renders",
      "Automatic CSS Flexbox alignment",
      "Server-side rendering support",
      "Built-in Redux integration",
    ],
    answer: 0,
  },
];

export default function RecruiterQuizModal({ isOpen, onClose }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [finished, setFinished] = useState(false);

  if (!isOpen) return null;

  const handleSelect = (idx) => {
    setSelectedOpt(idx);
    if (idx === QUIZ_QUESTIONS[currentIdx].answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOpt(null);
    } else {
      setFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setScore(0);
    setSelectedOpt(null);
    setFinished(false);
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
          className="bg-slate-900 border border-white/10 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl text-white overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400">
                <FaGraduationCap className="text-lg" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Recruiter Challenge Mode</h3>
                <p className="text-xs text-gray-400">Test Technical Concepts & Architecture Knowledge</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-full bg-white/5 text-gray-300">
              <FaTimes />
            </button>
          </div>

          {!finished ? (
            <div>
              <div className="flex justify-between items-center text-xs text-indigo-400 mb-4 font-mono">
                <span>Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}</span>
                <span>Score: {score}</span>
              </div>

              <h4 className="text-base font-semibold text-white mb-6 leading-relaxed">
                {QUIZ_QUESTIONS[currentIdx].q}
              </h4>

              <div className="space-y-3 mb-6">
                {QUIZ_QUESTIONS[currentIdx].options.map((opt, i) => {
                  const isSelected = selectedOpt === i;
                  const isCorrect = i === QUIZ_QUESTIONS[currentIdx].answer;

                  let btnStyle = "bg-slate-950 border-white/10 text-gray-300 hover:border-indigo-500/50";
                  if (selectedOpt !== null) {
                    if (isCorrect) btnStyle = "bg-emerald-600/20 border-emerald-500 text-emerald-300";
                    else if (isSelected) btnStyle = "bg-red-600/20 border-red-500 text-red-300";
                  }

                  return (
                    <button
                      key={i}
                      disabled={selectedOpt !== null}
                      onClick={() => handleSelect(i)}
                      className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition duration-200 flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {selectedOpt !== null && isCorrect && <FaCheck className="text-emerald-400" />}
                      {selectedOpt !== null && isSelected && !isCorrect && <FaTimesCircle className="text-red-400" />}
                    </button>
                  );
                })}
              </div>

              {selectedOpt !== null && (
                <button
                  onClick={handleNext}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition"
                >
                  {currentIdx + 1 < QUIZ_QUESTIONS.length ? "Next Question" : "View Final Score"}
                </button>
              )}
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="text-4xl mb-3">🏆</div>
              <h4 className="text-2xl font-extrabold text-white mb-2">Challenge Completed!</h4>
              <p className="text-sm text-gray-300 mb-6">
                You scored <span className="text-indigo-400 font-bold">{score}</span> out of <span className="text-white font-bold">{QUIZ_QUESTIONS.length}</span>!
              </p>
              <button
                onClick={resetQuiz}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition"
              >
                Retake Challenge
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
