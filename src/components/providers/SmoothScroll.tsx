"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Handle initial height
    lenis.resize();

    // Force Lenis to resize whenever the content height changes
    const resizeObserver = new ResizeObserver(() => {
      // Small timeout to allow Framer Motion animations to settle
      setTimeout(() => {
        lenis.resize();
      }, 100);
    });
    resizeObserver.observe(document.body);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      resizeObserver.disconnect();
    };
  }, []);

  return <>{children}</>;
}
