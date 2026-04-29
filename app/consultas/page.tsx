import type { Metadata } from 'next';
import ConsultasClient from '@/components/ConsultasClient';

export const metadata: Metadata = {
  title: 'Consultas de Terapia Floral & Armonización',
  description: 'Sesiones de Flores de Bach personalizadas, armonización vibracional de espacios, bienestar animal y Código Vibratorio en Moreno, GBA. Turnos presenciales y online.',
  alternates: { canonical: 'https://lamagiadelosvientos.com.ar/consultas' },
  openGraph: {
    title: 'Consultas | La Magia de los Vientos',
    description: 'Consultoría Humana, Huellas en Calma, Armonización de Espacios y Código Vibratorio. Servicios en Moreno, Buenos Aires.',
  },
};

export default function ConsultasPage() {
  return <ConsultasClient />;
}
