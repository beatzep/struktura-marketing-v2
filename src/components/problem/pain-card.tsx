import { Clock, MessageCircle, Table } from 'lucide-react'

const ICONS = {
  table: Table,
  'message-circle': MessageCircle,
  clock: Clock,
} as const

interface PainCardProps {
  icon: keyof typeof ICONS
  title: string
  description: string
}

export function PainCard({ icon, title, description }: PainCardProps) {
  const Icon = ICONS[icon]

  return (
    <div className="h-full rounded-lg border-[0.5px] border-sand-300 bg-white p-8 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-navy-50 text-navy-600">
        <Icon size={24} strokeWidth={1.75} />
      </div>
      <h3 className="mt-5 font-body text-h3 font-bold text-ink">{title}</h3>
      <p className="mt-3 text-body text-ink">{description}</p>
    </div>
  )
}
