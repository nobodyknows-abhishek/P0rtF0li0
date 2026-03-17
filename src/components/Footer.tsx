"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic";

export default function Footer() {
  return (
    <footer className="relative bg-zinc-950 text-white overflow-hidden py-20 md:py-32 px-6 sm:px-8 md:px-16 lg:px-24 border-t border-white/10 z-20">
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_bottom_center,rgba(255,255,255,0.05)_0%,transparent_60%)]" />
      
      <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-10 md:gap-16">
        
        <div className="w-full md:w-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl sm:text-7xl md:text-9xl xl:text-[10rem] font-bold tracking-tighter leading-none mb-6 md:mb-8 hover:text-transparent hover:bg-clip-text hover:bg-linear-to-r hover:from-white hover:to-white/50 transition-all duration-500 cursor-default group">
              Let&apos;s <span className="group-hover:text-indigo-400 transition-colors duration-500">Talk.</span>
            </h2>
          </motion.div>
          
          <Magnetic strength={0.3}>
            <a href="mailto:av022002@gmail.com" className="group flex items-center gap-3 text-lg sm:text-2xl md:text-3xl font-light text-white/70 hover:text-white transition-colors w-fit break-all">
              av022002@gmail.com
              <span className="p-3 bg-white/10 rounded-full group-hover:bg-white group-hover:text-black transition-colors duration-500 transform group-hover:rotate-45 group-hover:scale-110 shrink-0">
                <ArrowUpRight size={24} strokeWidth={2} />
              </span>
            </a>
          </Magnetic>
        </div>

        <div className="flex flex-col gap-8 text-right w-full md:w-auto">
          <div className="flex justify-start md:justify-end gap-8 text-lg font-mono tracking-widest uppercase text-white/50">
            <Magnetic strength={0.4}>
              <a href="https://github.com/nobodyknows-abhishek" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white hover:after:w-full after:transition-all after:duration-300">GitHub</a>
            </Magnetic>
            <Magnetic strength={0.4}>
              <a href="https://www.linkedin.com/in/abhishek-verma-149b51282/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white hover:after:w-full after:transition-all after:duration-300">LinkedIn</a>
            </Magnetic>
            <Magnetic strength={0.4}>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white hover:after:w-full after:transition-all after:duration-300">Resume</a>
            </Magnetic>
          </div>
          <div className="text-white/30 text-sm font-light flex justify-start md:justify-end gap-2">
            <span>© 2026.</span>
            <span>All rights reserved.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
