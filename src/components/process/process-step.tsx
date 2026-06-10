interface ProcessStepProps {
  number: string
  title: string
  description: string
  duration: string
}

export function ProcessStep({
  number,
  title,
  description,
  duration,
}: ProcessStepProps) {
  return (
    <div className="relative flex flex-col items-center text-center">
      <div className="step-circle relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-navy-600 bg-white text-lg font-bold text-navy-600">
        {number}
      </div>
      <h3 className="mt-5 font-heading text-h3 font-bold text-ink">
        {title}
      </h3>
      <p className="mt-3 max-w-[300px] text-body text-ink">{description}</p>
      <span className="mt-4 rounded-sm bg-navy-50 px-3 py-1 text-caption font-medium text-navy-600">
        {duration}
      </span>
    </div>
  )
}
