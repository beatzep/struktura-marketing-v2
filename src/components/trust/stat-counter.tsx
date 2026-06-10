'use client'

import { useEffect, useState } from 'react'
import { useInView } from '@/hooks/use-intersection'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

interface StatCounterProps {
  /** Zielwert des Zählers */
  to: number
  suffix?: string
  /** Zweiter Wert: nach dem Hochzählen erscheint „→ then“ (z. B. 52 → 16) */
  then?: number
  label: string
  sublabel: string
  /** Start-Verzögerung in ms (für Stagger) */
  delay?: number
}

function easeOutQuad(t: number) {
  return 1 - (1 - t) * (1 - t)
}

export function StatCounter({
  to,
  suffix = '',
  then,
  label,
  sublabel,
  delay = 0,
}: StatCounterProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2)
  const reduced = useReducedMotion()
  const [value, setValue] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setValue(to)
      setDone(true)
      return
    }

    let rafId = 0
    let start = 0
    const duration = 1500

    const tick = (now: number) => {
      if (!start) start = now
      const t = Math.min((now - start - delay) / duration, 1)
      if (t < 0) {
        rafId = requestAnimationFrame(tick)
        return
      }
      setValue(Math.round(easeOutQuad(t) * to))
      if (t < 1) {
        rafId = requestAnimationFrame(tick)
      } else {
        setDone(true)
      }
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [inView, reduced, to, delay])

  return (
    <div ref={ref} className="text-center">
      <p className="font-heading text-h1 font-bold text-white">
        {value}
        {suffix}
        {then !== undefined && (
          <span
            className="transition-opacity duration-500"
            style={{ opacity: done ? 1 : 0 }}
          >
            {' '}
            → {then}
          </span>
        )}
      </p>
      <p className="mt-2 text-body font-medium text-navy-100">{label}</p>
      <p className="mt-1 text-caption text-navy-200">{sublabel}</p>
    </div>
  )
}
