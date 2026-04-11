import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi Siamo | Manuel Hair Concept Lab Seregno",
  description: "Scopri la storia e la filosofia di Manuel Hair Concept Lab. Molto più di un classico barbiere, un salone a Seregno dedicato alla cura dettagliata della persona.",
};

export default function ChiSiamoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
