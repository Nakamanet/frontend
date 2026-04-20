'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Chat from '../components/home/Chat'
import Calendar from '../components/home/Calendar'
import { useAuth } from '../context/AuthContext'
import { getForums } from '@/app/lib/forum'
import type { Forum } from '@/app/types/forum'
import { Paperclip, MessageSquare, Eye, Ellipsis, SlidersHorizontal } from 'lucide-react'
import CreateForum from './components/CreateForum'
import { useToast } from '../context/ToastContext'

const CATEGORIES = [
  { id: '', label: 'Récents' },
  { id: 'general', label: 'Général' },
  { id: 'anime', label: 'Anime' },
  { id: 'manga', label: 'Manga' },
  { id: 'recommendations', label: 'Recommandations' },
  { id: 'spoilers', label: 'Spoilers' },
]

export default function ForumPage() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [topics, setTopics] = useState<Forum[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string>('')

  useEffect(() => {
    const fetchTopics = async () => {
      setIsLoading(true)
      try {
        const categoryParam = activeCategory !== '' ? (activeCategory as Forum['category']) : undefined
        const forumsData = await getForums(1, categoryParam)
        setTopics(forumsData.data || [])
        showToast('Fil de discussion publié avec succès', 'success')
      } catch (err) {
        showToast('Echec lors de la publication du fil de discussion', 'error')
      } finally {
        setIsLoading(false)
      }
    }
    fetchTopics()
  }, [activeCategory])

  return (
    <main className="md:grid md:grid-cols-5 max-w-[1500px] mx-auto py-10 px-15 text-white">
      <section className="flex flex-col gap-10 w-full h-full col-span-4 pr-6 overflow-y-auto scrollbar-hide">
        <div className="flex justify-between items-center border border-border bg-accent rounded-full py-1 px-6 shrink-0">
          <div className="flex gap-5 overflow-x-auto scrollbar-hide">
            <button className="flex px-4 items-center gap-2 btn btn-ghost border-none btn-xs text-[15px] py-2 font-normal hover:bg-alerts rounded-full bg-alerts text-white">
              <Paperclip size={18} />
              <span className="hidden md:inline">Sujet épinglé 1</span>
            </button>
            <button className="flex px-4 items-center gap-2 btn btn-ghost border-none btn-xs text-[15px] py-2 font-normal hover:bg-alerts rounded-full bg-alerts text-white">
              <Paperclip size={18} />
              <span className="hidden md:inline">Sujet épinglé 2</span>
            </button>
            <button className="flex px-4 items-center gap-2 btn btn-ghost border-none btn-xs text-[15px] py-2 font-normal hover:bg-alerts rounded-full bg-alerts text-white">
              <Paperclip size={18} />
              <span className="hidden md:inline">Sujet épinglé 3</span>
            </button>
          </div>
        </div>

        <div className="flex gap-10 w-full shrink-0">
          <div className="flex justify-center w-full">
            <input
              className="input input-bordered w-full bg-border rounded-full border-none focus:outline-none"
              placeholder="Rechercher dans le forum"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start flex-1">
          <div className="w-full lg:w-[200px] flex-shrink-0 flex flex-col gap-6">
            <div className="w-full">
              <CreateForum />
            </div>
            <div className="flex flex-col gap-2 p-4 bg-accent rounded-[15px] border border-border">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex px-4 items-center gap-2 btn btn-ghost border-none btn-sm text-[15px] py-2 font-normal rounded-full transition-colors justify-start ${
                    activeCategory === cat.id
                      ? 'bg-alerts text-white hover:bg-alerts'
                      : 'text-border hover:bg-alerts/50 hover:text-white'
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-6 min-w-0 mb-10 min-h-[500px]">
            <div className="flex-1 flex flex-col gap-4">
              {isLoading ? (
                <div className="flex justify-center items-center p-10 flex-1 border border-border bg-accent rounded-[15px]">
                  <span className="loading loading-spinner text-alerts"></span>
                </div>
              ) : topics.length === 0 ? (
                <div className="flex justify-center items-center p-10 text-border text-[15px] flex-1 border border-border bg-accent rounded-[15px]">
                  Aucun sujet trouvé dans cette catégorie.
                </div>
              ) : (
                topics.map((topic) => (
                  <Link href={`/forum/${topic.id}`} key={topic.id}>
                    <div className="flex flex-col border border-border bg-accent rounded-[15px] gap-4 p-4 hover:bg-white/[0.02] transition cursor-pointer">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[14px] font-bold text-white">{topic.user?.username || 'Anonyme'}</span>
                        <span className="text-xs text-border">
                          • {new Date(topic.created_at).toLocaleDateString('fr-FR')}
                        </span>
                      </div>

                      <h3 className="text-[16px] font-bold text-white leading-snug">{topic.title}</h3>
                      <p className="text-[14px] text-border line-clamp-2">{topic.content}</p>

                      <div className="flex flex-col gap-3 mt-2">
                        <div>
                          <span className="text-[10px] font-bold px-3 py-1 bg-alerts text-white rounded-full uppercase tracking-wide">
                            {topic.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-6 text-border text-sm font-medium">
                          <span className="flex items-center gap-1.5 hover:text-alerts transition-colors">
                            <MessageSquare size={16} />X
                          </span>
                          <span className="flex items-center gap-1.5 transition-colors">
                            <Eye size={16} />X
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <Chat user={user} />
        <Calendar user={user} />
      </section>
    </main>
  )
}
