"use client";

import { motion } from "motion/react";
import Image from "next/image";
import data from "@/Data/Skills.json";

export function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden ">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-6 lg:px-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Section 1: Tech Stack Icons */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-12">
            <div className="space-y-4">
               <div className="flex items-center gap-4">
                  <div className="h-[1px] w-12 bg-teal/30" />
                  <span className="text-teal font-sans text-[10px] tracking-[0.3em] uppercase font-bold">
                    02. Skills
                  </span>
               </div>
               
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-8">
               {data.skills.map((skill, idx) => (
                 <motion.div 
                   key={skill.name}
                   variants={itemVariants}
                   className="group flex flex-col items-center gap-3"
                 >
                    <div className="relative w-14 h-14 flex items-center justify-center rounded-full bg-navy/10 shadow-sm border border-navy/5 group-hover:border-teal group-hover:shadow-teal/10 transition-all duration-500 overflow-hidden">
                       <div className="absolute inset-0 bg-teal/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                       <Image 
                         src={skill.src} 
                         alt={skill.name} 
                         width={28} 
                         height={28} 
                         className="transition-all duration-500"
                       />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-navy/40 group-hover:text-teal transition-colors text-center px-1">
                      {skill.name.split('.')[0]}
                    </span>
                 </motion.div>
               ))}
            </div>
          </div>

          {/* Section 2: Expertise Levels */}
          <div className="lg:col-span-12 xl:col-span-7 space-y-10">
            <div className="space-y-4">
               <div className="flex items-center gap-4">
                  <div className="h-[1px] w-12 bg-teal/30" />
                  <span className="text-teal text-[10px] tracking-[0.3em] uppercase font-bold">
                    Proficiency
                  </span>
               </div>
               <h2 className="editorial-title text-4xl md:text-4xl text-navy">
                 Area of <span className="text-navy/30">Expertise.</span>
               </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
               {data.skills.map((skill, idx) => (
                 <motion.div 
                   key={`level-${skill.name}`}
                   variants={itemVariants}
                   className="space-y-3"
                 >
                    <div className="flex justify-between items-end">
                       <span className="text-[11px] font-bold uppercase tracking-widest text-navy">
                         {skill.name}
                       </span>
                       <span className="text-[10px] font-bold text-teal/60">
                         {skill.level}
                       </span>
                    </div>
                    <div className="h-[1px] w-full bg-navy/5 relative overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }}
                         whileInView={{ 
                           width: skill.level === "Expert" ? "100%" : 
                                  skill.level === "Intermediate" ? "75%" : "50%" 
                         }}
                         transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                         className="absolute top-0 left-0 h-full bg-teal/30"
                       />
                    </div>
                 </motion.div>
               ))}
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
