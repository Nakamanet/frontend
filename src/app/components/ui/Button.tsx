import { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'icon'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  /** Ignoré pour variant="icon" (taille fixe). */
  size?: ButtonSize
}

const base =
  'inline-flex items-center justify-center gap-1.5 rounded-full font-bold transition-colors border disabled:cursor-not-allowed disabled:!bg-transparent disabled:!border-border disabled:!text-text-muted'

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary border-transparent text-white hover:bg-primary/85',
  secondary: 'bg-transparent border-border text-text hover:border-primary hover:bg-primary/10',
  ghost: 'bg-transparent border-transparent text-text-muted hover:text-text hover:bg-accent',
  destructive: 'bg-transparent border-primary text-primary hover:bg-primary/10',
  icon: 'bg-primary border-transparent text-white hover:bg-primary/85 w-10 h-10 !p-0 shrink-0',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3.5 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-[15px]',
  lg: 'px-8 py-3.5 text-base',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const sizing = variant === 'icon' ? '' : sizeClasses[size]

  return (
    <button
      className={`${base} ${variantClasses[variant]} ${sizing} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  )
}
