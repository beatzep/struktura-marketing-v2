import { Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { CONTACT_EMAIL } from '@/lib/constants'

export function CtaSection() {
  return (
    <Section id="kontakt" withGrid gridStrength={0.02}>
      <div className="text-center">
        <Reveal>
          <h2 className="font-heading text-h1 font-bold text-ink">
            Bereit für Struktur?
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p className="mx-auto mt-6 max-w-[560px] text-body-lg text-ink">
            Lassen Sie uns gemeinsam herausfinden, wie Struktura Ihre
            operativen Abläufe transformieren kann.
          </p>
        </Reveal>

        <Reveal delay={400}>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Erstgespr%C3%A4ch%20Struktura`}
            className="mt-10 inline-block rounded-sm bg-navy-600 px-10 py-4 text-body font-medium tracking-wide text-white transition-[background-color,transform] duration-200 hover:scale-[1.02] hover:bg-navy-800"
          >
            Erstgespräch vereinbaren →
          </a>
        </Reveal>

        <div className="mx-auto my-12 h-px max-w-[80px] bg-sand-300" />

        <Reveal delay={600}>
          <p className="text-caption text-ink">
            Oder schreiben Sie uns direkt:
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-1 inline-block text-body font-medium text-navy-600 transition-colors hover:text-navy-400"
          >
            {CONTACT_EMAIL}
          </a>
        </Reveal>
      </div>
    </Section>
  )
}
