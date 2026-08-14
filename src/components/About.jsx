import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { FaBriefcase, FaBullseye, FaCameraRetro } from "react-icons/fa";

// Detect device type
const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;

const CanvasParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const count = isMobile ? 25 : 50;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (!isMobile && dist < 100) {
          p.x += (dx / dist) * 1.5;
          p.y += (dy / dist) * 1.5;
        } else {
          p.x += p.speedX;
          p.y += p.speedY;
        }

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
};

const cardsData = [
  { title: "Experience", text: "Entry-Level MERN Developer — Built full-stack apps with React 18, Tailwind CSS, GSAP, Node.js & MongoDB.", icon: <FaBriefcase size={28} className="text-pink-500" /> },
  { title: "Focus", text: "High-performance motion UX, 60fps animations, Web Accessibility (a11y), responsive UI & DSA in Java.", icon: <FaBullseye size={28} className="text-purple-500" /> },
  { title: "Hobbies & Interests", text: "Exploring modern UI/UX design systems, micro-interactions, building React tools & mastering new tech stacks.", icon: <FaCameraRetro size={28} className="text-indigo-500" /> },
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
      if (!cardRef.current) return;
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

    return (
      <motion.article
        ref={cardRef}
        className="p-6 rounded-xl cursor-pointer select-none flex flex-col items-center text-center perspective-1000 border border-white/10"
        style={{
          rotateX,
          rotateY,
          scale,
          x: offsetX,
          y: offsetY,
          boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.5), 0 0 15px rgba(255, 255, 255, 0.05)",
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
      <CanvasParticles />

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

        <motion.p className="mt-4 text-gray-300 leading-relaxed max-w-3xl mx-auto text-base sm:text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          I’m an aspiring MERN Stack & Frontend Developer with a strong foundation in React.js, Tailwind CSS, and interactive GSAP animations. I specialize in creating dynamic, responsive web applications enhanced with smooth motion UX. Additionally, I bring a solid background in Data Structures and Algorithms using Java, enabling me to write clean, optimized, and efficient code.
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
