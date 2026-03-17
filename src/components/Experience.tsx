"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    year: "06/2025 - 08/2025",
    role: "Java Full Stack Intern",
    company: "Euphoria Genx",
    desc: "Contributed to a Hostel Management System by writing test cases. Maintained and debugged Java backend APIs for admin CRUD operations, ensuring data integrity."
  },
  {
    year: "2022 - Present",
    role: "B. Tech Computer Science",
    company: "MCKV Institute of Engineering",
    desc: "Final-year CSE student. Current CGPA: 8.7. Focusing on full-stack development, backend APIs, and collaborative software engineering."
  }
];

export default function Experience() {
  return (
    <section className="relative z-20 bg-black py-20 md:py-32 px-6 sm:px-8 md:px-16 lg:px-24">
      <div className="max-w-[1400px] mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-24"
        >
          <h2 className="text-4xl sm:text-5xl md:text-8xl font-bold text-white tracking-tighter mb-6 md:mb-8">
            Experience
          </h2>
          <div className="h-[1px] w-full bg-gradient-to-r from-white/30 to-transparent" />
        </motion.div>

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
          className="space-y-8 relative"
        >
          {/* Vertical Timeline Line */}
          <div className="absolute left-[27px] md:left-[39px] top-4 bottom-4 w-[2px] bg-white/10 hidden md:block" />

          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30, x: -20 },
                show: { opacity: 1, y: 0, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="relative flex flex-col md:flex-row gap-8 md:gap-16 group"
            >
              
              {/* Timeline dot */}
              <div className="hidden md:flex flex-col items-center mt-6">
                <div className="w-5 h-5 rounded-full bg-black border-2 border-white/30 group-hover:border-white transition-colors duration-500 relative z-10 shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
              </div>

              {/* Content Card with Glassmorphism */}
              <div className="flex-1 rounded-2xl md:rounded-4xl border border-white/5 bg-white/3 backdrop-blur-md p-5 sm:p-8 md:p-12 transition-all duration-700 hover:bg-white/5 hover:border-white/20">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2">{exp.role}</h3>
                    <div className="text-sm sm:text-base md:text-lg lg:text-xl text-white/50 font-light tracking-wide">{exp.company}</div>
                  </div>
                  <div className="inline-block px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-mono text-white/80 w-fit">
                    {exp.year}
                  </div>
                </div>
                <p className="text-base md:text-xl text-white/60 font-light leading-relaxed max-w-3xl">
                  {exp.desc}
                </p>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
