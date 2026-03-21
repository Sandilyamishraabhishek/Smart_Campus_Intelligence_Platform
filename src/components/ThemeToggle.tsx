"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
const transition = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 1,
};

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Safely initialize from localStorage or system theme
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    // Inject a temporary class to enable smooth page-wide transition
    // Add `.theme-transitioning * { transition: all 0.5s ease !important; }` to your globals.css
    document.documentElement.classList.add("theme-transitioning");

    setIsDark((prev) => {
      const newThemeDark = !prev;
      if (newThemeDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newThemeDark;
    });

    // Remove the smoothing class after the transition finishes 
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transitioning");
    }, 500);
  };

  // Prevent hydration errors by keeping an initial skeleton in SSR
  if (!mounted) {
    return (
      <div className="w-20 h-10 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
    );
  }

  // Tactile physics-based spring setup
  const springConfig = { type: "spring" as const, stiffness: 500, damping: 30, mass: 1 };

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle Dark Mode"
      className={`relative flex items-center w-20 h-10 p-1 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 overflow-hidden shadow-inner ${isDark ? "justify-end" : "justify-start"
        }`}
    >
      {/* Dynamic Gradient Backgrounds */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={false}
        animate={{
          background: isDark
            ? "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)"
            : "linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)",
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      {/* Glassmorphism inner shadow/border overlay */}
      <div className="absolute inset-0 w-full h-full rounded-full border border-white/30 shadow-[inset_0_2px_10px_rgba(0,0,0,0.15)] mix-blend-overlay pointer-events-none" />

      {/* Background Elements (Stars for dark, Clouds for light) */}
      <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none px-2 flex items-center justify-between">
        {/* Dark Mode: Stars */}
        <motion.div
          initial={false}
          animate={{
            opacity: isDark ? 1 : 0,
            y: isDark ? 0 : 5,
            scale: isDark ? 1 : 0.8,
          }}
          transition={{ duration: 0.4, delay: isDark ? 0.1 : 0 }}
          className="flex flex-col gap-1 left-2 absolute"
        >
          <div className="w-1.5 h-1.5 bg-white rounded-full ml-2 opacity-90 shadow-[0_0_5px_rgba(255,255,255,0.8)]" />
          <div className="w-1 h-1 bg-white rounded-full opacity-60 shadow-[0_0_4px_rgba(255,255,255,0.5)]" />
        </motion.div>

        {/* Light Mode: Clouds */}
        <motion.div
          initial={false}
          animate={{
            opacity: isDark ? 0 : 1,
            y: isDark ? 5 : 0,
            scale: isDark ? 0.8 : 1,
          }}
          transition={{ duration: 0.4, delay: isDark ? 0 : 0.1 }}
          className="absolute right-2 text-white/90 drop-shadow-md"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.5 19c2.48 0 4.5-2.02 4.5-4.5S19.98 10 17.5 10c-.16 0-.31.02-.46.04C16.14 7.68 14.18 6 11.5 6 8.35 6 5.79 8.42 5.56 11.45 3.03 11.83 1 13.9 1 16.5 1 19.53 3.47 22 6.5 22h11z" />
          </svg>
        </motion.div>
      </div>

      {/* The Sliding Knob Container */}
      <motion.div
        layout
        transition={springConfig}
        className={`z-10 flex items-center justify-center w-8 h-8 rounded-full shadow-lg ${isDark
            ? "bg-slate-100 shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            : "bg-yellow-100 shadow-[0_0_15px_rgba(252,211,77,0.8)]"
          }`}
      >
        {/* SVG Sun / Moon Morph */}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={false}
          animate={{
            rotate: isDark ? -90 : 0,
          }}
          transition={springConfig}
          className={
            isDark
              ? "text-slate-800 drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]"
              : "text-amber-500 drop-shadow-[0_0_2px_rgba(252,211,77,0.8)]"
          }
        >
          {/* Mask allowing the moon crescent cutout */}
          <mask id="moon-mask">
            <rect x="0" y="0" width="24" height="24" fill="white" />
            <motion.circle
              cx="12"
              cy="12"
              r="8"
              fill="black"
              initial={false}
              animate={{
                cx: isDark ? 18 : 30, // Sweeps in from the top right to cut out the moon
                cy: isDark ? 6 : -10,
              }}
              transition={springConfig}
            />
          </mask>

          {/* Central sun core transforming to moon shape */}
          <motion.circle
            cx="12"
            cy="12"
            fill="currentColor"
            mask="url(#moon-mask)"
            initial={false}
            animate={{
              r: isDark ? 10 : 5,
            }}
            transition={springConfig}
          />

          {/* Sun Rays surrounding the core */}
          <motion.g
            initial={false}
            animate={{
              opacity: isDark ? 0 : 1,
              scale: isDark ? 0 : 1,
            }}
            style={{ transformOrigin: "12px 12px" }}
            transition={springConfig}
          >
            <line x1="12" y1="1" x2="12" y2="4" />
            <line x1="12" y1="20" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="4" y2="12" />
            <line x1="20" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </motion.g>
        </motion.svg>
      </motion.div>
    </motion.button>
  );
}
