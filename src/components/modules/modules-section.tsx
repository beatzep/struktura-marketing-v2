import { Section } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { MODULES } from '@/lib/constants'
import { ModuleCard } from './module-card'

export function ModulesSection() {
  return (
    <Section id="leistungen" withGrid>
      <div className="text-center">
        <Reveal>
          <p className="overline-label text-navy-400">Leistungen</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-4 font-heading text-h1 font-bold text-ink">
            Modulare Systeme, maßgeschneidert.
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="mx-auto mt-5 max-w-[560px] text-body-lg text-ink">
            Jedes Modul löst ein konkretes operatives Problem. Aktivieren Sie
            nur, was Sie brauchen.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {MODULES.map((module, i) => (
          <Reveal key={module.title} delay={240 + i * 100} className="h-full">
            <ModuleCard {...module} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
