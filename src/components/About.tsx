"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="relative bg-black py-20 px-6 sm:px-10 md:px-16 lg:px-24 overflow-hidden border-t border-white/5">
      {/* Background glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] sm:w-[500px] md:w-[700px] h-[250px] sm:h-[500px] md:h-[700px] bg-indigo-500/10 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs font-mono tracking-[0.25em] uppercase text-white/30 mb-10"
        >
          About me
        </motion.p>

        {/* Two-column grid — stays side-by-side at all sizes, stacks only below sm */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-16 items-start">

          {/* Left: headline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h2 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] mb-6"
            >
              Building robust systems.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-white/50 to-white/20">
                Crafting experiences.
              </span>
            </motion.h2>
            <div className="w-12 h-0.5 bg-white/20" />
          </motion.div>

          {/* Right: body copy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg font-light leading-relaxed text-white/60 space-y-4"
          >
            <p>
              Final-year Computer Science student with hands-on experience in full-stack development and backend APIs. Comfortable working with Java, JavaScript, and Python to build scalable applications.
            </p>
            <p>
              Experienced in collaborative team environments through internships, with a growing interest in data-driven and AI-assisted applications.
            </p>
            
            {/* Tech Stack Tags with Staggered Reveal */}
            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.4
                  }
                }
              }}
              className="flex flex-wrap gap-2 pt-4"
            >
              {["Java", "JavaScript", "Python", "React", "Node.js", "MySQL", "MongoDB"].map((tech) => (
                <motion.span
                  key={tech}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8, y: 10 },
                    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 12 } }
                  }}
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-white/40 hover:text-white hover:border-white/30 transition-colors cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
