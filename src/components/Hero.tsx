"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "motion/react";
import { Sparkles } from "lucide-react";
import data from "@/Data/Data.json";

// Custom Brand SVGs
const GithubIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);


const roles = [
  "Junior Software Developer",
  "UI/UX Enthusiast",
  "Problem Solver",
  "Full-Stack Adventurer"
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] as any 
      }
    }
  };

  return (
    <section id="hero" className="relative min-h-[70vh] flex flex-col lg:flex-row items-center gap-16 lg:gap-8 pt-10 pb-20 overflow-visible">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 z-10 space-y-8 lg:pr-12 text-center lg:text-left"
      >
        <div className="space-y-4">
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/10 text-teal text-xs tracking-widest  mb-4"
          >
            <Sparkles className="w-3 h-3" />
            <span>Hello!, I'm</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="editorial-title text-6xl md:text-7xl lg:text-8xl leading-[0.9] text-gradient -ml-1">
            Ashraful Haque<span className="text-navy font-normal">.</span>
          </motion.h1>
          
          <motion.div variants={itemVariants} className="font-serif text-2xl md:text-3xl text-slate pt-2 flex items-center justify-center lg:justify-start gap-3 h-12">
            <span>I'm a</span>
            <div className="relative overflow-hidden h-full inline-flex items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-navy font-semibold inline-block whitespace-nowrap"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <motion.p 
          variants={itemVariants}
          className="font-sans text-sm md:text-base text-navy/60 leading-relaxed max-w-lg mx-auto lg:mx-0 text-balanced"
        >
          I craft scalable and efficient applications, driven by a strong passion
          for UX to create intuitive, engaging, and meaningful digital
          experiences.
        </motion.p>

        <motion.div variants={itemVariants} className="space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start"> 
            <a 
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-navy font-sans font-bold text-xs tracking-widest uppercase border-b-2 border-navy/10 hover:border-navy transition-all py-2 px-1 hover:pb-3 active:scale-95 cursor-pointer"
            >
              Get In Touch
            </a>
          </div>

          {/* Social Row */}
          <div className="flex items-center gap-4 justify-center lg:justify-start pt-2">
            {[
              { icon: GithubIcon, link: data.socialLinks.github },
              { icon: LinkedinIcon, link: data.socialLinks.linkedin },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 flex items-center justify-center rounded-full glass border border-white/20 text-navy/60 hover:text-teal hover:border-teal/30 transition-colors shadow-sm"
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <div className="flex-1 relative w-full lg:w-1/2 flex justify-center lg:justify-end">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as any }}
          className="relative w-full max-w-md aspect-square flex items-center justify-center pt-8"
        >
          {/* Subtle Floating Ring */}
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute inset-0 rounded-full border-1 border-teal/20 border-dashed"
          />
          
          <motion.div 
            animate={{ 
              rotate: -360,
              scale: [1.05, 1, 1.05],
            }}
            transition={{ 
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute inset-4 rounded-full border-2 border-soft-orange/10 border-dotted"
          />

          {/* Hero Image with Blob Mask */}
          <div className="relative z-10 w-[85%] h-[85%]">
            <div className="w-full h-full blob-mask overflow-hidden bg-slate-bg  shadow-2xl relative group">
              <Image
                src="/photo.png"
                alt="Ashraful Haque"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                priority
              />
              <div className="absolute inset-0 bg-navy/10 group-hover:bg-transparent transition-colors" />
            </div>

            {/* Floating Status Badges */}
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute -top-4 -right-4 bg-teal/10 px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-teal animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-tighter">UX Focused</span>
            </motion.div>
            
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.7 }}
              className="absolute -bottom-6 -left-6 bg-teal/10 px-5 py-2 rounded-2xl shadow-lg"
            >
              <p className="text-[10px] font-bold text-teal uppercase tracking-tighter mb-1">Expertise</p>
              <p className="font-serif text-sm">Full-Stack Dev</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
