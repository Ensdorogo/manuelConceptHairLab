import { Metadata } from "next";
import Navbar from "./components/Navbar";
import HeroText from "./components/HeroText";
import Presentation from "./components/Presentation";
import ShowServizi from "./components/ShowServizi";
import Footer from "./components/Footer";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Manuel Concept Hair Lab | Parrucchiere a Seregno",
  description: "Parruchiere e Barbiere a Seregno. Tagli sartoriali uomo e donna, colorazioni artistiche e trattamenti di altissimo livello in un ambiente esclusivo di totale relax.",
  alternates: {
    canonical: '/',
  },
};



export default function Home() {
  return (
    <>
      <main className="relative min-h-[100dvh] flex flex-col overflow-hidden bg-[#070707]">
        <Image
          src="/sfondo/sfondo1.webp"
          alt="Manuel Concept Hair Lab"
          fill
          priority
          unoptimized
          fetchPriority="high"
          className="object-cover object-center pointer-events-none"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-black/10 z-0" />

        <div className="relative z-10 flex flex-col min-h-[100dvh]">
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
