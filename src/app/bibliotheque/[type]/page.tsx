import MaBibliothequePage from './components/MaBibliotheque'
import MangaPage from './components/Manga'
import AnimePage from './components/Anime'

export default async function BibliothequePage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params

  return (
    <>
      {type === 'ma-bibliotheque' ? (
        <MaBibliothequePage />
      ) : type === 'manga' ? (
        <MangaPage />
      ) : type === 'anime' ? (
        <AnimePage />
      ) : null}
    </>
  )
}
