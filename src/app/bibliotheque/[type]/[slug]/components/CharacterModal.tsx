import { MangaCharacter } from '@/app/types/catalog'
import { GroupedAnimeCharacter } from './CharacterPage'
import { useEffect } from 'react'
import Image from 'next/image'
import CharacterDescription from './CharacterDescription'
import { useTranslation } from '@/app/context/TranslationContext'
import { X } from 'lucide-react'

type CharacterModalProps =
  | { isOpen: boolean; onClose: () => void; type: 'anime'; item: GroupedAnimeCharacter }
  | { isOpen: boolean; onClose: () => void; type: 'manga'; item: MangaCharacter }

export default function CharacterModal({ isOpen, onClose, type, item }: CharacterModalProps) {
  const { lang, translateTerm } = useTranslation()

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

  if (isOpen === false) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative bg-base-100 w-11/12 max-w-2xl rounded-xl shadow-2xl overflow-auto border border-border flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 z-10 btn btn-sm btn-circle btn-ghost"
          onClick={onClose}
          aria-label="Fermer"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 p-5">
          <div className="sm:col-span-2 flex justify-center shrink-0">
            <div className="relative w-40 sm:w-full aspect-2/3 rounded-card overflow-hidden shrink-0 shadow-md">
              <Image
                src={item.character.imageUrl || '/logo.png'}
                alt={item.character.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="sm:col-span-4 flex flex-col gap-3 min-w-0">
            <div className="flex items-center gap-2 flex-wrap pr-8">
              <p className="font-semibold text-lg text-text">{item.character.name}</p>
              {item.role && (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/25 font-medium">
                  {translateTerm(item.role)}
                </span>
              )}
            </div>

            <CharacterDescription text={item.character.description} />

            {type === 'anime' && item.persons.length > 0 && (
              <div className="flex flex-col gap-2 mt-2 pt-3 border-t border-border">
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                  {lang === 'fr' ? 'Acteurs de doublage (Seiyū)' : 'Voice Actors'}
                </p>
                <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-1">
                  {item.persons.map((person) => (
                    <div key={person.id} className="flex items-center gap-3 bg-accent/70 hover:bg-accent rounded-card overflow-hidden p-1.5 transition-colors">
                      {person.imageUrl ? (
                        <div className="relative w-9 h-12 rounded overflow-hidden bg-primary shrink-0">
                          <Image
                            src={person.imageUrl}
                            alt={person.name}
                            fill
                            sizes="36px"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-9 h-12 rounded bg-primary/20 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-primary">{person.name.charAt(0)}</span>
                        </div>
                      )}
                      <p className="text-sm font-medium">{person.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
