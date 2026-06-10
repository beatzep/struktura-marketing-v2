import { Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { PAIN_POINTS } from '@/lib/constants'
import { PainCard } from './pain-card'

export function ProblemSection() {
  return (
    <Section id="herausforderungen" withGrid>
      <Reveal>
        <p className="overline-label text-navy-400">Herausforderungen</p>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="mt-4 max-w-[560px] font-heading text-h1 font-bold text-ink">
          Kommt Ihnen das bekannt vor?
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {PAIN_POINTS.map((point, i) => (
          <Reveal key={point.title} delay={200 + i * 120} className="h-full">
            <PainCard {...point} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
