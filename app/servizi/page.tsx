"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Scissors, Sparkles, Wind, Baby, Palette, Sun, Leaf, Zap, ArrowUpRight } from "lucide-react";

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

const SERVIZI_BENTO_DATA = [
    {
        id: "taglio-uomo",
        numero: "01",
        categoria: "UOMO",
        titolo: "Taglio Sartoriale.",
        descrizione: "Taglio personalizzato con consulenza stilistica per delineare le proporzioni e i volumi del tuo volto. Shampoo e styling inclusi in un momento di totale relax.",
        Icona: Scissors,
        bentoClasses: "lg:col-span-2 lg:row-span-2 md:col-span-2 bg-white p-8 md:p-12 min-h-[400px] lg:min-h-0",
        textTitleClasses: "text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a]",
        textDescClasses: "text-[#1a1a1a]/60 text-lg",
        numeroClasses: "text-[#1a1a1a]/50",
        iconClasses: "text-[#1a1a1a] w-8 h-8",
    },
    {
        id: "taglio-donna",
        numero: "02",
        categoria: "DONNA",
        titolo: "Taglio Donna.",
        descrizione: "Taglio su misura per valorizzare la forma del viso e la texture naturale dei capelli, donando movimento e corpo estremo.",
        Icona: Sparkles,
        bentoClasses: "lg:col-span-2 lg:row-span-1 bg-[#1a1a1a] text-white p-8 min-h-[250px] lg:min-h-0",
        bgImage: "/sfondo/sfondo1.jpg",
        textTitleClasses: "text-3xl lg:text-4xl text-white",
        textDescClasses: "text-white/60 text-base",
        numeroClasses: "text-white/50",
        iconClasses: "text-white/80 w-6 h-6",
    },
    {
        id: "piega",
        numero: "03",
        categoria: "DONNA",
        titolo: "Piega Artistica.",
        descrizione: "Piega liscia, mossa o estremamente voluminosa. Utilizziamo prodotti professionali per una resa impeccabile, setosa e a lunghissima tenuta.",
        Icona: Wind,
        bentoClasses: "lg:col-span-1 lg:row-span-2 bg-rose-900/5 border border-rose-900/10 p-8 min-h-[350px] lg:min-h-0",
        hasBlur: true,
        blurColor: "bg-rose-900/10",
        textTitleClasses: "text-2xl text-[#1a1a1a]",
        textDescClasses: "text-[#1a1a1a]/60 text-sm",
        numeroClasses: "text-rose-900/80",
        iconClasses: "text-rose-900/80 w-6 h-6",
    },
    {
        id: "taglio-bambino",
        numero: "04",
        categoria: "BAMBINO",
        titolo: "Taglio Baby.",
        descrizione: "Taglio delicato e divertente per i più piccoli. Sospeso tra gioco e stile, fino a 12 anni.",
        Icona: Baby,
        bentoClasses: "lg:col-span-1 lg:row-span-1 bg-white border border-[#1a1a1a]/5 p-8 min-h-[250px] lg:min-h-0 hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
        textTitleClasses: "text-xl text-[#1a1a1a]",
        textDescClasses: "text-[#1a1a1a]/60 text-sm",
        numeroClasses: "text-[#1a1a1a]/50",
        iconClasses: "text-[#1a1a1a] w-5 h-5",
    },
    {
        id: "colore",
        numero: "05",
        categoria: "COLORE",
        titolo: "Colorimetria.",
        descrizione: "Colorazione permanente o semipermanente per una copertura uniforme e brillante. Colori di immenso pregio che non danneggiano minimamente la cute.",
        Icona: Palette,
        bentoClasses: "lg:col-span-2 lg:row-span-1 bg-white border border-[#1a1a1a]/5 p-8 min-h-[250px] lg:min-h-0 hover:shadow-xl",
        textTitleClasses: "text-3xl text-[#1a1a1a]",
        textDescClasses: "text-[#1a1a1a]/60 text-base max-w-lg",
        numeroClasses: "text-[#1a1a1a]/50",
        iconClasses: "text-[#1a1a1a] w-6 h-6",
    },
    {
        id: "schiariture",
        numero: "06",
        categoria: "COLORE",
        titolo: "Schiariture.",
        descrizione: "Balayage, highlights e shatush. Costruiamo incastri tridimensionali di luce per un effetto naturale, sano e splendente al sole.",
        Icona: Sun,
        bentoClasses: "lg:col-span-1 lg:row-span-2 bg-[#1a1a1a] p-8 min-h-[350px] lg:min-h-0",
        textTitleClasses: "text-2xl text-white",
        textDescClasses: "text-white/60 text-sm",
        numeroClasses: "text-white/50",
        iconClasses: "text-white/80 w-6 h-6",
    },
    {
        id: "trattamento",
        numero: "07",
        categoria: "TRATTAMENTO",
        titolo: "SPA Capillare.",
        descrizione: "Maschera nutriente, idratante o ristrutturante selezionata su misura in base al tipo di capello. Un elisir di longevità cutanea.",
        Icona: Leaf,
        bentoClasses: "lg:col-span-2 lg:row-span-1 bg-emerald-900/5 border border-emerald-900/10 p-8 min-h-[250px] lg:min-h-0",
        hasBlur: true,
        blurColor: "bg-emerald-900/10",
        textTitleClasses: "text-3xl text-[#1a1a1a]",
        textDescClasses: "text-[#1a1a1a]/60 text-base max-w-lg",
        numeroClasses: "text-emerald-900/80",
        iconClasses: "text-emerald-900/80 w-6 h-6",
    },
    {
        id: "barba",
        numero: "08",
        categoria: "UOMO",
        titolo: "Rituale Barba.",
        descrizione: "Modellatura o rasatura completa con doppi panni caldi profumati e prodotti premium maschili.",
        Icona: Zap,
        bentoClasses: "lg:col-span-1 lg:row-span-1 bg-white border border-[#1a1a1a]/5 p-8 min-h-[250px] lg:min-h-0 hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
        textTitleClasses: "text-xl text-[#1a1a1a]",
        textDescClasses: "text-[#1a1a1a]/60 text-sm",
        numeroClasses: "text-[#1a1a1a]/50",
        iconClasses: "text-[#1a1a1a] w-5 h-5",
    },
];

