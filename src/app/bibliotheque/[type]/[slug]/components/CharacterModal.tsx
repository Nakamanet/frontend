import { MangaCharacter } from '@/app/types/catalog'
import { GroupedAnimeCharacter } from './CharacterPage'
import { useEffect } from 'react'
import Image from 'next/image'
import CharacterDescription from './CharacterDescription'

type CharacterModalProps =
  | { isOpen: boolean; onClose: () => void; type: 'anime'; item: GroupedAnimeCharacter }
  | { isOpen: boolean; onClose: () => void; type: 'manga'; item: MangaCharacter }

export default function CharacterModal({ isOpen, onClose, type, item }: CharacterModalProps) {
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

  if (isOpen === false) return

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
        <div
            className="bg-base-100 w-11/12 max-w-2xl rounded-xl shadow-2xl overflow-auto border border-border flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="grid grid-cols-6 gap-4 p-4">
                <div className="col-span-2 flex justify-center gap-3 m-2">
                    <div className="relative w-50 h-70 rounded-card overflow-hidden shrink-0">
                        <Image
                            src={item.character.imageUrl || '/logo.png'}
                            alt={item.character.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
                <div className='col-span-4 flex flex-col gap-4'>
                    <p className="font-semibold">{item.character.name}</p>
                    <CharacterDescription text={item.character.description} />
                    {type === 'anime' && item.persons.length > 0 && (
                        <div className="flex flex-col gap-2">
                            {item.persons.map((person) => (
                                <div key={person.id} className='flex items-center gap-3 bg-accent rounded-card overflow-hidden'>
                                    {person.imageUrl && (
                                        <Image
                                            src={person.imageUrl}
                                            alt={person.name}
                                            width={40}
                                            height={60}
                                            className="shrink-0"
                                        />
                                    )}
                                    <p>{person.name}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}
