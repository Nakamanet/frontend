import { AnimeCharacter, MangaCharacter } from '@/app/types/catalog'
import { useEffect } from 'react'
import Image from 'next/image'

type CharacterModalProps =
  | { isOpen: boolean; onClose: () => void; type: 'anime'; item: AnimeCharacter }
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
            <div
                key={item.characterId}
                className="grid grid-cols-6 gap-4 p-4"
            >
                <div className="col-span-2 flex justify-center gap-3 m-2">
                    {item.character.imageUrl ? (
                        <Image 
                            src={item.character.imageUrl} 
                            alt={item.character.name} 
                            width={200} 
                            height={140} 
                            className='rounded-[15px]'
                        />
                    ) : (
                        <span className="border border-accent w-[200px] h-[250px] bg-accent"></span>
                    )}
                </div>
                <div className='col-span-4 flex flex-col gap-4'>
                    <p>{item.character.name}</p>
                    <p>{item.character.description}</p>
                    {type === 'anime' && (
                        <div className='flex bg-accent gap-5 rounded-[15px] overflow-hidden'>
                            {item.person.imageUrl ? (
                                <Image 
                                    src={item.person.imageUrl}
                                    alt={item.person.name}
                                    width={60}
                                    height={100}
                                />
                            ) : (
                                <span className="border border-accent w-[100px] h-[187px] bg-accent"></span>
                            )}
                            <p className='flex items-center '>{item.person.name}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}
