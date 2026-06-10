'use client'

import { Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { useInView } from '@/hooks/use-intersection'
import { PROCESS_STEPS } from '@/lib/constants'
import { ProcessStep } from './process-step'

export function ProcessSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2)

  return (
    <Section id="prozess" background="white" withGrid gridStrength={0.06}>
      <div className="text-center">
        <Reveal>
          <p className="overline-label text-navy-400">Ihr Weg zu Struktura</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-4 font-heading text-h1 font-bold text-ink">
            In drei Schritten zum System.
          </h2>
        </Reveal>
      </div>

      <div ref={ref} className="relative mt-16">
        {/* Verbindungslinie — zeichnet sich von links nach rechts */}
        <div
          aria-hidden="true"
          className={`process-track absolute left-[16.67%] top-6 hidden h-px overflow-hidden md:block ${
            inView ? 'is-visible' : ''
          }`}
        >
          <svg className="h-px w-full" preserveAspectRatio="none">
            <line
              x1="0"
              y1="0.5"
              x2="100%"
              y2="0.5"
              stroke="#8BB3F3"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          </svg>
        </div>

        <div className="grid gap-14 md:grid-cols-3 md:gap-8">
          {PROCESS_STEPS.map((step, i) => (
            <Reveal key={step.number} delay={200 + i * 200}>
              <ProcessStep {...step} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
