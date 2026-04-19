"use client";

import { motion } from "motion/react";

export function Preloader() {
  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ 
        y: "-100%",
        transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] }
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
    >
      <div className="relative">
        {/* Animated SVG Loader Container */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-10"
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.0"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-teal"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Invisible path for no fill */}
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />

            {/* Animated Circle - draws once and stays */}
            <motion.path
              d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 1.5, ease: "easeInOut" },
                opacity: { duration: 1, ease: "easeInOut" },
              }}
              className="stroke-teal"
              strokeWidth="1"
            />

            {/* Animated Letter A - Left stroke - draws once and stays */}
            <motion.path
              d="M10 16v-6a2 2 0 1 1 4 0v6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="stroke-teal"
              strokeWidth="1"
            />

            {/* Animated Letter A - Cross stroke - draws once and stays */}
            <motion.path
              d="M10 13h4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 1,
                ease: "easeInOut",
                delay: 1.2,
              }}
              className="stroke-teal"
              strokeWidth="1"
            />
          </motion.svg>
        </motion.div>

        {/* Glowing background effect - static after one pulse */}
        <motion.div
          className="absolute inset-[-10%] rounded-full bg-teal/10 blur-xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 0.4,
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
            delay: 0.5,
          }}
        />
      </div>
    </motion.div>
  );
}
