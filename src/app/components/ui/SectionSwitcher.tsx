import { ReactNode } from 'react'

interface SectionSwitcherItem {
  id: string
  label: string
  icon?: ReactNode
}

interface SectionSwitcherProps {
  items: SectionSwitcherItem[]
  active: string
  onChange: (id: string) => void
  /** false = pas de boîte englobante (ex. chat, groupé par catégorie à l'extérieur du composant) */
  bordered?: boolean
  className?: string
}

export default function SectionSwitcher({
  items,
  active,
  onChange,
  bordered = true,
  className = '',
}: SectionSwitcherProps) {
  return (
    <nav className={`${bordered ? 'border border-border bg-accent rounded-card px-5 py-2' : ''} ${className}`.trim()}>
      <ul className="flex flex-col gap-1">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => onChange(item.id)}
              className={`w-full flex items-center gap-2 rounded-full px-5 py-1.5 text-sm font-medium text-left transition-colors ${
                active === item.id ? 'bg-primary text-primary-content' : 'text-text-muted hover:text-text'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
