'use client'

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Небо на всю страницу: лазурное свечение сверху, бирюзовое слева, тёплое золото внизу.
 * По мере прокрутки свечения плывут — от сумерек у первого экрана к огням у контактов.
 * Двигаются только трансформом, поэтому прокрутка не тормозит.
 */
const SkyBackground = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
          },
        })
        .to(".wn-glow-lapis", { xPercent: -55, yPercent: 70 }, 0)
        .to(".wn-glow-teal", { xPercent: 90, yPercent: 60 }, 0)
        .to(".wn-glow-gold", { yPercent: -45, opacity: 1 }, 0);
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="wn-sky pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="wn-glow wn-glow-lapis" />
      <div className="wn-glow wn-glow-teal" />
      <div className="wn-glow wn-glow-gold" />
    </div>
  );
};

export default SkyBackground;
