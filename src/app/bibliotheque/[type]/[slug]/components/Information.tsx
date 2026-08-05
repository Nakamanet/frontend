'use client'

import { Info } from 'lucide-react'
import InformationModal from './InformationModal'
import { Manga, Anime, Genre, Category, Production, AnimeStaff, MangaStaff } from '@/app/types/catalog'
import { useState } from 'react'
import {
  getAnimeCategories,
  getAnimeGenres,
  getMangaCategories,
  getProductions,
  getAnimeStaffs,
  getMangaStaffs,
  getMangaGenres,
} from '@/app/lib/catalogue'
import { useQueries } from '@tanstack/react-query'
import { useTranslations, useLocale } from 'next-intl'

type InformationProps = { type: 'anime'; item: Anime } | { type: 'manga'; item: Manga }

export default function Information({ type, item }: InformationProps) {
  const t = useTranslations('information')
  const locale = useLocale()
  const [voirPlus, setVoirPlus] = useState(false)

  const statusMap: Record<string, string> = {
    finish:      t('statusFinish'),
    ongoing:     t('statusOngoing'),
    tba:         t('statusTba'),
    upcoming:    t('statusUpcoming'),
    unreleased:  t('statusUnreleased'),
  }

  const formatDate = (date: string | null) =>
    date
      ? new Date(date).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-GB')
      : 'N/A'

  const results = useQueries({
    queries: [
      { queryKey: [type, item.id, 'categories'], queryFn: () => type === 'anime' ? getAnimeCategories(item.id) : getMangaCategories(item.id), staleTime: 5 * 60 * 1000 },
      { queryKey: [type, item.id, 'genres'],     queryFn: () => type === 'anime' ? getAnimeGenres(item.id)     : getMangaGenres(item.id),     staleTime: 5 * 60 * 1000 },
      { queryKey: ['anime', item.id, 'productions'], queryFn: () => getProductions(item.id), enabled: type === 'anime', staleTime: 5 * 60 * 1000 },
      { queryKey: [type, item.id, 'staffs'],     queryFn: () => type === 'anime' ? getAnimeStaffs(item.id)     : getMangaStaffs(item.id),     staleTime: 5 * 60 * 1000 },
    ],
  })

  const itemCategories: Category[]                    = (results[0]?.data as Category[])                    ?? []
  const itemGenre: Genre[]                            = (results[1]?.data as Genre[])                       ?? []
  const itemProductions: Production[]                 = (results[2]?.data as Production[])                  ?? []
  const itemStaffs: AnimeStaff[] | MangaStaff[]       = (results[3]?.data as AnimeStaff[] | MangaStaff[])   ?? []

  return (
    <div className="border border-border bg-accent rounded-card p-5">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Info className="text-primary" />
        <p>{t('title')}</p>
      </div>

      {type === 'anime' ? (
        <div className="flex flex-col gap-4">
          <table className="border-separate border-spacing-y-2 w-full">
            <tbody>
              <tr>
                <td>{t('type')}</td>
                <td className="capitalize">{item.subtype}</td>
              </tr>
              {item.episodeCount !== null && item.episodeCount !== 0 && (
                <tr>
                  <td>{t('episodeCount')}</td>
                  <td>{item.episodeCount}</td>
                </tr>
              )}
              <tr>
                <td>{t('status')}</td>
                <td>{statusMap[item.status] ?? 'N/A'}</td>
              </tr>
              {item.ageRating && (
                <tr>
                  <td>{t('ageRating')}</td>
                  <td>{item.ageRating}</td>
                </tr>
              )}
              <tr>
                <td>{t('startDate')}</td>
                <td>{formatDate(item.startDate)}</td>
              </tr>
              <tr>
                <td>{t('episodeLength')}</td>
                <td>{item.episodeLength} min</td>
              </tr>
              <tr>
                <td>{t('streaming')}</td>
                <td>{t('streamingIncoming')}</td>
              </tr>
            </tbody>
          </table>
          <button
            onClick={() => setVoirPlus(true)}
            className="btn btn-ghost border-none rounded-full bg-primary text-primary-content"
          >
            {t('seeMore')}
          </button>
        </div>
      ) : type === 'manga' ? (
        <div className="flex flex-col gap-4">
          <table className="border-separate border-spacing-y-2 w-full">
            <tbody>
              {item.volumeCount !== null && item.volumeCount !== 0 && (
                <tr>
                  <td>{t('volumeCount')}</td>
                  <td>{item.volumeCount}</td>
                </tr>
              )}
              {item.chapterCount && (
                <tr>
                  <td>{t('chapterCount')}</td>
                  <td>{item.chapterCount}</td>
                </tr>
              )}
              <tr>
                <td>{t('status')}</td>
                <td>{statusMap[item.status] ?? 'N/A'}</td>
              </tr>
              <tr>
                <td>{t('publicationDate')}</td>
                <td>{formatDate(item.startDate)}</td>
              </tr>
              <tr>
                {itemStaffs.length > 0 && (
                  <>
                    <td>{t('staff')}</td>
                    <td>
                      {itemStaffs.map((staff, index) => (
                        <div className="flex gap-2" key={`${staff.person.id}-${staff.role}-${index}`}>
                          <span>{staff.person.name}</span>
                        </div>
                      ))}
                    </td>
                  </>
                )}
              </tr>
            </tbody>
          </table>
          <button
            onClick={() => setVoirPlus(true)}
            className="btn btn-ghost border-none rounded-full bg-primary text-primary-content"
          >
            {t('seeMore')}
          </button>
        </div>
      ) : null}

      <InformationModal
        isOpen={voirPlus}
        onClose={() => setVoirPlus(false)}
        genres={itemGenre}
        categories={itemCategories}
        productions={itemProductions}
        staffs={itemStaffs}
        item={item}
        type={type}
      />
    </div>
  )
}
