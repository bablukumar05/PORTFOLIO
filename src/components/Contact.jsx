import React, { useState, useEffect, useRef } from "react";
import { FaEnvelope, FaPhoneAlt, FaLinkedin, FaGithub, FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";

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
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [success, setSuccess] = useState(false);
  const [scrollTopVisible, setScrollTopVisible] = useState(false);

  const sectionRef = useRef(null);
  const blobRefs = useRef([]);
  const particleRefs = useRef([]);
  const reveal = useReveal(sectionRef);
  const mouse = useRef({ x: 0, y: 0 });

  // Cursor-follow parallax + proximity ripple
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

        // Cursor-proximity scaling
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
        el.style.transform = `translate(${(mouse.current.x / window.innerWidth - 0.5) * 10 * depth}px, ${(mouse.current.y / window.innerHeight - 0.5) * 10 * depth}px)`;
      });

      requestAnimationFrame(animate);
    };
    animate();

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollTopVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };
  const onBlur = (e) => {
    const { name } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setForm({ name: "", email: "", message: "" });
    setTouched({ name: false, email: false, message: false });
    setTimeout(() => setSuccess(false), 4000);
  };
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const isNameValid = form.name.trim().length > 1;
  const isEmailValid = /^\S+@\S+\.\S+$/.test(form.email);
  const isMessageValid = form.message.trim().length > 0;

  const socialLinks = [
    { href: "mailto:kumarbablu74824@gmail.com", icon: <FaEnvelope />, title: "Email", subtitle: "kumarbablu74824@gmail.com" },
    { href: "tel:+918825138188", icon: <FaPhoneAlt />, title: "Phone", subtitle: "+91 8825138188" },
    { href: "https://www.linkedin.com/in/bablu-kumar-145642281/", icon: <FaLinkedin />, title: "LinkedIn", subtitle: "/bablu-kumar", target: "_blank" },
    { href: "https://github.com/bablukumar05", icon: <FaGithub />, title: "GitHub", subtitle: "@bablukumar05", target: "_blank" }
  ];

  const blobs = [
    { size: 288, top: -128, left: -128, colors: "from-indigo-500 via-pink-500 to-purple-500", depth: 2 },
    { size: 384, bottom: -128, right: -128, colors: "from-green-400 via-blue-500 to-indigo-600", depth: 1.2 },
  ];

  const particles = Array.from({ length: 20 }).map(() => ({
    size: Math.random() * 20 + 10,
    top: Math.random() * 100,
    left: Math.random() * 100,
    colors: "from-indigo-400 via-pink-500 to-purple-500",
    depth: Math.random() * 1.5 + 0.5,
  }));

  return (
    <section ref={sectionRef} className="relative py-20 px-6 max-w-7xl mx-auto overflow-hidden">
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
              animation: `floatParticle ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 40 }} animate={reveal ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1 }} className="text-center relative z-10">
        <h2 className="text-4xl font-extrabold text-indigo-500 mb-2 animate-type cursor overflow-hidden border-r-4 border-indigo-500">Contact</h2>
        <p className="mt-4 text-gray-300 max-w-xl mx-auto text-lg">Want to work together? Send me a message or connect via socials.</p>
      </motion.div>

      {/* Form */}
      <motion.form
        onSubmit={onSubmit}
        className="relative z-10 mt-10 max-w-3xl mx-auto bg-gray-900 bg-opacity-70 backdrop-blur-md p-8 rounded-xl shadow-2xl text-left"
        initial={{ opacity: 0, y: 50 }}
        animate={reveal ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <input name="name" value={form.name} onChange={onChange} onBlur={onBlur} placeholder="Your name" className={`p-4 rounded-lg bg-gray-800 text-white border ${touched.name && !isNameValid ? "border-red-500" : "border-gray-700"} focus:outline-none focus:ring-2 focus:ring-indigo-500 transition`} required />
            {touched.name && !isNameValid && <small className="text-red-500 mt-1 font-medium">Please enter at least 2 characters.</small>}
          </div>
          <div className="flex flex-col">
            <input name="email" type="email" value={form.email} onChange={onChange} onBlur={onBlur} placeholder="Your email" className={`p-4 rounded-lg bg-gray-800 text-white border ${touched.email && !isEmailValid ? "border-red-500" : "border-gray-700"} focus:outline-none focus:ring-2 focus:ring-indigo-500 transition`} required />
            {touched.email && !isEmailValid && <small className="text-red-500 mt-1 font-medium">Enter a valid email.</small>}
          </div>
        </div>

        <textarea name="message" value={form.message} onChange={onChange} onBlur={onBlur} placeholder="Message" className={`mt-6 p-4 rounded-lg bg-gray-800 text-white border ${touched.message && !isMessageValid ? "border-red-500" : "border-gray-700"} w-full h-36 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition`} required />
        {touched.message && !isMessageValid && <small className="text-red-500 mt-1 font-medium">Message cannot be empty.</small>}

        <div className="mt-6 flex items-center gap-6">
          <button type="submit" disabled={!isNameValid || !isEmailValid || !isMessageValid} className="px-8 py-3 bg-indigo-600 rounded-lg text-white font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition">Send Message</button>
          <div className={`text-green-400 font-semibold transition-opacity duration-1000 ${success ? "opacity-100" : "opacity-0 pointer-events-none"}`}>✅ Message sent</div>
        </div>
      </motion.form>

      {/* Social Cards */}
      <motion.div className="relative z-10 mt-16 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto" initial={{ opacity: 0, y: 50 }} animate={reveal ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, delay: 0.4 }}>
        {socialLinks.map(({ href, icon, title, subtitle, target }, i) => (
          <motion.a key={i} href={href} target={target || "_self"} rel={target ? "noopener noreferrer" : undefined} whileHover={{ scale: 1.05, y: -3 }} className="p-6 bg-gray-900 bg-opacity-70 backdrop-blur-md rounded-xl text-center flex flex-col items-center gap-3 hover:shadow-xl hover:bg-indigo-900 transition-transform duration-300">
            <span className="text-3xl text-indigo-400">{icon}</span>
            <h3 className="font-semibold text-lg text-white">{title}</h3>
            <span className="text-gray-300 break-all select-text">{subtitle}</span>
          </motion.a>
        ))}
      </motion.div>

      {/* Scroll Top */}
      {scrollTopVisible && (
        <motion.button onClick={scrollToTop} aria-label="Scroll to top" whileHover={{ scale: 1.2 }} className="fixed bottom-8 right-8 p-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transition z-50">
          <FaArrowUp size={20} />
        </motion.button>
      )}

      <style>{`
        @keyframes typing { from { width: 0 } to { width: 10ch } }
        @keyframes blink { 50% { border-color: transparent } }
        .animate-type { overflow: hidden; white-space: nowrap; border-right: 4px solid; animation: typing 2.5s steps(10,end) forwards, blink 0.75s step-end infinite; max-width:10ch; margin:0 auto; }
        .cursor { caret-color: transparent; }

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
