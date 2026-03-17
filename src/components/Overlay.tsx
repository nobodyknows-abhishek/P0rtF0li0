"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { RefObject } from "react";

export default function Overlay({ containerRef }: { containerRef: RefObject<HTMLDivElement> }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Section 1: 0% -> "Abhishek Verma" (center)
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3], [1, 1, 0, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const scale1 = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  // Section 2: 35% -> "I build scalable apps." (left)
  const opacity2 = useTransform(scrollYProgress, [0.35, 0.45, 0.6, 0.7], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.35, 0.45, 0.6, 0.7], [100, 0, 0, -100]);
  const x2 = useTransform(scrollYProgress, [0.35, 0.45, 0.6, 0.7], [-50, 0, 0, 50]);

  // Section 3: 75% -> "Bridging front-end & backend." (right)
  const opacity3 = useTransform(scrollYProgress, [0.75, 0.85, 0.92, 0.98], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.75, 0.85, 0.92, 0.98], [100, 0, 0, -100]);
  const x3 = useTransform(scrollYProgress, [0.75, 0.85, 0.92, 0.98], [50, 0, 0, -50]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 w-full">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center p-6 md:p-24 text-white overflow-hidden">
        
        {/* Section 1 */}
        <motion.div 
          style={{ opacity: opacity1, y: y1, scale: scale1 }}
          className="absolute text-center flex flex-col items-center justify-center w-full px-4"
        >
          <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-8xl xl:text-[10rem] font-bold tracking-tighter mb-2 md:mb-4 text-transparent bg-clip-text bg-linear-to-br from-white to-white/60 leading-none">
            Abhishek Verma
          </h1>
          <p className="text-sm sm:text-lg md:text-2xl font-light tracking-widest text-white/80 uppercase">
            Full-Stack Developer
          </p>
        </motion.div>

        {/* Section 2 */}
        <motion.div 
          style={{ opacity: opacity2, y: y2, x: x2 }}
          className="absolute left-6 sm:left-12 md:left-24 max-w-[85%] sm:max-w-xl md:max-w-4xl text-left"
        >
          <h2 className="text-3xl sm:text-5xl md:text-7xl xl:text-[6rem] font-bold tracking-tighter leading-[1.1] drop-shadow-2xl">
            I build <br/>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-indigo-500 italic font-medium font-serif">scalable apps.</span>
          </h2>
        </motion.div>

        {/* Section 3 */}
        <motion.div 
          style={{ opacity: opacity3, y: y3, x: x3 }}
          className="absolute right-6 sm:right-12 md:right-24 text-right max-w-[85%] sm:max-w-xl md:max-w-4xl flex flex-col items-end"
        >
          <h2 className="text-3xl sm:text-5xl md:text-7xl xl:text-[6rem] font-bold tracking-tighter leading-[1.1] drop-shadow-2xl">
            Bridging <br/>
            <span className="text-transparent bg-clip-text bg-linear-to-l from-rose-400 to-orange-400">front-end &amp; backend.</span>
          </h2>
        </motion.div>

      </div>
    </div>
  );
}
