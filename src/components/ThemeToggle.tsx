"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon } from "lucide-react";
  
export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const initial = saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDark(initial);
    document.documentElement.classList.toggle("dark", initial);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <motion.button
      onClick={toggle}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
      className="relative w-10 h-10 flex items-center justify-center rounded-full bg-cream/10 text-cream hover:bg-soft-orange hover:text-white transition-colors"
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%", scale: 0.8 }}
            animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
            exit={{ opacity: 0, y: 10, x: "-50%", scale: 0.8 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 25,
              opacity: { duration: 0.15 }
            }}
            className="absolute -top-14 left-1/2 px-3 py-1.5 bg-editorial-black/98 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] pointer-events-none z-50 flex flex-col items-center min-w-max"
          >
            <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-cream leading-none">
              Theme
            </span>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-editorial-black/98 rotate-45 border-r border-b border-white/10" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "sun" : "moon"}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0,   opacity: 1, scale: 1   }}
          exit={{    rotate:  90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.22, ease: "easeInOut" }}
          className="flex"
        >
          {isDark
            ? <Sun  className="w-4 h-4" />
            : <Moon className="w-4 h-4" />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}