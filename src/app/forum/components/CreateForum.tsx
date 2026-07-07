'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createForum } from '@/app/lib/forum'
import type { Forum } from '@/app/types/forum'
import { X } from 'lucide-react'
import { useToast } from '@/app/context/ToastContext'
import { useAuth } from '@/app/context/AuthContext'
import Loader from '@/app/components/Loader'

export default function CreateForum({ onCreated }: { onCreated: () => void }) {
  const { showToast } = useToast()
  const { isLoggedIn } = useAuth()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState<Forum['category']>('general')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await createForum({
        title,
        content,
        category,
        related_anime_id: null,
        related_manga_id: null,
      })

      setTitle('')
      setContent('')
      setCategory('general')
      setIsOpen(false)

      showToast('Forum publié avec succès', 'success')

      onCreated()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      showToast('Erreur lors de la publication du forum', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      {/* BOUTON PRINCIPAL */}
      <button
        onClick={() => isLoggedIn ? setIsOpen(true) : router.push('/login')}
        className="btn bg-alerts hover:bg-alerts/90 rounded-full px-4 py-3 font-bold text-white border-none w-full"
      >
        Créer un sujet
      </button>

      {/* MODALE (POPUP) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-accent border border-border rounded-3xl p-6 w-full max-w-lg relative shadow-2xl">
            {/* Bouton fermer */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 text-border hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <h2 className="text-xl font-bold text-white mb-6">Nouveau Sujet</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-border">Titre</label>
                <input
                  type="text"
                  placeholder="Titre de votre sujet..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  maxLength={255}
                  className="p-3 rounded-xl text-white bg-background border border-border outline-none focus:ring-1 focus:ring-alerts"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-border">Catégorie</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Forum['category'])}
                  className="p-3 rounded-xl text-white bg-background border border-border outline-none focus:ring-1 focus:ring-alerts"
                >
                  {/* Valeurs attendues par l'API */}
                  <option value="general">Général</option>
                  <option value="anime">Anime</option>
                  <option value="manga">Manga</option>
                  <option value="recommendations">Recommandations</option>
                  <option value="spoilers">Spoilers</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-border">Contenu</label>
                <textarea
                  placeholder="De quoi voulez-vous discuter ?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  className="p-3 rounded-xl h-32 resize-y text-white bg-background border border-border outline-none focus:ring-1 focus:ring-alerts"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn bg-alerts hover:bg-alerts/90 rounded-full px-4 py-2 font-bold text-white border-none mt-2 w-full"
              >
                {loading ? <Loader variant="inline" size="md" /> : 'Publier le sujet'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
