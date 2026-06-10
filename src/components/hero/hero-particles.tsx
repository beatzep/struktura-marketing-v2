'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  /** Snapshot-Position beim Snap-Start */
  sx: number
  sy: number
  /** Ziel-Position im Grid */
  tx: number
  ty: number
  /** Zufälliger Phasenversatz fürs Pulsieren */
  pulse: number
}

const NAVY = '11, 61, 145' // navy-600
const LINE = '139, 179, 243' // navy-200
const SNAP_DURATION = 800
const SNAP_AUTO_DELAY = 2500
const CONNECT_DIST = 80

function gridConfig(width: number) {
  if (width >= 1024) return { cols: 16, rows: 12, spacing: 32, centerY: 0.3 } // 192 ≈ 200
  if (width >= 640) return { cols: 12, rows: 10, spacing: 32, centerY: 0.3 } // 120
  return { cols: 12, rows: 5, spacing: 28, centerY: 0.2 } // 60
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

/**
 * Hero-Effekt: ~200 Punkte schweben chaotisch, snappen nach 2,5s
 * (oder beim ersten Scroll) gleichzeitig in ein perfektes Grid.
 * Chaos → Struktur. Das ist die Marke.
 */
export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: Particle[] = []
    let phase: 'chaos' | 'snap' | 'grid' = reduced ? 'grid' : 'chaos'
    let snapStart = 0
    let rafId = 0
    let width = 0
    let height = 0

    const setTargets = () => {
      const { cols, rows, spacing, centerY } = gridConfig(width)
      const offsetX = (width - (cols - 1) * spacing) / 2
      // Grid-Zentrum im oberen Drittel — der Claim sitzt darunter
      const offsetY = height * centerY - ((rows - 1) * spacing) / 2
      particles.forEach((p, i) => {
        p.tx = offsetX + (i % cols) * spacing
        p.ty = offsetY + Math.floor(i / cols) * spacing
      })
    }

    const init = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const { cols, rows } = gridConfig(width)
      const count = cols * rows
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: 2 + Math.random(),
        sx: 0,
        sy: 0,
        tx: 0,
        ty: 0,
        pulse: Math.random() * Math.PI * 2,
      }))
      setTargets()

      if (phase === 'grid') {
        particles.forEach((p) => {
          p.x = p.tx
          p.y = p.ty
        })
      }
    }

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = `rgba(${NAVY}, 0.5)`
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.tx, p.ty, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const triggerSnap = () => {
      if (phase !== 'chaos') return
      phase = 'snap'
      snapStart = performance.now()
      particles.forEach((p) => {
        p.sx = p.x
        p.sy = p.y
      })
    }

    const drawConnections = (lineAlpha: number) => {
      if (lineAlpha <= 0) return
      ctx.lineWidth = 0.5
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          if (dx * dx + dy * dy < CONNECT_DIST * CONNECT_DIST) {
            ctx.strokeStyle = `rgba(${LINE}, ${0.08 * lineAlpha})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
    }

    const frame = (now: number) => {
      ctx.clearRect(0, 0, width, height)

      if (phase === 'chaos') {
        for (const p of particles) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > width) p.vx *= -1
          if (p.y < 0 || p.y > height) p.vy *= -1
        }
        drawConnections(1)
        ctx.fillStyle = `rgba(${NAVY}, 0.25)`
        for (const p of particles) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fill()
        }
      } else if (phase === 'snap') {
        const t = Math.min((now - snapStart) / SNAP_DURATION, 1)
        const e = easeInOutCubic(t)
        drawConnections(1 - t)
        ctx.fillStyle = `rgba(${NAVY}, ${0.25 + 0.25 * t})`
        for (const p of particles) {
          p.x = p.sx + (p.tx - p.sx) * e
          p.y = p.sy + (p.ty - p.sy) * e
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fill()
        }
        if (t >= 1) phase = 'grid'
      } else {
        // Statisches Grid mit subtilem Puls (scale 0.9 → 1.1, 3s)
        ctx.fillStyle = `rgba(${NAVY}, 0.5)`
        for (const p of particles) {
          const scale = 1 + 0.1 * Math.sin((now / 3000) * Math.PI * 2 + p.pulse)
          ctx.beginPath()
          ctx.arc(p.tx, p.ty, p.r * scale, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      rafId = requestAnimationFrame(frame)
    }

    const onScroll = () => {
      if (window.scrollY > 20) triggerSnap()
    }
    const onResize = () => {
      init()
      if (reduced) drawStatic()
    }

    init()
    window.addEventListener('resize', onResize)

    let snapTimer: ReturnType<typeof setTimeout> | undefined
    if (reduced) {
      drawStatic()
    } else {
      window.addEventListener('scroll', onScroll, { passive: true })
      snapTimer = setTimeout(triggerSnap, SNAP_AUTO_DELAY)
      rafId = requestAnimationFrame(frame)
    }

    return () => {
      cancelAnimationFrame(rafId)
      if (snapTimer) clearTimeout(snapTimer)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [reduced])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 h-full w-full"
    />
  )
}
