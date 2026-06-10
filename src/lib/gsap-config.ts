import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

/** Registriert ScrollTrigger genau einmal (nur im Browser aufrufen). */
export function setupGsap() {
  if (!registered && typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
    registered = true
  }
  return { gsap, ScrollTrigger }
}
