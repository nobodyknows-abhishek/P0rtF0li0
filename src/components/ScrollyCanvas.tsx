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
  const [images, setImages] = useState<(HTMLImageElement | null)[]>(Array(FRAME_COUNT).fill(null));
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
    let loadedCount = 0;

    const loadBatch = async (start: number, size: number) => {
      const end = Math.min(start + size, FRAME_COUNT);
      const batchPromises = [];
      const batchIndices: number[] = [];

      for (let i = start; i < end; i++) {
        batchIndices.push(i);
        const promise = new Promise<HTMLImageElement | null>((resolve) => {
          const img = new window.Image();
          const path = getFramePath(i);
          img.src = path;
          img.onload = () => {
            loadedCount++;
            setImagesLoaded(loadedCount);
            resolve(img);
          };
          img.onerror = () => {
            console.error(`Failed to load image: ${path}`);
            loadedCount++;
            setImagesLoaded(loadedCount);
            resolve(null);
          };
        });
        batchPromises.push(promise);
      }
      
      const loadedBatchImages = await Promise.all(batchPromises);
      
      setImages(prev => {
        const next = [...prev];
        batchIndices.forEach((index, i) => {
          next[index] = loadedBatchImages[i];
        });
        return next;
      });

      if (end < FRAME_COUNT) {
        // Continue with the next batch
        setTimeout(() => loadBatch(end, size), 20);
      }
    };

    // Prioritized loading: Load first 40 frames quickly, then the rest in batches
    const startLoading = async () => {
      await loadBatch(0, 40); // Initial high-priority batch
      if (FRAME_COUNT > 40) {
        loadBatch(40, 15); // Rest in smaller background batches
      }
    };

    startLoading();
  }, []);

  const drawImage = useCallback((index: number) => {
    if (!canvasRef.current || images.length === 0) return;

    // Find the closest loaded frame
    let img = images[index];
    if (!img || !img.complete || img.naturalHeight === 0) {
      // Look for the closest loaded neighbor
      let found = false;
      for (let offset = 1; offset < 20; offset++) {
        // Try earlier frames first (usually more helpful during scroll down)
        const prev = images[index - offset];
        if (prev && prev.complete && prev.naturalHeight !== 0) {
          img = prev;
          found = true;
          break;
        }
        const next = images[index + offset];
        if (next && next.complete && next.naturalHeight !== 0) {
          img = next;
          found = true;
          break;
        }
      }
      if (!found) return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx || !img) return;

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
      if (canvasRatio < 0.6) {
        drawWidth = canvas.width * 1.5; 
        drawHeight = drawWidth / imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = (canvas.height - drawHeight) * 0.3; 
      } else {
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
