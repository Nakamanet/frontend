'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAdminReports, dismissReport, takeReportAction, ReportedItem } from '@/app/lib/reports'
import { useToast } from '@/app/context/ToastContext'
import Loader from '@/app/components/Loader'
import { Flag, Trash2, X, CircleUser, AlertTriangle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { fr, enUS } from 'date-fns/locale'
import AdminGuard from '../components/AdminGuard'
import { useTranslations, useLocale } from 'next-intl'

export default function AdminReportsPage() {
  const { showToast } = useToast()
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)
  const t = useTranslations('reports')
  const locale = useLocale()
  const dateLocale = locale === 'fr' ? fr : enUS

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'reports', page],
    queryFn: () => getAdminReports(page),
  })

  const { mutate: dismiss } = useMutation({
    mutationFn: (item: ReportedItem) => dismissReport(item.reportable_type, item.reportable_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'reports'] })
      showToast(t('dismissSuccess'), 'success')
    },
    onError: () => showToast(t('dismissError'), 'error'),
  })

  const { mutate: deleteContent } = useMutation({
    mutationFn: (item: ReportedItem) => takeReportAction(item.reportable_type, item.reportable_id, 'delete_content'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'reports'] })
      showToast(t('deleteSuccess'), 'success')
    },
    onError: () => showToast(t('deleteError'), 'error'),
  })

  const handleDelete = (item: ReportedItem) => {
    if (confirm(t('confirmDelete'))) {
      deleteContent(item)
    }
  }

  const reports = data?.data ?? []

  return (
    <AdminGuard>
      <div className="max-w-4xl mx-auto p-8 flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Flag size={24} className="text-primary" />
            {t('title')}
          </h1>
          {reports.length > 0 && (
            <p className="text-sm text-text/50 mt-1">
              {reports.length} {reports.length > 1 ? t('pendingPlural') : t('pending')}
            </p>
          )}
        </div>

        {isLoading ? (
          <Loader />
        ) : reports.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
            <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
              <Flag size={20} className="text-success" />
            </div>
            <p className="text-text/60 text-sm">{t('empty')}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {reports.map((item) => (
              <div
                key={`${item.reportable_type}-${item.reportable_id}`}
                className="bg-accent border border-border rounded-[15px] overflow-hidden"
              >
                <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-error/5">
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-error">
                    <AlertTriangle size={15} />
                    {item.report_count} {item.report_count > 1 ? t('reportPlural') : t('report')}
                  </span>
                  <span className="text-xs font-medium text-text/40 uppercase tracking-wide px-2 py-0.5 rounded-full bg-base-200">
                    {item.reportable_type}
                  </span>
                </div>

                <div className="p-5 flex flex-col gap-4">
                  {item.target ? (
                    <div className="flex gap-3">
                      <Link href={`/profil/${item.target.user.id}`} className="shrink-0">
                        <div className="w-10 h-10 rounded-full bg-muted border-2 border-border flex items-center justify-center overflow-hidden text-base-content/70">
                          {item.target.user.avatar_url ? (
                            <Image
                              src={item.target.user.avatar_url}
                              alt={item.target.user.username}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <CircleUser size={22} strokeWidth={1.5} />
                          )}
                        </div>
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <Link href={`/profil/${item.target.user.id}`} className="font-semibold text-sm hover:underline">
                            {item.target.user.username}
                          </Link>
                          <span className="text-xs text-text/40">
                            {formatDistanceToNow(new Date(item.target.created_at), { addSuffix: true, locale: dateLocale })}
                          </span>
                        </div>
                        <p className="text-sm mt-1.5 text-text/90">{item.target.content}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-text/40 italic">{t('alreadyDeleted')}</p>
                  )}

                  {(item.latest_reason || item.latest_details) && (
                    <div className="bg-base-200/60 rounded-[10px] px-4 py-3 text-sm flex flex-col gap-1">
                      {item.latest_reason && (
                        <p>
                          <span className="font-medium text-text/70">{t('reason')}</span>{' '}
                          <span className="text-text/90">{item.latest_reason}</span>
                        </p>
                      )}
                      {item.latest_details && (
                        <p className="text-text/60">{item.latest_details}</p>
                      )}
                    </div>
                  )}

                  <div className="flex gap-2 justify-end pt-1">
                    <button
                      className="btn btn-ghost btn-sm gap-1.5"
                      onClick={() => dismiss(item)}
                    >
                      <X size={14} />
                      {t('ignore')}
                    </button>
                    <button
                      className="btn btn-sm bg-error/10 hover:bg-error/20 text-error border-none gap-1.5"
                      onClick={() => handleDelete(item)}
                      disabled={!item.target}
                    >
                      <Trash2 size={14} />
                      {t('deleteContent')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {data && data.last_page > 1 && (
          <div className="flex justify-center gap-2">
            <button className="btn btn-sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
              {t('previous')}
            </button>
            <span className="flex items-center px-3 text-sm">
              {t('page')} {data.current_page} / {data.last_page}
            </span>
            <button className="btn btn-sm" disabled={page >= data.last_page} onClick={() => setPage((p) => p + 1)}>
              {t('next')}
            </button>
          </div>
        )}
      </div>
    </AdminGuard>
  )
}
