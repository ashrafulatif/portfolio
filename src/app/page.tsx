import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="relative overflow-x-hidden">
      <main className="relative pt-12 px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Decorative Blobs */}
        <div className="absolute top-40 right-12 w-[450px] h-[450px] bg-soft-orange/10 blur-blob -z-10 rounded-full"></div>
        <div className="absolute bottom-20 left-10 w-[300px] h-[300px] bg-sage/10 blur-blob -z-10 rounded-full"></div>

        <Navbar />
        <Hero />
        <About />
        <Skills />  
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
