import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galleria | Manuel Concept Hair Lab Seregno",
  description: "Esplora i nostri lavori e l'atmosfera del nostro salone a Seregno. Lasciati ispirare dai nostri tagli sartoriali e trattamenti premium.",
};

export default function GalleriaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
