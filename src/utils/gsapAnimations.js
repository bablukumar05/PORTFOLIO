import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export function initGSAP() {
    const wrapper = document.querySelector("#smooth-wrapper");
    const content = document.querySelector("#smooth-content");
    if (!wrapper || !content) return;

    const existingSmoother = ScrollSmoother.get();
    if (existingSmoother) existingSmoother.kill();

    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    ScrollSmoother.create({
        wrapper,
        content,
        smooth: isTouch ? 0.8 : 1.5,
        smoothTouch: isTouch ? 0.2 : false,
        effects: true,
        normalizeScroll: false,
        ignoreMobileResize: true,
        preventDefault: isTouch,
    });

    const sections = gsap.utils.toArray(".gsap-section");
    sections.forEach((sec) => {
        gsap.from(sec, {
            autoAlpha: 0,
            y: 50,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: sec,
                start: "top 90%",
                toggleActions: "play none none reverse",
                fastScrollEnd: true,
            },
        });
    });

    const fadeUps = gsap.utils.toArray(".fade-up");
    fadeUps.forEach((el) => {
        gsap.from(el, {
            y: 40,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none reverse",
                fastScrollEnd: true,
            },
        });
    });

    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);
    });
}