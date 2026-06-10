'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Beobachtet ein Element und liefert `true`, sobald es zum ersten Mal
 * den Schwellwert im Viewport erreicht (one-shot, Observer wird getrennt).
 */
export function useInView<T extends HTMLElement | SVGSVGElement>(
  threshold = 0.15
) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}
