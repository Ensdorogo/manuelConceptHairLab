"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const photos = [
    { src: "/gallery/photo_1.jpg", alt: "Urban Fade", aspect: "aspect-[3/4]" },
    { src: "/gallery/photo_2.jpg", alt: "Balayage & Texture", aspect: "aspect-[4/5]" },
    { src: "/gallery/photo_3.jpg", alt: "Street Aesthetic", aspect: "aspect-[1/1]" },
    { src: "/gallery/photo_4.jpg", alt: "Modern Shag", aspect: "aspect-[3/4]" },
    { src: "/gallery/photo_5.jpg", alt: "Onde Naturali", aspect: "aspect-[4/5]" },
    { src: "/gallery/photo_6.jpg", alt: "Clean Cut", aspect: "aspect-[3/4]" },
];

export default function GalleriaPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Parallax effettivi per le diverse colonne (desktop)
    const yCol1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const yCol2 = useTransform(scrollYProgress, [0, 1], [0, 150]);

    // Stato per la Lightbox
    const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
        <main className="bg-[#f7f5f2] flex flex-col selection:bg-[#1a1a1a] selection:text-white">

            {/* ── HERO DARK SECTION CON TESTO ANIMATO ── */}
            <div className="bg-[#1a1a1a] pb-24 relative overflow-hidden">
                <Navbar />

                <div
                    aria-hidden="true"
                    className="absolute top-[10%] -right-[10%] w-[600px] h-[600px] rounded-full pointer-events-none bg-[radial-gradient(circle_at_center,rgba(136,19,55,0.25)_0%,transparent_60%)]"
                />

                <div className="max-w-[95%] mx-auto px-4 md:px-16 pt-20 md:pt-32 relative z-10 w-full">
                    <div className="flex flex-col gap-6">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-200 anony text-xs tracking-[0.2em] uppercase"
                        >
                            <span className="hover:-translate-x-1 transition-transform">←</span> Torna alla Home
                        </Link>

                        <div className="overflow-hidden">
                            <motion.h1
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[0.9]"
                            >
                                Visual
                            </motion.h1>
                        </div>
                        <div className="overflow-hidden">
                            <motion.h1
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9]"
                            >
                                <em className="font-light italic text-white/50">Diary.</em>
                            </motion.h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── PARALLAX GALLERY SECTION ── */}
            <div ref={containerRef} className="relative w-full max-w-7xl mx-auto px-4 md:px-16 py-20 md:py-40">
                {/* 
                    Griglia Parallax. 
                    Su mobile/tablet è una griglia standard scaglionata, 
                    su desktop a 2 colonne con parallax estremo per effetto wow.
                */}
                <div className="flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-32 items-start justify-center">

                    {/* COLONNA 1 (Sinistra) - Si muove in alto al parallax */}
                    <motion.div
                        style={{ y: yCol1 }}
                        className="w-full md:w-1/2 flex flex-col gap-16 md:gap-32"
                    >
                        {[photos[0], photos[2], photos[4]].map((photo, i) => (
                            <motion.div
                                key={`col1-${i}`}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                layoutId={`photo-${photo.src}`}
                                onClick={() => setSelectedId(photo.src)}
                                className="flex flex-col gap-4 group cursor-none w-full"
                                data-hoverable="true"
                                data-cursor-text="view"
                            >
                                <div className={`relative w-full ${photo.aspect} rounded-[2rem] overflow-hidden bg-[#1a1a1a]/5 will-change-transform`}>
                                    <motion.div
                                        className="w-full h-full"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
                                    </motion.div>
                                    {/* Vignette Overlay Estetico minimal (Senza cerchio testuale) */}
                                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                </div>
                                <div className="flex items-center justify-between px-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="anony text-xs tracking-[0.3em] uppercase text-[#1a1a1a]">0{i * 2 + 1}</span>
                                    <span className="text-sm font-medium tracking-wide text-[#1a1a1a]">{photo.alt}</span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* COLONNA 2 (Destra) - Si muove in basso al parallax (scende) ed è sfalsata in partenza */}
                    <motion.div
                        style={{ y: yCol2 }}
                        className="w-full md:w-1/2 flex flex-col gap-16 md:gap-32 mt-20 md:mt-64"
                    >
                        {[photos[1], photos[3], photos[5]].map((photo, i) => (
                            <motion.div
                                key={`col2-${i}`}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                                layoutId={`photo-${photo.src}`}
                                onClick={() => setSelectedId(photo.src)}
                                className="flex flex-col gap-4 group cursor-none w-full"
                                data-hoverable="true"
                                data-cursor-text="view"
                            >
                                <div className={`relative w-full ${photo.aspect} rounded-[2rem] overflow-hidden bg-[#1a1a1a]/5 will-change-transform`}>
                                    <motion.div
                                        className="w-full h-full"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
                                    </motion.div>
                                    {/* Vignette Overlay Estetico minimal (Senza cerchio testuale) */}
                                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                </div>
                                <div className="flex items-center justify-between px-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="anony text-xs tracking-[0.3em] uppercase text-[#1a1a1a]">0{i * 2 + 2}</span>
                                    <span className="text-sm font-medium tracking-wide text-[#1a1a1a]">{photo.alt}</span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                </div>
            </div>

            {/* ── LIGHTBOX MODALE ── */}
            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1a1a1a]/95 backdrop-blur-xl p-4 md:p-12 cursor-none"
                        onClick={() => setSelectedId(null)}
                        data-hoverable="true"
                        data-cursor-text="close"
                    >
                        <motion.div
                            layoutId={`photo-${selectedId}`}
                            className="relative w-full h-full max-w-6xl max-h-[90vh] rounded-[2rem] overflow-hidden shadow-2xl"
                        >
                            <Image
                                src={selectedId}
                                alt="Gallery Lightbox"
                                fill
                                className="object-contain md:object-cover"
                            />

                            {/* Stile bottone chiusura overlay */}
                            <button
                                onClick={() => setSelectedId(null)}
                                className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 tracking-[0.3em] uppercase anony text-xs"
                        >
                            Clicca per chiudere
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </main>
    );
}
