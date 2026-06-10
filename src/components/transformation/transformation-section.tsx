'use client'

import { useEffect, useRef, useState } from 'react'
import { setupGsap } from '@/lib/gsap-config'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { ChaosVisual } from './chaos-visual'
import { ProgressText } from './progress-text'

/**
 * Scroll-getriebene Transformation: Der 200vh hohe Container erzeugt den
 * Scroll-Raum, der Inhalt klebt darin fest. ScrollTrigger (scrub) mappt
 * den Scroll-Fortschritt auf den Chaos-zu-Tabelle-Morph.
 */
export function TransformationSection() {
  const containerRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) {
      setProgress(1)
      return
    }

    const { ScrollTrigger } = setupGsap()
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        // Quantisieren, damit nicht jeder Scroll-Pixel re-rendert
        setProgress(Math.round(self.progress * 200) / 200)
      },
    })

    return () => trigger.kill()
  }, [reduced])

  return (
    <section
      id="transformation"
      ref={containerRef}
      className={`relative bg-white ${reduced ? 'py-24' : 'h-[200vh]'}`}
      style={{ scrollMarginTop: 72 }}
    >
      <div
        className={
          reduced
            ? ''
            : 'sticky top-16 flex h-[calc(100vh-4rem)] items-center md:top-[72px] md:h-[calc(100vh-72px)]'
        }
      >
        <div className="mx-auto grid w-full max-w-content items-center gap-10 px-6 md:px-10 lg:grid-cols-2 lg:gap-16">
          <ChaosVisual progress={progress} />
          <ProgressText progress={progress} />
        </div>
      </div>
    </section>
  )
}
