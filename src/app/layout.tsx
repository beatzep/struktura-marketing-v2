import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700'],
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm',
  weight: ['400', '500', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Struktura Digital — Operative Betriebssysteme für KMU',
  description:
    'Wir verwandeln unstrukturierte Abläufe in messbare, nachvollziehbare Betriebssysteme. Für Steuerkanzleien und wachsende Unternehmen.',
  keywords: [
    'Betriebssystem',
    'KMU',
    'Steuerkanzlei',
    'Digitalisierung',
    'Mandantenverwaltung',
    'SaaS',
  ],
  openGraph: {
    title: 'Struktura Digital',
    description: 'Operative Betriebssysteme für KMU',
    url: 'https://www.struktura-digital.de',
    siteName: 'Struktura Digital',
    locale: 'de_DE',
    type: 'website',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.struktura-digital.de' },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
