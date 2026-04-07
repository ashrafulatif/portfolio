"use client";

import { motion } from "motion/react";
import data from "@/Data/Data.json";

export function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
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
    <section id="about" className="py-24 relative overflow-hidden border-y border-navy/[0.03]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto px-6 lg:px-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          {/* Left Column: Title/Intro */}
          <motion.div variants={itemVariants} className="md:col-span-12 lg:col-span-5 space-y-6">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-[1px] w-12 bg-teal/30" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-teal">
                01. About Me
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-navy leading-tight text-balance">
              {data.about.title}
            </h2>
          </motion.div>

          {/* Right Column: Narrative */}
          <motion.div variants={itemVariants} className="md:col-span-12 mt-15 lg:col-span-7 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm md:text-base text-slate leading-relaxed">
              <div className="space-y-4">
                <p>{data.about.story[0]}</p>
                <p className="font-serif italic text-navy opacity-70">
                  {data.about.story[2]}
                </p>
              </div>
              <div>
                <p>{data.about.story[1]}</p>
              </div>
            </div>
            
            {/* Minimal Detail */}
            <div className="pt-8 border-t border-navy/[0.05] flex items-center justify-between">
              <div className="flex items-center gap-12">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate/40">Technical Roots</p>
                  <p className="text-xs font-medium text-navy/60">Full-Stack</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate/40">Core Philosophy</p>
                  <p className="text-xs font-medium text-navy/60">UX Driven Development, Problem Solving</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
