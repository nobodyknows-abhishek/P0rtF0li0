"use client";

import { useEffect, useRef, useState, RefObject, useCallback } from "react";
import NextImage from "next/image";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { createPortal } from "react-dom";

const FRAME_COUNT = 192; // 0 to 191

const getFramePath = (index: number) => {
  const paddedIndex = index.toString().padStart(3, "0");
  return `/sequence/frame_${paddedIndex}_delay-0.041s.png`;
};

export default function ScrollyCanvas({ containerRef }: { containerRef: RefObject<HTMLDivElement> }) {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const drawImage = useCallback((index: number) => {
    if (!canvasRef.current || images.length === 0 || !images[index]) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index];
    // don't draw if not loaded
    if (!img.complete || img.naturalHeight === 0) return;

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      // In portrait, we handle cover slightly differently to avoid over-zooming
      // We'll scale based on width if the aspect ratio is extremely vertical
      if (canvasRatio < 0.6) {
        // More of a "soft contain" for very narrow screens
        drawWidth = canvas.width * 1.5; 
        drawHeight = drawWidth / imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
        // Shift up slightly to keep head in frame if it's tall
        offsetY = (canvas.height - drawHeight) * 0.3; 
      } else {
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Fill background with black to avoid transparency issues
    // ctx.fillStyle = "black";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, [images]);

  // Effect to draw the initial frame once images are loaded
  useEffect(() => {
    if (images.length > 0 && imagesLoaded > 0 && canvasRef.current) {
      const dpr = window.devicePixelRatio || 1;
      // Only resize if needed to avoid flickering
      if (canvasRef.current.width === 0) {
        canvasRef.current.width = window.innerWidth * dpr;
        canvasRef.current.height = window.innerHeight * dpr;
      }
      drawImage(Math.round(frameIndex.get()));
    }
  }, [images, imagesLoaded, drawImage, frameIndex]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    requestAnimationFrame(() => drawImage(Math.round(latest)));
  });

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && images.length > 0) {
        const dpr = window.devicePixelRatio || 1;
        canvasRef.current.width = window.innerWidth * dpr;
        canvasRef.current.height = window.innerHeight * dpr;
        drawImage(Math.round(frameIndex.get()));
      }
    };

    window.addEventListener("resize", handleResize);
    const timeoutId = setTimeout(handleResize, 50); 
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [images, drawImage, frameIndex]); 

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center">
      
      {/* Fallback background image that loads immediately for the blur effect */}
      <div className={`absolute inset-0 w-full h-full z-0 transition-opacity duration-1000 ${
          imagesLoaded < Math.min(FRAME_COUNT, 30) ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}>
        <NextImage 
          src={getFramePath(0)} 
          alt="Background" 
          fill
          className="object-cover"
          priority
        />
      </div>

      {mounted && typeof document !== "undefined" && imagesLoaded < Math.min(FRAME_COUNT, 30) && createPortal(
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/60 backdrop-blur-[50px] text-white transition-opacity duration-1000">
          <div className="mb-4 text-sm font-mono tracking-widest uppercase text-white/80">
           Redifing Your Future
          </div>
          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-100 ease-out"
              style={{ width: `${(imagesLoaded / Math.min(FRAME_COUNT, 30)) * 100}%` }}
            />
          </div>
        </div>,
        document.body
      )}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-90 transition-opacity duration-1000" 
        style={{ width: '100%', height: '100%' }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none" />
    </div>
  );
}
