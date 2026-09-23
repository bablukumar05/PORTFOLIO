import React, { useState, useEffect, lazy, Suspense } from "react";
import gsap from "gsap";
import { FaBriefcase, FaCogs, FaBalanceScale } from "react-icons/fa";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BenchmarkCounters from "./components/BenchmarkCounters";
import LighthouseDashboard from "./components/LighthouseDashboard";
import About from "./components/About";
import Skills from "./components/Skills";
import CandidateManifesto from "./components/CandidateManifesto";
import CodeShowcase from "./components/CodeShowcase";
import Projects from "./components/Projects";
import CareerTimeline from "./components/CareerTimeline";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import { initGSAP } from "./utils/gsapAnimations";

const CertificationVault = lazy(() => import("./components/CertificationVault"));
const SkillsGalaxy3D = lazy(() => import("./components/SkillsGalaxy3D"));
const GitHubVisualizer = lazy(() => import("./components/GitHubVisualizer"));
const AlgorithmsPlayground = lazy(() => import("./components/AlgorithmsPlayground"));

const RecruiterAnalytics = lazy(() => import("./components/RecruiterAnalytics"));
const SystemArchitectureModal = lazy(() => import("./components/SystemArchitectureModal"));
const RecruiterQuizModal = lazy(() => import("./components/RecruiterQuizModal"));
const HowIBuiltThis = lazy(() => import("./components/HowIBuiltThis"));
const ProjectComparison = lazy(() => import("./components/ProjectComparison"));
const GuidedTourModal = lazy(() => import("./components/GuidedTourModal"));
const AIChatAssistant = lazy(() => import("./components/AIChatAssistant"));

export default function App() {
  const hasVisited = typeof window !== "undefined" && Boolean(sessionStorage.getItem("portfolio_booted"));
  const [loading, setLoading] = useState(!hasVisited);
  const [progress, setProgress] = useState(hasVisited ? 100 : 0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showHowIBuiltThis, setShowHowIBuiltThis] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showGuidedTour, setShowGuidedTour] = useState(false);
  const [archProjectTitle, setArchProjectTitle] = useState(null);

  useEffect(() => {
    if (hasVisited) {
      initGSAP();
      return;
    }

    let counter = { value: 0 };
    gsap.to(counter, {
      value: 100,
      duration: 0.35,
      ease: "power2.out",
      onUpdate: () => setProgress(Math.floor(counter.value)),
      onComplete: () => {
        gsap.to(".loader", {
          opacity: 0,
          duration: 0.15,
          onComplete: () => {
            setLoading(false);
            sessionStorage.setItem("portfolio_booted", "true");
            initGSAP();
          },
        });
      },
    });
  }, [hasVisited]);

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
      <Navbar onOpenAnalytics={() => setShowAnalytics(true)} />

      <div id="smooth-content">
        {loading && (
          <div className="loader fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-50 px-4 text-white">
            <div className="max-w-md w-full text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                SYSTEM INITIALIZING...
              </div>

              <div className="w-full h-3 bg-slate-900 border border-white/10 rounded-full overflow-hidden p-0.5 shadow-2xl mb-4">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 via-indigo-400 to-slate-200 rounded-full transition-all duration-75 ease-out shadow-[0_0_15px_rgba(99,102,241,0.5)]"
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

        <main className="pt-20 relative">
          <section id="home" className="reveal-section load-reveal">
            <Hero onOpenGuidedTour={() => setShowGuidedTour(true)} />
          </section>

          <BenchmarkCounters />
          <LighthouseDashboard />

          <section id="about" className="reveal-section load-reveal">
            <About />
          </section>

          <section id="skills" className="reveal-section load-reveal">
            <Skills />
          </section>

          <CandidateManifesto />

          <section id="projects" className="reveal-section load-reveal">
            <Projects onOpenArchitecture={(title) => setArchProjectTitle(title)} />
          </section>

          <Suspense fallback={null}>
            <CertificationVault />
          </Suspense>

          <div className="py-8 bg-slate-950 text-center border-y border-white/10">
            <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-4 px-4">
              <button
                onClick={() => setShowGuidedTour(true)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition"
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
                className="px-5 py-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 hover:text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition"
              >
                <FaBalanceScale /> Project Comparison Matrix
              </button>
              <button
                onClick={() => setShowQuizModal(true)}
                className="px-5 py-2.5 rounded-xl bg-slate-800/80 border border-white/10 text-slate-200 hover:border-indigo-500/40 hover:text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition"
              >
                ⚡ Test My Technical Skills (Quiz)
              </button>
            </div>
          </div>

          <Suspense fallback={null}>
            <SkillsGalaxy3D />
          </Suspense>

          <section id="code" className="reveal-section load-reveal">
            <CodeShowcase />
          </section>

          <Suspense fallback={null}>
            <GitHubVisualizer />
            <AlgorithmsPlayground />
          </Suspense>
          <CareerTimeline />

          <section id="contact" className="reveal-section load-reveal">
            <Contact />
          </section>

          <Footer />
        </main>

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