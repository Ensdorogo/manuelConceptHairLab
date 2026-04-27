import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi Siamo | Manuel Concept Hair Lab Seregno",
  description: "Scopri la storia e la filosofia di Manuel Concept Hair Lab. Molto più di un classico barbiere, un salone a Seregno dedicato alla cura dettagliata della persona.",
  alternates: {
    canonical: '/chi-siamo',
  },

};

export default function ChiSiamoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
