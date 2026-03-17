"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectCarouselProps {
  images: string[];
}

export default function ProjectCarousel({ images }: ProjectCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setIndex((prevIndex) => (prevIndex + newDirection + images.length) % images.length);
  }, [images.length]);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [paginate]);

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-zinc-900 group touch-none">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute inset-0 w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
        >
          {/* Background blurred layer to fill space */}
          <div className="absolute inset-0 w-full h-full blur-2xl opacity-40 scale-110 pointer-events-none">
            <Image
              src={images[index]}
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* Main contained image to show full project screenshot */}
          <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
            <div className="relative w-full h-full max-w-full max-h-full shadow-2xl">
              <Image
                src={images[index]}
                alt={`Project slide ${index + 1}`}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Overlay Gradients */}
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/60 z-20 pointer-events-none" />
      <div className="absolute inset-0 bg-linear-to-r from-black/30 via-transparent to-black/30 z-20 pointer-events-none" />

      {/* Navigation Arrows */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/20 border border-white/10 text-white backdrop-blur-md md:opacity-0 md:group-hover:opacity-100 opacity-60 transition-all duration-300 hover:bg-white hover:text-black active:scale-95"
      >
        <ChevronLeft size={20} className="md:w-6 md:h-6" />
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/20 border border-white/10 text-white backdrop-blur-md md:opacity-0 md:group-hover:opacity-100 opacity-60 transition-all duration-300 hover:bg-white hover:text-black active:scale-95"
      >
        <ChevronRight size={20} className="md:w-6 md:h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            className={`h-1 transition-all duration-500 rounded-full ${
              i === index ? "w-6 md:w-8 bg-white" : "w-1.5 md:w-2 bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
