"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const photos = [
    { src: "/gallery/_MG_0240.webp", alt: "Interno del salone Manuel Concept Hair Lab Seregno",  aspect: "aspect-[3/4]" },
    { src: "/gallery/_MG_0244.webp", alt: "Dettaglio postazione taglio e arredamento luxury",     aspect: "aspect-[4/5]" },
    { src: "/gallery/_MG_0255.webp", alt: "Atmosfera e design del salone di parrucchiere",        aspect: "aspect-[1/1]" },
    { src: "/gallery/_MG_0258.webp", alt: "Dettagli tecnici e strumenti professionali",           aspect: "aspect-[3/4]" },
];

export default function GalleriaPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Parallax scroll via Framer Motion motion values (bypassa React, zero re-render)
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const yCol1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
    const yCol2 = useTransform(scrollYProgress, [0, 1], [0,  120]);

    // Lightbox: index invece di src → abilita navigazione prev/next
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const selectedPhoto = selectedIndex !== null ? photos[selectedIndex] : null;

    // Chiudi lightbox con ESC
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedIndex(null);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    // Blocca scroll quando lightbox aperto
    useEffect(() => {
        document.body.style.overflow = selectedIndex !== null ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [selectedIndex]);

    return (
        <main className="bg-[#f7f5f2] flex flex-col selection:bg-[#1a1a1a] selection:text-white">

            {/* ── HERO ── */}
            <div className="bg-[#1a1a1a] pb-24 relative overflow-hidden">
                <Navbar />
                <div
                    aria-hidden="true"
                    className="absolute top-[10%] -right-[10%] w-[600px] h-[600px] rounded-full pointer-events-none
                               bg-[radial-gradient(circle_at_center,rgba(136,19,55,0.25)_0%,transparent_60%)]"
                />
                <div className="max-w-[95%] mx-auto px-4 md:px-16 pt-20 md:pt-32 relative z-10 w-full">
                    <div className="flex flex-col gap-6">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-white/40 hover:text-white
                                       transition-colors duration-200 anony text-xs tracking-[0.2em] uppercase"
                        >
                            <span className="hover:-translate-x-1 transition-transform">←</span> Torna alla Home
                        </Link>

                        <div className="overflow-hidden">
                            <motion.h1
                                initial={{ y: "100%" }} animate={{ y: 0 }}
                                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[0.9]"
                            >
                                Visual
                            </motion.h1>
                        </div>
                        <div className="overflow-hidden">
                            <motion.h1
                                initial={{ y: "100%" }} animate={{ y: 0 }}
                                transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9]"
                            >
                                <em className="font-light italic text-white/50">Diary.</em>
                            </motion.h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── GRIGLIA PARALLAX ── */}
            <div ref={containerRef} className="relative w-full max-w-7xl mx-auto px-4 md:px-16 py-20 md:py-40">
                <div className="flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-32 items-start justify-center">

                    {/* Colonna sinistra — si muove verso l'alto */}
                    <motion.div style={{ y: yCol1 }} className="w-full md:w-1/2 flex flex-col gap-16 md:gap-32">
                        {photos.filter((_, i) => i % 2 === 0).map((photo, i) => {
                            const idx = i * 2;
                            return (
                                <GalleryCard
                                    key={photo.src}
                                    photo={photo}
                                    index={idx}
                                    animationDelay={i * 0.15}
                                    priority={i === 0}
                                    onClick={() => setSelectedIndex(idx)}
                                />
                            );
                        })}
                    </motion.div>

                    {/* Colonna destra — si muove verso il basso, sfalsata */}
                    <motion.div style={{ y: yCol2 }} className="w-full md:w-1/2 flex flex-col gap-16 md:gap-32 mt-20 md:mt-64">
                        {photos.filter((_, i) => i % 2 !== 0).map((photo, i) => {
                            const idx = i * 2 + 1;
                            return (
                                <GalleryCard
                                    key={photo.src}
                                    photo={photo}
                                    index={idx}
                                    animationDelay={0.2 + i * 0.15}
                                    priority={false}
                                    onClick={() => setSelectedIndex(idx)}
                                />
                            );
                        })}
                    </motion.div>
                </div>
            </div>

            {/* ── LIGHTBOX ── */}
            <AnimatePresence>
                {selectedPhoto !== null && selectedIndex !== null && (
                    <motion.div
                        key="lightbox-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        /* 
                         * NESSUN backdrop-blur — costava GPU readback su tutto lo schermo.
                         * Sfondo solido scuro: stesso impatto visivo, costo zero.
                         */
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#070707]/97 p-4 md:p-16 cursor-none"
                        onClick={() => setSelectedIndex(null)}
                        data-hoverable="true"
                        data-cursor-text="close"
                    >
                        {/* Immagine */}
                        <motion.div
                            key={selectedPhoto.src}
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                            className="relative w-full h-full max-w-5xl max-h-[80vh] rounded-2xl overflow-hidden"
                        >
                            <Image
                                src={selectedPhoto.src}
                                alt={selectedPhoto.alt}
                                fill
                                className="object-contain"
                                sizes="100vw"
                                quality={90}
                                priority
                            />
                        </motion.div>

                        {/* Close */}
                        <button
                            onClick={() => setSelectedIndex(null)}
                            className="absolute top-4 md:top-6 right-4 md:right-6
                                       w-11 h-11 rounded-full bg-white/10 hover:bg-white/20
                                       flex items-center justify-center text-white
                                       transition-colors duration-200 cursor-none"
                            aria-label="Chiudi lightbox"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>

                        {/* Hint chiusura */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
                            <span className="anony text-[10px] tracking-[0.3em] uppercase text-white/30">
                                Clicca per chiudere · ESC
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </main>
    );
}

/* ── Card singola immagine ── */
function GalleryCard({
    photo,
    index,
    animationDelay,
    priority,
    onClick,
}: {
    photo: { src: string; alt: string; aspect: string };
    index: number;
    animationDelay: number;
    priority: boolean;
    onClick: () => void;
}) {
    return (
        /*
         * Hover via CSS (group-hover) invece di whileHover Framer Motion.
         * CSS transitions sono gestite dal compositor thread → zero main thread overhead.
         * Entry animation via CSS keyframe + delay inline → zero Framer Motion per le card.
         */
        <div
            className="flex flex-col gap-4 group cursor-none w-full"
            onClick={onClick}
            data-hoverable="true"
            data-cursor-text="view"
            style={{
                opacity: 0,
                animation: `fadeUp 0.9s ${animationDelay}s cubic-bezier(0.22,1,0.36,1) forwards`,
            }}
        >
            <div
                className={`relative w-full ${photo.aspect} rounded-[2rem] overflow-hidden bg-[#1a1a1a]/5 isolate`}
                style={{ transform: "translateZ(0)" }}
            >
                {/* Scale CSS: compositor thread, nessuna Framer Motion overhead per l'hover */}
                <div className="w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]">
                    <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 600px"
                        quality={80}
                        priority={priority}
                    />
                </div>
                {/* Overlay hover */}
                <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>

            <div className="flex items-center justify-between px-2 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                <span className="anony text-xs tracking-[0.3em] uppercase text-[#1a1a1a]">
                    {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-medium tracking-wide text-[#1a1a1a] text-right max-w-[70%] truncate">
                    {photo.alt}
                </span>
            </div>
        </div>
    );
}
