import type { Metadata } from 'next';
import PagoSesionClient from '@/components/PagoSesionClient';

export const metadata: Metadata = {
  title: {
    absolute: 'Pago y Confirmación de Turno | La Magia de los Vientos',
  },
  description:
    'Paso 3 de admisión: datos de transferencia y envío de comprobante para confirmar tu sesión.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function PagoSesionPage() {
  return <PagoSesionClient />;
}
