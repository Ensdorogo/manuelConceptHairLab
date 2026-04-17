"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
    Scissors, Sparkles, Baby, Wind, Palette, Sun, Zap, Leaf,
    type LucideIcon,
} from "lucide-react";


export type Categoria = "Uomo" | "Donna" | "Bambino" | "Colore" | "Trattamento";

export interface Servizio {
    id: string;
    nome: string;
    categoria: Categoria;
    descrizione: string;
    prezzoLabel?: string; // opzionale — es. "da €18"
    Icona: LucideIcon;   // componente icona lucide-react
}
export const SERVIZI: Servizio[] = [
    {
        id: "taglio-donna",
        nome: "Taglio Donna",
        categoria: "Donna",
        descrizione: "Servizio di stilistica con taglio personalizzato per donna.",
        prezzoLabel: "€ 26",
        Icona: Sparkles,
    },
    {
        id: "taglio-uomo",
        nome: "Taglio Uomo",
        categoria: "Uomo",
        descrizione: "Servizio di stilistica con taglio e consulenza per uomo.",
        prezzoLabel: "€ 22",
        Icona: Scissors,
    },
    {
        id: "taglio-bimbo",
        nome: "Taglio Bimbo",
        categoria: "Bambino",
        descrizione: "Servizio di stilistica dedicato ai più piccoli.",
        prezzoLabel: "€ 17",
        Icona: Baby,
    },
    {
        id: "pieghe",
        nome: "Pieghe",
        categoria: "Donna",
        descrizione: "Corta (€21), Media (€23), Lunga (€28), oppure Piega elaborata da 1 Ora (€35).",
        prezzoLabel: "da € 21",
        Icona: Wind,
    },
    {
        id: "acconciature",
        nome: "Acconciature",
        categoria: "Donna",
        descrizione: "Semi raccolto e trecce (€20, piega esclusa) oppure Raccolto completo (da €50).",
        prezzoLabel: "da € 20",
        Icona: Sparkles,
    },
    {
        id: "colore-base",
        nome: "Colore & Decolorazione",
        categoria: "Colore",
        descrizione: "Servizio di colorazione classica (da €40).",
        prezzoLabel: "da € 40",
        Icona: Palette,
    },
    {
        id: "tonalizzante",
        nome: "Tonalizzante",
        categoria: "Colore",
        descrizione: "Tonalizzante specifico applicato su colore (da €20) o su schiariture (da €25).",
        prezzoLabel: "da € 20",
        Icona: Palette,
    },
    {
        id: "schiariture",
        nome: "Schiariture",
        categoria: "Colore",
        descrizione: "Tecniche di illuminazione: Balayage, Shatush e Colpi di sole.",
        prezzoLabel: "da € 65",
        Icona: Sun,
    },
    {
        id: "tecnico-luxury",
        nome: "Tecnico Luxury",
        categoria: "Colore",
        descrizione: "Airtouch (da €300) e Tecnica Mounir (da €400). Tonalizzante e piega inclusi.",
        prezzoLabel: "da € 300",
        Icona: Zap,
    },
    {
        id: "schiariture-coppola",
        nome: "Schiariture Coppola",
        categoria: "Colore",
        descrizione: "Servizio tecnico avanzato di schiariture firmato Coppola.",
        prezzoLabel: "da € 80",
        Icona: Zap,
    },
    {
        id: "trattamenti",
        nome: "Trattamenti",
        categoria: "Trattamento",
        descrizione: "Ricostruzione intensiva alla Cheratina, studiata sulle esigenze del capello.",
        prezzoLabel: "Su preventivo",
        Icona: Leaf,
    },
    {
        id: "servizi-sposa",
        nome: "Servizi Sposa",
        categoria: "Donna",
        descrizione: "Raccolto Negozio/Domicilio (da €150/€400) e prova 1 ora (€50, piega inclusa).",
        prezzoLabel: "da € 50",
        Icona: Sparkles,
    },
];

// ─── Stile colori per categoria ────────────────────────────────
const CATEGORIA_COLOR: Record<Categoria, string> = {
    Uomo: "bg-zinc-100 text-zinc-600",
    Donna: "bg-rose-100 text-rose-600",
    Bambino: "bg-amber-100 text-amber-600",
    Colore: "bg-violet-100 text-violet-600",
    Trattamento: "bg-emerald-100 text-emerald-600",
};

// ─── Scroll reveal hook ───────────────────────────────────────
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

