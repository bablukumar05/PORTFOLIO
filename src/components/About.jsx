import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { FaBriefcase, FaBullseye, FaCameraRetro } from "react-icons/fa";

// Detect device type
const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;

// Particle system
const NUM_PARTICLES = isMobile ? 20 : 50;

const Particle = ({ mouseX, mouseY }) => {
  const [pos, setPos] = useState({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 4 + 2,
    opacity: Math.random() * 0.4 + 0.1,
    speedX: Math.random() * 0.5 - 0.25,
    speedY: Math.random() * 0.5 - 0.25,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPos((prev) => {
        let dx = prev.x - mouseX;
        let dy = prev.y - mouseY;
        let dist = Math.sqrt(dx * dx + dy * dy);
        let moveX = prev.speedX;
        let moveY = prev.speedY;
        if (!isMobile && dist < 100) {
          moveX += dx / 1000;
          moveY += dy / 1000;
        }
        let newX = (prev.x + moveX + window.innerWidth) % window.innerWidth;
        let newY = (prev.y + moveY + window.innerHeight) % window.innerHeight;
        return { ...prev, x: newX, y: newY };
      });
    }, 16);
    return () => clearInterval(interval);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        position: "absolute",
        left: pos.x,
        top: pos.y,
        width: pos.size,
        height: pos.size,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.3)",
        pointerEvents: "none",
        filter: isMobile ? "blur(0.5px)" : "blur(1px)",
      }}
    />
  );
};

const ParticleBackground = () => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      {Array.from({ length: NUM_PARTICLES }).map((_, i) => (
        <Particle key={i} mouseX={mousePos.x} mouseY={mousePos.y} />
      ))}
    </div>
  );
};

const cardsData = [
  { title: "Experience", text: "Fresher — React, Tailwind, GSAP, Framer Motion.", icon: <FaBriefcase size={28} className="text-pink-500" /> },
  { title: "Focus", text: "Animations, accessibility, responsive UI.", icon: <FaBullseye size={28} className="text-purple-500" /> },
  { title: "Hobbies", text: "Frontend & UI/UX Design,React.js & Web Development,Learning New Tech Stacks", icon: <FaCameraRetro size={28} className="text-indigo-500" /> },
];

export default function About() {
  const [scrollY, setScrollY] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);

  // Throttle scroll updates
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const TiltCard = ({ icon, title, text, index }) => {
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateLimit = isMobile ? 5 : 15;
    const rotateX = useTransform(y, [-50, 50], [rotateLimit, -rotateLimit]);
    const rotateY = useTransform(x, [-50, 50], [-rotateLimit, rotateLimit]);

    const handleMouseMove = (e) => {
      const rect = cardRef.current.getBoundingClientRect();
      const cardX = e.clientX - rect.left;
      const cardY = e.clientY - rect.top;
      x.set(cardX - rect.width / 2);
      y.set(cardY - rect.height / 2);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
      setHoverIndex(null);
    };

    const offsetX = hoverIndex !== null && hoverIndex !== index ? (index - hoverIndex) * 10 : 0;
    const offsetY = hoverIndex !== null && hoverIndex !== index ? Math.abs(index - hoverIndex) * 5 : 0;
    const scale = hoverIndex === index ? 1.08 : 1;

    const shadowX = useTransform(x, [-50, 50], [10, -10]);
    const shadowY = useTransform(y, [-50, 50], [10, -10]);
    const shadowBlur = useTransform(x, [-50, 50], [15, 30]);

    return (
      <motion.article
        ref={cardRef}
        className="p-6 rounded-xl cursor-pointer select-none flex flex-col items-center text-center perspective-1000"
        style={{
          rotateX,
          rotateY,
          scale,
          x: offsetX,
          y: offsetY,
          boxShadow: `calc(${shadowX}px) calc(${shadowY}px) ${shadowBlur}px rgba(0,0,0,0.3), 0 0 15px rgba(255,255,255,0.05)`,
          background: "linear-gradient(135deg, #1f2937 0%, #374151 100%)",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHoverIndex(index)}
        onMouseLeave={handleMouseLeave}
        tabIndex={0}
        role="region"
        aria-labelledby={`${title}-title`}
        aria-describedby={`${title}-desc`}
      >
        <motion.div
          className="mb-4"
          animate={{ y: [0, -6, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
        >
          {icon}
        </motion.div>
        <h3 id={`${title}-title`} className="font-semibold text-white text-xl mb-2">{title}</h3>
        <p id={`${title}-desc`} className="text-gray-300 text-sm sm:text-base">{text}</p>
      </motion.article>
    );
  };

  return (
    <section id="about" className="relative py-24 px-6 sm:px-12 bg-gray-900 overflow-hidden" aria-label="About Me Section">
      <ParticleBackground />

      {/* Gradient blobs */}
      <motion.div className="absolute w-72 h-72 bg-pink-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-40 top-[-80px] left-[-60px]"
        animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
        style={{ transform: `translateY(${scrollY * 0.02}px)` }}
      />
      <motion.div className="absolute w-80 h-80 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 top-1/4 right-[-100px]"
        animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
        style={{ transform: `translateY(${scrollY * 0.03}px)` }}
      />
      <motion.div className="absolute w-56 h-56 bg-indigo-500 rounded-full mix-blend-soft-light filter blur-2xl opacity-30 bottom-[-60px] left-1/4"
        animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
        style={{ transform: `translateY(${scrollY * 0.01}px)` }}
      />

      {/* Floating lines */}
      {!isMobile && (
        <>
          <motion.div className="absolute w-px h-64 bg-gradient-to-b from-pink-400 to-purple-600 opacity-20 top-1/3 left-1/2"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
          />
          <motion.div className="absolute w-px h-48 bg-gradient-to-b from-indigo-400 to-purple-500 opacity-20 top-2/3 right-1/3"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
          />
        </>
      )}

      <div className="relative max-w-5xl mx-auto text-center z-10">
        <motion.h2 className="relative inline-block text-3xl sm:text-4xl font-extrabold text-white mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          About Me
          <motion.span className="block h-1 w-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mt-2 mx-auto"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ originX: 0 }}
          />
        </motion.h2>

        <motion.p className="mt-2 text-gray-300 leading-relaxed max-w-3xl mx-auto text-base sm:text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}
        >
          I’m a dedicated MERN stack developer with strong expertise in frontend
          development and growing backend skills. I specialize in creating
          dynamic, responsive web applications enhanced with GSAP animations
          for smooth, engaging user experiences. Additionally, I have a solid
          foundation in data structures and algorithms using Java, enabling me
          to write efficient and optimized code.
        </motion.p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {cardsData.map((card, i) => <TiltCard key={card.title} {...card} index={i} />)}
        </div>

        <motion.p className="mt-14 text-gray-400 italic max-w-2xl mx-auto text-sm sm:text-base"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          “I’m always eager to learn and collaborate on exciting projects that
          challenge me to grow as a developer and designer.”
        </motion.p>
      </div>
    </section>
  );
}
