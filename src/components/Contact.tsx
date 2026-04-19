"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, ArrowRight, ExternalLink, Send } from "lucide-react";
import data from "@/Data/Data.json";
import { sendContactAction } from "@/actions/contact";

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

const FacebookIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await sendContactAction(formState);
      
      if (result.success) {
        setIsSubmitted(true);
        setFormState({ name: "", email: "", message: "" });
      } else {
        alert(result.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal/5 blur-[120px] -z-10 rounded-full" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-6 lg:px-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left Column: Info & Socials */}
          <div className="space-y-12">
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center gap-4">
                 <div className="h-[1px] w-12 bg-teal/30" />
                 <span className="text-teal font-sans text-xs tracking-widest uppercase font-bold">
                   05. Say Hello
                 </span>
              </div>
              <h2 className="editorial-title text-5xl md:text-6xl text-navy leading-tight">
                Let's build <br /> something <span className="text-teal italic">remarkable.</span>
              </h2>
              <p className="text-slate/70 text-sm leading-relaxed max-w-md font-sans">
                I'm currently looking for new opportunities and collaborations. If you have a question or just want to say hi, I’ll do my best to get back to you!
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy/30">Connect elsewhere</p>
              <div className="flex flex-wrap gap-10">
                {[
                  { icon: GithubIcon, link: data.socialLinks.github, label: "GitHub" },
                  { icon: LinkedinIcon, link: data.socialLinks.linkedin, label: "LinkedIn" },
                  { icon: FacebookIcon, link: data.socialLinks.facebook, label: "Facebook" }
                ].map((social, i) => (
                  <a 
                    key={i} 
                    href={social.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-navy/5 group-hover:bg-teal group-hover:text-white transition-all duration-300 shadow-sm border border-navy/5">
                       <social.icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-navy group-hover:text-teal transition-colors">
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
               <div className="flex items-center gap-4 text-navy/40">
                  <Mail className="w-5 h-5" />
                  <a href={`mailto:${data.socialLinks.email}`} className="text-sm font-sans hover:text-teal transition-colors">
                    {data.socialLinks.email}
                  </a>
               </div>
            </motion.div>
          </div>

          {/* Right Column: Contact Form */}
          <motion.div variants={itemVariants} className="p-8 md:p-12 rounded-xl shadow-md relative overflow-hidden min-h-[500px] border-2 border-teal/20 flex items-center justify-center">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal/5 rounded-full blur-3xl -tr-16 -te-16" />
            
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  onSubmit={handleSubmit} 
                  className="space-y-8 relative z-10 w-full"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2 group">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-navy/60 dark:text-editorial-black/60 group-focus-within:text-teal transition-colors ml-1">Name</label>
                      <input 
                        required
                        type="text" 
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                        placeholder="Jane Doe"
                        className="w-full bg-transparent border-b border-navy/10 dark:border-white/10 py-3 px-1 text-sm font-sans text-navy dark:text-editorial-black focus:outline-none focus:border-teal transition-all placeholder:text-navy/20 dark:placeholder:text-white/20"
                      />
                    </div>
                    <div className="space-y-2 group">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-navy/60 dark:text-editorial-black/60 group-focus-within:text-teal transition-colors ml-1">Email</label>
                      <input 
                        required
                        type="email" 
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                        placeholder="jane@example.com"
                        className="w-full bg-transparent border-b border-navy/10 dark:border-white/10 py-3 px-1 text-sm font-sans text-navy dark:text-editorial-black focus:outline-none focus:border-teal transition-all placeholder:text-navy/20 dark:placeholder:text-white/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 group">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-navy/60 dark:text-editorial-black/60 group-focus-within:text-teal transition-colors ml-1">Message</label>
                    <textarea 
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                      placeholder="Tell me about your project..."
                      className="w-full bg-transparent border-b border-navy/10 dark:border-white/10 py-3 px-1 text-sm font-sans text-navy dark:text-editorial-black focus:outline-none focus:border-teal transition-all placeholder:text-navy/20 dark:placeholder:text-white/20 resize-none overflow-hidden"
                    />
                  </div>

                  <button 
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full group relative px-8 py-4 overflow-hidden rounded-full bg-navy dark:bg-teal text-white dark:text-navy text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 active:scale-[0.98] disabled:opacity-70 shadow-lg"
                  >
                    <div className="absolute inset-0 bg-teal dark:bg-navy dark:text-black translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-white dark:group-hover:text-black transition-colors">
                      {isSubmitting ? "Sending..." : "Send Message"}
                      {!isSubmitting && <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                    </span>
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                   key="success"
                   initial={{ opacity: 0, scale: 0.9, y: 20 }}
                   animate={{ opacity: 1, scale: 1, y: 0 }}
                   className="text-center space-y-6 relative z-10 w-full"
                >
                   <div className="w-20 h-20 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      >
                         <Send className="w-8 h-8 text-teal" />
                      </motion.div>
                   </div>
                   <h3 className="font-serif text-3xl text-navy dark:text-editorial-black">Message Sent!</h3>
                   <p className="text-slate/60 text-sm max-w-[280px] mx-auto leading-relaxed">
                     Thank you for reaching out. I'll get back to you as soon as possible.
                   </p>
                   <button 
                     onClick={() => setIsSubmitted(false)}
                     className="text-[10px] font-bold uppercase tracking-widest text-teal hover:text-navy dark:hover:text-white transition-colors"
                   >
                      Send another message
                   </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}


