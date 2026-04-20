'use client'

import { X } from 'lucide-react'
import { useEffect } from 'react'
import { Anime, Manga, Genre, Category, Production, AnimeStaff, MangaStaff } from '@/app/types/catalog'

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-base-100 w-11/12 max-w-2xl rounded-xl shadow-2xl border border-border flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-lg">{item.titleEn}</h2>
            <p className="text-sm text-base-content/70">{item.titleJp}</p>
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
                <td className="capitalize">{'subtype' in item ? item.subtype : item.type}</td>
              </tr>
              <tr>
                <td className="text-base-content/60">Status</td>
                <td>
                  {item.status === 'finish'
                    ? 'Terminé'
                    : item.status === 'ongoing'
                      ? 'En cours'
                      : item.status === 'tba'
                        ? 'Date à venir'
                        : item.status === 'upcoming'
                          ? 'À venir'
                          : item.status === 'unreleased'
                            ? 'Non sorti'
                            : 'N/A'}
                </td>
              </tr>
              <tr>
                <td className="text-base-content/60">Date de début</td>
                <td>{item.startDate ? new Date(item.startDate).toLocaleDateString('fr-FR') : 'N/A'}</td>
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
                    {genre.name}
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
                    {category.name}
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
                  {productions.map((prod) => (
                    <tr key={prod.company.id}>
                      <td className="text-base-content/60 w-1/2">{prod.company.name}</td>
                      <td>{prod.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Staff */}
          {staffs.length > 0 && (
            <div>
              <p className="font-semibold mb-2">Staff</p>
              <table className="border-separate border-spacing-y-1 w-full">
                <tbody>
                  {staffs.map((staff) => (
                    <tr key={staff.person.id}>
                      <td className="text-base-content/60 w-1/2">{staff.person.name}</td>
                      <td>{staff.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
