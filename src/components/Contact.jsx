import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaPaperPlane,
  FaEnvelope,
  FaLinkedin,
  FaPhoneAlt,
  FaGithub,
  FaMapMarkerAlt,
  FaCopy,
  FaCheck,
  FaUser,
  FaCommentDots,
} from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Web Development",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formRef = useRef(null);

  const projectTypes = ["Web Development", "React Frontend", "Full Stack MERN", "UI/UX & Animation"];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("kumarbablu74824@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email address is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Please enter a valid email address";
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStatus({
        type: "success",
        message: "Thank you! Your message has been sent successfully. I will get back to you shortly.",
      });
      setFormData({ name: "", email: "", subject: "Web Development", message: "" });
      setTimeout(() => setStatus(null), 6000);
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-600/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          Available for New Opportunities
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight"
        >
          Let's Build Something <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Extraordinary Together
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-gray-300 text-base sm:text-lg leading-relaxed"
        >
          Have a project in mind, a question, or want to discuss full-time roles? Drop a message below or reach out directly.
        </motion.p>
      </div>

      {/* Grid: Contact Cards + Form */}
      <div className="grid lg:grid-cols-12 gap-8 mt-16 relative z-10 items-start">
        {/* Left Column (5 cols): Info Cards */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex flex-col gap-5"
        >
          {/* Email Card */}
          <div className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl hover:border-indigo-500/40 transition duration-300 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-xl group-hover:scale-110 transition duration-300">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">Email Address</p>
                  <a
                    href="mailto:kumarbablu74824@gmail.com"
                    aria-label="Send email to Bablu Kumar"
                    className="text-white font-medium hover:text-indigo-400 transition text-sm sm:text-base break-all"
                  >
                    kumarbablu74824@gmail.com
                  </a>
                </div>
              </div>
              <button
                onClick={handleCopyEmail}
                aria-label="Copy email address"
                className="p-2.5 rounded-lg bg-white/5 hover:bg-indigo-600 text-gray-300 hover:text-white transition duration-200"
                title="Copy Email"
              >
                {copied ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
              </button>
            </div>
          </div>

          {/* Phone Card */}
          <div className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl hover:border-indigo-500/40 transition duration-300 group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 text-xl group-hover:scale-110 transition duration-300">
                <FaPhoneAlt />
              </div>
              <div>
                <p className="text-xs font-semibold text-purple-300 uppercase tracking-wider">Phone / WhatsApp</p>
                <a
                  href="tel:+918825138188"
                  aria-label="Call Bablu Kumar"
                  className="text-white font-medium hover:text-purple-400 transition text-sm sm:text-base"
                >
                  +91 8825138188
                </a>
              </div>
            </div>
          </div>

          {/* Location Card */}
          <div className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl hover:border-indigo-500/40 transition duration-300 group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 text-xl group-hover:scale-110 transition duration-300">
                <FaMapMarkerAlt />
              </div>
              <div>
                <p className="text-xs font-semibold text-pink-300 uppercase tracking-wider">Location</p>
                <p className="text-white font-medium text-sm sm:text-base">India (IST / GMT +5:30)</p>
              </div>
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Connect on Social Media</p>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://github.com/bablukumar05"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-indigo-600/20 border border-white/5 hover:border-indigo-500/30 text-gray-200 hover:text-indigo-300 transition duration-200"
              >
                <FaGithub className="text-xl" />
                <span className="text-sm font-medium">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/bablu-kumar-145642281/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-blue-600/20 border border-white/5 hover:border-blue-500/30 text-gray-200 hover:text-blue-300 transition duration-200"
              >
                <FaLinkedin className="text-xl text-blue-400" />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column (7 cols): Professional Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="p-8 rounded-3xl bg-slate-900/70 backdrop-blur-2xl border border-white/10 shadow-2xl flex flex-col gap-6"
          >
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              Send a Direct Message
            </h3>

            {/* Name Input */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Your Name</label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  aria-label="Your Name"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-800/80 text-white placeholder-gray-500 border border-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition"
                />
              </div>
              {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>}
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Your Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. john@example.com"
                  aria-label="Your Email"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-800/80 text-white placeholder-gray-500 border border-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition"
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
            </div>

            {/* Project Subject Selector */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Subject / Interest</label>
              <div className="flex flex-wrap gap-2">
                {projectTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, subject: type }))}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border transition duration-200 ${
                      formData.subject === type
                        ? "bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30"
                        : "bg-slate-800/50 text-gray-300 border-white/10 hover:border-gray-500"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Textarea */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Message</label>
              <div className="relative">
                <FaCommentDots className="absolute left-4 top-4 text-gray-400 text-sm" />
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, timeline, or position..."
                  aria-label="Your Message"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-800/80 text-white placeholder-gray-500 border border-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition resize-none"
                />
              </div>
              {errors.message && <p className="text-red-400 text-xs mt-1.5">{errors.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              aria-label="Send Message"
              className="w-full py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30 transition duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Send Message <FaPaperPlane />
                </>
              )}
            </button>

            {/* Success / Error Toast Notification */}
            {status && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl text-sm font-medium ${
                  status.type === "success"
                    ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
                    : "bg-red-500/10 border border-red-500/30 text-red-300"
                }`}
              >
                {status.message}
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
