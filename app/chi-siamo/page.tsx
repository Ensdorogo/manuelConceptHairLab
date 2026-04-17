"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

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

export default function ChiSiamoPage() {
    const sectionRef = useRef<HTMLElement>(null);
    useScrollReveal(sectionRef);

    return (
        <main ref={sectionRef} className="min-h-screen bg-[#f7f5f2] flex flex-col">

            {/* ── HERO DARK SECTION ── */}
            <div className="bg-[#1a1a1a] pb-24 md:pb-36 relative overflow-hidden">
                <Navbar />

                {/* Glow decorativo */}
                <div
                    aria-hidden="true"
                    className="absolute top-[10%] right-[-10%] w-[400px] h-[400px] rounded-full pointer-events-none bg-[radial-gradient(circle_at_center,rgba(136,19,55,0.15)_0%,transparent_60%)]"
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
                            La Nostra<br />
                            <em className="font-light italic text-white/50">Filosofia.</em>
                        </h1>
                    </div>
                </div>
            </div>

            {/* ── SEZIONE 1: LO SPAZIO ── */}
            <div className="w-full max-w-[95%] mx-auto px-4 md:px-16 py-20 md:py-32 flex flex-col gap-24 lg:gap-32">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    <div className="flex flex-col gap-8 order-2 lg:order-1" data-reveal="up" data-delay="0">
                        <div className="flex items-center gap-4 text-[#1a1a1a]/40 border-b border-[#1a1a1a]/10 pb-4 w-max">
                            <span className="anony text-xs tracking-[0.3em] uppercase">01 — Lo Spazio</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a] leading-tight tracking-tight">
                            Molto più di un <br /><em className="font-light italic text-[#1a1a1a]/60">semplice salone.</em>
                        </h2>
                        <div className="flex flex-col gap-6 text-[#1a1a1a]/70 text-lg md:text-xl leading-relaxed">
                            <p>
                                Abbiamo costruito un luogo che rompe definitivamente con il filone "old school" o vintage. <strong>Manuel Concept Hair Lab</strong> è un vero e proprio atelier minimale, caratterizzato da linee architettoniche pulite e materiali essenziali.
                            </p>
                            <p>
                                Colori caldi, luci di precisione cromatica ed elementi materici si incontrano per creare una vera oasi di quiete. Il nostro spazio è studiato per disinnescare la frenesia del mondo esterno nel momento esatto in cui varchi la porta.
                            </p>
                        </div>
                    </div>

                    <div 
                        className="relative h-[450px] md:h-[650px] rounded-[2rem] overflow-hidden order-1 lg:order-2 isolate" 
                        style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)', transform: 'translateZ(0)' }}
                        data-reveal="clip" 
                        data-delay="200"
                    >
                        <Image
                            src="/salone2.webp"
                            alt="Design architettonico e minimalista dello spazio"
                            fill
                            className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s]"
                        />
                        <div className="absolute inset-0 bg-[#1a1a1a]/5 mix-blend-multiply pointer-events-none" />
                    </div>
                </div>

                {/* ── SEZIONE 2: IL TEAM ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    <div 
                        className="relative h-[450px] md:h-[650px] rounded-[2rem] overflow-hidden isolate" 
                        style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)', transform: 'translateZ(0)' }}
                        data-reveal="clip" 
                        data-delay="200"
                    >
                        <Image
                            src="/salone3.webp"
                            alt="Il team di Manuel Hair in divisa nera e stile moderno"
                            fill
                            className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s]"
                        />
                        <div className="absolute inset-0 bg-[#1a1a1a]/5 mix-blend-multiply pointer-events-none" />
                    </div>

                    <div className="flex flex-col gap-8" data-reveal="up" data-delay="0">
                        <div className="flex items-center gap-4 text-[#1a1a1a]/40 border-b border-[#1a1a1a]/10 pb-4 w-max">
                            <span className="anony text-xs tracking-[0.3em] uppercase">02 — Il Team</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a] leading-tight tracking-tight">
                            Talento e <br /><em className="font-light italic text-[#1a1a1a]/60">Costante Evoluzione.</em>
                        </h2>
                        <div className="flex flex-col gap-6 text-[#1a1a1a]/70 text-lg md:text-xl leading-relaxed">
                            <p>
                                Il nostro team è la vera essenza del Concept Lab. Professionisti dell'estetica, slegati dai soliti cliché e formati in alcune delle migliori accademie d'avanguardia europee.
                            </p>
                            <p>
                                Lavoriamo come un vero e proprio collettivo editoriale. Nessuna imposizione di vecchi stili standardizzati: studiamo i trend visivi, la colorimetria e il volume per creare identità su misura, fresche, eleganti e sempre un passo avanti.
                            </p>
                        </div>

                        <Link
                            href="/servizi"
                            className="group flex flex-wrap items-center gap-4 w-fit mt-4 px-6 md:px-8 py-4 md:py-5 border border-[#1a1a1a]/15 hover:border-[#1a1a1a]/40 rounded-2xl bg-white/50 hover:bg-white transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                        >
                            <span className="text-lg md:text-xl font-bold text-[#1a1a1a] tracking-tight">Scopri i nostri Servizi</span>
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#f7f5f2] group-hover:bg-[#1a1a1a] border border-[#1a1a1a]/5 flex items-center justify-center transition-all duration-500 shrink-0 group-hover:-translate-y-1 group-hover:translate-x-1">
                                <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-[#1a1a1a] group-hover:text-white transition-colors" strokeWidth={1.5} />
                            </div>
                        </Link>
                    </div>
                </div>

            </div>

            {/* ── CALL TO ACTION ESTERNA (CONTATTI) ── */}
            <div className="w-full max-w-[95%] mx-auto px-4 md:px-16 pb-20 md:pb-32">
                <div data-reveal="up" className="relative w-full bg-[#1a1a1a] rounded-[2rem] p-10 md:p-20 overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 group">
                    <div className="absolute -top-[50%] -right-[10%] w-[500px] h-[500px] rounded-full pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_60%)] group-hover:opacity-100 opacity-70 transition-opacity duration-1000" />

                    <div className="flex flex-col gap-6 relative z-10 max-w-2xl">
                        <span className="anony text-xs tracking-[0.3em] uppercase text-white/40">Vieni a Trovarci</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05]">
                            Il salone a <br />
                            <em className="font-light italic text-white/50">Seregno.</em>
                        </h2>
                        <p className="text-white/60 text-lg leading-relaxed max-w-lg">
                            Desideri saperne di più sul nostro approccio sartoriale o vuoi parlare in via confidenziale con i nostri stylist? Trova indirizzo ed orari.
                        </p>
                    </div>

                    <Link
                        href="/contatti"
                        className="relative z-10 group/btn flex items-center justify-center gap-4 md:gap-6 bg-white text-[#1a1a1a] px-6 md:px-10 py-4 md:py-6 rounded-full hover:bg-[#f7f5f2] hover:scale-105 hover:shadow-[0_8px_40px_rgba(255,255,255,0.15)] transition-all duration-500 whitespace-nowrap shrink-0 border border-white/20"
                    >
                        <span className="text-base md:text-xl font-bold tracking-tight">Come Raggiungerci</span>
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#1a1a1a]/5 flex items-center justify-center group-hover/btn:bg-[#1a1a1a] group-hover/btn:text-white transition-colors duration-500">
                            <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
                        </div>
                    </Link>
                </div>
            </div>

            <Footer />
        </main>
    );
}
