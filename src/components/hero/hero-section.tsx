import { HeroContent } from './hero-content'
import { HeroParticles } from './hero-particles'

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16 md:pt-[72px]"
    >
      <HeroParticles />
      <HeroContent />
    </section>
  )
}
