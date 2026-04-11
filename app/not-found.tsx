"use client";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-[#1a1a1a] flex flex-col relative overflow-hidden">
            <Navbar />
            
            {/* Glow decorativo */}
            <div
                aria-hidden="true"
                className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] bg-white/5 blur-[130px] rounded-full pointer-events-none"
            />
            
            <div className="flex-1 flex flex-col items-center justify-center max-w-[95%] mx-auto px-4 md:px-16 relative z-10 w-full text-center mt-20 mb-20 lg:my-0 lg:min-h-[70vh]">
                <span className="anony text-sm md:text-base tracking-[0.4em] uppercase text-white/40 mb-8 animate-[fadeUp_0.8s_ease_both]">
                    Errore 404
                </span>
                
                <h1 className="text-[7rem] sm:text-[10rem] md:text-[13rem] lg:text-[18rem] font-bold tracking-tighter text-white leading-none mb-4 animate-[fadeUp_1s_ease_both_0.2s]">
                    404<span className="text-white/20">.</span>
                </h1>
                
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 animate-[fadeUp_1s_ease_both_0.4s]">
                    Pagina <em className="font-light italic text-white/50">smarrita.</em>
                </h2>
                
                <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-12 animate-[fadeUp_1s_ease_both_0.6s]">
                    Sembra che tu ti sia perso nel nostro lab. La pagina che stavi cercando non esiste più, è stata spostata o non ha mai visto la luce.
                </p>
                
                <Link
                    href="/"
                    className="relative group flex items-center justify-center gap-4 bg-white text-[#1a1a1a] px-8 py-5 rounded-full hover:bg-[#f7f5f2] hover:scale-105 hover:shadow-[0_8px_40px_rgba(255,255,255,0.15)] transition-all duration-500 animate-[fadeUp_1s_ease_both_0.8s]"
                >
                    <span className="text-lg font-bold tracking-tight">Torna alla Home</span>
                    <div className="w-10 h-10 rounded-full bg-[#1a1a1a]/5 flex items-center justify-center group-hover:bg-[#1a1a1a] group-hover:text-white transition-colors duration-500">
                        <ArrowUpRight className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                </Link>
            </div>
            
            <Footer />
        </main>
    );
}
