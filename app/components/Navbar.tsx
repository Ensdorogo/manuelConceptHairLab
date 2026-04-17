"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [mounted, setMounted] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        // Attende che il preloader sia finito prima di triggerare l'animazione d'ingresso
        const checkPreloader = setInterval(() => {
            if (!document.body.classList.contains("preloader-active")) {
                setMounted(true);
                clearInterval(checkPreloader);
            }
        }, 100);

        // Tracking dello scorrimento per rendere la navbar 'fixed e glass'
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            clearInterval(checkPreloader);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Bloccare lo scroll quando il menu mobile è aperto
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    const links = [
        { name: "Chi Siamo", path: "/chi-siamo" },
        { name: "Servizi", path: "/servizi" },
        { name: "Galleria", path: "/galleria" },
        { name: "Contatti", path: "/contatti" },
    ];

    return (
        <>
            {/* Div invisibile come placeholder per non rompere il layout del resto della pagina quando la navbar vera è fixed */}
            <div className="h-[96px] w-full invisible pointer-events-none" aria-hidden="true" />

            {/* Header fisso con effetto "glass" allo scroll */}
            <header
                className={`
                    fixed w-full top-0 left-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                    ${scrolled ? "bg-[#1a1a1a]/90 backdrop-blur-xl border-b border-white/5 py-1" : "bg-transparent py-3"}
                `}
            >
                <nav
                    className={`
                        flex items-center justify-between w-[95%] mx-auto text-white
                        transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]
                        transform ${mounted ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"}
                    `}
                >
                    {/* Logo Section */}
                    <div
                        className="flex flex-col cursor-pointer group relative z-50 py-4 md:py-2"
                        style={{ transitionDelay: "100ms" }}
                    >
                        <Link href="/" onClick={() => setMenuOpen(false)}>
                            <span className="text-2xl font-bold tracking-tight uppercase group-hover:text-white/80 transition-colors duration-300">
                                Manuel
                            </span>
                            <p className="anony text-[10px] tracking-[0.25em] text-white/50 uppercase group-hover:text-white/80 transition-colors duration-300">
                                Concept Hair Lab
                            </p>
                        </Link>
                    </div>

                    {/* Desktop Links Section (Nascosta su mobile) */}
                    <ul className="hidden md:flex list-none items-center gap-8 lg:gap-12 text-xs md:text-sm font-semibold tracking-widest uppercase">
                        {links.map((link, i) => (
                            <li
                                key={link.name}
                                className="overflow-hidden"
                            >
                                <Link
                                    href={link.path}
                                    className="group block relative overflow-hidden px-2 py-1"
                                >
                                    {/* Contenitore per l'entrata in scena (stagger fade-up iniziale) */}
                                    <div
                                        className={`
                                            transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]
                                            ${mounted ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}
                                        `}
                                        style={{ transitionDelay: `${250 + i * 150}ms` }}
                                    >
                                        <div className="relative overflow-hidden flex items-center">

                                            {/* Testo Primario (visibile di default) */}
                                            <div className="transition-transform duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[105%] w-full">
                                                {link.name}
                                            </div>

                                            {/* Testo Secondario (entra dal basso al passaggio del mouse) */}
                                            <div className="absolute inset-0 flex items-center transition-transform duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-[105%] group-hover:translate-y-0">
                                                <span className="italic tracking-widest">{link.name}</span>
                                            </div>

                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Hamburger Button (Visibile solo su mobile) */}
                    <button
                        className="md:hidden cursor-pointer relative w-6 h-4 z-50 flex flex-col justify-between focus:outline-none"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle mobile menu"
                    >
                        <span
                            className={`w-full h-[1px] bg-white transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] absolute left-0 ${menuOpen ? 'rotate-45 top-1/2 -translate-y-1/2' : 'top-0'
                                }`}
                        />
                        <span
                            className={`w-full h-[1px] bg-white transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] absolute left-0 ${menuOpen ? '-rotate-45 top-1/2 -translate-y-1/2' : 'bottom-0'
                                }`}
                        />
                    </button>
                </nav>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`
                    fixed inset-0 z-40 bg-[#1a1a1a] flex flex-col justify-center px-8
                    transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                    md:hidden
                    ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
                `}
            >
                <ul className="flex flex-col gap-6 text-3xl font-bold tracking-widest uppercase text-white">
                    {links.map((link, i) => (
                        <li key={link.name} className="overflow-hidden">
                            <Link
                                href={link.path}
                                onClick={() => setMenuOpen(false)}
                                className="block"
                            >
                                <div
                                    className={`
                                        transition-transform duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)]
                                        ${menuOpen ? 'translate-y-0' : 'translate-y-full'}
                                    `}
                                    style={{ transitionDelay: `${menuOpen ? 200 + i * 100 : 0}ms` }}
                                >
                                    <span className="hover:italic transition-all duration-300">
                                        {link.name}
                                    </span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile Info Footer */}
                <div
                    className={`
                        absolute bottom-16 left-8
                        transition-all duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)]
                        ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                    `}
                    style={{ transitionDelay: `${menuOpen ? 600 : 0}ms` }}
                >
                    <p className="anony text-xs tracking-widest text-white/50 uppercase mb-2">Contattaci</p>
                    <a href="tel:+3903621739643" className="block text-white mb-1">+39 0362 173 9643</a>
                    <a href="https://wa.me/393499265915" target="_blank" rel="noopener noreferrer" className="block text-white mb-1">WhatsApp: +39 349 926 5915</a>
                    <a href="mailto:manuelconcepthairlab@gmail.com" className="block text-white">manuelconcepthairlab@gmail.com</a>
                </div>
            </div>
        </>
    );
}
