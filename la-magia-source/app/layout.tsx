import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-main',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'La Magia de los Vientos | Bienestar Integral',
  description: 'Terapias holísticas, flores de Bach, Reiki y armonización sonora con Handpans.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={outfit.className}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
