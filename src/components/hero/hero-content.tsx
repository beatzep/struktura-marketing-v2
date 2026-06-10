'use client'

import { Reveal } from '@/components/reveal'

export function HeroContent() {
  return (
    <div className="relative z-10 mx-auto max-w-content translate-y-[12vh] px-6 text-center md:px-10">
      <Reveal immediate delay={500}>
        <h1 className="font-heading text-display font-bold text-ink">
          Struktur schafft Klarheit.
        </h1>
      </Reveal>

      <Reveal immediate delay={900}>
        <p className="mx-auto mt-6 max-w-[640px] text-body-lg text-ink">
          Wir verwandeln unstrukturierte Abläufe in messbare, nachvollziehbare
          Betriebssysteme — für KMU die wachsen.
        </p>
      </Reveal>

      <Reveal immediate delay={1500}>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#kontakt"
            className="rounded-sm bg-navy-600 px-8 py-3.5 font-medium text-white transition-colors duration-200 hover:bg-navy-800"
          >
            Jetzt starten →
          </a>
          <a
            href="#herausforderungen"
            className="px-4 py-3.5 font-medium text-navy-600 underline decoration-navy-200 underline-offset-4 transition-colors hover:decoration-navy-400"
          >
            Mehr erfahren ↓
          </a>
        </div>
      </Reveal>
    </div>
  )
}
