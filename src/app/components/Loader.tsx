type LoaderVariant = 'box' | 'plain' | 'inline'
type LoaderSize = 'xs' | 'sm' | 'md' | 'lg'
type LoaderColor = 'primary' | 'alerts'

interface LoaderProps {
  /** box = carte bordée (accent) · plain = flex centré nu · inline = spinner seul (boutons) */
  variant?: LoaderVariant
  size?: LoaderSize
  color?: LoaderColor
  /** Classes ajoutées au wrapper (espacements, flex-1, h-full, min-h-...) */
  className?: string
}

// Classes littérales complètes : nécessaires pour que Tailwind ne les purge pas.
const sizeClasses: Record<LoaderSize, string> = {
  xs: 'loading-xs',
  sm: 'loading-sm',
  md: 'loading-md',
  lg: 'loading-lg',
}

const colorClasses: Record<LoaderColor, string> = {
  primary: 'text-primary',
  alerts: 'text-alerts',
}

const wrapperClasses: Record<Exclude<LoaderVariant, 'inline'>, string> = {
  box: 'flex justify-center items-center p-10 border border-border bg-accent rounded-[15px]',
  plain: 'flex justify-center items-center',
}

export default function Loader({
  variant = 'box',
  size = 'lg',
  color = 'primary',
  className = '',
}: LoaderProps) {
  const spinner = (
    <span className={`loading loading-spinner ${sizeClasses[size]} ${colorClasses[color]}`} />
  )

  if (variant === 'inline') return spinner

  return (
    <div className={`${wrapperClasses[variant]} ${className}`.trim()}>
      {spinner}
    </div>
  )
}
