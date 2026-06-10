import { HeroSection } from '@/components/hero/hero-section'
import { ProblemSection } from '@/components/problem/problem-section'
import { TransformationSection } from '@/components/transformation/transformation-section'
import { ModulesSection } from '@/components/modules/modules-section'
import { TrustSection } from '@/components/trust/trust-section'
import { ProcessSection } from '@/components/process/process-section'
import { CtaSection } from '@/components/cta/cta-section'

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <TransformationSection />
      <ModulesSection />
      <TrustSection />
      <ProcessSection />
      <CtaSection />
    </>
  )
}
