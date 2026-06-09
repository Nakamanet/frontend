'use client'

import { useEffect } from 'react'
import { Chapter, Episode } from '@/app/types/catalog'
import { X } from 'lucide-react'
import Image from 'next/image'
import { format, parseISO } from 'date-fns'

type EpisodeModalProps =
  | { isOpen: boolean; onClose: () => void; type: 'anime'; item: Episode; coverImage: string | null }
  | { isOpen: boolean; onClose: () => void; type: 'manga'; item: Chapter; coverImage: string | null }

export default function EpisodeModal({ isOpen, onClose, type, item, coverImage }: EpisodeModalProps) {
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
        className="bg-base-100 w-11/12 max-w-2xl rounded-xl shadow-2xl border border-border flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {type === 'anime' && (
          <div className="flex gap-4 p-4">
            <div className="relative shrink-0 w-40 h-25 rounded-[10px] overflow-hidden bg-primary">
              <Image
                src={item.thumbnailUrl ?? coverImage ?? '/bg.png'}
                alt={item.title}
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <p className="font-bold truncate">{item.number}. {item.title}</p>
              <p className="text-sm text-gray-400">
                {item.airdate ? format(parseISO(item.airdate), 'dd/MM/yyyy') : 'Date inconnue'}
                {item.length ? ` — ${item.length} min` : ''}
              </p>
              <p className="text-sm text-border">Description de l&apos;épisode non disponible</p>
            </div>
            <button className="btn btn-sm btn-circle btn-ghost shrink-0 self-start" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        )}
        {type === 'manga' && (
          <div className="flex gap-4 p-4">
            <div className="relative shrink-0 w-40 h-25 rounded-[10px] overflow-hidden bg-primary">
              <Image
                src={coverImage ?? '/bg.png'}
                alt={item.title ?? `Chapitre ${item.number}`}
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <p className="font-bold truncate">{item.number}. {item.title ?? `Chapitre ${item.number}`}</p>
              <p className="text-sm text-gray-400">
                {item.releaseDate ? format(parseISO(item.releaseDate), 'dd/MM/yyyy') : 'Date inconnue'}
                {item.volumeNumber ? ` — Volume ${item.volumeNumber}` : ''}
              </p>
              <p className="text-sm text-border">Description du chapitre non disponible</p>
            </div>
            <button className="btn btn-sm btn-circle btn-ghost shrink-0 self-start" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
