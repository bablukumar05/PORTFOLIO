import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const SKILL_NODES = [
  { name: "React 18", color: "#61dafb", radius: 140, speed: 0.008, angle: 0 },
  { name: "Node.js", color: "#3c873a", radius: 180, speed: 0.006, angle: Math.PI / 3 },
  { name: "MongoDB", color: "#47a248", radius: 220, speed: 0.005, angle: (Math.PI * 2) / 3 },
  { name: "JavaScript", color: "#f7df1e", radius: 160, speed: 0.007, angle: Math.PI },
  { name: "Tailwind CSS", color: "#38bdf8", radius: 200, speed: 0.004, angle: (Math.PI * 4) / 3 },
  { name: "Java DSA", color: "#ff6b6b", radius: 240, speed: 0.003, angle: (Math.PI * 5) / 3 },
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

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw Center Core (Bablu Kumar Tech Hub)
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

      // Draw Orbiting Nodes
      nodes.forEach((node) => {
        node.angle += node.speed;
        const x = centerX + Math.cos(node.angle) * node.radius;
        const y = centerY + Math.sin(node.angle) * (node.radius * 0.45);

        // Orbit Line
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, node.radius, node.radius * 0.45, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        ctx.stroke();

        // Node Circle
        ctx.beginPath();
        ctx.arc(x, y, 16, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Skill Label
        ctx.fillStyle = "#ffffff";
        ctx.font = "11px sans-serif";
        ctx.fillText(node.name, x, y + 26);
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="relative py-12 bg-slate-950 border-t border-white/10 overflow-hidden text-center">
      <div className="max-w-4xl mx-auto px-4 mb-4">
        <h3 className="text-2xl font-extrabold text-white">Interactive 3D Tech Galaxy</h3>
        <p className="text-xs text-gray-400 mt-1">GPU-accelerated orbital visualization of core skills</p>
      </div>

      <div className="relative w-full max-w-4xl mx-auto h-[420px]">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </div>
  );
}
