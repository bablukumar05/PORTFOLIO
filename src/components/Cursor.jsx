import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";

const TRAIL_COUNT = 8;

export default function Cursor() {
    const x = useMotionValue(-100);
    const y = useMotionValue(-100);
    const scaleX = useMotionValue(1);
    const scaleY = useMotionValue(1);

    const springX = useSpring(x, { stiffness: 400, damping: 40 });
    const springY = useSpring(y, { stiffness: 400, damping: 40 });
    const springScaleX = useSpring(scaleX, { stiffness: 300, damping: 30 });
    const springScaleY = useSpring(scaleY, { stiffness: 300, damping: 30 });

    const mouse = useRef({ x: -100, y: -100 });
    const trailRef = useRef([]);
    const hoveringRef = useRef(false);
    const isMobile = useRef(false);

    useEffect(() => {
        isMobile.current = "ontouchstart" in window || navigator.maxTouchPoints > 0;
        if (isMobile.current) return;

        trailRef.current = Array(TRAIL_COUNT).fill().map(() => ({
            x: -100,
            y: -100,
            scale: 0.3,
            opacity: 0.2,
            color: getRandomColor(),
            rotation: Math.random() * 360,
        }));

        function getRandomColor() {
            const colors = [
                "#FF5F6D", "#FFC371", "#24C6DC", "#514A9D",
                "#FFB75E", "#ED4264", "#1FA2FF", "#12D8FA",
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        const handleMouseMove = (e) => {
            const smoother = gsap.ScrollSmoother.get();
            const scrollY = smoother ? smoother.scrollTop() : window.scrollY;
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY + scrollY;
        };

        const handleMouseOver = (e) => {
            if (e.target.closest("a, button, [onclick]")) {
                hoveringRef.current = true;
            }
        };

        const handleMouseOut = () => {
            hoveringRef.current = false;
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);
        window.addEventListener("mouseout", handleMouseOut);

        let animationFrame;
        const animate = () => {
            const dx = mouse.current.x - x.get();
            const dy = mouse.current.y - y.get();
            const speed = Math.sqrt(dx * dx + dy * dy);

            x.set(x.get() + dx * 0.2);
            y.set(y.get() + dy * 0.2);

            const sX = hoveringRef.current ? 1.5 : 1 + Math.min(speed * 0.015, 0.5);
            const sY = hoveringRef.current ? 1.5 : 1 - Math.min(speed * 0.008, 0.1);
            scaleX.set(sX);
            scaleY.set(sY);

            trailRef.current.forEach((blob, i) => {
                const lag = 0.1 + i * 0.04;
                blob.x += (mouse.current.x - blob.x) * lag;
                blob.y += (mouse.current.y - blob.y) * lag;
                blob.scale = 0.3 + (1 - i / TRAIL_COUNT) * 0.6;
                blob.opacity = 0.15 + (1 - i / TRAIL_COUNT) * 0.4;
                blob.rotation += 0.2 + i * 0.05;
            });

            animationFrame = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mouseout", handleMouseOut);
        };
    }, [x, y, scaleX, scaleY]);

    if (isMobile.current) return null;

    return (
        <>
            <motion.div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.8)",
                    boxShadow: "0 0 8px rgba(255,255,255,0.3)",
                    pointerEvents: "none",
                    zIndex: 9999,
                    x: springX,
                    y: springY,
                    scaleX: springScaleX,
                    scaleY: springScaleY,
                }}
            />

            {trailRef.current.map((blob, i) => (
                <motion.div
                    key={i}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: blob.color,
                        pointerEvents: "none",
                        zIndex: 9998 - i,
                        x: blob.x,
                        y: blob.y,
                        scale: blob.scale,
                        opacity: blob.opacity,
                        rotate: blob.rotation,
                        filter: "blur(3px)",
                        mixBlendMode: "screen",
                    }}
                />
            ))}
        </>
    );
}