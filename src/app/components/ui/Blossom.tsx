import { CSSProperties } from 'react'

export const PETAL_PATH = 'M0 0 C -12 -12 -12 -34 -4 -40 L 0 -34 L 4 -40 C 12 -34 12 -12 0 0 Z'

export const UME_PETAL_PATH = 'M0 0 C -15 -4 -17 -30 0 -32 C 17 -30 15 -4 0 0 Z'

export const KIKU_PETAL_PATH = 'M0 0 C -5 -14 -5 -36 0 -42 C 5 -36 5 -14 0 0 Z'

type Point = [number, number]
type Segment = [string, ...Point[]]

function rotatePoint([x, y]: Point, degrees: number): Point {
  const radians = (degrees * Math.PI) / 180
  const cos = Math.cos(radians)
  const sin = Math.sin(radians)
  return [x * cos - y * sin, x * sin + y * cos]
}

function format([x, y]: Point) {
  return `${x.toFixed(2)} ${y.toFixed(2)}`
}

function continuousFlower(count: number, base: number, petal: (baseX: number, baseY: number) => Segment[]) {
  const baseX = base * Math.sin(Math.PI / count)
  const baseY = -base * Math.cos(Math.PI / count)
  return (
    Array.from({ length: count }, (_, i) => {
      const angle = (i * 360) / count
      const r = (point: Point) => format(rotatePoint(point, angle))
      return [
        i === 0 ? `M ${r([-baseX, baseY])}` : '',
        ...petal(baseX, baseY).map(([command, ...points]) => `${command} ${points.map(r).join(' ')}`),
      ].join(' ')
    }).join(' ') + ' Z'
  )
}

function roundFlower(count: number, distance: number, radius: number) {
  const centers = Array.from({ length: count }, (_, i) => rotatePoint([0, -distance], (i * 360) / count))
  const outer = (a: Point, b: Point): Point => {
    const [mx, my] = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
    const [dx, dy] = [b[0] - a[0], b[1] - a[1]]
    const length = Math.hypot(dx, dy)
    const h = Math.sqrt(radius * radius - (length / 2) ** 2)
    const first: Point = [mx - (dy / length) * h, my + (dx / length) * h]
    const second: Point = [mx + (dy / length) * h, my - (dx / length) * h]
    return Math.hypot(...first) > Math.hypot(...second) ? first : second
  }
  const points = centers.map((center, i) => outer(center, centers[(i + 1) % count]))
  return `M ${format(points[count - 1])} ` + points.map((point) => `A ${radius} ${radius} 0 1 1 ${format(point)}`).join(' ') + ' Z'
}

export const FLOWER_PATH = continuousFlower(5, 9, (bx, by) => [
  ['C', [-16, -14], [-12, -34], [-4, -40]],
  ['L', [0, -34]],
  ['L', [4, -40]],
  ['C', [12, -34], [16, -14], [bx, by]],
])

export const UME_PATH = roundFlower(5, 22, 17)

export const KIKU_PATH = continuousFlower(16, 14, (bx, by) => [
  ['C', [-4.5, -22], [-4, -37], [0, -40]],
  ['C', [4, -37], [4.5, -22], [bx, by]],
])

export const LOTUS_PATH = continuousFlower(5, 9, (bx, by) => [
  ['C', [-15, -14], [-9, -30], [0, -42]],
  ['C', [9, -30], [15, -14], [bx, by]],
])

export function Blossom({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="-46 -46 92 92" className={className} style={style} fill="none" aria-hidden>
      <path d={FLOWER_PATH} stroke="var(--yellow)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      <circle r="5" stroke="var(--primary)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

const PEEKING = [
  { className: '-top-12 -right-10 w-28 h-28', rotate: 12 },
  { className: '-top-7 right-20 w-12 h-12', rotate: -24 },
  { className: '-bottom-10 -left-12 w-24 h-24', rotate: -10 },
  { className: 'bottom-20 -left-9 w-12 h-12', rotate: 30 },
]

export function PeekingBlossoms() {
  return (
    <>
      {PEEKING.map((blossom, i) => (
        <Blossom
          key={i}
          className={`pointer-events-none absolute ${blossom.className}`}
          style={{ transform: `rotate(${blossom.rotate}deg)` }}
        />
      ))}
    </>
  )
}
