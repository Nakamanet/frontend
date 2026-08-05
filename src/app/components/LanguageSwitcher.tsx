// src/app/components/LanguageSwitcher.tsx
'use client'

import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { Languages } from 'lucide-react'

const LOCALES = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
]

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()

  const switchLocale = (newLocale: string) => {
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000`
    router.refresh()
  }

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-sm gap-1.5">
        <Languages size={16} />
        {locale.toUpperCase()}
      </div>
      <ul tabIndex={-1} className="menu dropdown-content mt-2 p-1 bg-accent border border-border rounded-[10px] w-24">
        {LOCALES.map((l) => (
          <li key={l.code}>
            <button
              onClick={() => switchLocale(l.code)}
              className={locale === l.code ? 'active' : ''}
            >
              {l.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
