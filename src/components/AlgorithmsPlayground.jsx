import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaRedo, FaCode } from "react-icons/fa";

export default function AlgorithmsPlayground() {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);

  const resetArray = () => {
    const arr = Array.from({ length: 18 }, () => Math.floor(Math.random() * 80) + 15);
    setArray(arr);
  };

  useEffect(() => {
    resetArray();
  }, []);

  const bubbleSort = async () => {
    setSorting(true);
    let arr = [...array];
    let n = arr.length;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArray([...arr]);
          await new Promise((r) => setTimeout(r, 60));
        }
      }
    }
    setSorting(false);
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-12 bg-slate-950 text-white border-t border-white/10 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-semibold mb-3">
          DSA ALGORITHMS PLAYGROUND
        </div>
        <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
          Sorting Algorithm <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Visualizer</span>
        </h3>
        <p className="text-gray-400 max-w-xl mx-auto text-xs sm:text-sm mb-8">
          Demonstrating Data Structures & Algorithmic Problem Solving in JavaScript & Java.
        </p>

        {/* Visualizer Container */}
        <div className="bg-slate-900/90 border border-white/10 p-6 sm:p-8 rounded-3xl backdrop-blur-md shadow-2xl">
          {/* Bars */}
          <div className="flex items-end justify-center gap-2 h-48 mb-6 pt-4">
            {array.map((val, idx) => (
              <motion.div
                key={idx}
                layout
                style={{ height: `${val * 2}px` }}
                className="w-4 sm:w-6 bg-gradient-to-t from-indigo-600 to-purple-500 rounded-t-md shadow-lg"
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <button
              disabled={sorting}
              onClick={bubbleSort}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition"
            >
              <FaPlay className="text-xs" /> Run Bubble Sort
            </button>
            <button
              disabled={sorting}
              onClick={resetArray}
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-gray-200 rounded-xl text-xs font-semibold flex items-center gap-2 border border-white/10 transition"
            >
              <FaRedo className="text-xs" /> Reset Array
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
