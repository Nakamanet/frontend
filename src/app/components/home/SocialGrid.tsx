import { CSSProperties } from 'react'
import { SOCIAL_LINKS } from '@/app/components/ui/SocialLinks'
import { FLOWER_PATH, PETAL_PATH } from '@/app/components/ui/Blossom'

type Choreography = 'bloom' | 'spiral' | 'wave' | 'scatter'

const CHOREOGRAPHIES: Choreography[] = ['bloom', 'spiral', 'wave', 'scatter']

type Piece = {
  kind: 'petal' | 'flower'
  left: number
  top: number
  size: number
  dx: number
  dy: number
  fromRotate: number
  toRotate: number
  duration: number
  delay: number
  sway: { duration: number; angle: number }
}

function seededRandom(seed: string) {
  let hash = [...seed].reduce((h, char) => Math.imul(h ^ char.charCodeAt(0), 16777619), 2166136261)
  hash = Math.imul(hash ^ (hash >>> 16), 0x85ebca6b)
  hash = Math.imul(hash ^ (hash >>> 13), 0xc2b2ae35)
  let state = (hash ^ (hash >>> 16)) >>> 0
  const next = () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  for (let i = 0; i < 4; i++) next()
  return next
}

function piecesFor(label: string, index: number): Piece[] {
  const random = seededRandom(label)
  const between = (min: number, max: number) => min + random() * (max - min)
  const choreography = CHOREOGRAPHIES[index % CHOREOGRAPHIES.length]
  const offset = random() * 360
  const spin = random() < 0.5 ? -1 : 1
  const petalCount = 8 + Math.floor(random() * 3)

  const place = (kind: Piece['kind'], angleDeg: number, distance: number, delay: number, turn: number): Piece => {
    const angle = (angleDeg * Math.PI) / 180
    const [cos, sin] = [Math.cos(angle), Math.sin(angle)]
    const fromRotate = angleDeg + 90 + between(-20, 20)
    return {
      kind,
      left: 50 + cos * 40,
      top: 50 + sin * 40,
      size: kind === 'petal' ? between(12, 20) : between(26, 32),
      dx: cos * distance,
      dy: sin * distance,
      fromRotate,
      toRotate: fromRotate + turn,
      duration: between(650, 900),
      delay,
      sway: { duration: between(1.6, 2.4), angle: between(8, 14) },
    }
  }

  const petals = Array.from({ length: petalCount }, (_, i) => {
    const slot = offset + (i * 360) / petalCount + between(-10, 10)
    if (choreography === 'bloom') return place('petal', slot, between(26, 32), between(0, 70), spin * between(40, 70))
    if (choreography === 'spiral') return place('petal', slot, 16 + (i / (petalCount - 1)) * 28, i * 55, spin * (60 + i * 18))
    if (choreography === 'wave') {
      const far = i % 2 === 1
      return place('petal', slot, far ? between(36, 42) : between(18, 22), far ? 170 : 0, (far ? 1 : -1) * between(50, 90))
    }
    return place('petal', slot + between(-14, 14), between(16, 44), between(0, 260), (random() < 0.5 ? -1 : 1) * between(40, 160))
  })

  const flowers = [0, 180].map((shift, i) =>
    place('flower', offset + 90 + shift + between(-15, 15), between(30, 38), 120 + i * 90, spin * between(30, 60))
  )

  return [...petals, ...flowers]
}

function pieceStyle(piece: Piece): CSSProperties {
  return {
    left: `${piece.left}%`,
    top: `${piece.top}%`,
    width: piece.size,
    height: piece.size,
    marginLeft: -piece.size / 2,
    marginTop: -piece.size / 2,
    transitionDuration: `${piece.duration}ms`,
    transitionDelay: `${piece.delay}ms`,
    ['--dx' as string]: `${piece.dx}px`,
    ['--dy' as string]: `${piece.dy}px`,
    ['--from' as string]: `${piece.fromRotate}deg`,
    ['--to' as string]: `${piece.toRotate}deg`,
  }
}

const DRIFT_CLASSES =
  'pointer-events-none absolute opacity-0 scale-50 [rotate:var(--from)] transition-all ease-out group-hover:opacity-100 group-hover:scale-100 group-hover:[translate:var(--dx)_var(--dy)] group-hover:[rotate:var(--to)] group-focus-visible:opacity-100 group-focus-visible:scale-100 group-focus-visible:[translate:var(--dx)_var(--dy)] group-focus-visible:[rotate:var(--to)]'

function PieceSvg({ piece }: { piece: Piece }) {
  const isFlower = piece.kind === 'flower'
  const swayStyle = {
    ['--sway-duration' as string]: `${piece.sway.duration}s`,
    ['--sway-angle' as string]: `${piece.sway.angle}deg`,
  } as CSSProperties

  return (
    <svg
      viewBox={isFlower ? '-46 -46 92 92' : '-14 -42 28 44'}
      aria-hidden
      className={DRIFT_CLASSES}
      style={pieceStyle(piece)}
      fill="none"
    >
      <g className="petal-sway" style={swayStyle}>
        <path
          d={isFlower ? FLOWER_PATH : PETAL_PATH}
          stroke="var(--yellow)"
          strokeWidth={isFlower ? 2 : 1.5}
          vectorEffect="non-scaling-stroke"
          strokeLinejoin="round"
        />
        {isFlower && <circle r="5" stroke="var(--primary)" strokeWidth="2" vectorEffect="non-scaling-stroke" />}
      </g>
    </svg>
  )
}

export default function SocialGrid({ className = '' }: { className?: string }) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 ${className}`}>
      {SOCIAL_LINKS.map((link, index) => (
        <a
          key={link.label}
          href={link.href}
          {...(link.href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
          className="group relative block h-full outline-none"
        >
          <div className="h-full flex flex-col items-center text-center gap-3 py-4">
            <span className="relative text-primary">
              {piecesFor(link.label, index).map((piece, i) => (
                <PieceSvg key={i} piece={piece} />
              ))}
              <span className="relative z-10 block transition-transform duration-300 group-hover:scale-110 group-focus-visible:scale-110">
                {link.icon(44)}
              </span>
            </span>
            <span className="relative z-10 font-bold text-lg transition-colors group-hover:text-primary group-focus-visible:text-primary">
              {link.label}
            </span>
          </div>
        </a>
      ))}
    </div>
  )
}
