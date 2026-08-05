'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createForum } from '@/app/lib/forum'
import type { Forum } from '@/app/types/forum'
import { X } from 'lucide-react'
import { useToast } from '@/app/context/ToastContext'
import { useAuth } from '@/app/context/AuthContext'
import Loader from '@/app/components/Loader'
import Button from '@/app/components/ui/Button'
import { useTranslations } from 'next-intl'

export default function CreateForum({ onCreated }: { onCreated: () => void }) {
  const { showToast } = useToast()
  const { isLoggedIn } = useAuth()
  const router = useRouter()
  const t = useTranslations('createForum')
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
      showToast(t('successToast'), 'success')
      onCreated()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      showToast(t('errorToast'), 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      <Button onClick={() => isLoggedIn ? setIsOpen(true) : router.push('/login')} className="w-full">
        {t('button')}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-accent border border-border rounded-3xl p-6 w-full max-w-lg relative shadow-2xl">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 text-text-muted hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <h2 className="text-xl font-bold text-white mb-6">{t('modalTitle')}</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text-muted">{t('titleLabel')}</label>
                <input
                  type="text"
                  placeholder={t('titlePlaceholder')}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  maxLength={255}
                  className="p-3 rounded-xl text-white bg-background border border-border outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text-muted">{t('categoryLabel')}</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Forum['category'])}
                  className="p-3 rounded-xl text-white bg-background border border-border outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="general">{t('categoryGeneral')}</option>
                  <option value="anime">{t('categoryAnime')}</option>
                  <option value="manga">{t('categoryManga')}</option>
                  <option value="recommendations">{t('categoryRecommendations')}</option>
                  <option value="spoilers">{t('categorySpoilers')}</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text-muted">{t('contentLabel')}</label>
                <textarea
                  placeholder={t('contentPlaceholder')}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  className="p-3 rounded-xl h-32 resize-y text-white bg-background border border-border outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <Button type="submit" disabled={loading} className="mt-2 w-full">
                {loading ? <Loader variant="inline" size="md" /> : t('submit')}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
