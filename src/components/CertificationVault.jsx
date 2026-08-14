import React from "react";
import { motion } from "framer-motion";
import { FaAward, FaCheckCircle, FaExternalLinkAlt } from "react-icons/fa";

const CERTIFICATIONS = [
  {
    id: 1,
    title: "Full Stack Web Development",
    issuer: "Apna College (Delta Batch)",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7389172063984566272/",
    badge: "🏆 Verified Full Stack Credential",
  },
  {
    id: 2,
    title: "Alpha (DSA with Java)",
    issuer: "Apna College (Alpha Batch)",
    link: "https://www.linkedin.com/in/bablu-kumar-145642281/overlay/1772333773001/single-media-viewer/?profileId=ACoAAESdqkUBh7IG2L2pC-qneXe34j42YEqnay8",
    badge: "🏆 Verified DSA Credential",
  },
  {
    id: 3,
    title: "Backend Development",
    issuer: "PW Skills (Physics Wallah)",
    link: "https://pwskills.com/learn/certificate/fe7c82dd-ff7e-42ac-aa98-6a52c7539f25/",
    badge: "🏆 Verified Backend Credential",
  },
];

export default function CertificationVault() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-12 bg-slate-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto text-center z-10 relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold mb-4">
          VERIFIED CREDENTIALS
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Certification <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Vault</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg mb-16">
          Verified certifications in Full Stack Engineering, Data Structures & Algorithms with Java, and Backend Architecture.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {CERTIFICATIONS.map((cert) => (
            <motion.a
              key={cert.id}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -6, scale: 1.02 }}
              aria-label={`View ${cert.title} certificate`}
              className="bg-slate-900/80 border border-white/10 p-6 sm:p-8 rounded-3xl text-left flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-emerald-500/40 transition duration-300 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-lg">
                    <FaAward />
                  </div>
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                    <FaCheckCircle /> Verified <FaExternalLinkAlt className="text-[10px] ml-1 text-gray-400 group-hover:text-emerald-400 transition" />
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition duration-200">
                  {cert.title}
                </h3>
                <p className="text-xs text-gray-400 mt-2 font-medium">{cert.issuer}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-indigo-300 font-semibold">{cert.badge}</span>
                <span className="text-xs text-emerald-400 font-medium group-hover:underline flex items-center gap-1">
                  View <FaExternalLinkAlt className="text-[9px]" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
