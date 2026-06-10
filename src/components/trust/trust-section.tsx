import { Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { StatCounter } from './stat-counter'
import { Testimonial } from './testimonial'

export function TrustSection() {
  return (
    <Section id="vertrauen" background="navy">
      <div className="grid gap-12 md:grid-cols-3 md:gap-8">
        <StatCounter
          to={52}
          then={16}
          label="Minuten/Tag"
          sublabel="eingespart"
        />
        <StatCounter
          to={100}
          suffix="%"
          delay={200}
          label="Digitalisiert"
          sublabel="Kein Papier mehr nötig"
        />
        <Reveal delay={400}>
          <div className="text-center">
            <p className="font-heading text-h1 font-bold text-white">
              Echtzeit
            </p>
            <p className="mt-2 text-body font-medium text-navy-100">
              Nachvollziehbar
            </p>
            <p className="mt-1 text-caption text-navy-200">
              Jede Änderung dokumentiert
            </p>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto my-16 h-px max-w-[120px] bg-navy-400" />

      <Testimonial />
    </Section>
  )
}
