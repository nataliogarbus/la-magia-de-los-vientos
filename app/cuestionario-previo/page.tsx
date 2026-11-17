import type { Metadata } from 'next';
import CuestionarioPrevioClient from '@/components/CuestionarioPrevioClient';

export const metadata: Metadata = {
  title: {
    absolute: 'Cuestionario Previo a la Consulta | La Magia de los Vientos',
  },
  description:
    'Cuestionario confidencial previo a la sesión de acompañamiento en Biodecodificación y Terapias Complementarias.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function CuestionarioPrevioPage() {
  return <CuestionarioPrevioClient />;
}
