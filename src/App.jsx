import React, { useState, useEffect, lazy, Suspense } from "react";
import gsap from "gsap";
import { FaBriefcase, FaCogs, FaBalanceScale } from "react-icons/fa";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BenchmarkCounters from "./components/BenchmarkCounters";
import LighthouseDashboard from "./components/LighthouseDashboard";
import About from "./components/About";
import CertificationVault from "./components/CertificationVault";
import Skills from "./components/Skills";
import SkillsGalaxy3D from "./components/SkillsGalaxy3D";
import CandidateManifesto from "./components/CandidateManifesto";
import CodeShowcase from "./components/CodeShowcase";
import GitHubVisualizer from "./components/GitHubVisualizer";
import AlgorithmsPlayground from "./components/AlgorithmsPlayground";
import Projects from "./components/Projects";
import CareerTimeline from "./components/CareerTimeline";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";

import { initGSAP } from "./utils/gsapAnimations";

// Lazy-loaded heavy modal components for zero-lag 60fps performance
const RecruiterAnalytics = lazy(() => import("./components/RecruiterAnalytics"));
const SystemArchitectureModal = lazy(() => import("./components/SystemArchitectureModal"));
const RecruiterQuizModal = lazy(() => import("./components/RecruiterQuizModal"));
const HowIBuiltThis = lazy(() => import("./components/HowIBuiltThis"));
const ProjectComparison = lazy(() => import("./components/ProjectComparison"));
const GuidedTourModal = lazy(() => import("./components/GuidedTourModal"));
const AIChatAssistant = lazy(() => import("./components/AIChatAssistant"));

