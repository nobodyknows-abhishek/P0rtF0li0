"use client";

import { motion, useScroll, useAnimationControls } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect } from "react";

export default function ScrollToTop() {
  const { scrollYProgress } = useScroll();
  const controls = useAnimationControls();
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      // Show button after scrolling down 20%
      if (latest > 0.2) {
        controls.start("visible");
      } else {
        controls.start("hidden");
      }
    });
  }, [scrollYProgress, controls]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0, pointerEvents: "auto" },
        hidden: { opacity: 0, y: 20, pointerEvents: "none" },
      }}
      transition={{ duration: 0.3 }}
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-50 rounded-full border border-white/10 bg-white/5 backdrop-blur-md p-3 md:p-4 text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
      aria-label="Scroll to top"
    >
      <ArrowUp size={24} strokeWidth={2} />
    </motion.button>
  );
}
