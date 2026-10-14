'use client'

import React from 'react'
import { Languages, Loader2, Sparkles } from 'lucide-react'
import { useTranslation, Language } from '@/app/context/TranslationContext'

interface LanguageToggleProps {
  className?: string
  showLabel?: boolean
}

export default function LanguageToggle({ className = '', showLabel = true }: LanguageToggleProps) {
  const { lang, setLang, isTranslating } = useTranslation()

  return (
    <div
      className={`inline-flex items-center gap-1.5 p-1 bg-accent/60 backdrop-blur-md border border-border/60 rounded-full shadow-sm ${className}`}
      title="Changer la langue du contenu (Français / Anglais)"
    >
      <div className="flex items-center pl-2 pr-1 text-primary/80">
        {isTranslating ? (
          <Loader2 size={16} className="animate-spin text-primary" />
        ) : (
          <Languages size={16} className="text-primary" />
        )}
      </div>

      {showLabel && (
        <span className="text-xs font-semibold text-text/50 hidden sm:inline mr-1">
          Langue :
        </span>
      )}

      <div className="flex items-center bg-background/50 rounded-full p-0.5 border border-border/40">
        <button
          type="button"
          onClick={() => setLang('fr')}
          className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1 ${
            lang === 'fr'
              ? 'bg-primary text-primary-content shadow-sm scale-100'
              : 'text-text/60 hover:text-text hover:bg-accent/40'
          }`}
        >
          <span>🇫🇷</span>
          <span>FR</span>
        </button>

        <button
          type="button"
          onClick={() => setLang('en')}
          className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1 ${
            lang === 'en'
              ? 'bg-primary text-primary-content shadow-sm scale-100'
              : 'text-text/60 hover:text-text hover:bg-accent/40'
          }`}
        >
          <span>🇬🇧</span>
          <span>EN</span>
        </button>
      </div>

      {isTranslating && (
        <span className="text-[11px] text-primary animate-pulse font-medium pr-2 hidden md:inline flex items-center gap-1">
          <Sparkles size={12} /> Traduction...
        </span>
      )}
    </div>
  )
}
