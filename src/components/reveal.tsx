'use client'

import { useInView } from '@/hooks/use-intersection'
import { SECTION_THRESHOLD } from '@/lib/animations'

interface RevealProps {
  children: React.ReactNode
  /** Verzögerung in ms */
  delay?: number
  className?: string
  threshold?: number
  /** Sofort animieren (für Above-the-fold Inhalte wie den Hero) */
  immediate?: boolean
}

/**
 * Stop-Motion Reveal: Element blendet per steps()-Animation ein,
 * sobald es in den Viewport kommt. Bei prefers-reduced-motion
 * sofort sichtbar (siehe globals.css).
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
  threshold = SECTION_THRESHOLD,
  immediate = false,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>(threshold)
  const visible = immediate || inView

  return (
    <div
      ref={ref}
      className={`sm-reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--sm-delay': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
