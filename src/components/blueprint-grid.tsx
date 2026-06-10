'use client'

import { useId } from 'react'
import { useInView } from '@/hooks/use-intersection'

interface BlueprintGridProps {
  /** Ziel-Opazität der Linien (0.03 light, 0.06 stark/dark) */
  strength?: number
  /** Helle Linien für dunkle Sektionen */
  dark?: boolean
}

/**
 * Technisches Blueprint-Raster hinter dem Sektions-Content.
 * Linien alle 48px, faden an den Rändern aus, zeichnen sich
 * per steps(8) ein, sobald die Sektion sichtbar wird.
 */
export function BlueprintGrid({ strength = 0.03, dark = false }: BlueprintGridProps) {
  const patternId = useId()
  const { ref, inView } = useInView<HTMLDivElement>(0.15)

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`blueprint-grid pointer-events-none absolute inset-0 ${
        inView ? 'is-visible' : ''
      } ${dark ? 'text-white' : 'text-navy-600'}`}
      style={{
        maskImage:
          'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)',
      }}
    >
      <svg className="h-full w-full" style={{ opacity: strength }}>
        <defs>
          <pattern
            id={patternId}
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M48 0H0V48"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  )
}
