'use client'

import { useState, useEffect } from 'react'
import { getForums, getUserPins } from '@/app/lib/forum'
import type { Forum } from '@/app/types/forum'
import { Paperclip } from 'lucide-react'
import CreateForum from './components/CreateForum'
import ForumCards from '../components/ForumCards'
import AppLayout from '../components/layout/AppLayout'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Loader from '@/app/components/Loader'
import { useAuth } from '../context/AuthContext'
import Link from 'next/link'

const CATEGORIES = [
  { id: '', label: 'Récents' },
  { id: 'general', label: 'Général' },
  { id: 'anime', label: 'Anime' },
  { id: 'manga', label: 'Manga' },
  { id: 'recommendations', label: 'Recommandations' },
  { id: 'spoilers', label: 'Spoilers' },
]

const PIN_TITLE_MAX = 30

function truncate(str: string, max: number) {
  return str.length > max ? str.slice(0, max) + '…' : str
}

export default function ForumPage() {
  const [activeCategory, setActiveCategory] = useState<string>('')
  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const queryClient = useQueryClient()
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    const timer = setTimeout(() => setSearchQuery(searchInput), 300)
    return () => clearTimeout(timer)
  }, [searchInput])

  const { data, isLoading } = useQuery({
    queryKey: ['forums', { category: activeCategory, search: searchQuery }],
    queryFn: () => {
      const categoryParam = activeCategory !== '' ? (activeCategory as Forum['category']) : undefined
      return getForums(1, categoryParam, searchQuery || undefined)
    },
  })

  const { data: systemPinnedData } = useQuery({
    queryKey: ['forums-system-pinned'],
    queryFn: () => getForums(1, undefined, undefined, true),
    staleTime: 5 * 60 * 1000,
  })

  const { data: userPinsData } = useQuery({
    queryKey: ['user-pins'],
    queryFn: () => getUserPins(),
    enabled: isLoggedIn,
  })

  const topics = data?.data ?? []
  const systemPinned = systemPinnedData?.data ?? []
  const userPins = userPinsData?.data ?? []
  const topBarPinned = [
    ...systemPinned,
    ...userPins.filter(up => !systemPinned.some(sp => sp.id === up.id)),
  ]

  return (
    <AppLayout>
      <div className="flex flex-col gap-10 w-full h-full overflow-y-auto scrollbar-hide">
        <div className="flex items-center shrink-0">
          <div className="flex flex-wrap gap-3">
            {topBarPinned.length === 0 ? (
              <span className="text-border text-sm px-4 py-2">Aucun sujet épinglé</span>
            ) : (
              topBarPinned.map((topic) => (
                <Link
                  key={topic.id}
                  href={`/forum/${topic.id}`}
                  className="flex px-4 items-center gap-2 btn btn-ghost border-none btn-xs text-[15px] py-2 font-normal hover:bg-alerts rounded-full bg-alerts text-white shrink-0"
                >
                  <Paperclip size={18} />
                  <span className="hidden md:inline">{truncate(topic.title, PIN_TITLE_MAX)}</span>
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="flex gap-10 w-full shrink-0">
          <div className="flex justify-center w-full">
            <input
              className="input input-bordered w-full bg-border rounded-full border-none focus:outline-none"
              placeholder="Rechercher dans le forum"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start flex-1">
          <div className="w-full lg:w-[200px] shrink-0 flex flex-col gap-6">
            <div className="w-full">
              <CreateForum onCreated={() => queryClient.invalidateQueries({ queryKey: ['forums'] })} />
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
                <Loader size="md" color="alerts" className="flex-1" />
              ) : topics.length === 0 ? (
                <div className="flex justify-center items-center p-10 text-border text-[15px] flex-1 border border-border bg-accent rounded-[15px]">
                  Aucun sujet trouvé.
                </div>
              ) : (
                topics.map((topic) => (
                  <ForumCards key={topic.id} topic={topic} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
