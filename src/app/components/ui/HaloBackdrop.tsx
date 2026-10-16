const HALO = 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(225,16,72,0.28) 0%, rgba(225,16,72,0.08) 45%, transparent 70%)'
const FADE = 'radial-gradient(closest-side, black 45%, transparent)'

export default function HaloBackdrop({
  className = 'absolute inset-0',
  solid = true,
  fade = false,
}: {
  className?: string
  solid?: boolean
  fade?: boolean
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none ${className}`}
      style={fade ? { maskImage: FADE, WebkitMaskImage: FADE } : undefined}
    >
      <div className="absolute inset-0" style={{ background: solid ? `${HALO}, #0e1520` : HALO }} />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'repeating-conic-gradient(from 0deg at 50% 50%, rgba(225,16,72,0.12) 0deg, transparent 1.5deg, transparent 9deg)',
        }}
      />
    </div>
  )
}
