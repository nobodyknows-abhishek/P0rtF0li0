"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";

const HOME_PROJECT_IDS = ["chat-video-app", "ecommerce"];

export default function Projects() {
  const homeProjects = projects.filter((p) => HOME_PROJECT_IDS.includes(p.id));
  return (
    <section className="relative z-20 bg-black py-20 md:py-32 px-6 sm:px-8 md:px-16 lg:px-24 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-8xl font-bold text-white tracking-tighter mb-6 md:mb-8"
          >
            Selected Work
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="h-[1px] w-full bg-linear-to-r from-white/30 to-transparent origin-left" 
          />
        </div>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {homeProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
              }}
              className={project.isFeatured ? "md:col-span-2" : ""}
            >
              <Link
                href={`/projects/${project.id}`}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl md:rounded-4xl border border-white/10 bg-white/3 backdrop-blur-xl transition-all duration-700 hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_50px_rgba(255,255,255,0.1)] cursor-pointer ${project.isFeatured ? "aspect-video md:aspect-2.5/1" : "aspect-video sm:aspect-square"}`}
              >
                {/* Banner image (subtle) */}
                <Image
                  src={project.banner}
                  alt={project.title}
                  fill
                  className="object-fill opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-1000"
                />
                
                {/* Light Sweep Effect */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-[radial-gradient(400px_circle_at_var(--mouse-x,0)_var(--mouse-y,0),rgba(255,255,255,0.08),transparent_80%)]" 
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
                    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
                  }}
                />

                <div className="absolute inset-0 bg-linear-to-br from-black/50 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-br from-white/4 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                <div className="relative z-10 flex justify-between items-start w-full p-6 md:p-10">
                  <div className="bg-white/10 border border-white/10 text-white shadow-lg backdrop-blur-xl px-3 md:px-5 py-1.5 md:py-2 rounded-full text-xs uppercase tracking-widest font-mono group-hover:bg-white group-hover:text-black transition-colors duration-500">
                    {project.tag}
                  </div>
                  <div className="bg-white text-black rounded-full p-4 opacity-0 transform translate-y-8 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 group-hover:rotate-45 shadow-2xl">
                    <ArrowUpRight size={24} strokeWidth={3} />
                  </div>
                </div>

                <div className="relative z-10 p-6 md:p-10 pt-0">
                  <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-2 transform transition-transform duration-500 group-hover:translate-x-3">
                    {project.title}
                  </h3>
                  <p className="text-white/50 text-sm sm:text-base md:text-xl font-light tracking-wide transform transition-transform duration-500 group-hover:translate-x-3 delay-75">
                    {project.desc}
                  </p>
                  {project.isFeatured && project.detail && (
                    <p className="text-white/30 text-sm font-light mt-3 max-w-2xl transform transition-transform duration-500 group-hover:translate-x-3 delay-100">
                      {project.detail}
                    </p>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
