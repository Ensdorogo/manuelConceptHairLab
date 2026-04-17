import { Metadata } from "next";
import Navbar from "./components/Navbar";
import HeroText from "./components/HeroText";
import Presentation from "./components/Presentation";
import ShowServizi from "./components/ShowServizi";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Manuel Concept Hair Lab",
  description: "Parruchiere e Barbiere a Seregno. Tagli sartoriali uomo e donna, colorazioni artistiche e trattamenti di altissimo livello in un ambiente esclusivo di totale relax.",
};

import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="relative min-h-screen flex flex-col overflow-hidden">
        <Image
          src="/sfondo/sfondo1.webp"
          alt="Manuel Concept Hair Lab"
          fill
          priority
          className="object-cover object-center pointer-events-none"
          sizes="100vw"
          quality={90}
        />

        <div className="absolute inset-0 bg-black/10 z-0" />

        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-1 flex items-end">
            <HeroText />
          </div>
        </div>
      </main>
      <Presentation />
      <ShowServizi />
      <Footer />
    </>
  );
}
