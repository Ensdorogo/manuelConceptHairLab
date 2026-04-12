"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { MapPin, Phone, Clock, ArrowUpRight, Scissors } from "lucide-react";

// ── Hook per le animazioni di ingresso allo scroll/load ──
function useScrollReveal(ref: React.RefObject<HTMLElement | null>) {
    useEffect(() => {
        const elements = ref.current?.querySelectorAll<HTMLElement>("[data-reveal]");
        if (!elements?.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const el = entry.target as HTMLElement;
                        const delay = Number(el.dataset.delay ?? 0);
                        setTimeout(() => el.classList.add("in-view"), delay);
                        observer.unobserve(el);
                    }
                });
            },
            { threshold: 0.1 }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [ref]);
}

export default function ContattiPage() {
    const sectionRef = useRef<HTMLElement>(null);
    useScrollReveal(sectionRef);

    return (
        <main ref={sectionRef} className="min-h-screen bg-[#f7f5f2] flex flex-col">

            {/* ── HERO DARK SECTION (Header Scuro) ── */}
            {/* Si usa il nero per l'impatto editoriale iniziale e per accomodare i font bianchi della Navbar prima dello scroll */}
            <div className="bg-[#1a1a1a] pb-24 md:pb-36 relative overflow-hidden">
                <Navbar />

                {/* Bagliore di design dietro i testi */}
                <div
                    aria-hidden="true"
                    className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none bg-[radial-gradient(circle_at_center,rgba(136,19,55,0.15)_0%,transparent_60%)]"
                />

                <div className="max-w-[95%] mx-auto px-4 md:px-16 pt-20 md:pt-32 relative z-10 w-full">
                    <div className="flex flex-col gap-6">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-200 anony text-xs tracking-[0.2em] uppercase"
                            data-reveal="up"
                        >
                            <span className="group-hover:-translate-x-1 transition-transform">←</span> Torna alla Home
                        </Link>

                        <h1
                            data-reveal="up" data-delay="100"
                            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05]"
                        >
                            Prenota il tuo<br />
                            <em className="font-light italic text-white/50">momento.</em>
                        </h1>
                    </div>
                </div>
            </div>

            {/* ── SEZIONE INFORMAZIONI E MOODBOARD SU SFONDO CHIARO ── */}
            <div className="flex-1 w-full max-w-[95%] mx-auto px-4 md:px-16 py-20 md:py-32 grid grid-cols-1 xl:grid-cols-12 gap-16 lg:gap-24">

                {/* 5 Colonne - Testi e Info Contatti */}
                <div className="lg:col-span-5 flex flex-col gap-16 justify-center">

                    {/* Contatti Diretti (Nessun Form: Filosofia Zero Dati) */}
                    <div data-reveal="up" data-delay="100" className="flex flex-col gap-6">
                        <div className="flex items-center gap-4 text-[#1a1a1a]/40 border-b border-[#1a1a1a]/10 pb-4">
                            <Phone className="w-5 h-5 flex-shrink-0" strokeWidth={1.5} />
                            <h2 className="anony text-xs tracking-[0.2em] uppercase">Contatti Diretti</h2>
                        </div>
                        <div className="flex flex-col gap-5">
                            <p className="text-[#1a1a1a]/60 leading-relaxed text-lg">
                                Preferiamo il sano e vecchio contatto umano.
                                Niente code digitali: per fissare un appuntamento chiamaci direttamente in salone oppure inviaci una mail.
                            </p>

                            <div className="flex flex-col gap-4 mt-2">
                                <a
                                    href="tel:+3903621739643"
                                    className="group flex items-center justify-between gap-4 w-full sm:w-[90%] md:w-max min-w-0 md:min-w-[400px] px-6 py-4 md:py-5 border border-[#1a1a1a]/10 hover:border-[#1a1a1a]/30 rounded-2xl bg-white/50 hover:bg-white transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                                >
                                    <div className="flex flex-col gap-1 min-w-0">
                                        <span className="anony text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#1a1a1a]/40 group-hover:text-[#1a1a1a]/70 transition-colors">Chiama in Salone</span>
                                        <span className="text-xl sm:text-3xl md:text-4xl font-bold text-[#1a1a1a] tracking-tight truncate">+39 0362 173 9643</span>
                                    </div>
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#f7f5f2] group-hover:bg-[#1a1a1a] border border-[#1a1a1a]/5 flex items-center justify-center transition-all duration-500 shrink-0 ml-auto group-hover:-translate-y-1 group-hover:translate-x-1">
                                        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#1a1a1a] group-hover:text-white transition-colors" strokeWidth={1.5} />
                                    </div>
                                </a>

                                <a
                                    href="mailto:info@manuelbarbiere.it"
                                    className="group flex items-center justify-between gap-4 w-full sm:w-[90%] md:w-max min-w-0 md:min-w-[400px] px-6 py-4 md:py-5 border border-[#1a1a1a]/10 hover:border-[#1a1a1a]/30 rounded-2xl bg-white/50 hover:bg-white transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                                >
                                    <div className="flex flex-col gap-1 min-w-0">
                                        <span className="anony text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#1a1a1a]/40 group-hover:text-[#1a1a1a]/70 transition-colors">Scrivici una Mail</span>
                                        <span className="text-lg sm:text-xl md:text-2xl font-medium text-[#1a1a1a] tracking-tight truncate">info@manuelbarbiere.it</span>
                                    </div>
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#f7f5f2] group-hover:bg-[#1a1a1a] border border-[#1a1a1a]/5 flex items-center justify-center transition-all duration-500 shrink-0 ml-auto group-hover:-translate-y-1 group-hover:translate-x-1">
                                        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#1a1a1a] group-hover:text-white transition-colors" strokeWidth={1.5} />
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Dettagli fisici - Indirizzo e Orari */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-8">
                        {/* Indirizzo */}
                        <div data-reveal="up" data-delay="200" className="flex flex-col gap-6">
                            <div className="flex items-center gap-4 text-[#1a1a1a]/40 border-b border-[#1a1a1a]/10 pb-4">
                                <MapPin className="w-5 h-5 flex-shrink-0" strokeWidth={1.5} />
                                <h2 className="anony text-xs tracking-[0.2em] uppercase">Indirizzo</h2>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-xl font-bold text-[#1a1a1a]">Manuel Hair</p>
                                <p className="text-[#1a1a1a]/60 leading-relaxed">
                                    Via S. Vitale, 114,<br />
                                    20831 Seregno MB
                                </p>
                            </div>
                        </div>

                        {/* Orari */}
                        <div data-reveal="up" data-delay="300" className="flex flex-col gap-6">
                            <div className="flex items-center gap-4 text-[#1a1a1a]/40 border-b border-[#1a1a1a]/10 pb-4">
                                <Clock className="w-5 h-5 flex-shrink-0" strokeWidth={1.5} />
                                <h2 className="anony text-xs tracking-[0.2em] uppercase">Orari</h2>
                            </div>
                            <ul className="flex flex-col gap-2 text-[#1a1a1a]/60">
                                <li className="flex justify-between items-center">
                                    <span>Mar - Mer</span>
                                    <span className="font-bold text-[#1a1a1a]">09:00 - 19:00</span>
                                </li>
                                <li className="flex justify-between items-center mt-2 pt-2 border-t border-[#1a1a1a]/5 ">
                                    <span>Giovedì</span>
                                    <span className="font-bold text-[#1a1a1a]">12:00 - 21:00</span>
                                </li>
                                <li className="flex justify-between items-center mt-2 pt-2 border-t border-[#1a1a1a]/5 ">
                                    <span>Ven - Sab</span>
                                    <span className="font-bold text-[#1a1a1a]">09:00 - 19:00</span>
                                </li>
                                <li className="flex justify-between items-center mt-2 pt-2 border-t border-[#1a1a1a]/5 text-rose-500/80">
                                    <span>Dom - Lun</span>
                                    <span>Chiuso</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 7 Colonne - Visual Luxury (Interactive Map) */}
                <div className="lg:col-span-7" data-reveal="clip" data-delay="300">
                    <div className="relative w-full h-[500px] md:h-[700px] overflow-hidden rounded-[2rem] bg-[#1a1a1a] group">
                        
                        {/* Mappa in iframe con pointer-events-none per visualizzarla come foto estetica */}
                        <iframe 
                            src="https://www.openstreetmap.org/export/embed.html?bbox=9.195,45.6498,9.205,45.6538&layer=mapnik"
                            className="absolute -top-[100px] -left-[100px] w-[calc(100%+200px)] h-[calc(100%+200px)] max-w-none pointer-events-none border-none"
                            style={{ filter: "grayscale(100%) contrast(1.15) brightness(0.95)" }}
                            title="Mappa Seregno"
                            loading="lazy"
                        />
                        
                        {/* Gradiente di fusione */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/40 to-transparent pointer-events-none" />

                        {/* Custom Barbershop Pin al centro esatto */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-20 mt-[-1rem]">
                            {/* Pin Circle */}
                            <div className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#1a1a1a] text-white rounded-full shadow-2xl z-10 group-hover:scale-110 transition-transform duration-500 border border-white/10">
                                <Scissors className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.5} />
                                {/* Pulsing ring animato */}
                                <div className="absolute inset-0 rounded-full border border-[#1a1a1a] animate-ping opacity-60" />
                            </div>
                            {/* Pin Shadow/Stem */}
                            <div className="w-1 h-6 md:h-8 bg-gradient-to-b from-[#1a1a1a] to-transparent opacity-80" />
                            <div className="w-6 h-1 md:w-8 md:h-1.5 bg-black/50 blur-sm rounded-full mt-[-2px] md:mt-[-3px]" />
                        </div>

                        {/* Decorazione estetica e Link */}
                        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end pointer-events-none z-20">
                            <div className="bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-lg border border-[#1a1a1a]/5 flex flex-col gap-1">
                                <span className="anony text-[10px] tracking-[0.2em] uppercase text-[#1a1a1a]/40">Location</span>
                                <span className="text-[#1a1a1a] font-medium tracking-tight">Seregno, MB</span>
                            </div>

                            <div className="hidden md:flex text-[#1a1a1a] bg-white/90 backdrop-blur-md w-12 h-12 rounded-full items-center justify-center border border-[#1a1a1a]/5 shadow-lg group-hover:-translate-y-1 transition-transform">
                                <ArrowUpRight className="w-5 h-5" strokeWidth={1.5} />
                            </div>
                        </div>

                        {/* Invisibile Overlay interattivo che porta alla mappa Google */}
                        <a 
                            href="https://maps.google.com/?q=Via+San+Vitale+114,+Seregno"
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="absolute inset-0 z-30 cursor-pointer"
                            aria-label="Apri su Google Maps"
                        />
                    </div>
                </div>

            </div>

            <Footer />
        </main>
    );
}
