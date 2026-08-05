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
import SectionSwitcher from '../components/ui/SectionSwitcher'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

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
  const t = useTranslations('forum')

  const CATEGORIES = [
    { id: '', label: t('categories.recent') },
    { id: 'general', label: t('categories.general') },
    { id: 'anime', label: t('categories.anime') },
    { id: 'manga', label: t('categories.manga') },
    { id: 'recommendations', label: t('categories.recommendations') },
    { id: 'spoilers', label: t('categories.spoilers') },
  ]

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
              <span className="text-text-muted text-sm px-4 py-2">{t('noPinned')}</span>
            ) : (
              topBarPinned.map((topic) => (
                <Link
                  key={topic.id}
                  href={`/forum/${topic.id}`}
                  className="flex px-4 items-center gap-2 btn btn-ghost border-none btn-xs text-[15px] py-2 font-normal hover:bg-primary rounded-full bg-primary text-white shrink-0"
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
              placeholder={t('searchPlaceholder')}
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
            <SectionSwitcher items={CATEGORIES} active={activeCategory} onChange={setActiveCategory} />
          </div>

          <div className="flex-1 flex flex-col gap-6 min-w-0 mb-10 min-h-[500px]">
            <div className="flex-1 flex flex-col gap-4">
              {isLoading ? (
                <Loader size="md" color="primary" className="flex-1" />
              ) : topics.length === 0 ? (
                <div className="flex justify-center items-center p-10 text-text-muted text-[15px] flex-1 border border-border bg-accent rounded-card">
                  {t('noTopics')}
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
