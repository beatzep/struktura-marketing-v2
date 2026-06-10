interface ModuleCardProps {
  title: string
  description: string
  features: readonly string[]
  gradient: string
}

export function ModuleCard({
  title,
  description,
  features,
  gradient,
}: ModuleCardProps) {
  return (
    <div className="group relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-lg border-[0.5px] border-sand-300 bg-white p-8 transition-transform duration-[400ms] [transition-timing-function:steps(4,end)] hover:-translate-y-1.5">
      {/* Gradient-Hintergrund, erscheint beim Hover */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
      />

      <div className="relative">
        <h3 className="font-heading text-h3 font-bold text-ink">{title}</h3>
        <p className="mt-3 text-body text-ink">{description}</p>
      </div>

      <div className="relative">
        <div className="mt-6 flex flex-wrap gap-2">
          {features.map((feature, i) => (
            <span
              key={feature}
              className="rounded-sm bg-navy-50 px-3 py-1 text-caption text-navy-600 opacity-0 transition-opacity duration-200 [transition-timing-function:steps(3,end)] group-hover:opacity-100"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {feature}
            </span>
          ))}
        </div>
        <p className="mt-4 text-caption font-medium text-navy-600">
          Mehr erfahren →
        </p>
      </div>
    </div>
  )
}
