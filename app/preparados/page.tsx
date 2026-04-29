import type { Metadata } from 'next';
import PreparadosClient from '@/components/PreparadosClient';

export const metadata: Metadata = {
  title: 'Preparados Magistrales de Flores de Bach',
  description: 'Catálogo completo de preparados florales artesanales para adultos, niños y mascotas. Líneas Adultos, Kids & Mamás y Huellas en Calma. Envío a todo Argentina.',
  alternates: { canonical: 'https://lamagiadelosvientos.com.ar/preparados' },
  openGraph: {
    title: 'Preparados de Flores de Bach | La Magia de los Vientos',
    description: 'Fórmulas magistrales artesanales con las 38 esencias originales del Dr. Bach. Líneas para adultos, niños y mascotas. Envío nacional.',
  },
};

export default function PreparadosPage() {
  return <PreparadosClient />;
}
