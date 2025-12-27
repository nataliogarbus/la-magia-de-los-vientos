import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit' });

export const metadata: Metadata = {
  metadataBase: new URL('https://lamagiadelosvientos.com'),
  title: "La Magia de los Vientos | Centro de Armonización Vibracional",
  description: "Metodología clínica de bienestar que integra Frecuencia Sonora y Terapia Floral. Especialistas en estrés, entornos y bienestar animal.",
  keywords: ["Armonización Sonora", "Terapia Floral", "Bienestar Corporativo", "Handpan", "Flores de Bach", "Musicoterapia", "Relax"],
  openGraph: {
    title: "La Magia de los Vientos | Centro de Armonización Vibracional",
    description: "Ciencia y Bienestar: Frecuencias sonoras y terapia floral para resetear tu biología.",
    images: ['/hero-bg.png'],
    type: 'website',
  }
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org Structured Data for Organization (AEO)
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "La Magia de los Vientos",
    "url": "https://lamagiadelosvientos.com",
    "logo": "https://lamagiadelosvientos.com/logo-circular-v2.png",
    "description": "Centro de Armonización Vibracional especializado en frecuencia sonora y terapia floral.",
    "sameAs": [
      "https://whatsapp.com/channel/community-link"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": "Spanish"
    }
  };

  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable}`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