export default function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showIntro, setShowIntro] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Modals state
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showHowIBuiltThis, setShowHowIBuiltThis] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showGuidedTour, setShowGuidedTour] = useState(false);
  const [archProjectTitle, setArchProjectTitle] = useState(null);

  // Loader animation
  useEffect(() => {
    let counter = { value: 0 };
    gsap.to(counter, {
      value: 100,
      duration: 3,
      ease: "power2.out",
      onUpdate: () => setProgress(Math.floor(counter.value)),
      onComplete: () => {
        gsap.to(".loader", {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            setLoading(false);
            setShowIntro(true);
          },
        });
      },
    });
  }, []);

  // Intro animation
  useEffect(() => {
    if (showIntro) {
      gsap.fromTo(
        ".intro-text",
        { opacity: 0, scale: 0.8, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "power4.out" }
      );

      gsap.to(".intro-text", {
        opacity: 0,
        y: -60,
        duration: 1,
        delay: 1,
        ease: "power3.inOut",
        onComplete: () => {
          setShowIntro(false);
          initGSAP();
        },
      });
    }
  }, [showIntro]);

  // Scroll-to-top button logic
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowScrollTop(window.scrollY > 300);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="smooth-wrapper" className="bg-slate-950 text-slate-100 min-h-screen font-sans selection:bg-indigo-500 selection:text-white relative overflow-x-hidden">
      {/* Custom Glow Cursor */}
      <Cursor />

      {/* Navbar fixed outside smooth-content for viewport position:fixed */}
      {!loading && !showIntro && (
        <Navbar
          onOpenAnalytics={() => setShowAnalytics(true)}
        />
      )}

      <div id="smooth-content">
        {/* Executive Preloader */}
        {loading && (
          <div className="loader fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-50 px-4 text-white">
            <div className="max-w-md w-full text-center">
              {/* Terminal status badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                SYSTEM INITIALIZING...
              </div>

              {/* Progress bar container */}
              <div className="w-full h-3 bg-slate-900 border border-white/10 rounded-full overflow-hidden p-0.5 shadow-2xl mb-4">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 rounded-full transition-all duration-150 ease-out shadow-[0_0_15px_rgba(99,102,241,0.8)]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                <span>&gt; Mounting MERN Core Engine...</span>
                <span className="text-indigo-400 font-bold text-sm">{progress}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Executive Opening Reveal Screen */}
        {showIntro && (
          <div className="intro fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-40 px-4 text-white text-center">
            <div className="intro-text flex flex-col items-center">
              <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase font-semibold mb-3">
                // WELCOME TO MY DEVELOPER PORTFOLIO
              </span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 tracking-tight mb-4">
                BABLU KUMAR
              </h1>
              <p className="text-base sm:text-xl font-semibold text-gray-300 tracking-wide max-w-xl">
                MERN Stack & High-Performance Frontend Engineer
              </p>
              <div className="flex flex-wrap justify-center gap-2.5 mt-6">
                <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
                  React 18
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono">
                  Node.js & Sockets
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono">
                  Java DSA
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Main Recruiter Workflow Section Sequence */}
        {!loading && !showIntro && (
          <main className="pt-20 relative">
            {/* Phase 1: Hook & First Impression */}
            <section id="home" className="reveal-section load-reveal">
              <Hero onOpenGuidedTour={() => setShowGuidedTour(true)} />
            </section>

            <BenchmarkCounters />
            <LighthouseDashboard />

            {/* Phase 2: Candidate Identity & Core Skill Stack */}
            <section id="about" className="reveal-section load-reveal">
              <About />
            </section>

            <section id="skills" className="reveal-section load-reveal">
              <Skills />
            </section>

            <CandidateManifesto />

            {/* Phase 3: Production Projects */}
            <section id="projects" className="reveal-section load-reveal">
              <Projects onOpenArchitecture={(title) => setArchProjectTitle(title)} />
            </section>

            <CertificationVault />

            {/* Quick Action Candidate Banner */}
            <div className="py-8 bg-slate-950 text-center border-y border-white/10">
              <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-4 px-4">
                <button
                  onClick={() => setShowGuidedTour(true)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition"
                >
                  <FaBriefcase /> 30s Interactive Candidate Tour
                </button>
                <button
                  onClick={() => setShowHowIBuiltThis(true)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 border border-white/10 hover:border-indigo-500/40 text-gray-200 font-semibold text-xs sm:text-sm flex items-center gap-2 transition"
                >
                  <FaCogs className="text-indigo-400" /> How I Built This Portfolio
                </button>
                <button
                  onClick={() => setShowComparison(true)}
                  className="px-5 py-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 hover:text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition"
                >
                  <FaBalanceScale /> Project Comparison Matrix
                </button>
                <button
                  onClick={() => setShowQuizModal(true)}
                  className="px-5 py-2.5 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 hover:text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition"
                >
                  ⚡ Test My Technical Skills (Quiz)
                </button>
              </div>
            </div>

            {/* Phase 4: Interactive Proofs, GitHub & Algorithmic Problem Solving */}
            <SkillsGalaxy3D />

            <section id="code" className="reveal-section load-reveal">
              <CodeShowcase />
            </section>

            <GitHubVisualizer />
            <AlgorithmsPlayground />
            <CareerTimeline />

            {/* Phase 5: Direct Hiring Conversion */}
            <section id="contact" className="reveal-section load-reveal">
              <Contact />
            </section>

            <Footer />
          </main>
        )}

        {/* Lazy Suspense Modals */}
        <Suspense fallback={null}>
          {showAnalytics && <RecruiterAnalytics onClose={() => setShowAnalytics(false)} />}
          {showQuizModal && (
            <RecruiterQuizModal isOpen={showQuizModal} onClose={() => setShowQuizModal(false)} />
          )}
          {showHowIBuiltThis && (
            <HowIBuiltThis isOpen={showHowIBuiltThis} onClose={() => setShowHowIBuiltThis(false)} />
          )}
          {showComparison && (
            <ProjectComparison isOpen={showComparison} onClose={() => setShowComparison(false)} />
          )}
          {showGuidedTour && (
            <GuidedTourModal isOpen={showGuidedTour} onClose={() => setShowGuidedTour(false)} />
          )}
          {archProjectTitle && (
            <SystemArchitectureModal
              projectTitle={archProjectTitle}
              onClose={() => setArchProjectTitle(null)}
            />
          )}
          <AIChatAssistant />
        </Suspense>

        {/* Back to top button */}
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-indigo-600 text-white shadow-xl hover:bg-indigo-500 transition duration-200"
          >
            ↑
          </button>
        )}
      </div>
    </div>
  );
}