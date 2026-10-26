import React, { useState, useEffect, lazy, Suspense } from "react";
import gsap from "gsap";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BenchmarkCounters from "./components/BenchmarkCounters";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import CareerTimeline from "./components/CareerTimeline";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import { initGSAP } from "./utils/gsapAnimations";

const CertificationVault = lazy(() => import("./components/CertificationVault"));
const ResumeModal = lazy(() => import("./components/ResumeModal"));

export default function App() {
  const hasVisited = typeof window !== "undefined" && Boolean(sessionStorage.getItem("portfolio_booted"));
  const [loading, setLoading] = useState(!hasVisited);
  const [progress, setProgress] = useState(hasVisited ? 100 : 0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);

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
      <Navbar
        onOpenResume={() => setShowResumeModal(true)}
      />

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
            <Hero
              onOpenResume={() => setShowResumeModal(true)}
            />
          </section>

          <BenchmarkCounters />

          <section id="about" className="reveal-section load-reveal">
            <About onOpenResume={() => setShowResumeModal(true)} />
          </section>

          <section id="skills" className="reveal-section load-reveal">
            <Skills />
          </section>

          <section id="projects" className="reveal-section load-reveal">
            <Projects />
          </section>

          <Suspense fallback={null}>
            <CertificationVault />
          </Suspense>

          <CareerTimeline />

          <section id="services" className="reveal-section load-reveal">
            <Services />
          </section>

          <section id="contact" className="reveal-section load-reveal">
            <Contact />
          </section>

          <Footer />
        </main>

        <Suspense fallback={null}>
          {showResumeModal && (
            <ResumeModal isOpen={showResumeModal} onClose={() => setShowResumeModal(false)} />
          )}
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