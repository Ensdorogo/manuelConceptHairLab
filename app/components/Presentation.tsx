"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/* ── Hook: IntersectionObserver scroll reveal ── */
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
            { threshold: 0.12 }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [ref]);
}

/* ── Hook: Animated number count-up ── */
function useCountUp(
    ref: React.RefObject<HTMLSpanElement | null>,
    target: number,
    suffix = ""
) {
    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                observer.disconnect();

                const duration = 1600;
                const startTime = performance.now();

                const tick = (now: number) => {
                    const progress = Math.min((now - startTime) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
                    el.textContent = Math.floor(eased * target) + suffix;
                    if (progress < 1) requestAnimationFrame(tick);
                };

                requestAnimationFrame(tick);
            },
            { threshold: 0.5 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [ref, target, suffix]);
}

export default function Presentation() {
    const sectionRef = useRef<HTMLElement>(null);
    const count500Ref = useRef<HTMLSpanElement>(null);
    const count7Ref = useRef<HTMLSpanElement>(null);

    useScrollReveal(sectionRef);
    useCountUp(count500Ref, 500, "+");
    useCountUp(count7Ref, 7, "+");

    return (
        <section ref={sectionRef} className="bg-[#f7f5f2] px-8 md:px-16 pt-40 pb-20 overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* ── LEFT: grid foto + stats ── */}
                <div className="grid grid-cols-2 gap-4">

                    {/* Colonna sinistra: foto + stat */}
                    <div className="flex flex-col gap-4">

                        {/* Foto 1 — clip-path reveal + Ken Burns */}
                        <div
                            data-reveal="clip"
                            data-delay="0"
                            className="relative overflow-hidden rounded-lg aspect-[3/4]"
                        >
                            <Image
                                src="/salon-interior.png"
                                alt="Interno del salone"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Stat: Trattamenti */}
                        <div
                            data-reveal="scale"
                            data-delay="400"
                            className="bg-white border border-[#1a1a1a]/10 rounded-lg p-6 flex flex-col gap-1 shadow-sm"
                        >
                            <span 
                                ref={count500Ref} 
                                className="text-4xl font-bold tracking-tight text-[#1a1a1a]"
                                dangerouslySetInnerHTML={{ __html: "0+" }}
                            />
                            <span className="anony text-xs tracking-[0.2em] uppercase text-[#1a1a1a]/50">
                                Trattamenti professionali
                            </span>
                        </div>
                    </div>

                    {/* Colonna destra: stat + foto */}
                    <div className="flex flex-col gap-4 mt-8">

                        {/* Stat: Anni di esperienza */}
                        <div
                            data-reveal="scale"
                            data-delay="200"
                            className="bg-[#1a1a1a] text-white rounded-lg p-6 flex flex-col gap-1 shadow-sm"
                        >
                            <span 
                                ref={count7Ref} 
                                className="text-4xl font-bold tracking-tight"
                                dangerouslySetInnerHTML={{ __html: "0+" }}
                            />
                            <span className="anony text-xs tracking-[0.2em] uppercase text-white/60">
                                Anni di esperienza
                            </span>
                        </div>

                        {/* Foto 2 — clip-path reveal + Ken Burns */}
                        <div
                            data-reveal="clip"
                            data-delay="200"
                            className="relative overflow-hidden rounded-lg aspect-[3/4]"
                        >
                            <Image
                                src="/woman-hair.png"
                                alt="Styling donna"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* ── RIGHT: testo ── */}
                <div className="flex flex-col gap-8">

                    <p
                        data-reveal="up"
                        data-delay="100"
                        className="anony text-xs tracking-[0.25em] uppercase text-[#1a1a1a]/40"
                    >
                        Il nostro manifesto
                    </p>

                    <h2
                        data-reveal="up"
                        data-delay="220"
                        className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-[#1a1a1a]"
                    >
                        Benvenuti nel Laboratorio dove{" "}
                        <em className="font-light italic text-[#1a1a1a]/50">RELAX</em>{" "}
                        è una cosa seria.
                    </h2>

                    <div
                        data-reveal="line"
                        data-delay="380"
                        className="h-px bg-[#1a1a1a]/20"
                    />

                    <p
                        data-reveal="up"
                        data-delay="440"
                        className="leading-relaxed text-base"
                    >
                        Non siamo la solita parruccheria impettita. Siamo un Urban Atelier
                        a Seregno dove puoi sentirti a casa, bere un buon caffè e affidare
                        la tua testa a chi sa davvero cosa sta facendo.
                    </p>

                    <p
                        data-reveal="up"
                        data-delay="560"
                        className="leading-relaxed text-base "
                    >
                        Dalle schiariture più audaci al grooming maschile vecchio stile,
                        trattiamo ogni capello come un pezzo unico da collezione. Nessun
                        giudizio, solo stile puro e qualche battuta di troppo.
                    </p>
                </div>

            </div>
        </section>
    );
}