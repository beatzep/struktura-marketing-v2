import { Reveal } from '@/components/reveal'

export function Testimonial() {
  return (
    <Reveal delay={600}>
      <figure className="mx-auto max-w-narrow text-center">
        <blockquote>
          <p className="font-heading text-h2 italic text-white">
            „Seit Struktura habe ich erstmals einen echten Echtzeit-Überblick
            über alle Mandanten. Das hat unsere Abstimmung grundlegend
            verändert.“
          </p>
        </blockquote>
        <figcaption className="mt-6 text-caption font-medium text-navy-200">
          — Kanzleileitung, Steuerkanzlei
        </figcaption>
      </figure>
    </Reveal>
  )
}
