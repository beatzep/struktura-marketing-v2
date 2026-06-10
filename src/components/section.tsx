import { BlueprintGrid } from './blueprint-grid'

interface SectionProps {
  id: string
  children: React.ReactNode
  className?: string
  withGrid?: boolean
  gridStrength?: number
  background?: 'white' | 'navy'
}

const BACKGROUNDS = {
  white: 'bg-white',
  navy: 'bg-navy-600',
} as const

export function Section({
  id,
  children,
  className = '',
  withGrid = false,
  gridStrength,
  background = 'white',
}: SectionProps) {
  return (
    <section
      id={id}
      className={`section overflow-hidden ${BACKGROUNDS[background]} ${className}`}
    >
      {withGrid && (
        <BlueprintGrid strength={gridStrength} dark={background === 'navy'} />
      )}
      <div className="relative z-10 mx-auto w-full max-w-content px-6 md:px-10">
        {children}
      </div>
    </section>
  )
}
