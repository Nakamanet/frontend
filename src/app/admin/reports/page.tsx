'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAdminReports, dismissReport, takeReportAction, ReportedItem } from '@/app/lib/reports'
import { useToast } from '@/app/context/ToastContext'
import Loader from '@/app/components/Loader'
import { Flag, Trash2, X, CircleUser } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import AdminGuard from '../components/AdminGuard'

export default function AdminReportsPage() {
  const { showToast } = useToast()
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'reports', page],
    queryFn: () => getAdminReports(page),
  })

  const { mutate: dismiss } = useMutation({
    mutationFn: (item: ReportedItem) => dismissReport(item.reportable_type, item.reportable_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'reports'] })
      showToast('Signalement ignoré', 'success')
    },
    onError: () => showToast('Erreur lors du traitement', 'error'),
  })

  const { mutate: deleteContent } = useMutation({
    mutationFn: (item: ReportedItem) => takeReportAction(item.reportable_type, item.reportable_id, 'delete_content'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'reports'] })
      showToast('Contenu supprimé', 'success')
    },
    onError: () => showToast('Erreur lors de la suppression', 'error'),
  })

  const handleDelete = (item: ReportedItem) => {
    if (confirm('Supprimer ce contenu signalé ? Cette action est irréversible.')) {
      deleteContent(item)
    }
  }

  const reports = data?.data ?? []

  return (
    <AdminGuard>
      <div className="max-w-4xl mx-auto p-8 flex flex-col gap-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Flag size={24} className="text-primary" />
          Modération des signalements
        </h1>

        {isLoading ? (
          <Loader />
        ) : reports.length === 0 ? (
          <p className="text-text/60 text-sm">Aucun signalement en attente. Bien joué à tout le monde.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {reports.map((item) => (
              <div
                key={`${item.reportable_type}-${item.reportable_id}`}
                className="bg-accent border border-border rounded-[15px] p-5 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <span className="badge badge-error gap-1">
                    <Flag size={12} />
                    {item.report_count} signalement{item.report_count > 1 ? 's' : ''}
                  </span>
                  <span className="text-xs text-text/50 uppercase">{item.reportable_type}</span>
                </div>

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
                        <span className="text-xs text-text/50">
                          {formatDistanceToNow(new Date(item.target.created_at), { addSuffix: true, locale: fr })}
                        </span>
                      </div>
                      <p className="text-sm mt-1">{item.target.content}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-text/50 italic">Contenu déjà supprimé</p>
                )}

                {(item.latest_reason || item.latest_details) && (
                  <div className="bg-base-200/50 rounded-[10px] p-3 text-sm">
                    {item.latest_reason && (
                      <p><span className="font-medium">Motif :</span> {item.latest_reason}</p>
                    )}
                    {item.latest_details && (
                      <p className="text-text/70 mt-1">{item.latest_details}</p>
                    )}
                  </div>
                )}

                <div className="flex gap-2 justify-end pt-1">
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => dismiss(item)}
                  >
                    <X size={14} />
                    Ignorer
                  </button>
                  <button
                    className="btn btn-ghost btn-sm text-error"
                    onClick={() => handleDelete(item)}
                    disabled={!item.target}
                  >
                    <Trash2 size={14} />
                    Supprimer le contenu
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {data && data.last_page > 1 && (
          <div className="flex justify-center gap-2">
            <button className="btn btn-sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
              Précédent
            </button>
            <span className="flex items-center px-3 text-sm">
              Page {data.current_page} / {data.last_page}
            </span>
            <button className="btn btn-sm" disabled={page >= data.last_page} onClick={() => setPage((p) => p + 1)}>
              Suivant
            </button>
          </div>
        )}
      </div>
    </AdminGuard>
  )
}
