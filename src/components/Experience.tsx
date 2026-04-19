"use client";

import { motion } from "motion/react";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    company: "Raktch Technology & Software",
    role: "Frontend Developer",
    period: "Jan 2025 - May 2025",
    location: "Dhaka, Bangladesh",
    description: "Worked closely with the design and backend team to bridge the gap between Figma mockups and functional frontend code, focusing on accessibility and responsive design.",
    tech: ["React", "NextJS", "TypeScript", "Tailwind CSS", "Framer Motion"]
  },
  {
    company: "Enhancing Digital Government and Economy",
    role: "Front-End Development Training",
    period: "Dec 2024 - Jan 2025",
    location: "Dhaka, Bangladesh",
    description: "Built interactive web applications for high-profile clients, leveraging Framer Motion for sophisticated animations and complex state management.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"]
  },
  {
    company: "American International University-Bangladesh",
    role: "BSc in Computer Science and Engineering",
    period: "Jan 2021 - July 2025",
    location: "Dhaka, Bangladesh",
    description: "Studied Computer Science and Engineering at American International University-Bangladesh.",
    tech: ["Studied"]
  }
];

export function Experience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };

  return (
    <section id="experience" className="py-24 relative overflow-hidden border-y border-teal/5">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto px-6"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-16">
          <div className="h-[1px] w-12 bg-teal/30" />
          <span className="text-teal font-sans text-xs tracking-widest uppercase font-bold">
            03. Career Journey
          </span>
        </motion.div>

        <div className="grid grid-cols-1 gap-1">
          {experiences.map((exp, idx) => (
             <motion.div 
               key={idx}
               variants={itemVariants}
               className="group relative grid grid-cols-1 md:grid-cols-12 gap-8 items-start py-10"
             >
                {/* Visual Timeline element */}
                {/* <div className="hidden md:flex flex-col items-center col-span-1 absolute left-1/2 -ml-[1px] -top-12 h-24  opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="w-[1px] h-full bg-gradient-to-b from-transparent to-teal/20" />
                </div> */}

                <div className="md:col-span-3 space-y-2">
                    <div className="flex items-center gap-1.5 text-teal/60 font-sans text-xs tracking-widest uppercase font-bold">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{exp.period}</span>
                    </div>
                </div>

                <div className="md:col-span-9 space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-serif text-3xl text-navy group-hover:text-teal transition-colors duration-300">
                        {exp.role} <span className="font-sans font-light italic text-md md:text-lg text-slate ml-2 opacity-60">@{exp.company}</span>
                    </h3>
                    <div className="flex items-center gap-2 text-slate/50 text-sm italic py-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-slate text-sm leading-relaxed max-w-3xl pt-1">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-4">
                    {exp.tech.map((t, i) => (
                      <span key={i} className="text-[10px] font-bold uppercase tracking-widest bg-navy/5 text-navy/40 px-3 py-1 rounded-full border border-navy/5">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Horizontal separator line */}
                {idx !== experiences.length - 1 && (
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-navy/5 to-transparent" />
                )}
             </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
