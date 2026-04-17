"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Great_Vibes } from "next/font/google";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
});

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    // Blocca lo scroll del body
    document.body.style.overflow = "hidden";
    document.body.classList.add("preloader-active");

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 25);

    const timeout = setTimeout(() => {
      setIsLoading(false);

      // SALVIAMO IL COOKIE INVECE DEL SESSION STORAGE
      // Omettendo la data di scadenza (expires), questo diventa un "Session Cookie"
      // che si cancellerà automaticamente quando l'utente chiude il browser.
      document.cookie = "hasSeenPreloader=true; path=/";

      document.body.style.overflow = "unset";

      setTimeout(() => {
        setShowPreloader(false);
        document.body.classList.remove("preloader-active");
      }, 500);
    }, 3800);

    return () => {
      clearTimeout(timeout);
      clearInterval(progressInterval);
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
          {/* Subtile Glow Radiale */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_60%)]" />

          {/* Sfondo noise */}
          <div className="absolute inset-0 opacity-[0.02] bg-[url(/noise.png)] bg-repeat pointer-events-none mix-blend-overlay" />

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
                initial={{
                  strokeDasharray: 500,
                  strokeDashoffset: 500,
                  fillOpacity: 0,
                }}
                animate={{
                  strokeDashoffset: 0,
                  fillOpacity: 1,
                }}
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

          {/* UI di Caricamento */}
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
              <span className="anony text-xs sm:text-sm tracking-widest text-white mt-1 w-[4ch] text-right">
                {progress}%
              </span>
            </motion.div>
          </div>

          {/* Barra di progresso */}
          <motion.div
            className="absolute bottom-0 left-0 h-[1px] bg-white/20 z-20"
            style={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}