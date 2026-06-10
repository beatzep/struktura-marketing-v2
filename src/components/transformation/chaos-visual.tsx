'use client'

/**
 * SVG-Morph: 15 verstreute, gedrehte Rechtecke ordnen sich beim Scrollen
 * zu einer Datentabelle (5 Zeilen × 3 Spalten).
 * progress: 0 = Chaos, 1 = Tabelle (Mapping 0.3–0.7 für den Morph).
 */

interface ChaosVisualProps {
  progress: number
}

// Chaos-Zustand: Position, Größe, Rotation, Farbindex
const CHAOS = [
  { x: 30, y: 26, w: 72, h: 30, rot: -4, c: 0 },
  { x: 128, y: 14, w: 56, h: 40, rot: 3, c: 1 },
  { x: 226, y: 38, w: 88, h: 24, rot: -2, c: 2 },
  { x: 322, y: 20, w: 50, h: 34, rot: 5, c: 0 },
  { x: 58, y: 92, w: 94, h: 28, rot: 2, c: 1 },
  { x: 178, y: 78, w: 62, h: 38, rot: -5, c: 2 },
  { x: 288, y: 102, w: 76, h: 26, rot: 1, c: 0 },
  { x: 18, y: 158, w: 58, h: 36, rot: 4, c: 2 },
  { x: 132, y: 148, w: 84, h: 24, rot: -3, c: 0 },
  { x: 248, y: 168, w: 66, h: 32, rot: 2, c: 1 },
  { x: 336, y: 148, w: 48, h: 28, rot: -4, c: 2 },
  { x: 48, y: 228, w: 78, h: 26, rot: 3, c: 1 },
  { x: 158, y: 218, w: 60, h: 38, rot: -2, c: 0 },
  { x: 266, y: 238, w: 86, h: 24, rot: 5, c: 2 },
  { x: 348, y: 212, w: 44, h: 32, rot: -3, c: 1 },
] as const

const CHAOS_COLORS: [number, number, number][] = [
  [197, 217, 249], // navy-100
  [139, 179, 243], // navy-200
  [238, 238, 230], // sand-200
]
const TARGET_COLOR: [number, number, number] = [232, 240, 254] // navy-50

// Tabellen-Geometrie
const COL_X = [24, 144, 264]
const ROW_Y = [48, 94, 140, 186, 232]
const CELL_W = 112
const CELL_H = 36

const TABLE_ROWS = [
  ['01', 'Müller', '✓ Fertig'],
  ['02', 'Schmidt', '○ Offen'],
  ['03', 'Weber', '✓ Fertig'],
  ['04', 'Becker', '○ Offen'],
  ['05', 'Krause', '✓ Fertig'],
] as const

function clamp01(v: number) {
  return Math.min(Math.max(v, 0), 1)
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function lerpColor(a: [number, number, number], b: [number, number, number], t: number) {
  return `rgb(${Math.round(lerp(a[0], b[0], t))}, ${Math.round(
    lerp(a[1], b[1], t)
  )}, ${Math.round(lerp(a[2], b[2], t))})`
}

export function ChaosVisual({ progress }: ChaosVisualProps) {
  // Morph läuft zwischen Progress 0.3 und 0.7
  const t = easeInOutCubic(clamp01((progress - 0.3) / 0.4))
  // Tabellen-Beschriftung faded zwischen 0.7 und 1.0 ein
  const labelOpacity = clamp01((progress - 0.7) / 0.3)

  return (
    <svg
      viewBox="0 0 400 300"
      className="h-auto w-full"
      role="img"
      aria-label="Visualisierung: verstreute Elemente ordnen sich zu einer strukturierten Tabelle"
    >
      {/* Tabellen-Kopf */}
      <g
        opacity={labelOpacity}
        fontSize="10"
        fontWeight="700"
        fill="#3D74CC"
        style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}
      >
        <text x={COL_X[0] + 10} y={38}>
          Nr
        </text>
        <text x={COL_X[1] + 10} y={38}>
          Name
        </text>
        <text x={COL_X[2] + 10} y={38}>
          Status
        </text>
      </g>

      {/* Zellen */}
      {CHAOS.map((item, i) => {
        const col = i % 3
        const row = Math.floor(i / 3)
        const x = lerp(item.x, COL_X[col], t)
        const y = lerp(item.y, ROW_Y[row], t)
        const w = lerp(item.w, CELL_W, t)
        const h = lerp(item.h, CELL_H, t)
        const rot = lerp(item.rot, 0, t)

        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={w}
              height={h}
              rx={4}
              fill={lerpColor(CHAOS_COLORS[item.c], TARGET_COLOR, t)}
              stroke="#8BB3F3"
              strokeWidth={0.5}
              strokeOpacity={t * 0.9}
              transform={`rotate(${rot} ${x + w / 2} ${y + h / 2})`}
            />
            <text
              x={COL_X[col] + 10}
              y={ROW_Y[row] + 23}
              fontSize="11"
              fill={col === 0 ? '#3D74CC' : '#041C44'}
              opacity={labelOpacity}
            >
              {TABLE_ROWS[row][col]}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
