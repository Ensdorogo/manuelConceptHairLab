"use client";

import { ReactLenis, useLenis } from "lenis/react";
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
                lerp: 0.15,         // Più reattivo — minor ritardo percepito
                duration: 1.0,      // Animazione più snella
                smoothWheel: true,
                wheelMultiplier: 0.85,
            }}
        >
            <RouteProvider>
                {children}
            </RouteProvider>
        </ReactLenis>
    );
}
