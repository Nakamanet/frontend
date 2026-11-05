import { HTMLAttributes } from 'react'

type CardVariant = 'default' | 'compact'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** default = p-6, fiches détaillées (profil, œuvre) · compact = p-4, listes denses (forum, posts) */
  variant?: CardVariant
}

const variantClasses: Record<CardVariant, string> = {
  default: 'p-6',
  compact: 'p-4',
}

export default function Card({ variant = 'default', className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`border border-border bg-accent rounded-card ${variantClasses[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  )
}