export default function ServiziPage() {
    const sectionRef = useRef<HTMLElement>(null);
    useScrollReveal(sectionRef);

    return (
        <main ref={sectionRef} className="min-h-screen bg-[#f7f5f2] flex flex-col">

            <div className="bg-[#1a1a1a] pb-24 md:pb-36 relative overflow-hidden">
                <Navbar />

                <motion.div
                    className="absolute top-[0%] left-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none bg-[radial-gradient(circle_at_center,rgba(136,19,55,0.15)_0%,transparent_60%)]"
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
                            I Nostri<br />
                            <em className="font-light italic text-white/50">Servizi.</em>
                        </h1>
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full max-w-[95%] mx-auto px-4 md:px-16 py-20 md:py-32">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:auto-rows-[300px]">
                    {SERVIZI_BENTO_DATA.map((servizio, index) => {
                        const { Icona } = servizio;
                        return (
                            <div
                                key={servizio.id}
                                data-reveal="up"
                                data-delay={(index % 4) * 100}
                                className={`group flex flex-col justify-between relative overflow-hidden rounded-[2rem] ${servizio.bentoClasses}`}
                            >
                                {/* Immagine di decoro opzionale per i blocchi scuri */}
                                {servizio.bgImage && (
                                    <div
                                        className="absolute inset-0 bg-cover mix-blend-luminosity opacity-10 group-hover:scale-105 transition-transform duration-[1.5s]"
                                        style={{ backgroundImage: `url(${servizio.bgImage})` }}
                                    />
                                )}

                                {/* Effetto aura diffusa, convertito a radial-gradient dal CSS blurColors per prestazioni */}
                                {servizio.hasBlur && (
                                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full pointer-events-none" 
                                         style={{ 
                                             background: servizio.blurColor?.includes('rose') ? 'radial-gradient(circle, rgba(136,19,55,0.2) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(6,78,59,0.2) 0%, transparent 70%)'
                                         }} 
                                    />
                                )}

                                <div className="z-10 relative flex justify-between items-start">
                                    <span className={`anony text-xs tracking-[0.2em] uppercase ${servizio.numeroClasses}`}>
                                        {servizio.numero} — {servizio.categoria}
                                    </span>
                                    <Icona className={servizio.iconClasses} strokeWidth={1.2} />
                                </div>

                                <div className="z-10 relative flex flex-col gap-3 mt-12 lg:mt-0">
                                    <h2 className={`font-bold tracking-tight leading-[1.1] ${servizio.textTitleClasses}`}>
                                        {servizio.titolo}
                                    </h2>
                                    <p className={`leading-relaxed max-w-sm ${servizio.textDescClasses}`}>
                                        {servizio.descrizione}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>

            {/* ── CALL TO ACTION ESTERNA (PRENOTAZIONE) ── */}
            <div className="w-full max-w-[95%] mx-auto px-4 md:px-16 pb-20 md:pb-32">
                <div data-reveal="up" className="relative w-full bg-[#1a1a1a] rounded-[2rem] p-10 md:p-20 overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 group">
                    {/* Elemento circolare estetico per il blur di sfondo (convertito in radial-gradient per Safari) */}
                    <div className="absolute -top-[50%] -right-[10%] w-[500px] h-[500px] rounded-full pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_60%)] group-hover:opacity-100 opacity-70 transition-opacity duration-1000" />

                    <div className="flex flex-col gap-6 relative z-10 max-w-2xl">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05]">
                            Riserva il tuo <br />
                            <em className="font-light italic text-white/50">momento.</em>
                        </h2>
                        <p className="text-white/60 text-lg leading-relaxed max-w-lg">
                            Accedi al nostro portale booking esterno. Scegli il servizio più adatto a te e seleziona comodamente il giorno e l'orario.
                        </p>
                    </div>

                    <a
                        href="https://www.my-booking-app.com/booking/home/qO4wj8s1I6j8FYokIK91eNNQc14BwwiC?iso=it" /* INSERIRE QUI IL LINK REALE DEL BOOKING */
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 group/btn flex items-center justify-center gap-4 md:gap-6 bg-white text-[#1a1a1a] px-6 md:px-10 py-4 md:py-6 rounded-full hover:bg-[#f7f5f2] hover:scale-105 hover:shadow-[0_8px_40px_rgba(255,255,255,0.15)] transition-all duration-500 whitespace-nowrap shrink-0 border border-white/20"
                    >
                        <span className="text-base md:text-xl font-bold tracking-tight">Prenota ora</span>
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#1a1a1a]/5 flex items-center justify-center group-hover/btn:bg-[#1a1a1a] group-hover/btn:text-white transition-colors duration-500">
                            <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
                        </div>
                    </a>
                </div>
            </div>

            <Footer />
        </main>
    );
}
