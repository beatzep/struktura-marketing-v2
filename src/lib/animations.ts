import type { Variants } from 'framer-motion'

/** Abstand zwischen gestaffelten Elementen (s) */
export const STAGGER_DELAY = 0.08

/** IntersectionObserver-Schwellwert für Sektions-Reveals */
export const SECTION_THRESHOLD = 0.15

/** Fullscreen-Overlay des Mobile-Menüs */
export const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
}

export const overlayLinkVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * STAGGER_DELAY, duration: 0.3 },
  }),
}
