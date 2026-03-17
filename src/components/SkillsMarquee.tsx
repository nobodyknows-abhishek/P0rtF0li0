"use client";

import { motion } from "framer-motion";

const skills = [
  "NodeJS", "Express", "MySQL", "MongoDB", "RESTful APIs",
  "React", "Tailwind CSS", "JavaScript (ES6+)", "Java", 
  "Python", "Git & GitHub", "Debugging & Testing"
];

// Duplicate array for seamless infinite scrolling
const repeatedSkills = [...skills, ...skills, ...skills];

export default function SkillsMarquee() {
  return (
    <section className="bg-white text-black py-12 md:py-20 overflow-hidden border-y border-white/10 relative z-20">
      
      {/* Decorative gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <div className="relative flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -2000] }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 30 
          }}
          className="flex gap-10 md:gap-20 items-center px-4"
        >
          {repeatedSkills.map((skill, index) => (
            <div 
              key={`${skill}-${index}`} 
              className="text-3xl md:text-6xl font-black tracking-tighter uppercase flex items-center gap-10 md:gap-20"
            >
              <span className="opacity-90 hover:opacity-100 hover:text-indigo-600 transition-colors duration-300">
                {skill}
              </span>
              <span className="text-black/10 font-serif italic text-2xl md:text-4xl shrink-0">✦</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
