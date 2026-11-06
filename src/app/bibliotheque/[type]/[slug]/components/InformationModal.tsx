'use client'

import { ChevronDown, X } from 'lucide-react'
import { useEffect } from 'react'
import { Anime, Manga, Genre, Category, Production, AnimeStaff, MangaStaff, Person } from '@/app/types/catalog'
import { useTranslation } from '@/app/context/TranslationContext'
import { DUB_LANGUAGES, dubLanguageLabel } from '@/app/lib/dubLanguages'
import DubFlag from './DubFlag'

const VOICE_ACTOR_ROLE = 'Voice Actor'

type VoiceActorGroup = { language: string | null; people: Person[] }

function groupVoiceActors(voiceActors: AnimeStaff[]): VoiceActorGroup[] {
  const groups = new Map<string | null, Map<number, Person>>()
  for (const staff of voiceActors) {
    const language = staff.language ?? null
    if (!groups.has(language)) groups.set(language, new Map())
    groups.get(language)!.set(staff.person.id, staff.person)
  }

  return [...groups.entries()]
    .map(([language, people]) => ({
      language,
      people: [...people.values()].sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .sort((a, b) => {
      if (a.language === 'Japanese') return -1
      if (b.language === 'Japanese') return 1
      if (a.language === null) return 1
      if (b.language === null) return -1
      return b.people.length - a.people.length
    })
}

type InformationModalProps = {
  isOpen: boolean
  onClose: () => void
  genres: Genre[]
  categories: Category[]
  productions: Production[]
  staffs: AnimeStaff[] | MangaStaff[]
  item: Anime | Manga
  type: 'anime' | 'manga'
}

export default function InformationModal({
  isOpen,
  onClose,
  genres,
  categories,
  productions,
  staffs,
  item,
  type,
}: InformationModalProps) {
  const { translateTerm } = useTranslation()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
  }, [isOpen])

  if (!isOpen) return null

  const otherStaff = (staffs as (AnimeStaff | MangaStaff)[]).filter((staff) => staff.role !== VOICE_ACTOR_ROLE)
  const voiceActorGroups = groupVoiceActors(
    (staffs as (AnimeStaff | MangaStaff)[]).filter((staff): staff is AnimeStaff => staff.role === VOICE_ACTOR_ROLE)
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-base-100 w-11/12 max-w-2xl rounded-xl shadow-2xl border border-border flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-lg">{item.titleEn || item.titleJp}</h2>
            {item.titleEn && <p className="text-sm text-base-content/70">{item.titleJp}</p>}
          </div>
          <button className="btn btn-sm btn-circle btn-ghost" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-4 flex flex-col gap-6">
          {/* Informations générales */}
          <table className="border-separate border-spacing-y-2 w-full">
            <tbody>
              <tr>
                <td className="text-base-content/60 w-1/2">Type</td>
                <td className="capitalize">{translateTerm('subtype' in item ? item.subtype : item.type)}</td>
              </tr>
              <tr>
                <td className="text-base-content/60">Status</td>
                <td>{translateTerm(item.status)}</td>
              </tr>
              <tr>
                <td className="text-base-content/60">Date de début</td>
                <td>{item.startDate ? new Date(item.startDate).toLocaleDateString('fr-FR') : 'N/A'}</td>
              </tr>
              <tr>
                <td className="text-base-content/60">Classification</td>
                <td>{item.ageRating ?? 'PG'}</td>
              </tr>
              {item.status !== 'ongoing' && (
                <tr>
                  <td className="text-base-content/60">Date de fin</td>
                  <td>{item.endDate ? new Date(item.endDate).toLocaleDateString('fr-FR') : 'N/A'}</td>
                </tr>
              )}
              {type === 'anime' && 'episodeCount' in item && (
                <>
                  <tr>
                    <td className="text-base-content/60">Nombre d&apos;épisodes</td>
                    <td>{item.episodeCount ?? 'N/A'}</td>
                  </tr>
                  <tr>
                    <td className="text-base-content/60">Longueur d&apos;un épisode</td>
                    <td>{item.episodeLength ? `${item.episodeLength} min` : 'N/A'}</td>
                  </tr>
                </>
              )}
              {type === 'manga' && 'volumeCount' in item && (
                <>
                  {item.volumeCount !== null && item.volumeCount !== 0 && (
                    <tr>
                      <td className="text-base-content/60">Nombre de tomes</td>
                      <td>{item.volumeCount}</td>
                    </tr>
                  )}
                  {item.chapterCount && (
                    <tr>
                      <td className="text-base-content/60">Nombre de chapitres</td>
                      <td>{item.chapterCount}</td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </table>

          {/* Genres */}
          {genres.length > 0 && (
            <div>
              <p className="font-semibold mb-2">Genres</p>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <span key={genre.id} className="badge badge-outline">
                    {translateTerm(genre.name)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Catégories */}
          {categories.length > 0 && (
            <div>
              <p className="font-semibold mb-2">Catégories</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <span key={category.id} className="badge badge-outline">
                    {translateTerm(category.name)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Productions (anime seulement) */}
          {type === 'anime' && productions.length > 0 && (
            <div>
              <p className="font-semibold mb-2">Productions</p>
              <table className="border-separate border-spacing-y-1 w-full">
                <tbody>
                  {productions.map((prod, index) => (
                    <tr key={`${prod.company.id}-${prod.role}-${index}`}>
                      <td className="text-base-content/60 w-1/2">{prod.company.name}</td>
                      <td>{translateTerm(prod.role)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Staff */}
          {staffs.length > 0 && (
            <div className="flex flex-col gap-3">
              <p className="font-semibold">Staff</p>
              {otherStaff.length > 0 && (
                <table className="border-separate border-spacing-y-1 w-full">
                  <tbody>
                    {otherStaff.map((staff, index) => (
                      <tr key={`${staff.person.id}-${staff.role}-${index}`}>
                        <td className="text-base-content/60 w-1/2">{staff.person.name}</td>
                        <td>{translateTerm(staff.role)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {voiceActorGroups.length > 0 && (
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Doubleurs</p>
                  {voiceActorGroups.map((group) => (
                    <details key={group.language ?? 'other'} className="group rounded-card border border-border bg-accent/40">
                      <summary className="flex items-center gap-3 px-3 py-2.5 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden">
                        {DUB_LANGUAGES[group.language ?? ''] ? (
                          <DubFlag language={group.language} />
                        ) : (
                          <span className="w-7 h-5.25 rounded-[3px] bg-primary/20 shrink-0" />
                        )}
                        <span className="font-medium">{dubLanguageLabel(group.language)}</span>
                        <span className="text-xs text-text-muted">{group.people.length}</span>
                        <ChevronDown size={16} className="ml-auto text-text-muted transition-transform group-open:rotate-180" />
                      </summary>
                      <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1 px-3 pb-3 text-sm text-base-content/80">
                        {group.people.map((person) => (
                          <li key={person.id} className="truncate">{person.name}</li>
                        ))}
                      </ul>
                    </details>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
