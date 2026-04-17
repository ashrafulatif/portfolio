"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import data from "@/Data/Data.json";

// Custom Brand SVGs
const GithubIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// High-quality image fallbacks since local images are missing
const projectImages: {[key: string]: string} = {
  "1": "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1200", 
  "2": "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1200 ", 
  "3": "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1200", 
  "4": "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1200", 
  "5": "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1200", 
  "6": "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1200",
  "7": "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1200"  
};

function ProjectCard({ project, idx, itemVariants }: { project: any, idx: number, itemVariants: any }) {
  const [imgSrc, setImgSrc] = useState(project.img || projectImages[project.id]);

  return (
    <motion.div 
       layout
       initial={{ opacity: 0, y: 30 }}
       animate={{ opacity: 1, y: 0 }}
       exit={{ opacity: 0, y: -30 }}
       transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
       className={`group flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}
    >
       {/* Image Container */}
       <div className="flex-1 w-full relative">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] shadow-2xl glass p-1 transition-all duration-700 group-hover:shadow-[0_20px_50px_rgba(45,212,191,0.15)]">
             <div className="w-full h-full rounded-[1.8rem] overflow-hidden relative">
                <Image 
                   src={imgSrc}
                   alt={project.title}
                   fill
                   className="object-cover transition-transform duration-[1.5s] group-hover:scale-105 group-hover:rotate-1"
                   sizes="(max-width: 768px) 100vw, 50vw"
                   onError={() => {
                     setImgSrc(projectImages[project.id]);
                   }}
                />
                <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors duration-700" />
             </div>
          </div>
        </div>

       {/* Content Container */}
       <div className="flex-1 space-y-6 px-4">
          <div className="space-y-2">
             <div className="flex items-center gap-3">
                <span className="text-teal font-sans text-[10px] tracking-[0.3em] uppercase font-bold">
                   Featured Work
                </span>
                <div className="w-1 h-[1px] bg-teal/20" />
             </div>
             <h3 className="font-serif text-3xl lg:text-4xl text-navy leading-tight">
                {project.title}
             </h3>
          </div>

          <p className="text-slate/70 text-sm leading-relaxed font-sans max-w-md tracking-normal">
            {project.description}
          </p>

          {/* Tech Stack below description */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2">
             {project.skills.map((skill: string, i: number) => (
                <span key={skill} className="text-[10px] font-bold text-navy/40 uppercase tracking-widest">
                   {skill}{i !== project.skills.length - 1 ? <span className="ml-4 text-navy/10">•</span> : ""}
                </span>
             ))}
          </div>

          <div className="pt-6 flex items-center gap-10">
             {project.github && (
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 group/btn hover:text-teal transition-all duration-300"
                >
                  <GithubIcon className="w-4 h-4 text-navy group-hover/btn:text-teal group-hover/btn:scale-110 transition-all" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Source</span>
                </a>
             )}
             
             <a 
               href={project.liveLink} 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex items-center gap-2 group/btn hover:text-teal transition-all duration-300"
             >
               <span className="text-[10px] font-bold uppercase tracking-widest border-b border-navy/10 group-hover/btn:border-teal pb-1">Live Preview</span>
               <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
             </a>
          </div>
       </div>
    </motion.div>
  );
}

export function Projects() {
  const [showAll, setShowAll] = useState(false);
  const displayedProjects = showAll ? data.projects : data.projects.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };

  return (
    <section id="projects" className="py-10 relative overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-7xl mx-auto px-6 lg:px-12"
      >
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 px-4">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
               <div className="h-[1px] w-12 bg-teal/30" />
               <span className="text-teal font-sans text-xs tracking-widest uppercase font-bold">
                 04. Featured Works
               </span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-20 lg:gap-24">
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project, idx) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                idx={idx} 
                itemVariants={itemVariants} 
              />
            ))}
          </AnimatePresence>
        </div>

        {data.projects.length > 3 && (
          <div className="mt-24 text-center">
            <button 
              onClick={() => {
                if (showAll) {
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }
                setShowAll(!showAll);
              }}
              className="group relative px-10 py-4 overflow-hidden rounded-full border border-navy/10 text-navy text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 active:scale-95 shadow-lg shadow-teal/5 hover:shadow-xl hover:shadow-teal/10"
            >
              <div className="relative z-10 flex items-center gap-1 group-hover:text-cream dark:group-hover:text-off-white transition-colors duration-500">
                <span>{showAll ? "Show Less" : "View All Work"}</span>
                {showAll ? (
                  <ChevronUp className="w-4 h-4 animate-bounce" />
                ) : (
                  <ChevronDown className="w-4 h-4 animate-bounce" />
                )}
              </div>
              <div className="absolute inset-0 bg-navy translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </div>
        )}
      </motion.div>
    </section>
  );
}
