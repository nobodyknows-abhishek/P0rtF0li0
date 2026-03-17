"use client";

import { useRef } from "react";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import About from "@/components/About";
import SkillsMarquee from "@/components/SkillsMarquee";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HamburgerNav from "@/components/HamburgerNav";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main className="bg-black text-white selection:bg-white selection:text-black antialiased font-sans">
      <ScrollProgress />
      <HamburgerNav />
      <div id="hero" ref={containerRef} className="relative h-[800vh] w-full bg-black">
        <ScrollyCanvas containerRef={containerRef} />
        <Overlay containerRef={containerRef} />
      </div>
      <div id="about"><About /></div>
      <div id="skills"><SkillsMarquee /></div>
      <div id="work"><Projects /></div>
      <div id="experience"><Experience /></div>
      <div id="contact"><Footer /></div>
      <ScrollToTop />
     </main>
  );
}

