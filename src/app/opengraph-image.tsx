import { ImageResponse } from 'next/og'

export const alt = 'Struktura Digital — Operative Betriebssysteme für KMU'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  const dots = Array.from({ length: 8 * 4 })

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0B3D91',
          color: '#FFFFFF',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            width: 8 * 40,
            marginBottom: 48,
          }}
        >
          {dots.map((_, i) => (
            <div
              key={i}
              style={{
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: i === 19 ? '#E8593C' : '#8BB3F3',
                }}
              />
            </div>
          ))}
        </div>
        <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: 4 }}>
          STRUKTURA
        </div>
        <div style={{ fontSize: 30, color: '#C5D9F9', marginTop: 16 }}>
          Operative Betriebssysteme für KMU
        </div>
      </div>
    ),
    size
  )
}
