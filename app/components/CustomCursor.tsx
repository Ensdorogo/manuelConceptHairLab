"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [cursorText, setCursorText] = useState<string | null>(null);

    useEffect(() => {
        // Disabilitiamo il custom cursor su dispositivi touch
        if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
            return;
        }

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX = window.innerWidth / 2;
        let ringY = window.innerHeight / 2;
        
        let hoverState = false;
        let currentText: string | null = null;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Rileva se stiamo passando sopra elementi interattivi (link o bottoni)
            const target = e.target as HTMLElement;
            const hoverableEl = target.closest("a, button, input, [role='button'], [data-hoverable='true']");
            const isTargetHoverable = !!hoverableEl;
            
            if (isTargetHoverable !== hoverState) {
                hoverState = isTargetHoverable;
                setIsHovering(isTargetHoverable);
            }

            const text = hoverableEl ? hoverableEl.getAttribute('data-cursor-text') : null;
            if (text !== currentText) {
                currentText = text;
                setCursorText(text);
            }
        };

        let requestRef: number;

        const render = () => {
            // Lerp fluido per l'anello esterno (delay visivo del mouse)
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;

            // Applicazione dei trasform tramite manipolazione diretta per non impattare le prestazioni di React
            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
            }
            if (ringRef.current) {
                ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
            }

            requestRef = requestAnimationFrame(render);
        };

        window.addEventListener("mousemove", onMouseMove, { passive: true });
        requestRef = requestAnimationFrame(render);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            cancelAnimationFrame(requestRef);
        };
    }, []);

    // Rendering standard che previene incomprensioni SSR tra server e telefono
    return (
        <div className="custom-cursor-container">
            {/* L'anello esterno (Outer wrapper per posizionamento manuale) */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 pointer-events-none z-[99998] mix-blend-difference flex items-center justify-center"
                style={{ willChange: "transform" }}
            >
                {/* Elemento estetico per hover */}
                <div 
                    className={`
                        w-16 h-16 -mt-8 -ml-8 rounded-full transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] flex items-center justify-center
                        ${cursorText 
                            ? 'bg-white opacity-100 scale-[1.3]' 
                            : isHovering 
                                ? 'bg-white opacity-20 scale-[1.2]' 
                                : 'border-[1.5px] border-white bg-transparent opacity-100 scale-50'
                        }
                    `}
                >
                    {cursorText && (
                        <span className="text-[10px] uppercase tracking-widest font-bold text-black anony">
                            {cursorText}
                        </span>
                    )}
                </div>
            </div>

            {/* Il puntino interno ultra-istante (Outer wrapper) */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 pointer-events-none z-[99999] mix-blend-difference"
                style={{ willChange: "transform" }}
            >
                {/* Elemento estetico puntino */}
                <div 
                    className={`
                        w-2 h-2 -mt-1 -ml-1 rounded-full bg-white transition-all duration-300 ease-out
                        ${isHovering ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}
                    `}
                />
            </div>
        </div>
    );
}
