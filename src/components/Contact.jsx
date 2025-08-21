import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaPaperPlane,
  FaEnvelope,
  FaLinkedin,
  FaPhoneAlt,
  FaGithub,
  FaArrowUp,
} from "react-icons/fa";

// Hook for reveal animations
function useReveal(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return visible;
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [scrollTopVisible, setScrollTopVisible] = useState(false);

  const sectionRef = useRef(null);
  const blobRefs = useRef([]);
  const particleRefs = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const reveal = useReveal(sectionRef);

  // Mouse parallax animation
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      blobRefs.current.forEach((el) => {
        if (!el) return;
        const depth = parseFloat(el.dataset.depth);
        const baseX = (mouse.current.x / window.innerWidth - 0.5) * 15 * depth;
        const baseY = (mouse.current.y / window.innerHeight - 0.5) * 15 * depth;

        const rect = el.getBoundingClientRect();
        const dx = mouse.current.x - (rect.left + rect.width / 2);
        const dy = mouse.current.y - (rect.top + rect.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const scale = distance < 150 ? 1 + (150 - distance) / 600 : 1;

        el.style.transform = `translate(${baseX}px, ${baseY}px) scale(${scale})`;
      });

      particleRefs.current.forEach((el) => {
        if (!el) return;
        const depth = parseFloat(el.dataset.depth);
        el.style.transform = `translate(${
          (mouse.current.x / window.innerWidth - 0.5) * 10 * depth
        }px, ${(mouse.current.y / window.innerHeight - 0.5) * 10 * depth}px)`;
      });

      requestAnimationFrame(animate);
    };
    animate();

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll top button visibility
  useEffect(() => {
    const onScroll = () => setScrollTopVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus({ type: "error", message: "Please fix the errors above." });
      return;
    }
    setStatus({ type: "success", message: "Message sent successfully!" });
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setStatus(null), 4000);
  };

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  // Blobs and particles
  const blobs = [
    {
      size: 288,
      top: -128,
      left: -128,
      colors: "from-indigo-500 via-pink-500 to-purple-500",
      depth: 2,
    },
    {
      size: 384,
      bottom: -128,
      right: -128,
      colors: "from-green-400 via-blue-500 to-indigo-600",
      depth: 1.2,
    },
  ];

  const particles = Array.from({ length: 20 }).map(() => ({
    size: Math.random() * 20 + 10,
    top: Math.random() * 100,
    left: Math.random() * 100,
    colors: "from-indigo-400 via-pink-500 to-purple-500",
    depth: Math.random() * 1.5 + 0.5,
  }));

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-6 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Blobs */}
      {blobs.map((b, i) => (
        <div
          key={i}
          ref={(el) => (blobRefs.current[i] = el)}
          data-depth={b.depth}
          className={`absolute rounded-full filter blur-3xl opacity-40 animate-blob mix-blend-multiply bg-gradient-to-r ${b.colors} blob-hover`}
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            bottom: b.bottom,
            left: b.left,
            right: b.right,
            transition: "transform 0.3s ease",
          }}
        ></div>
      ))}

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={i}
            ref={(el) => (particleRefs.current[i] = el)}
            data-depth={p.depth}
            className={`absolute rounded-full opacity-20 bg-gradient-to-r ${p.colors}`}
            style={{
              width: p.size,
              height: p.size,
              top: `${p.top}%`,
              left: `${p.left}%`,
              animation: `floatParticle ${
                5 + Math.random() * 10
              }s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Header */}
      <motion.h2
        className="text-3xl sm:text-4xl font-extrabold text-indigo-500 mb-4 text-center animate-type"
        initial={{ opacity: 0, y: -20 }}
        animate={reveal ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        Get in Touch
      </motion.h2>
      <motion.p
        className="text-gray-300 text-center max-w-xl mx-auto mb-10 text-base sm:text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={reveal ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Feel free to reach out for collaborations, inquiries, or just to say hi!
      </motion.p>

      {/* Grid: Socials + Form */}
      <div className="grid md:grid-cols-2 gap-10 mt-10 relative z-10">
        {/* Socials */}
        <motion.div
          className="flex flex-col gap-6 text-left"
          initial={{ opacity: 0, x: -20 }}
          animate={reveal ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-indigo-400 text-xl" />
            <a
              href="mailto:kumarbablu74824@gmail.com"
              className="text-gray-300 hover:text-indigo-400 transition"
            >
              kumarbablu74824@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-3">
            <FaPhoneAlt className="text-indigo-400 text-xl" />
            <a
              href="tel:+918825138188"
              className="text-gray-300 hover:text-indigo-400 transition"
            >
              +91 8825138188
            </a>
          </div>
          <div className="flex items-center gap-3">
            <FaLinkedin className="text-indigo-400 text-xl" />
            <a
              href="https://www.linkedin.com/in/bablu-kumar-145642281/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-indigo-400 transition"
            >
              LinkedIn
            </a>
          </div>
          <div className="flex items-center gap-3">
            <FaGithub className="text-indigo-400 text-xl" />
            <a
              href="https://github.com/bablukumar05"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-indigo-400 transition"
            >
              GitHub
            </a>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-gray-900/70 backdrop-blur-md p-6 rounded-xl shadow-2xl"
          initial={{ opacity: 0, x: 20 }}
          animate={reveal ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-500 focus:outline-none"
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-500 focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-500 focus:outline-none resize-none"
            />
            {errors.message && (
              <p className="text-red-400 text-xs mt-1">{errors.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-transform hover:scale-105 flex items-center justify-center gap-2"
          >
            Send Message <FaPaperPlane />
          </button>
          {status && (
            <p
              className={`text-sm mt-2 ${
                status.type === "success" ? "text-green-400" : "text-red-400"
              }`}
            >
              {status.message}
            </p>
          )}
        </motion.form>
      </div>

      {/* Scroll Top */}
      {scrollTopVisible && (
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.2 }}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transition z-50"
        >
          <FaArrowUp size={20} />
        </motion.button>
      )}

      {/* Animations */}
      <style>{`
        @keyframes typing { from { width: 0 } to { width: 10ch } }
        @keyframes blink { 50% { border-color: transparent } }
        .animate-type { overflow: hidden; white-space: nowrap; border-right: 4px solid; animation: typing 2.5s steps(10,end) forwards, blink 0.75s step-end infinite; max-width:10ch; margin:0 auto; }
        @keyframes blob { 0%,100% { transform: translate(0px,0px) scale(1); } 33% { transform: translate(30px,-20px) scale(1.1); } 66% { transform: translate(-20px,30px) scale(0.9); } }
        .animate-blob { animation: blob 8s infinite; }
        @keyframes floatParticle {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity:0.2; }
          50% { transform: translateY(-20px) translateX(10px) rotate(180deg); opacity:0.35; }
          100% { transform: translateY(0) translateX(0) rotate(360deg); opacity:0.2; }
        }
        @keyframes ripple { 0% { transform: scale(1); opacity: 0.4; } 50% { transform: scale(1.1); opacity: 0.6; } 100% { transform: scale(1); opacity: 0.4; } }
        .blob-hover:hover { animation: ripple 1.5s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
