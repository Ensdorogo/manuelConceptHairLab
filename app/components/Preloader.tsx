"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Great_Vibes } from "next/font/google";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function Preloader() {
  // Solo 2 stati React: se mostrare il preloader e se sta uscendo
  // Il progresso NON usa React state — aggiornato via rAF direttamente sul DOM
  const [isLoading, setIsLoading] = useState(true);
  const [showPreloader, setShowPreloader] = useState(true);

  const progressBarRef  = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.classList.add("preloader-active");

    const DURATION = 3800;
    const start = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const elapsed  = now - start;
      const pct      = Math.min(100, Math.floor((elapsed / DURATION) * 100));

      if (progressBarRef.current)  progressBarRef.current.style.width = `${pct}%`;
      if (progressTextRef.current) progressTextRef.current.textContent = `${pct}%`;

      if (pct < 100) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const finish = () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeout);
      clearTimeout(hardFallback);
      setIsLoading(false);
      try { document.cookie = "hasSeenPreloader=true; path=/"; } catch (_) {}
      document.body.style.overflow = "unset";

      setTimeout(() => {
        setShowPreloader(false);
        document.body.classList.remove("preloader-active");
      }, 1000);
    };

    const timeout = setTimeout(finish, DURATION);

    // Fallback di sicurezza: se rAF si blocca (tab in background su mobile),
    // chiudiamo comunque il preloader dopo DURATION + 600ms
    const hardFallback = setTimeout(finish, DURATION + 600);

    return () => {
      clearTimeout(timeout);
      clearTimeout(hardFallback);
      cancelAnimationFrame(rafId);
      document.body.style.overflow = "unset";
      document.body.classList.remove("preloader-active");
    };
  }, []);


  if (!showPreloader) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#070707]"
        >
          {/* Glow radiale */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_60%)]" />

          {/* Contenitore Centrale */}
          <div className="relative flex flex-col items-center z-10">
            <motion.svg
              width="550"
              height="180"
              viewBox="0 0 550 180"
              className="overflow-visible"
            >
              <motion.text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className={`${greatVibes.className} text-[6rem]`}
                stroke="white"
                strokeWidth="1.5"
                fill="white"
                initial={{ strokeDasharray: 500, strokeDashoffset: 500, fillOpacity: 0 }}
                animate={{ strokeDashoffset: 0, fillOpacity: 1 }}
                transition={{
                  strokeDashoffset: { duration: 2.5, ease: "easeInOut" },
                  fillOpacity: { duration: 1.2, ease: "easeOut", delay: 1.8 },
                }}
              >
                Manuel
              </motion.text>
            </motion.svg>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.2, ease: "easeOut" }}
              className="anony text-[10px] sm:text-xs tracking-[0.4em] uppercase text-white/50 -mt-10"
            >
              Concept Hair Lab
            </motion.div>
          </div>

          {/* UI di Caricamento — testo progresso via ref, nessun re-render */}
          <div className="absolute bottom-8 sm:bottom-12 w-full flex justify-between items-center px-8 sm:px-16 z-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex flex-col"
            >
              <span className="anony text-[10px] tracking-[0.2em] text-white/30 uppercase">Location</span>
              <span className="anony text-xs tracking-widest text-white/60 uppercase mt-1">Seregno, IT</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex flex-col items-end"
            >
              <span className="anony text-[10px] tracking-[0.2em] text-white/30 uppercase">Loading</span>
              {/* Nessun {progress}% in JSX — aggiornato direttamente via ref */}
              <span
                ref={progressTextRef}
                className="anony text-xs sm:text-sm tracking-widest text-white mt-1 w-[4ch] text-right"
              >
                0%
              </span>
            </motion.div>
          </div>

          {/* Barra di progresso — larghezza aggiornata via ref, 0 re-render */}
          <div
            ref={progressBarRef}
            className="absolute bottom-0 left-0 h-[1px] bg-white/20 z-20"
            style={{ width: "0%" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}