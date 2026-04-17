'use client'

import { useEffect } from 'react'
import { Chapter, Episode } from '@/app/types/catalog'
import { X } from 'lucide-react'
import Image from 'next/image'
import { format, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'

type EpisodeModalProps = {
  isOpen: boolean
  onClose: () => void
  type: 'manga' | 'anime'
  item: Episode | Chapter | undefined
}

export default function EpisodeModal({ isOpen, onClose, item, type }: EpisodeModalProps) {
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

  if (item === undefined || isOpen === false) return

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-base-100 w-11/12 max-w-2xl rounded-xl shadow-2xl border border-border flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {type === 'anime' && (
            <div className='flex justify-between'>
                {item.thumbnailUrl && (
                    <Image 
                        src={item.thumbnailUrl}
                        alt={item.title}
                        width="200"
                        height="200"
                        className='m-6'
                    />
                )}
                <div className='flex flex-col gap-2 my-6'>
                    <h1>{item.number}. {item.title}</h1>
                    <p className='font-medium text-gray-400'>{format(parseISO(item.airdate), 'dd/MM/yyyy')} - {item.length} min</p>
                    <p>Description de l&apos;épisode/chapitre quand disponible</p>
                </div>
                <button className="btn btn-sm btn-circle btn-ghost m-2" onClick={onClose}>
                    <X size={20} />
                </button>
            </div>
        )}
        {type === 'manga' && (
            <div className='flex justify-between'>
                {/* {item.thumbnailUrl && (
                    <Image 
                        src={item.thumbnailUrl}
                        alt={item.title}
                        width="200"
                        height="200"
                        className='m-6'
                    />
                )} */}
                <div className='flex flex-col gap-2 my-6'>
                    <h1>{item.number}. {item.title}</h1>
                    <p className='font-medium text-gray-400'>{format(parseISO(item.releaseDate), 'dd/MM/yyyy')} - {item.volumeNumber} pages</p>
                    <p>Description de l&apos;épisode/chapitre quand disponible</p>
                </div>
                <button className="btn btn-sm btn-circle btn-ghost m-2" onClick={onClose}>
                    <X size={20} />
                </button>
            </div>
        )}
      </div>
    </div>
  )
}
