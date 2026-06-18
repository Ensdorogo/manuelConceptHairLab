"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [cursorText, setCursorText] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX = mouseX;
        let ringY = mouseY;
        let prevRX = ringX;
        let prevRY = ringY;

        let hoverState = false;
        let currentText: string | null = null;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            const target = e.target as HTMLElement;
            const hoverable = target.closest("a, button, input, [role='button'], [data-hoverable='true']");
            const nowHovering = !!hoverable;

            if (nowHovering !== hoverState) {
                hoverState = nowHovering;
                setIsHovering(nowHovering);
            }

            const text = hoverable?.getAttribute("data-cursor-text") ?? null;
            if (text !== currentText) {
                currentText = text;
                setCursorText(text);
            }
        };

        let rafId: number;

        const render = () => {
            // Lerp dell'anello
            ringX += (mouseX - ringX) * 0.14;
            ringY += (mouseY - ringY) * 0.14;

            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${mouseX}px,${mouseY}px,0)`;
            }
            if (ringRef.current && (Math.abs(ringX - prevRX) > 0.05 || Math.abs(ringY - prevRY) > 0.05)) {
                ringRef.current.style.transform = `translate3d(${ringX}px,${ringY}px,0)`;
                prevRX = ringX;
                prevRY = ringY;
            }

            rafId = requestAnimationFrame(render);
        };

        window.addEventListener("mousemove", onMouseMove, { passive: true });
        rafId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div className="custom-cursor-container">

            {/*
             * ANELLO ESTERNO
             * Tecnica "doppio bordo":
             *   border bianco  → visibile su sfondi scuri
             *   box-shadow nera → visibile su sfondi chiari
             * Nessun mix-blend-difference → nessun GPU readback.
             */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 pointer-events-none z-[99998]"
                style={{ willChange: "transform" }}
            >
                <div
                    style={{
                        width: "80px",
                        height: "80px",
                        marginTop: "-40px",
                        marginLeft: "-40px",
                        borderRadius: "50%",
                        transition: "transform 400ms cubic-bezier(0.22,1,0.36,1), background 300ms ease, box-shadow 300ms ease, opacity 300ms ease",
                        ...(cursorText ? {
                            // Stato testo: pallina nera piena con testo bianco
                            background: "#1a1a1a",
                            boxShadow: "0 0 0 1.5px rgba(255,255,255,0.5), 0 4px 20px rgba(0,0,0,0.3)",
                            transform: "scale(1.8)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        } : isHovering ? {
                            // Stato hover: anello espanso, semi-trasparente scuro
                            background: "rgba(26,26,26,0.08)",
                            boxShadow: "inset 0 0 0 1.5px rgba(26,26,26,0.55), 0 0 0 1px rgba(255,255,255,0.35), 0 2px 12px rgba(0,0,0,0.12)",
                            transform: "scale(1.25)",
                        } : {
                            // Stato default: anello piccolo, doppio bordo bianco+nero
                            background: "transparent",
                            boxShadow: "inset 0 0 0 1.5px rgba(255,255,255,0.85), 0 0 0 1.5px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.15)",
                            transform: "scale(0.5)",
                        }),
                    }}
                >
                    {cursorText && (
                        <span style={{ fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, color: "white", whiteSpace: "nowrap" }}>
                            {cursorText}
                        </span>
                    )}
                </div>
            </div>

            {/*
             * PUNTINO INTERNO
             * Stesso schema: fill bianco + shadow nera esterna.
             */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 pointer-events-none z-[99999]"
                style={{ willChange: "transform" }}
            >
                <div
                    style={{
                        width: "6px",
                        height: "6px",
                        marginTop: "-3px",
                        marginLeft: "-3px",
                        borderRadius: "50%",
                        background: "white",
                        // Bordo scuro esterno = visibile su sfondo bianco
                        boxShadow: "0 0 0 1.5px rgba(0,0,0,0.5), 0 1px 4px rgba(0,0,0,0.3)",
                        transition: "opacity 250ms ease, transform 250ms ease",
                        opacity: isHovering ? 0 : 1,
                        transform: isHovering ? "scale(0)" : "scale(1)",
                    }}
                />
            </div>

        </div>
    );
}
