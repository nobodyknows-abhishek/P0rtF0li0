"use client";

import { useEffect, useRef, useState, RefObject, useCallback } from "react";
import NextImage from "next/image";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 192; // 0 to 191

const getFramePath = (index: number) => {
  const paddedIndex = index.toString().padStart(3, "0");
  return `/sequence/frame_${paddedIndex}_delay-0.041s.png`;
};

export default function ScrollyCanvas({
  containerRef,
}: {
  containerRef: RefObject<HTMLDivElement>;
}) {
  const [images, setImages] = useState<(HTMLImageElement | null)[]>(
    Array(FRAME_COUNT).fill(null),
  );
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [successfulImagesLoaded, setSuccessfulImagesLoaded] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, FRAME_COUNT - 1],
  );

  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;
    let successCount = 0;

    const loadRange = async (start: number, end: number, size: number) => {
      for (let batchStart = start; batchStart < end; batchStart += size) {
        if (cancelled) return;

        const batchEnd = Math.min(batchStart + size, end);
        const batchIndices: number[] = [];
        const batchPromises: Promise<HTMLImageElement | null>[] = [];

        for (let i = batchStart; i < batchEnd; i++) {
          batchIndices.push(i);
          batchPromises.push(
            new Promise<HTMLImageElement | null>((resolve) => {
              const img = new window.Image();
              const path = getFramePath(i);
              img.src = path;
              img.onload = () => {
                loadedCount++;
                successCount++;
                setImagesLoaded(loadedCount);
                setSuccessfulImagesLoaded(successCount);
                resolve(img);
              };
              img.onerror = () => {
                console.error(`Failed to load image: ${path}`);
                loadedCount++;
                setImagesLoaded(loadedCount);
                resolve(null);
              };
            }),
          );
        }

        const loadedBatchImages = await Promise.all(batchPromises);
        if (cancelled) return;

        setImages((prev) => {
          const next = [...prev];
          batchIndices.forEach((index, i) => {
            next[index] = loadedBatchImages[i];
          });
          return next;
        });

        // Yield briefly to keep scrolling responsive while frames stream in.
        await new Promise((resolve) => setTimeout(resolve, 20));
      }
    };

    const startLoading = async () => {
      const priorityFrameCount = Math.min(40, FRAME_COUNT);
      await loadRange(0, priorityFrameCount, priorityFrameCount);

      if (FRAME_COUNT > priorityFrameCount) {
        await loadRange(priorityFrameCount, FRAME_COUNT, 15);
      }
    };

    startLoading();

    return () => {
      cancelled = true;
    };
  }, []);

  const drawImage = useCallback(
    (index: number) => {
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

      let drawWidth, drawHeight, offsetX, offsetY;

      if (canvasRatio > imgRatio) {
        // Canvas is wider than image (fills width, crops height)
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        // Canvas is taller than image (fills height, crops width)
        drawHeight = canvas.height;
        drawWidth = canvas.height * imgRatio;
        offsetY = 0;
        offsetX = (canvas.width - drawWidth) / 2;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    },
    [images],
  );

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
      <div
        className={`absolute inset-0 w-full h-full z-0 transition-opacity duration-1000 ${
          successfulImagesLoaded < Math.min(FRAME_COUNT, 30)
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <NextImage
          src={getFramePath(0)}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-90 transition-opacity duration-1000"
        style={{ width: "100%", height: "100%" }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none" />
    </div>
  );
}
