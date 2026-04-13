import type { Metadata } from "next";
import { Syne, Anonymous_Pro } from "next/font/google";
import { cookies } from "next/headers"; // 1. IMPORTIAMO I COOKIES
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import CustomCursor from "./components/CustomCursor";
import Preloader from "./components/Preloader";

const anonymousPro = Anonymous_Pro({
  variable: "--font-anonymous-pro",
  subsets: ["latin"],
  weight: "400",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://manuelbarbiere.it'),
  title: {
    default: "Manuel Concept Hair Lab | Parrucchiere Seregno",
    template: "%s | Manuel Hair",
  },
  description: "Parrucchiere e Barbiere a Seregno (Monza e Brianza). Esperti in tagli sartoriali, balayage, colorazioni artistiche e trattamenti premium uomo/donna.",
  keywords: ["Parrucchiere Seregno", "Barbiere Seregno", "Parrucchiere Monza e Brianza", "Miglior parrucchiere Seregno", "Taglio capelli Monza", "Salone di bellezza Seregno", "Manuel Concept Hair Lab"],
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://manuelbarbiere.it",
    title: "Manuel Concept Hair Lab | Il tuo Parrucchiere a Seregno",
    description: "Il laboratorio di stile a Seregno (MB). Rilassati in un ambiente esclusivo.",
    siteName: "Manuel Hair Concept Lab",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// 2. AGGIUNTO 'async' ALLA FUNZIONE
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // 3. AGGIUNTO 'await' ALLA CHIAMATA COOKIES() (Regola di Next 15/16)
  const cookieStore = await cookies();
  const hasSeenPreloader = cookieStore.get("hasSeenPreloader");

  // Struttura dati (Schema.org) vitale per far capire esattamente a Google Mappe e Ricerca Locale che attività siamo
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "name": "Manuel Concept Hair Lab",
    "image": "https://manuelbarbiere.it/salon-interior.png",
    "url": "https://manuelbarbiere.it",
    "telephone": "+3903621739643",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Via S. Vitale, 114",
      "addressLocality": "Seregno",
      "postalCode": "20831",
      "addressRegion": "MB",
      "addressCountry": "IT"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 45.649,
      "longitude": 9.205
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Tuesday", "Wednesday"],
        "opens": "09:00",
        "closes": "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Thursday"],
        "opens": "12:00",
        "closes": "21:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Friday", "Saturday"],
        "opens": "09:00",
        "closes": "19:00"
      }
    ]
  };

  return (
    <html
      lang="it"
      className={`${syne.variable} ${anonymousPro.variable} antialiased`}
    >
      <body className="flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          {/* 4. CONDIZIONE: Mostriamo il Preloader SOLO se il cookie non c'è */}
          {!hasSeenPreloader && <Preloader />}
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}