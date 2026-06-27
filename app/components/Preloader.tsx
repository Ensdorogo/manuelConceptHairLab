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
  const [isLoading, setIsLoading]       = useState(true);
  const [showPreloader, setShowPreloader] = useState(true);

  const progressBarRef  = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.classList.add("preloader-active");

    const DURATION = 3800;
    const start    = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct     = Math.min(100, Math.floor((elapsed / DURATION) * 100));
      if (progressBarRef.current)  progressBarRef.current.style.width    = `${pct}%`;
      if (progressTextRef.current) progressTextRef.current.textContent   = `${pct}%`;
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

    const timeout      = setTimeout(finish, DURATION);
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
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#070707",
            // GPU layer: riduce glitch su Safari durante exit
            WebkitTransform: "translateZ(0)",
            transform: "translateZ(0)",
            willChange: "opacity",
          }}
        >
          {/* Radial glow */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "50vw",
              height: "50vw",
              borderRadius: "50%",
              pointerEvents: "none",
              transform: "translate(-50%,-50%)",
              WebkitTransform: "translate(-50%,-50%)",
              background:
                "radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 60%)",
            }}
          />

          {/* ── Centro ── */}
          {/*
            Entrambi (SVG e subtitle) vivono nello STESSO contenitore di larghezza
            fissa → condividono lo stesso asse di centratura → sempre allineati.
          */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "min(500px, calc(100vw - 48px))",
            }}
          >
            {/* SVG wrapper — overflow visible obbligatorio per Safari */}
            <div style={{ width: "100%", overflow: "visible" }}>
              <motion.svg
                width="100%"
                height="130"
                viewBox="0 0 550 130"
                overflow="visible"
                style={{ display: "block", overflow: "visible" }}
              >
                <motion.text
                  x="275"
                  y="100"
                  textAnchor="middle"
                  dominantBaseline="auto"
                  className={greatVibes.className}
                  fontSize="90"
                  stroke="white"
                  strokeWidth="1.2"
                  fill="white"
                  initial={{ strokeDasharray: 700, strokeDashoffset: 700, fillOpacity: 0 }}
                  animate={{ strokeDashoffset: 0, fillOpacity: 1 }}
                  transition={{
                    strokeDashoffset: { duration: 2.5, ease: "easeInOut", delay: 0.05 },
                    fillOpacity:      { duration: 1.2, ease: "easeOut",   delay: 1.8  },
                  }}
                >
                  Manuel
                </motion.text>
              </motion.svg>
            </div>

            {/* Subtitle — width:100% + textAlign:center → stesso asse dell'SVG */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.2, ease: "easeOut" }}
              style={{
                width: "100%",
                textAlign: "center",
                marginTop: "10px",
                fontFamily: "var(--font-anonymous-pro), monospace",
                fontSize: "clamp(9px, 1.6vw, 11px)",
                letterSpacing: "0.42em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1,
              }}
            >
              Concept Hair Lab
            </motion.div>
          </div>

          {/* ── Bottom: Location + Loading ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{
              position: "absolute",
              bottom: "clamp(30px, 5vh, 48px)",
              left: 0,
              right: 0,
              padding: "0 clamp(24px, 4vw, 64px)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              zIndex: 20,
            }}
          >
            {/* Location */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                fontFamily: "var(--font-anonymous-pro), monospace",
              }}
            >
              <span style={{ fontSize: "clamp(8px,1.4vw,10px)", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)" }}>
                Location
              </span>
              <span style={{ fontSize: "clamp(10px,1.8vw,12px)", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.58)" }}>
                Seregno, IT
              </span>
            </div>

            {/* Loading */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "4px",
                fontFamily: "var(--font-anonymous-pro), monospace",
              }}
            >
              <span style={{ fontSize: "clamp(8px,1.4vw,10px)", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)" }}>
                Loading
              </span>
              <span
                ref={progressTextRef}
                style={{
                  fontSize: "clamp(11px,2vw,14px)",
                  letterSpacing: "0.06em",
                  color: "rgba(255,255,255,0.85)",
                  minWidth: "4ch",
                  textAlign: "right",
                  lineHeight: 1,
                }}
              >
                0%
              </span>
            </div>
          </motion.div>

          {/* ── Progress bar ── */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "1px",
              backgroundColor: "rgba(255,255,255,0.07)",
              zIndex: 20,
            }}
          >
            <div
              ref={progressBarRef}
              style={{
                height: "100%",
                width: "0%",
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.55) 75%, rgba(255,255,255,0.95) 100%)",
                boxShadow: "0 0 8px rgba(255,255,255,0.3)",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}