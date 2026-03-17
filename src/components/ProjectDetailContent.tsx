"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import PageTransition from "./PageTransition";
import ProjectCarousel from "./ProjectCarousel";
import Magnetic from "./Magnetic";

interface Project {
  id: string;
  title: string;
  tag: string;
  desc: string;
  detail: string;
  banner: string;
  gallery?: string[];
  techStack: string[];
  highlights: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export default function ProjectDetailContent({ project, others }: { project: Project; others: Project[] }) {
  return (
    <PageTransition>
      <main className="bg-black text-white min-h-screen antialiased">

        {/* ── Nav ── */}
        <nav className="fixed top-0 left-0 z-50 flex items-center p-6 md:p-10 w-full">
          <Magnetic strength={0.25}>
            <Link
              href="/"
              className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-300 bg-black/20 backdrop-blur-md px-5 py-2 rounded-full border border-white/10"
            >
              <ArrowLeft
                size={20}
                className="transform transition-transform duration-300 group-hover:-translate-x-1"
              />
              <span className="text-sm font-mono tracking-widest uppercase">Back</span>
            </Link>
          </Magnetic>
        </nav>

        {/* ── Hero Carousel ── */}
        <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
          <ProjectCarousel images={project.gallery || [project.banner]} />
          
          {/* Tag pill */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute top-28 left-8 md:left-24 z-20"
          >
            <span className="bg-white/10 border border-white/20 text-white shadow-lg backdrop-blur-xl px-5 py-2 rounded-full text-xs uppercase tracking-widest font-mono">
              {project.tag}
            </span>
          </motion.div>

          {/* Title */}
          <div className="absolute bottom-8 md:bottom-12 left-4 sm:left-8 md:left-24 right-4 z-20 pointer-events-none">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-6xl md:text-8xl xl:text-[8rem] font-bold tracking-tighter leading-none text-white drop-shadow-2xl"
            >
              {project.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/60 text-base md:text-2xl font-light tracking-wide mt-2 md:mt-4"
            >
              {project.desc}
            </motion.p>
          </div>
        </section>

        {/* ── Content ── */}
        <section className="max-w-[1200px] mx-auto px-6 sm:px-8 md:px-16 lg:px-24 py-12 md:py-20">

          {/* Full description */}
          <div className="mb-16">
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="h-px w-full bg-white/10 mb-16 origin-left" 
            />
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-white/70 text-base sm:text-lg md:text-2xl font-light leading-relaxed max-w-3xl"
            >
              {project.detail}
            </motion.p>
          </div>

          {/* Two-col: Tech Stack + Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">

            {/* Tech stack */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
            >
              <h2 className="text-xs font-mono tracking-widest uppercase text-white/40 mb-6">Tech Stack</h2>
              <div className="flex flex-wrap gap-3">
                {project.techStack.map((tech) => (
                  <motion.span
                    key={tech}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8, y: 10 },
                      show: { opacity: 1, scale: 1, y: 0 }
                    }}
                    className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-mono text-white/80 backdrop-blur-sm hover:border-white/30 hover:bg-white/10 transition-all duration-300 cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Highlights */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.15 } }
              }}
            >
              <h2 className="text-xs font-mono tracking-widest uppercase text-white/40 mb-6">Key Features</h2>
              <ul className="space-y-4">
                {project.highlights.map((h) => (
                  <motion.li 
                    key={h} 
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      show: { opacity: 1, x: 0 }
                    }}
                    className="flex items-start gap-3 text-white/70"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/50 mt-2 shrink-0" />
                    <span className="text-base font-light leading-relaxed">{h}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="flex flex-wrap gap-3 mb-32">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-white/90 transition-all duration-300 text-sm md:text-base hover:gap-5"
              >
                View Live
                <ExternalLink size={16} className="transform transition-transform duration-300 group-hover:rotate-12" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 border border-white/20 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-medium hover:bg-white/10 hover:border-white/40 transition-all duration-300 text-sm md:text-base"
              >
                GitHub
                <Github size={16} />
              </a>
            )}
          </div>

          {/* ── Other Projects ── */}
          <div className="border-t border-white/10 pt-20">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter mb-8 md:mb-12 text-white">
              Other Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {others.map((p) => (
                <Link
                  key={p.id}
                  href={`/projects/${p.id}`}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/3 backdrop-blur-xl transition-all duration-700 hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_40px_rgba(255,255,255,0.08)] cursor-pointer aspect-video"
                >
                  <Image // Replaced <img> with <Image />
                    src={p.banner}
                    alt={p.title}
                    fill // Added fill prop
                    className="object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  <div className="relative z-10 flex justify-between items-start p-8">
                    <span className="bg-white/10 border border-white/10 text-white px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-mono">
                      {p.tag}
                    </span>
                    <div className="bg-white text-black rounded-full p-3 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 group-hover:rotate-45">
                      <ArrowUpRight size={18} strokeWidth={3} />
                    </div>
                  </div>

                  <div className="relative z-10 p-8">
                    <h3 className="text-3xl font-bold text-white mb-1 transform transition-transform duration-500 group-hover:translate-x-2">
                      {p.title}
                    </h3>
                    <p className="text-white/50 font-light transform transition-transform duration-500 group-hover:translate-x-2 delay-75">
                      {p.desc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}

