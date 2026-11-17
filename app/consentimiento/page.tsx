import type { Metadata } from 'next';
import ConsentimientoClient from '@/components/ConsentimientoClient';

export const metadata: Metadata = {
  title: {
    absolute: 'Consentimiento Informado | La Magia de los Vientos',
  },
  description:
    'Documento privado de Consentimiento Informado para sesiones de acompañamiento en Biodecodificación y Terapias Complementarias.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function ConsentimientoPage() {
  return <ConsentimientoClient />;
}
