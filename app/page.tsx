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

export default function Home() {
  return (
    <>
      <main className="bg-[url(/sfondo/sfondo1.jpg)] bg-cover bg-center bg-no-repeat min-h-screen relative flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-end">
          <HeroText />
        </div>
      </main>
      <Presentation />
      <ShowServizi />
      <Footer />
    </>
  );
}
