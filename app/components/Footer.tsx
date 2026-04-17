"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#f7f5f2] text-[#1a1a1a] px-8 md:px-16 pt-24 pb-8 overflow-hidden relative border-t border-[#1a1a1a]/5">
            {/* Background Accent */}
            {/* Elemento circolare estetico per il blur di sfondo (convertito) */}
            <div className="pointer-events-none absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/3 bg-[radial-gradient(circle_at_center,rgba(247,245,242,0.9)_0%,transparent_60%)]" />

            <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">

                {/* Top Section: CTA + Manifesto */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end border-b border-[#1a1a1a]/10 pb-16">
                    <div className="flex flex-col gap-4">
                        <span className="anony text-xs tracking-[0.25em] uppercase text-[#1a1a1a]/50">
                            Pronto per un cambiamento?
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                            Prenota il tuo <br />
                            <span className="font-light italic text-[#1a1a1a]/50">appuntamento.</span>
                        </h2>
                    </div>
                    <div className="flex justify-start md:justify-end">
                        <a
                            href="tel:+390362 173 9643"
                            className="
                                group inline-flex items-center gap-4 border border-[#1a1a1a]/20 
                                rounded-full pl-8 pr-3 py-3 hover:bg-[#1a1a1a] hover:text-white
                                transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                            "
                        >
                            <span className="text-sm font-semibold tracking-[0.1em] uppercase">
                                Chiama Ora
                            </span>
                            <span className="
                                flex items-center justify-center p-2 rounded-full
                                bg-[#1a1a1a]/5 group-hover:bg-white/20
                                transition-colors duration-300
                            ">
                                <ArrowUpRight size={18} strokeWidth={2} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                            </span>
                        </a>
                    </div>
                </div>

                {/* Middle Grid: Info & Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-sm leading-relaxed text-[#1a1a1a]/70">

                    {/* Collonna 1: Contatti */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-[#1a1a1a] font-semibold uppercase tracking-[0.1em] text-xs anony mb-2">Contatti</h4>
                        <p>
                            Via S. Vitale, 114,<br />
                            20831 Seregno MB
                        </p>
                        <p>
                            <a href="tel:+390362 173 9643" className="hover:text-[#1a1a1a] transition-colors duration-200">+39 0362 173 9643</a><br />
                            <a href="https://wa.me/393499265915" target="_blank" rel="noopener noreferrer" className="hover:text-[#1a1a1a] transition-colors duration-200">WhatsApp: +39 349 926 5915</a><br />
                            <a href="mailto:manuelconcepthairlab@gmail.com" className="hover:text-[#1a1a1a] transition-colors duration-200">manuelconcepthairlab@gmail.com</a>
                        </p>
                    </div>

                    {/* Collonna 2: Orari */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-[#1a1a1a] font-semibold uppercase tracking-[0.1em] text-xs anony mb-2">Orari</h4>
                        <ul>
                            <li className="flex justify-between border-b border-[#1a1a1a]/5 pb-2 mb-2">
                                <span>Dom - Lun</span>
                                <span className="text-[#1a1a1a]/40">Chiuso</span>
                            </li>
                            <li className="flex justify-between border-b border-[#1a1a1a]/5 pb-2 mb-2">
                                <span>Mar - Mer</span>
                                <span>09:00 — 19:00</span>
                            </li>
                            <li className="flex justify-between border-b border-[#1a1a1a]/5 pb-2 mb-2">
                                <span>Giovedì</span>
                                <span>12:00 — 21:00</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Ven - Sab</span>
                                <span>09:00 — 19:00</span>
                            </li>

                        </ul>
                    </div>

                    {/* Collonna 3: Navigazione */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-[#1a1a1a] font-semibold uppercase tracking-[0.1em] text-xs anony mb-2">Navigazione</h4>
                        <ul className="flex flex-col gap-2">
                            <li><Link href="/chi-siamo" className="hover:text-[#1a1a1a] transition-colors duration-200 flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-px bg-[#1a1a1a] transition-all duration-300"></span> Chi Siamo</Link></li>
                            <li><Link href="/servizi" className="hover:text-[#1a1a1a] transition-colors duration-200 flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-px bg-[#1a1a1a] transition-all duration-300"></span> Servizi</Link></li>
                            <li><Link href="/galleria" className="hover:text-[#1a1a1a] transition-colors duration-200 flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-px bg-[#1a1a1a] transition-all duration-300"></span>Galleria</Link></li>
                            <li><Link href="/contatti" className="hover:text-[#1a1a1a] transition-colors duration-200 flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-px bg-[#1a1a1a] transition-all duration-300"></span> Contatti</Link></li>
                        </ul>
                    </div>

                    {/* Collonna 4: Social */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-[#1a1a1a] font-semibold uppercase tracking-[0.1em] text-xs anony mb-2">Social</h4>
                        <ul className="flex flex-col gap-2">
                            <li>
                                <a href="https://www.instagram.com/manuelconcepthairlab/" target="_blank" rel="noopener noreferrer" className="hover:text-[#1a1a1a] transition-colors duration-200 flex items-center gap-2 group">
                                    <span className="w-0 group-hover:w-2 h-px bg-[#1a1a1a] transition-all duration-300"></span> Instagram
                                </a>
                            </li>
                            <li>
                                <a href="https://www.facebook.com/manuelconcepthairlab" target="_blank" rel="noopener noreferrer" className="hover:text-[#1a1a1a] transition-colors duration-200 flex items-center gap-2 group">
                                    <span className="w-0 group-hover:w-2 h-px bg-[#1a1a1a] transition-all duration-300"></span> Facebook
                                </a>
                            </li>
                            <li>
                                <a href="https://www.tiktok.com/@manuelconcepthairlab" target="_blank" rel="noopener noreferrer" className="hover:text-[#1a1a1a] transition-colors duration-200 flex items-center gap-2 group">
                                    <span className="w-0 group-hover:w-2 h-px bg-[#1a1a1a] transition-all duration-300"></span> TikTok
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar: Copyright */}
                <div className="pt-8 border-t border-[#1a1a1a]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#1a1a1a]/50 anony tracking-wider">
                    <p>© {new Date().getFullYear()} Manuel Concept Hair Lab. Tutti i diritti riservati. | P.IVA: 10550970965</p>
                    <div className="flex items-center gap-4">
                        <Link href="/privacy" className="hover:text-[#1a1a1a] transition-colors">Privacy Policy</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}
