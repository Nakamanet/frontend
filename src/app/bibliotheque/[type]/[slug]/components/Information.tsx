import { Info } from 'lucide-react'
import InformationModal from './InformationModal'
import { Manga, Anime, Genre, Category, Production, AnimeStaff, MangaStaff } from '@/app/types/catalog'
import { useState, useEffect } from 'react'
import {
  getAnimeCategories,
  getAnimeGenres,
  getMangaCategories,
  getProductions,
  getAnimeStaffs,
  getMangaStaffs,
  getMangaGenres,
} from '@/app/lib/catalogue'

type InformationProps = { type: 'anime'; item: Anime } | { type: 'manga'; item: Manga }

export default function Information({ type, item }: InformationProps) {
  const [itemGenre, setItemGenre] = useState<Genre[]>([])
  const [itemCategories, setItemCategories] = useState<Category[]>([])
  const [itemProductions, setItemProductions] = useState<Production[]>([])
  const [itemStaffs, setItemStaffs] = useState<AnimeStaff[] | MangaStaff[]>([])
  const [voirPlus, setVoirPlus] = useState(false)

  useEffect(() => {
    if (type === 'anime') {
      getAnimeCategories(item.id)
        .then((res) => setItemCategories(res))
        .catch((err) => console.error(err))
      getAnimeGenres(item.id)
        .then((res) => setItemGenre(res))
        .catch((err) => console.error(err))
      getProductions(item.id)
        .then((res) => setItemProductions(res))
        .catch((err) => console.error(err))
      getAnimeStaffs(item.id)
        .then((res) => setItemStaffs(res))
        .catch((err) => console.error(err))
    } else if (type === 'manga') {
      getMangaCategories(item.id)
        .then((res) => setItemCategories(res))
        .catch((err) => console.error(err))
      getMangaGenres(item.id)
        .then((res) => setItemGenre(res))
        .catch((err) => console.error(err))
      getMangaStaffs(item.id)
        .then((res) => setItemStaffs(res))
        .catch((err) => console.error(err))
    }
  }, [item, type])

  return (
    <div className="border border-border bg-accent rounded-[15px] p-5">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Info className="text-primary" />
        <p>Informations</p>
      </div>
      {type === 'anime' ? (
        <div className="flex flex-col gap-4">
          <table className="border-separate border-spacing-y-2 w-full">
            <tbody>
              <tr>
                <td>Type</td>
                <td className="capitalize">{item.subtype}</td>
              </tr>
              {item.episodeCount !== null && item.episodeCount !== 0 && (
                <tr>
                  <td>Nombre d&apos;épisodes</td>
                  <td>{item.episodeCount}</td>
                </tr>
              )}
              <tr>
                <td>Status</td>
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
                <td>Diffusion </td>
                <td>{item.startDate ? new Date(item.startDate).toLocaleDateString('fr-FR') : 'N/A'}</td>
              </tr>
              <tr>
                <td>Longueur</td>
                <td>{item.episodeLength} min</td>
              </tr>
              <tr>
                <td>Streaming</td>
                <td>Incoming</td>
              </tr>
            </tbody>
          </table>
          <button
            onClick={() => setVoirPlus(true)}
            className="btn btn-ghost border-none rounded-full bg-primary text-primary-content"
          >
            Voir plus
          </button>
        </div>
      ) : type === 'manga' ? (
        <div className="flex flex-col gap-4">
          <table className="border-separate border-spacing-y-2 w-full">
            <tbody>
              {item.volumeCount !== null && item.volumeCount !== 0 && (
                <tr>
                  <td>Nombre de tomes</td>
                  <td>{item.volumeCount}</td>
                </tr>
              )}
              {item.chapterCount && (
                <tr>
                  <td>Nombre de chapitres</td>
                  <td>{item.chapterCount}</td>
                </tr>
              )}
              <tr>
                <td>Status</td>
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
                <td>Date de publication</td>
                <td>{item.startDate ? new Date(item.startDate).toLocaleDateString('fr-FR') : 'N/A'}</td>
              </tr>
              <tr>
                {itemStaffs.length > 0 && (
                  <>
                    <td>Staff</td>
                    <td>
                      {itemStaffs.map((staff) => (
                        <div className="flex gap-2" key={staff.person.id}>
                          <span key={staff.person.id}>{staff.person.name}</span>
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
            Voir plus
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
