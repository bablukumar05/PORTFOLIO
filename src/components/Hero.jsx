import React from "react";
import { Typewriter } from "react-simple-typewriter";
import profile from "../assets/profile.jpg";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaFacebookF } from "react-icons/fa";
import "./Hero.css"; // Make sure this path is correct

export default function Hero() {
  const resumePath = "/resume.pdf";

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const socialLinks = [
    { Icon: FaGithub, url: "https://github.com/bablukumar05" },
    { Icon: FaLinkedin, url: "https://www.linkedin.com/in/bablu-kumar-145642281/" },
    { Icon: FaTwitter, url: "https://twitter.com/bablu_kumar" },
    { Icon: FaInstagram, url: "https://www.instagram.com/bablu_yadav__2024/" },
    { Icon: FaFacebookF, url: "https://facebook.com/bablu.kumar" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 md:px-16 bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 overflow-hidden">

      {/* Floating blobs */}
      <div className="absolute top-16 left-8 w-36 h-36 rounded-full bg-indigo-600 opacity-20 mix-blend-multiply filter blur-2xl animate-float pointer-events-none sm:w-40 sm:h-40 sm:top-20 sm:left-10 md:w-44 md:h-44" />
      <div className="absolute bottom-28 right-16 w-44 h-44 rounded-full bg-pink-500 opacity-20 mix-blend-multiply filter blur-2xl animate-float animation-delay-1000 pointer-events-none sm:w-52 sm:h-52 sm:bottom-32 sm:right-20 md:w-52 md:h-52" />
      <div className="absolute top-1/2 left-1/2 w-28 h-28 rounded-full bg-purple-500 opacity-20 mix-blend-multiply filter blur-2xl animate-float animation-delay-2000 pointer-events-none sm:w-36 sm:h-36 md:w-36 md:h-36" />

      {/* Main content card */}
      <div className="relative z-10 max-w-6xl w-full flex flex-col md:flex-row items-center gap-6 md:gap-14 p-6 sm:p-12 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl">

        {/* Text section */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-text-shine">
            Hi, I'm Bablu Kumar
          </h1>

          <p className="mt-4 text-indigo-300 font-semibold text-lg sm:text-xl min-h-[38px]">
            <Typewriter
              words={["MERN Stack Developer", "React + Tailwind", "Animations & UX"]}
              loop
              cursor
              cursorStyle="▍"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </p>

          <p className="mt-2 text-indigo-400 text-sm sm:text-base font-light">
            Based in India | Passionate about creating seamless web experiences
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={() => scrollTo("projects")}
              className="px-6 sm:px-7 py-3 rounded-lg font-semibold shadow-lg transition bg-indigo-600 hover:bg-indigo-700 hover:scale-105 hover:shadow-xl text-white"
            >
              See Projects
            </button>
            <a
              href={resumePath}
              download="resume.pdf"
              className="px-6 sm:px-7 py-3 rounded-lg font-semibold shadow-lg transition bg-indigo-700 hover:bg-indigo-800 hover:scale-105 hover:shadow-xl text-white text-center"
            >
              Download Resume
            </a>
          </div>

          {/* Social icons */}
          <div className="mt-8 flex justify-center md:justify-start gap-5 text-indigo-300 text-2xl">
            {socialLinks.map(({ Icon, url }, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-125 hover:text-indigo-400"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Profile image */}
        <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full overflow-hidden ring-2 ring-indigo-500/40 shadow-lg transition-transform hover:scale-105">
          <img
            src={profile}
            alt="Bablu profile"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
 
