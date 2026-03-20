"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { RefObject, useState, useEffect } from "react";

export default function Overlay({
  containerRef,
}: {
  containerRef: RefObject<HTMLDivElement>;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [mounted, setMounted] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [maxProgress, setMaxProgress] = useState(0);

  useEffect(() => {
    setMounted(true);
    setShowDebug(window.location.search.includes("debugScroll=1"));
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setCurrentProgress(latest);
    setMaxProgress((prev) => (latest > prev ? latest : prev));
  });

  // Section 1: 0% -> "Abhishek Verma" (center)
  const opacity1 = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.28],
    [1, 1, 0, 0],
  );
  const y1 = useTransform(scrollYProgress, [0, 0.25], [0, -100]);
  const scale1 = useTransform(scrollYProgress, [0, 0.25], [1, 1.1]);

  // Section 2: Enter earlier and exit sooner to avoid viewport-dependent stalls.
  const opacity2 = useTransform(
    scrollYProgress,
    [0.24, 0.32, 0.42, 0.52],
    [0, 1, 1, 0],
  );
  const y2 = useTransform(
    scrollYProgress,
    [0.24, 0.32, 0.42, 0.52],
    [100, 0, 0, -100],
  );
  const x2 = useTransform(
    scrollYProgress,
    [0.24, 0.32, 0.42, 0.52],
    [-50, 0, 0, 50],
  );

  // Section 3: Start earlier so it still appears on shorter effective scroll ranges.
  const opacity3 = useTransform(
    scrollYProgress,
    [0.48, 0.58, 0.8, 0.96],
    [0, 1, 1, 0],
  );
  const y3 = useTransform(
    scrollYProgress,
    [0.48, 0.58, 0.8, 0.96],
    [100, 0, 0, -100],
  );
  const x3 = useTransform(
    scrollYProgress,
    [0.48, 0.58, 0.8, 0.96],
    [50, 0, 0, -50],
  );

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-10 w-full">
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col items-center justify-center p-4 md:p-24 text-white overflow-hidden">
        {/* Section 1 */}
        <motion.div
          style={{ opacity: opacity1, y: y1, scale: scale1 }}
          className="absolute text-center flex flex-col items-center justify-center w-full px-4"
        >
          <h1 className="text-4xl sm:text-6xl md:text-8xl xl:text-[10rem] font-bold tracking-tighter mb-2 md:mb-4 text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60 leading-none">
            Abhishek Verma
          </h1>
          <p className="text-xs sm:text-lg md:text-2xl font-light tracking-widest text-white/80 uppercase">
            Full-Stack Developer
          </p>
        </motion.div>

        {/* Section 2 */}
        <motion.div
          style={{ opacity: opacity2, y: y2, x: x2 }}
          className="absolute left-6 sm:left-12 md:left-24 max-w-[90%] sm:max-w-xl md:max-w-4xl text-left"
        >
          <h2 className="text-2xl sm:text-5xl md:text-7xl xl:text-[6rem] font-bold tracking-tighter leading-[1.1] drop-shadow-2xl">
            I build <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500 italic font-medium font-serif">
              scalable apps.
            </span>
          </h2>
        </motion.div>

        {/* Section 3 */}
        <motion.div
          style={{ opacity: opacity3, y: y3, x: x3 }}
          className="absolute right-6 sm:right-12 md:right-24 text-right max-w-[90%] sm:max-w-xl md:max-w-4xl flex flex-col items-end"
        >
          <h2 className="text-2xl sm:text-5xl md:text-7xl xl:text-[6rem] font-bold tracking-tighter leading-[1.1] drop-shadow-2xl">
            Bridging <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-rose-400 to-orange-400">
              front-end &amp; backend.
            </span>
          </h2>
        </motion.div>

        {showDebug ? (
          <div className="fixed left-3 bottom-3 z-[60] rounded border border-white/25 bg-black/70 px-2 py-1 text-[11px] font-mono leading-tight text-white/90">
            <div>scroll: {currentProgress.toFixed(3)}</div>
            <div>max: {maxProgress.toFixed(3)}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
