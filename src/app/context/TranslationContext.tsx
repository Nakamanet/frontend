'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import api from '@/app/lib/axios'

export type Language = 'fr' | 'en'

interface TranslationContextType {
  lang: Language
  setLang: (lang: Language) => void
  translateText: (text: string | null | undefined) => Promise<string>
  translateBatch: (texts: Record<string, string>) => Promise<Record<string, string>>
  translateTerm: (term: string | null | undefined) => string
  isTranslating: boolean
}

const TranslationContext = createContext<TranslationContextType | null>(null)

// Instant dictionary for high-frequency anime/manga terms
const FR_DICTIONARY: Record<string, string> = {
  // Roles
  'main': 'Principal',
  'Main': 'Principal',
  'supporting': 'Secondaire',
  'Supporting': 'Secondaire',

  // Subtypes
  'tv': 'Série TV',
  'TV': 'Série TV',
  'movie': 'Film',
  'Movie': 'Film',
  'ova': 'OAV',
  'OVA': 'OAV',
  'ona': 'ONA',
  'ONA': 'ONA',
  'special': 'Spécial',
  'Special': 'Spécial',
  'music': 'Clip musical',
  'manga': 'Manga',
  'Manga': 'Manga',
  'novel': 'Roman',
  'Novel': 'Roman',
  'one_shot': 'One-shot',
  'one-shot': 'One-shot',
  'doujin': 'Doujinshi',
  'Doujin': 'Doujinshi',
  'manhwa': 'Manhwa',
  'Manhwa': 'Manhwa',
  'manhua': 'Manhua',
  'Manhua': 'Manhua',
  'light_novel': 'Light Novel',
  'Light Novel': 'Light Novel',

  // Statuses
  'finish': 'Terminé',
  'finished': 'Terminé',
  'ongoing': 'En cours',
  'tba': 'Date à venir',
  'upcoming': 'À venir',
  'unreleased': 'Non sorti',
  'cancelled': 'Annulé',
  'hiatus': 'En pause',

  // Common Staff roles
  'Original Creator': 'Créateur original',
  'Story & Art': 'Scénario & Dessin',
  'Story': 'Scénario',
  'Art': 'Dessin',
  'Director': 'Réalisateur',
  'Co-Director': 'Co-réalisateur',
  'Assistant Director': 'Assistant réalisateur',
  'Series Composition': 'Composition de la série',
  'Character Design': 'Character Design',
  'Music': 'Musique',
  'Sound Director': 'Directeur du son',
  'Sound Effects': 'Effets sonores',
  'Producer': 'Producteur',
  'Executive Producer': 'Producteur exécutif',
  'Animation Director': "Directeur de l'animation",
  'Chief Animation Director': "Directeur en chef de l'animation",
  'Art Director': 'Directeur artistique',
  'Editing': 'Montage',
  'Key Animation': 'Animation clé',
  'In-Between Animation': 'Animation intermédiaire',
  'Background Art': 'Décors',
  'Color Design': 'Colorisation & Design',
  'Director of Photography': 'Directeur de la photographie',
  'Script': 'Scénario',
  'Screenplay': 'Scénario',
  'Planning': 'Planification',
  'Theme Song Performance': 'Interprète du générique',
  'Theme Song Arrangement': 'Arrangement du générique',
  'Theme Song Composition': 'Composition du générique',
  'Theme Song Lyrics': 'Paroles du générique',
  'Insert Song Performance': "Chanson d'insertion",
  'Mechanical Design': 'Design mécanique',
  'Prop Design': 'Design des accessoires',
  'CGI Director': 'Directeur 3D / CGI',
  'Original Story': 'Histoire originale',
  'Production': 'Production',
  'Studio': 'Studio',
  'Publisher': 'Éditeur',
  'Serialization': 'Prépublication',

  // Common Genres & Categories
  'Action': 'Action',
  'Adventure': 'Aventure',
  'Comedy': 'Comédie',
  'Drama': 'Drame',
  'Fantasy': 'Fantastique',
  'Horror': 'Horreur',
  'Mystery': 'Mystère',
  'Psychological': 'Psychologique',
  'Romance': 'Romance',
  'Sci-Fi': 'Science-Fiction',
  'Slice of Life': 'Tranche de vie',
  'Supernatural': 'Surnaturel',
  'Thriller': 'Thriller',
  'Suspense': 'Suspense',
  'Historical': 'Historique',
  'Martial Arts': 'Arts martiaux',
  'Mecha': 'Mecha',
  'Military': 'Militaire',
  'Police': 'Policier',
  'Detective': 'Détective',
  'School': 'Scolaire',
  'Space': 'Espace',
  'Sports': 'Sport',
  'Super Power': 'Super-pouvoirs',
  'Vampire': 'Vampire',
  'Demons': 'Démons',
  'Magic': 'Magie',
  'Parody': 'Parodie',
  'Shounen': 'Shōnen',
  'Shoujo': 'Shōjo',
  'Seinen': 'Seinen',
  'Josei': 'Josei',
  'Kids': 'Jeunesse',
  'Gourmet': 'Gastronomie',
  'Work Life': 'Vie active',
  'Mythology': 'Mythologie',
  'Urban Fantasy': 'Fantastique urbain',
  'Time Travel': 'Voyage dans le temps',
  'Reincarnation': 'Réincarnation',
  'Cyberpunk': 'Cyberpunk',
  'Post-Apocalyptic': 'Post-apocalyptique',
  'Survival': 'Survie',
  'Gore': 'Gore',
  'Isekai': 'Isekai',
  'Game': 'Jeu',
  'Samurai': 'Samouraï',
  'Space Opera': 'Opéra spatial',
}