// ─── Card singolo servizio ────────────────────────────────────
function ServizioCard({
    servizio,
    delay,
}: {
    servizio: Servizio;
    delay: number;
}) {
    const { Icona } = servizio;
    return (
        <div
            data-reveal="up"
            data-delay={delay}
            className="
        group relative flex flex-col gap-4 p-7
        bg-white border border-[#1a1a1a]/8 rounded-2xl
        hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-2 hover:border-[#1a1a1a]/15
        transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
        overflow-hidden 
      "
        >
            {/* ── Shimmer sweep on hover ── */}
            <div
                aria-hidden="true"
                className="
          pointer-events-none absolute inset-0
          -translate-x-full group-hover:translate-x-full
          bg-gradient-to-r from-transparent via-[#1a1a1a]/5 to-transparent
          -skew-x-12
          transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)]
          opacity-0 group-hover:opacity-100
        "
            />

            {/* ── Gradient glow on hover (top edge) ── */}
            <div
                aria-hidden="true"
                className="
          pointer-events-none absolute inset-x-0 top-0 h-px
          bg-gradient-to-r from-transparent via-[#1a1a1a]/20 to-transparent
          opacity-0 group-hover:opacity-100
          transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
        "
            />

            {/* Icona in cerchio colorata base alla categoria */}
            <div className={`
        self-start flex items-center justify-center
        w-11 h-11 rounded-xl
        ${CATEGORIA_COLOR[servizio.categoria]}
        group-hover:bg-[#1a1a1a] group-hover:text-white
        transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
        group-hover:scale-110 group-hover:-rotate-3
      `}>
                <Icona size={20} strokeWidth={2} />
            </div>

            {/* Nome */}
            <h3 className="
        text-xl font-bold tracking-tight text-[#1a1a1a] leading-snug
        transition-colors duration-300 group-hover:text-[#1a1a1a]
      ">
                {servizio.nome}
            </h3>

            {/* Descrizione */}
            <p className="text-sm text-[#1a1a1a]/55 leading-relaxed flex-1
        transition-colors duration-300 group-hover:text-[#1a1a1a]/70
      ">
                {servizio.descrizione}
            </p>

            {/* Footer: prezzo + freccia */}
            <div className="flex items-center justify-between pt-3 border-t border-[#1a1a1a]/6">
                {servizio.prezzoLabel ? (
                    <span className="
            text-sm font-bold text-[#1a1a1a]/60
            group-hover:text-[#1a1a1a] transition-colors duration-300
          ">
                        {servizio.prezzoLabel}
                    </span>
                ) : (
                    <span />
                )}
            </div>
        </div>
    );
}

// ─── Componente principale ────────────────────────────────────
export default function ShowServizi() {
    const sectionRef = useRef<HTMLElement>(null);
    useScrollReveal(sectionRef);

    return (
        <section
            ref={sectionRef}
            className="relative bg-[#f7f5f2] px-8 md:px-16 py-24 overflow-hidden"
        >
            {/* Background decoration — cerchi sfumati animati */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full
          bg-gradient-radial from-rose-100/40 via-transparent to-transparent
          animate-[pulse_8s_ease-in-out_infinite]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full
          bg-gradient-radial from-violet-100/30 via-transparent to-transparent
          animate-[pulse_10s_ease-in-out_infinite_2s]"
            />

            <div className="relative max-w-7xl mx-auto">

                {/* Header sezione */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div className="flex flex-col gap-4">
                        <p
                            data-reveal="up"
                            data-delay="0"
                            className="anony text-xs tracking-[0.25em] uppercase text-[#1a1a1a]/40"
                        >
                            I nostri servizi
                        </p>
                        <h2
                            data-reveal="up"
                            data-delay="120"
                            className="text-4xl md:text-5xl font-bold tracking-tight text-[#1a1a1a] leading-tight"
                        >
                            Tutto ciò di cui<br />
                            <em className="font-light italic text-[#1a1a1a]/50">hai bisogno.</em>
                        </h2>

                        {/* Line che si disegna */}
                        <div
                            data-reveal="line"
                            data-delay="280"
                            className="h-px bg-[#1a1a1a]/15"
                        />
                    </div>

                    {/* CTA tutti i servizi */}
                    <Link
                        href="/servizi"
                        data-reveal="up"
                        data-delay="300"
                        className="
              group self-start md:self-auto
              inline-flex items-center
              pl-16 pr-8 py-3.5 rounded-full
              border border-[#1a1a1a]/20 hover:border-[#1a1a1a]
              text-sm font-semibold tracking-[0.1em] uppercase text-[#1a1a1a]
              overflow-hidden relative
              transition-all duration-400
            "
                    >
                        {/* Fill nero on hover */}
                        <span className="
              absolute inset-0 bg-[#1a1a1a] rounded-full
              scale-x-0 group-hover:scale-x-100
              origin-left transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]
            " />

                        {/* Pettine animato */}
                        <span className="
              absolute left-5 text-[#1a1a1a]
              transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]
              group-hover:translate-x-44 group-hover:opacity-0 group-hover:text-white
            ">
                            {/* SVG Pettine personalizzato */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="10" width="18" height="6" rx="1" />
                                <path d="M5 10V5" />
                                <path d="M9 10V5" />
                                <path d="M13 10V5" />
                                <path d="M17 10V5" />
                                <path d="M21 10V5" />
                            </svg>
                        </span>

                        {/* Testo del bottone che scivola al posto del pettine */}
                        <span className="
              relative transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]
              group-hover:text-white group-hover:-translate-x-4
            ">
                            Vedi tutti i servizi
                        </span>
                    </Link>
                </div>

                {/* Grid servizi */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {SERVIZI.map((servizio, index) => (
                        <ServizioCard
                            key={servizio.id}
                            servizio={servizio}
                            delay={100 + index * 80}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}