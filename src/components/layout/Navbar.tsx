"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Home, User, Code2, Zap, Briefcase, Mail, BookOpen, FileText, Moon, Sun } from "lucide-react";

const navLinks = [
  { name: "Home",       icon: Home,       id: "hero" },
  { name: "About",      icon: User,       id: "about" },
  { name: "Skills",     icon: Zap,        id: "skills" },
  { name: "Experience", icon: Briefcase,  id: "experience" },
  { name: "Projects",   icon: Code2,      id: "projects" },
  { name: "Contact",    icon: Mail,       id: "contact" },
];

function ThemeToggle() {
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

export function Navbar() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [resumeHovered, setResumeHovered] = useState(false);

  // ScrollSpy Logic
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // Trigger when section is in the middle of the viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = navLinks.findIndex((link) => link.id === entry.target.id);
          if (index !== -1) {
            setActive(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navLinks.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0,  opacity: 1 }}
      transition={{ delay: 0.15, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50"
    >
      {/* Glow behind bar */}
      <div className="absolute inset-0 -z-10 blur-2xl bg-editorial-black/40 rounded-full scale-95 translate-y-2" />

      <nav className="flex items-center gap-1 bg-editorial-black/96 backdrop-blur-xl rounded-full p-2 shadow-2xl border border-white/6">

        {navLinks.map(({ name, icon: Icon, id }, idx) => {
          const isActive  = active  === idx;
          const isHovered = hovered === idx;

          return (
            <motion.a
              key={name}
              href={`#${id}`}
              onClick={(e) => { 
                e.preventDefault(); 
                setActive(idx); 
                const element = document.getElementById(id);
                if (element) {
                   const offset = 80; 
                   const elementPosition = element.getBoundingClientRect().top;
                   const offsetPosition = elementPosition + window.pageYOffset - offset;
                   window.scrollTo({
                      top: name === "Home" ? 0 : offsetPosition,
                      behavior: "smooth"
                   });
                }
              }}
              onHoverStart={() => setHovered(idx)}
              onHoverEnd={() => setHovered(null)}
              whileTap={{ scale: 0.92 }}
              className="relative flex items-center gap-2 px-3.5 py-3.5 rounded-full cursor-pointer group"
            >
              {/* Premium Tooltip */}
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
                      {name}
                    </span>
                    {/* Refined Arrow */}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-editorial-black/98 rotate-45 border-r border-b border-white/10" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Spring-animated active pill */}
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-cream rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}

              {/* Hover ghost */}
              {!isActive && isHovered && (
                <motion.div
                  className="absolute inset-0 bg-white/6 rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                />
              )}

              <span className={`relative z-10 transition-colors duration-150 ${isActive ? "text-editorial-black" : "text-cream/45 group-hover:text-cream"}`}>
                <Icon className="w-4 h-4" strokeWidth={isActive ? 2.5 : 1.8} />
              </span>
            </motion.a>
          );
        })}

        {/* Separator */}
        <div className="w-px h-5 bg-white/10 mx-1 hidden md:block" />

        {/* Resume */}
        <motion.a
          href="/Ashraful_Haque_Resume.pdf"
          download="Ashraful_Haque_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          onHoverStart={() => setResumeHovered(true)}
          onHoverEnd={() => setResumeHovered(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative hidden md:flex items-center gap-1.5 bg-soft-orange text-white px-5 py-3 rounded-full text-[10px] font-bold tracking-widest uppercase mr-1 overflow-hidden"
        >
          {/* Tooltip for Resume */}
          <AnimatePresence>
            {resumeHovered && (
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
                  Download
                </span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-editorial-black/98 rotate-45 border-r border-b border-white/10" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Shimmer sweep */}
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.8, ease: "easeInOut" }}
          />
          <FileText className="w-3 h-3 relative z-10" />
          <span className="relative z-10">Resume</span>
        </motion.a>

        <ThemeToggle />
      </nav>
    </motion.div>
  );
}