const EN_DICTIONARY: Record<string, string> = {
  'finish': 'Finished',
  'finished': 'Finished',
  'ongoing': 'Ongoing',
  'tba': 'TBA',
  'upcoming': 'Upcoming',
  'unreleased': 'Unreleased',
  'cancelled': 'Cancelled',
  'hiatus': 'On Hiatus',
}

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('fr')
  const [isTranslating, setIsTranslating] = useState(false)
  const memoryCache = useRef<Map<string, string>>(new Map())

  // Load user language preference from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('nakamanet_lang_preference') as Language | null
      if (saved === 'en' || saved === 'fr') {
        setLangState(saved)
      } else {
        // Default to French as project standard
        setLangState('fr')
      }
    } catch {
      setLangState('fr')
    }
  }, [])

  const setLang = (newLang: Language) => {
    setLangState(newLang)
    try {
      localStorage.setItem('nakamanet_lang_preference', newLang)
    } catch {}
  }

  // Instant dictionary translation (0ms)
  const translateTerm = useCallback((term: string | null | undefined): string => {
    if (!term) return ''
    const trimmed = term.trim()
    if (lang === 'en') {
      return EN_DICTIONARY[trimmed.toLowerCase()] || trimmed
    }
    return FR_DICTIONARY[trimmed] || FR_DICTIONARY[trimmed.toLowerCase()] || trimmed
  }, [lang])

  // Dynamic text translation via backend API
  const translateText = useCallback(async (text: string | null | undefined): Promise<string> => {
    if (!text || !text.trim()) return ''
    if (lang === 'en') return text

    const key = `fr_${text.trim()}`
    if (memoryCache.current.has(key)) {
      return memoryCache.current.get(key)!
    }

    // Check sessionStorage
    try {
      const cached = sessionStorage.getItem(`trans_${key}`)
      if (cached) {
        memoryCache.current.set(key, cached)
        return cached
      }
    } catch {}

    try {
      setIsTranslating(true)
      const { data } = await api.post('/translate', {
        text,
        target: 'fr',
        source: 'en',
      })

      const translated = data.translatedText || text
      memoryCache.current.set(key, translated)
      try {
        sessionStorage.setItem(`trans_${key}`, translated)
      } catch {}
      return translated
    } catch {
      return text
    } finally {
      setIsTranslating(false)
    }
  }, [lang])

  // Batch translation
  const translateBatch = useCallback(async (texts: Record<string, string>): Promise<Record<string, string>> => {
    if (lang === 'en') return texts

    const results: Record<string, string> = {}
    const toFetch: Record<string, string> = {}

    for (const [key, text] of Object.entries(texts)) {
      if (!text || !text.trim()) {
        results[key] = text
        continue
      }
      const cacheKey = `fr_${text.trim()}`
      if (memoryCache.current.has(cacheKey)) {
        results[key] = memoryCache.current.get(cacheKey)!
      } else {
        toFetch[key] = text
      }
    }

    if (Object.keys(toFetch).length === 0) {
      return results
    }

    try {
      setIsTranslating(true)
      const { data } = await api.post('/translate', {
        texts: toFetch,
        target: 'fr',
        source: 'en',
      })

      const translatedResults = data.results || toFetch
      for (const [k, translated] of Object.entries(translatedResults)) {
        const original = toFetch[k]
        if (original && typeof translated === 'string') {
          memoryCache.current.set(`fr_${original.trim()}`, translated)
          results[k] = translated
        }
      }
    } catch {
      Object.assign(results, toFetch)
    } finally {
      setIsTranslating(false)
    }

    return results
  }, [lang])

  return (
    <TranslationContext.Provider
      value={{
        lang,
        setLang,
        translateText,
        translateBatch,
        translateTerm,
        isTranslating,
      }}
    >
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }
  return context
}
