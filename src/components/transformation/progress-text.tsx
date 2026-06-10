'use client'

interface ProgressTextProps {
  progress: number
}

function clamp01(v: number) {
  return Math.min(Math.max(v, 0), 1)
}

export function ProgressText({ progress }: ProgressTextProps) {
  // Crossfade um Progress 0.5
  const vorherOpacity = clamp01(1 - (progress - 0.4) / 0.1)
  const nachherOpacity = clamp01((progress - 0.5) / 0.1)

  return (
    <div className="flex items-stretch gap-8">
      {/* Progress-Indicator: Linie mit wanderndem Punkt */}
      <div className="relative hidden w-px self-stretch bg-navy-200 lg:block">
        <div
          className="absolute -left-[3.5px] h-2 w-2 rounded-full bg-navy-600"
          style={{ top: `${progress * 100}%` }}
        />
      </div>

      <div className="grid">
        {/* VORHER */}
        <div
          className="col-start-1 row-start-1"
          style={{ opacity: vorherOpacity }}
          aria-hidden={vorherOpacity === 0}
        >
          <p className="overline-label text-navy-400">Vorher</p>
          <h3 className="mt-4 font-heading text-h2 font-bold text-ink">
            Verstreut. Manuell.
            <br />
            Fehleranfällig.
          </h3>
          <p className="mt-5 max-w-[420px] text-body text-ink">
            Informationen liegen in Köpfen, Listen und Postfächern — niemand
            sieht das große Ganze.
          </p>
        </div>

        {/* NACHHER */}
        <div
          className="col-start-1 row-start-1"
          style={{ opacity: nachherOpacity }}
          aria-hidden={nachherOpacity === 0}
        >
          <p className="overline-label text-navy-400">Nachher</p>
          <h3 className="mt-4 font-heading text-h2 font-bold text-ink">
            Strukturiert. Automatisch.
            <br />
            Nachvollziehbar.
          </h3>
          <p className="mt-5 max-w-[420px] text-body text-ink">
            Ein System, ein Status, eine Wahrheit. Jede Änderung dokumentiert.
          </p>
          <p className="mt-6 text-body font-medium text-ink">
            ✓ Echtzeit-Überblick
          </p>
        </div>
      </div>
    </div>
  )
}
