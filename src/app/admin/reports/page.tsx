'use client'

import { useState, useEffect } from 'react'
import { Flag, XCircle, MoreVertical, MessageSquare, ExternalLink, ShieldAlert } from 'lucide-react'
import api from '@/app/lib/axios'

export default function AdminReportsPage() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)

  useEffect(() => {
    fetchReports(currentPage)
  }, [currentPage])

  const fetchReports = async (page = 1) => {
    setLoading(true)
    setError('')
    try {
      const { data } = await api.get(`/admin/reports?page=${page}`)
      setReports(data.data || [])
      setCurrentPage(data.current_page || 1)
      setLastPage(data.last_page || 1)
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <ShieldAlert className="text-primary" size={32} />
            Modération des Signalements
          </h1>
          <p className="text-text/60 mt-1">Examinez et traitez les contenus signalés par la communauté.</p>
        </div>
      </div>

      <div className="bg-accent/30 border border-border/50 rounded-2xl overflow-hidden shadow-sm pb-4">
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-accent/40 text-text/60 text-sm">
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Cible (Extrait)</th>
                <th className="px-6 py-4 font-medium text-center">Signalements</th>
                <th className="px-6 py-4 font-medium">Dernier signalement</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-text/60">
                    <div className="inline-block w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mb-2" />
                    <p>Chargement des signalements...</p>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-red-400">
                    <XCircle className="mx-auto mb-2 opacity-50" size={32} />
                    <p>{error}</p>
                    <button onClick={() => fetchReports(currentPage)} className="mt-4 text-primary hover:underline text-sm">
                      Réessayer
                    </button>
                  </td>
                </tr>
              ) : reports.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-text/60">
                    <Flag className="mx-auto mb-2 opacity-50" size={32} />
                    <p>Aucun signalement en attente. Bien joué à tout le monde !</p>
                  </td>
                </tr>
              ) : (
                reports.map((report: any, idx: number) => (
                  <tr key={idx} className="hover:bg-accent/20 transition-colors">
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-accent border border-border/50 capitalize">
                        <MessageSquare size={12} /> {report.target_type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-[300px] truncate text-sm">
                        {report.target_content ? (
                          <span className="text-text/80">"{report.target_content}"</span>
                        ) : (
                          <span className="text-text/40 italic">Contenu indisponible</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500/10 text-red-500 font-bold text-sm border border-red-500/20">
                        {report.report_count}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-text/70">
                      {report.latest_reason || 'Aucune raison spécifiée'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-accent rounded-full transition-colors text-primary hover:text-primary/80" title="Voir le contenu">
                          <ExternalLink size={18} />
                        </button>
                        <button className="p-2 hover:bg-accent rounded-full transition-colors text-text/60 hover:text-text" onClick={() => alert('À venir : Traiter le signalement')}>
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination UI */}
        {lastPage > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4 px-6">
            <button 
              className="btn btn-sm btn-ghost" 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            >
              Précédent
            </button>
            <span className="text-sm text-text/60">Page {currentPage} sur {lastPage}</span>
            <button 
              className="btn btn-sm btn-ghost" 
              disabled={currentPage === lastPage}
              onClick={() => setCurrentPage(p => Math.min(lastPage, p + 1))}
            >
              Suivant
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
