"use client";

import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";

function RouteProvider({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const lenis = useLenis();

    useEffect(() => {
        // Resettha lo scroll all'inizio esattamente ogni volta che si cambia pagina
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        }
    }, [pathname, lenis]);

    return <>{children}</>;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.08,     // Valore basso = scorrimento più inerziale/fluido
                duration: 1.2,  // Durata dello scorrimento dinamico
                smoothWheel: true,
                wheelMultiplier: 1.2,
            }}
        >
            <RouteProvider>
                {children}
            </RouteProvider>
        </ReactLenis>
    );
}
