"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home",        href: "#hero" },
  { label: "About",       href: "#about" },
  { label: "Skills",      href: "#skills" },
  { label: "Projects", href: "#work" },
  { label: "Experience",  href: "#experience" },
  { label: "Contact",     href: "#contact" },
];

const socials = [
  { label: "GitHub",   href: "https://github.com/nobodyknows-abhishek" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/abhishek-verma-149b51282/" },
];

export default function HamburgerNav() {
  const [open, setOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleNavClick = (href: string) => {
    setOpen(false);
    if (href.startsWith("#")) {
      setTimeout(() => {
        const el = document.getElementById(href.slice(1));
        el?.scrollIntoView({ behavior: "smooth" });
      }, 400); // wait for overlay exit animation
    }
  };

  return (
    <>
      {/* ── Hamburger Button ── */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close menu" : "Open menu"}
        className="fixed top-6 left-6 z-[200] flex flex-col items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl shadow-lg hover:bg-white/20 transition-colors duration-300"
        whileTap={{ scale: 0.9 }}
      >
        <span className="sr-only">{open ? "Close" : "Open"} menu</span>
        {/* Top bar */}
        <motion.span
          animate={open ? { y: 5, rotate: 45 } : { y: 0, rotate: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="block w-5 h-[1.5px] bg-white rounded-full"
        />
        {/* Middle bar */}
        <motion.span
          animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.2 }}
          className="block w-5 h-[1.5px] bg-white rounded-full mt-[5px]"
        />
        {/* Bottom bar */}
        <motion.span
          animate={open ? { y: -5, rotate: -45 } : { y: 0, rotate: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="block w-5 h-[1.5px] bg-white rounded-full mt-[5px]"
        />
      </motion.button>

      {/* ── Full-Screen Overlay ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="nav-overlay"
            initial={{ opacity: 0, clipPath: "circle(0% at 36px 36px)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 36px 36px)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 36px 36px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-2xl flex flex-col px-10 md:px-24 pt-20 pb-8 overflow-y-auto"
          >
            {/* Top divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="h-px bg-white/10 origin-left mb-6"
            />

            {/* Nav links */}
            <nav className="flex-1 flex flex-col justify-center gap-0">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="group flex items-baseline gap-3 w-full text-left py-0.5"
                  >
                    <span className="text-white/20 text-xs font-mono w-6 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold tracking-tighter text-white group-hover:text-white/40 transition-colors duration-300 leading-none">
                      {link.label}
                    </span>
                  </button>
                </motion.div>
              ))}
            </nav>

            {/* Bottom row: socials + email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="flex flex-wrap justify-between items-end gap-4 border-t border-white/10 pt-5 mt-4"
            >
              <div className="flex gap-6">
                {socials.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="text-white/40 hover:text-white text-sm font-mono tracking-widest uppercase transition-colors duration-300"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
              <a
                href="mailto:av022002@gmail.com"
                onClick={() => setOpen(false)}
                className="text-white/40 hover:text-white text-sm font-light transition-colors duration-300"
              >
                av022002@gmail.com
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
