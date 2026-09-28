import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const SKILL_NODES = [
  { name: "React.js", color: "#61dafb", radius: 130, speed: 0.008, angle: 0 },
  { name: "JavaScript (ES6+)", color: "#f7df1e", radius: 155, speed: 0.007, angle: Math.PI / 4 },
  { name: "Python", color: "#38bdf8", radius: 180, speed: 0.006, angle: Math.PI / 2 },
  { name: "Node.js & Express", color: "#3c873a", radius: 205, speed: 0.005, angle: (Math.PI * 3) / 4 },
  { name: "MongoDB & MySQL", color: "#47a248", radius: 230, speed: 0.0045, angle: Math.PI },
  { name: "Tailwind & Framer", color: "#818cf8", radius: 170, speed: 0.0055, angle: (Math.PI * 5) / 4 },
  { name: "JWT & Socket.IO", color: "#f59e0b", radius: 215, speed: 0.004, angle: (Math.PI * 3) / 2 },
  { name: "DSA & OOP", color: "#ff6b6b", radius: 245, speed: 0.0035, angle: (Math.PI * 7) / 4 },
];

export default function SkillsGalaxy3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = 420;
    };
    resize();
    window.addEventListener("resize", resize);

    const nodes = SKILL_NODES.map((n) => ({ ...n }));

    let isVisible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animId) {
          animId = requestAnimationFrame(render);
        } else if (!isVisible && animId) {
          cancelAnimationFrame(animId);
          animId = null;
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const render = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      ctx.beginPath();
      ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
      ctx.fillStyle = "#6366f1";
      ctx.shadowColor = "#818cf8";
      ctx.shadowBlur = 20;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 12px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("CORE", centerX, centerY);

      nodes.forEach((node) => {
        node.angle += node.speed;
        const x = centerX + Math.cos(node.angle) * node.radius;
        const y = centerY + Math.sin(node.angle) * (node.radius * 0.45);

        ctx.beginPath();
        ctx.ellipse(centerX, centerY, node.radius, node.radius * 0.45, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, 16, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = "#ffffff";
        ctx.font = "11px sans-serif";
        ctx.fillText(node.name, x, y + 26);
      });

      animId = requestAnimationFrame(render);
    };

    return () => {
      window.removeEventListener("resize", resize);
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="relative py-12 bg-slate-950 border-t border-white/10 overflow-hidden text-center">
      <div className="max-w-4xl mx-auto px-4 mb-4">
        <h3 className="text-2xl font-extrabold text-white">Interactive 3D Tech Galaxy</h3>
      </div>

      <div className="relative w-full max-w-4xl mx-auto h-[420px]">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </div>
  );
}
