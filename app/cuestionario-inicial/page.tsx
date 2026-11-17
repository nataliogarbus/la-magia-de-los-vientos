import { Suspense } from 'react';
import type { Metadata } from 'next';
import CuestionarioInicialClient from '@/components/CuestionarioInicialClient';

export const metadata: Metadata = {
  title: {
    absolute: 'Cuestionario Inicial | La Magia de los Vientos',
  },
  description:
    'Cuestionario Inicial confidencial previo a la sesión de acompañamiento en Biodecodificación y Terapias Complementarias.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function CuestionarioInicialPage() {
  return (
    <Suspense fallback={null}>
      <CuestionarioInicialClient />
    </Suspense>
  );
}
