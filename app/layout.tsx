import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: "Calculadora de Luz Perú 2026 | Ahorra en tu Recibo de Electricidad",
    template: "%s | Calculadora de Luz Perú"
  },
  description: "Calcula tu recibo de luz antes de que llegue. Herramienta gratuita para Perú con guías de ahorro energético y seguimiento de consumo. ¡Empieza a ahorrar hoy!",
  keywords: ["calculadora de luz", "recibo de luz Perú", "ahorro energía", "tarifas eléctricas Perú", "consumo eléctrico", "factura luz", "energía eléctrica"],
  authors: [{ name: "Gestor de Luz" }],
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "https://gestorluz.com",
    title: "Calculadora de Luz Perú - Ahorra hasta 30% en tu Factura Eléctrica",
    description: "Calcula, monitorea y reduce tu consumo de luz. Herramienta gratuita para hogares y negocios en Perú.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Calculadora de Luz Perú - Dashboard de consumo energético"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de Luz Perú",
    description: "Herramienta gratuita para calcular y reducir tu recibo de luz",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification=GGh6PmA7iA7vk3AlUnrZU3bX0kI9zMPaa6mlpY4AhlA",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es-PE">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}