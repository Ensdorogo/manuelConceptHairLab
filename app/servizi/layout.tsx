import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servizi e Trattamenti | Manuel Concept Hair Lab Seregno",
  description: "Scopri il nostro menu di servizi: dal classico taglio sartoriale ai rituali barba, fino ai trattamenti avanzati e colorazioni artistiche.",
};

export default function ServiziLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
