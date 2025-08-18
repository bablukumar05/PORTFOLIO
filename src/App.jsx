import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { FaGlobe } from "react-icons/fa";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Cursor from "./components/Cursor";
import { initGSAP } from "./utils/gsapAnimations";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showIntro, setShowIntro] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

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
    const handleScroll = () => {
      const scrollElement = document.querySelector("#smooth-content");
      setShowScrollTop(scrollElement.scrollTop > 100);
    };

    const scrollElement = document.querySelector("#smooth-content");
    scrollElement.addEventListener("scroll", handleScroll);
    return () => scrollElement.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const scrollElement = document.querySelector("#smooth-content");
    gsap.to(scrollElement, { scrollTo: 0, duration: 1, ease: "power2.out" });
  };

  const sections = [
    { id: "home", Component: Hero },
    { id: "about", Component: About },
    { id: "skills", Component: Skills },
    { id: "projects", Component: Projects },
    { id: "contact", Component: Contact },
  ];

  return (
    <div id="smooth-wrapper" style={{ position: "relative" }}>
      <div id="smooth-content">
        {/* Loader */}
        {loading && (
          <div className="loader fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
            <div className="w-3/4 h-2 bg-gray-700 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <h2 className="text-white text-2xl font-bold">{progress}%</h2>
          </div>
        )}

        {/* Intro Screen */}
        {showIntro && (
          <div className="intro fixed inset-0 bg-black flex items-center justify-center z-40">
            <h1 className="intro-text flex items-center gap-3 text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
              WELCOME TO MY WORLD
              <FaGlobe className="text-blue-400 animate-spin-slow" />
            </h1>
          </div>
        )}

        {/* Portfolio content */}
        {!loading && !showIntro && (
          <>
            <Navbar />
            <main className="pt-20 relative">
              {sections.map(({ id, Component }) => (
                <section key={id} id={id} className="reveal-section load-reveal">
                  <Component />
                </section>
              ))}

              <footer className="py-8 text-center text-gray-400">
                © {new Date().getFullYear()} Bablu Kumar
              </footer>
            </main>
          </>
        )}
      </div>

      {/* Cursor outside smooth-content */}
      {!loading && <Cursor />}

      {/* Dynamic Scroll-to-Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          style={{
            position: "absolute", // absolute to move with smooth-content
            bottom: 40,
            right: 40,
            zIndex: 9999,
            backgroundColor: "#6366f1",
            color: "white",
            border: "none",
            padding: "12px 16px",
            borderRadius: "50%",
            fontSize: 20,
            cursor: "pointer",
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            transition: "opacity 0.3s",
          }}
        >
          ⬆
        </button>
      )}
    </div>
  );
}
