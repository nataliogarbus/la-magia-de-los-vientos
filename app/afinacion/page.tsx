import type { Metadata } from 'next';
import LabClient from '@/components/LabClient';

export const metadata: Metadata = {
  title: {
    absolute: 'Afinación & Sintonía Emocional | La Magia de los Vientos',
  },
  description:
    'Vista previa privada de la propuesta integral con identidad musical de La Magia de los Vientos.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AfinacionPage() {
  return <LabClient />;
}
