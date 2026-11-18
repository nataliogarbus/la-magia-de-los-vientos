import type { Metadata, Viewport } from "next";
import { Inter, Outfit, Playfair_Display } from "next/font/google";
import "./main.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });

export const viewport: Viewport = {
  themeColor: "#2C3A33",
};

export const metadata: Metadata = {
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "La Magia",
  },
  metadataBase: new URL('https://lamagiadelosvientos.com.ar'),
  title: {
    default: "La Magia de los Vientos | Terapia Floral & Bienestar Natural · Moreno",
    template: "%s | La Magia de los Vientos",
  },
  description: "Preparados de Flores de Bach a medida para adultos, niños y mascotas. Consultoría terapéutica personalizada y armonización vibracional en Moreno, GBA.",
  keywords: ["Flores de Bach", "Preparados Bach Moreno", "Terapia Floral GBA", "Ansiedad natural", "Bienestar Mascotas", "Rescue Remedy Argentina", "Armonización vibracional", "Handpan terapia"],
  authors: [{ name: "La Magia de los Vientos" }],
  openGraph: {
    title: "La Magia de los Vientos | Terapia Floral & Bienestar Natural",
    description: "Preparados de Bach a medida, consultoría personalizada y armonización vibracional. Envío a todo el país.",
    images: [{ url: '/logo-magia.png', width: 512, height: 512, alt: 'La Magia de los Vientos' }],
    type: 'website',
    locale: 'es_AR',
    siteName: 'La Magia de los Vientos',
  },
  twitter: {
    card: 'summary_large_image',
    title: "La Magia de los Vientos | Terapia Floral & Bienestar Natural",
    description: "Preparados de Bach a medida. Consultoría personalizada en Moreno, GBA.",
  },
  alternates: {
    canonical: 'https://lamagiadelosvientos.com.ar',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": ["HealthAndBeautyBusiness", "LocalBusiness"],
    "name": "La Magia de los Vientos",
    "url": "https://lamagiadelosvientos.com.ar",
    "logo": "https://lamagiadelosvientos.com.ar/logo-magia.png",
    "image": "https://lamagiadelosvientos.com.ar/logo-magia.png",
    "telephone": "+54-11-4914-3734",
    "priceRange": "$$",
    "description": "Centro de armonización vibracional y farmacia floral artesanal. Especialistas en Preparados de Flores de Bach personalizados, sesiones de Handpan y bienestar animal.",
    "founder": {
      "@type": "Person",
      "name": "Eliana",
      "jobTitle": "Terapeuta Integrativa y Especialista en Terapia Floral",
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Conservatorio de Música de San Martín"
      },
      "knowsAbout": [
        "Biodecodificación Transgeneracional",
        "Flores de Bach",
        "Gemoterapia",
        "Yoga",
        "Conciencia Corporal y Sistema Nervioso"
      ]
    },
    "knowsAbout": [
      "Biodecodificación Transgeneracional",
      "Flores de Bach",
      "Gemoterapia",
      "Yoga",
      "Armonización Vibracional"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Moreno",
      "addressRegion": "Buenos Aires",
      "addressCountry": "AR"
    },
    "areaServed": [
      { "@type": "City", "name": "Moreno" },
      { "@type": "City", "name": "Merlo" },
      { "@type": "City", "name": "Ituzaingó" },
      { "@type": "AdministrativeArea", "name": "GBA Oeste" },
      { "@type": "Country", "name": "Argentina" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios y Preparados",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Consultoría Humana de Flores de Bach", "description": "Sesión terapéutica personalizada de 60 minutos" }, "price": "25000", "priceCurrency": "ARS" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Huellas en Calma — Bienestar Animal", "description": "Terapia floral para mascotas" }, "price": "20000", "priceCurrency": "ARS" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Armonización de Espacios" }, "price": "35000", "priceCurrency": "ARS" },
        { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Preparados Magistrales de Flores de Bach", "description": "Fórmulas artesanales para adultos, niños y mascotas" }, "price": "20000", "priceCurrency": "ARS" }
      ]
    },
    "sameAs": [
      "https://wa.me/5491149143734"
    ]
  };

  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} ${playfair.variable}`}>
        <Navbar />
        {children}
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
