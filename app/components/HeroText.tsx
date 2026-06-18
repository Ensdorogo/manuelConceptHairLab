"use client";

import { useEffect, useState } from "react";
import { Scissors } from "lucide-react";
import Link from "next/link";

export default function HeroText() {
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        let observer: MutationObserver | null = null;
        if (!document.body.classList.contains("preloader-active")) {
            setMounted(true);
        } else {
            observer = new MutationObserver(() => {
                if (!document.body.classList.contains("preloader-active")) {
                    setMounted(true);
                    observer?.disconnect();
                }
            });
            observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
        }

        const checkIsOpen = () => {
            const romeTimeStr = new Date().toLocaleString("en-US", { timeZone: "Europe/Rome" });
            const romeDate = new Date(romeTimeStr);

            const day = romeDate.getDay();
            const hour = romeDate.getHours();
            const minute = romeDate.getMinutes();
            const timeStr = hour + minute / 60;

            let open = false;
            if (day === 2 || day === 3 || day === 5 || day === 6) {
                if (timeStr >= 9 && timeStr < 19) open = true;
            } else if (day === 4) {
                if (timeStr >= 12 && timeStr < 21) open = true;
            }
            setIsOpen(open);
        };

        checkIsOpen();
        const interval = setInterval(checkIsOpen, 60000);

        return () => {
            if (observer) observer.disconnect();
            clearInterval(interval);
        };
    }, []);

    // Stile animazione via inline style → zero conflitti Tailwind
    const anim = (delay: number, targetOpacity = 1) => ({
        opacity: mounted ? targetOpacity : 0,
        transform: mounted ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 600ms cubic-bezier(0.22,1,0.36,1), transform 600ms cubic-bezier(0.22,1,0.36,1)",
        transitionDelay: `${delay}ms`,
    });

    return (
        <div className="pb-16 text-white w-[95%] mx-auto">

            {/* Eyebrow */}
            <div
                className="flex items-center gap-3 mb-5"
                style={anim(0, 0.6)}
            >
                <p className="text-xs tracking-[0.25em] uppercase">
                    Seregno · Est. 2018
                </p>
                {mounted && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            {isOpen && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${isOpen ? "bg-green-500" : "bg-red-500"}`}></span>
                        </span>
                        <span className="text-[10px] leading-none tracking-wider uppercase font-semibold mt-[1px]">{isOpen ? "Aperto" : "Chiuso"}</span>
                    </div>
                )}
            </div>

            {/* H1 */}
            <h1
                className="text-[clamp(2.8rem,5.5vw,5rem)] font-bold leading-[0.9] tracking-tight mb-6"
                style={anim(80)}
            >
                L&apos;arte<br />
                del taglio<br />
                <em className="font-light not-italic opacity-85">perfetto.</em>
            </h1>

            {/* Subtitle — opacity 0.7 nel visible, 0 nel hidden: nessun conflitto */}
            <p
                className="text-base font-light leading-relaxed mb-10 max-w-lg"
                style={anim(160, 0.7)}
            >
                Il salone di parrucchiere a Seregno dove ogni dettaglio conta.<br />
                Tagli di tendenza uomo e donna, balayage e colorazioni al top.
            </p>


            {/* CTA buttons */}
            <div
                className="flex items-center gap-4 flex-wrap"
                style={anim(240)}
            >
                {/* Primary — Prenota ora */}
                <a
                    href="https://www.my-booking-app.com/booking/home/qO4wj8s1I6j8FYokIK91eNNQc14BwwiC?iso=it"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                        group relative inline-flex items-center
                        px-8 py-4 rounded-full
                        bg-white hover:bg-white/90
                        text-sm font-semibold tracking-[0.12em] uppercase text-black
                        overflow-hidden min-w-[220px] justify-center
                        shadow-[0_4px_24px_rgba(0,0,0,0.3)]
                        transition-all duration-300
                    "
                >
                    <span className="
                        absolute left-6 text-black
                        transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                        opacity-100 translate-x-0
                        group-hover:translate-x-40 group-hover:opacity-0
                    ">
                        <Scissors className="w-5 h-5" strokeWidth={2} />
                    </span>
                    <span className="
                        relative
                        transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                        translate-x-4 group-hover:translate-x-0
                    ">Prenota ora</span>
                </a>

                {/* Secondary — Scopri i servizi */}
                <Link
                    href="/servizi"
                    className="
                        group relative inline-flex items-center gap-2
                        px-8 py-4 rounded-full
                        border border-white
                        bg-white/10 hover:bg-white/20
                        backdrop-blur-sm
                        text-sm font-semibold tracking-[0.12em] uppercase
                        text-white
                        transition-all duration-300
                        shadow-[0_4px_24px_rgba(0,0,0,0.2)]
                    "
                >
                    <span className="relative">Scopri i servizi</span>
                    <span className="
                        relative
                        transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
                        group-hover:translate-x-1
                    ">→</span>
                </Link>
            </div>
        </div>
    );
}
