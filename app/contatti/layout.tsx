import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contatti & Orari | Manuel Concept Hair Lab Seregno",
  description: "Prenota il tuo appuntamento al Concept Lab. Trovi Manuel a Seregno (MB). Scopri i nostri orari e contattaci direttamente per un'esperienza di altissimo styling sartoriale.",
};

export default function ContattiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
