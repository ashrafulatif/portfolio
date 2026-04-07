"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon } from "lucide-react";
  
export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial state
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="w-10 h-10 flex items-center justify-center bg-white/10 dark:bg-white/5 text-off-white rounded-full shadow-lg hover:bg-white/20 transition-colors border border-white/10"
      aria-label="Toggle dark mode"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isDark ? "dark" : "light"}
          initial={{ y: 20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -20, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? (
            <Moon className="w-5 h-5 text-teal" />
          ) : (
            <Sun className="w-5 h-5 text-teal" />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
