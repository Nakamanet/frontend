'use client'

import { useState, useEffect } from 'react'
import { Flag, XCircle, MoreVertical, MessageSquare, ExternalLink, ShieldAlert, Trash2, AlertTriangle, CheckCircle2 } from 'lucide-react'
import api from '@/app/lib/axios'
import { useToast } from '@/app/context/ToastContext'

function getReportTypeBadge(type: string) {
  switch (type) {
    case 'forum_topic':
      return { label: 'Forum Sujet', icon: MessageSquare, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' }
    case 'forum_reply':
      return { label: 'Forum Réponse', icon: MessageSquare, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' }
    case 'comment':
      return { label: 'Commentaire', icon: MessageSquare, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' }
    case 'post':
    default:
      return { label: 'Post', icon: MessageSquare, color: 'text-primary bg-primary/10 border-primary/20' }
  }
}

export default function AdminReportsPage() {
  const [reports, setReports] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [selectedReport, setSelectedReport] = useState<any>(null)
  const { showToast } = useToast()

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
      
      // If modal is open, keep selectedReport updated with fresh data
      if (selectedReport) {
        const updated = (data.data || []).find(
          (r: any) => r.reportable_type === selectedReport.reportable_type && r.reportable_id === selectedReport.reportable_id
        )
        if (updated) {
          setSelectedReport(updated)
        }
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  const handleAction = async (reportable_type: string, reportable_id: number, action: string) => {
    try {
      if (action === 'dismiss' || action === 'delete_report') {
        const { data } = await api.post('/admin/reports/dismiss', { reportable_type, reportable_id })
        showToast(data.message || 'Signalement supprimé du panneau', 'info')
        if (selectedReport?.reportable_type === reportable_type && selectedReport?.reportable_id === reportable_id) {
          setSelectedReport(null)
        }
      } else {
        const { data } = await api.post('/admin/reports/action', { reportable_type, reportable_id, action })
        showToast(data.message || 'Action exécutée avec succès', 'success')
      }
      await fetchReports(currentPage)
    } catch (err: any) {
      const message = err?.response?.data?.message || "Erreur lors de l'exécution de l'action"
      showToast(message, 'error')
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
          <p className="text-text/60 mt-1">
            Examinez et traitez les contenus signalés (posts, commentaires, forums). Les signalements restent visibles jusqu&apos;à leur suppression manuelle.
          </p>
        </div>
      </div>

      <div className="bg-accent/30 border border-border/50 rounded-2xl overflow-hidden shadow-sm pb-4">
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-accent/40 text-text/60 text-sm">
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Cible (Extrait &amp; État)</th>
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
                reports.map((report: any, idx: number) => {
                  const badge = getReportTypeBadge(report.reportable_type)
                  const Icon = badge.icon
                  return (
                    <tr key={idx} className="hover:bg-accent/20 transition-colors">
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badge.color}`}>
                          <Icon size={12} /> {badge.label}
                        </span>
                      </td>
                    <td className="px-6 py-4">
                      <div className="max-w-[320px] flex flex-col gap-1.5">
                        <div className="truncate text-sm">
                          {report.target?.content ? (
                            <span className={report.is_deleted ? 'text-text/50 line-through' : 'text-text/90 font-medium'}>
                              &ldquo;{report.target.content}&rdquo;
                            </span>
                          ) : (
                            <span className="text-text/40 italic">Contenu indisponible</span>
                          )}
                        </div>

                        {/* Status Badges */}
                        <div className="flex flex-wrap items-center gap-1.5">
                          {report.author_warned && (
                            <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
                              <AlertTriangle size={10} /> Auteur averti (30m)
                            </span>
                          )}
                          {report.is_deleted ? (
                            <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 font-medium">
                              <Trash2 size={10} /> Contenu supprimé
                            </span>
                          ) : !report.author_warned ? (
                            <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
                              En attente
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500/10 text-red-500 font-bold text-sm border border-red-500/20">
                        {report.report_count}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-text/70">
                      <span className="font-medium text-text/90 block">{report.latest_reason || 'Aucune raison spécifiée'}</span>
                      {report.latest_details && (
                        <span className="block text-xs text-text/40 mt-1 truncate max-w-[220px]">{report.latest_details}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button 
                          onClick={() => setSelectedReport(report)}
                          className="p-2 hover:bg-accent rounded-full transition-colors text-primary hover:text-primary/80" 
                          title="Voir le contenu"
                        >
                          <ExternalLink size={18} />
                        </button>
                        
                        <div className="dropdown dropdown-end">
                          <div tabIndex={0} role="button" className="p-2 hover:bg-accent rounded-full transition-colors text-text/60 hover:text-text cursor-pointer">
                            <MoreVertical size={18} />
                          </div>
                          <ul tabIndex={0} className="dropdown-content z-10 menu p-2 shadow-xl bg-accent border border-border/50 rounded-box w-56 text-left mt-1">
                            <li className="menu-title px-4 py-1 text-xs text-text/50 font-semibold uppercase tracking-wider">Modération</li>
                            
                            <li>
                              <button 
                                onClick={() => handleAction(report.reportable_type, report.reportable_id, 'warn_user')} 
                                className={`text-sm ${report.author_warned ? 'text-text/50 font-normal' : 'text-amber-400 font-medium'}`}
                              >
                                {report.author_warned ? (
                                  <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-amber-400" /> Avertir à nouveau</span>
                                ) : (
                                  <span className="flex items-center gap-1.5"><AlertTriangle size={14} /> Avertir l&apos;auteur</span>
                                )}
                              </button>
                            </li>

                            <li>
                              <button 
                                disabled={report.is_deleted}
                                onClick={() => handleAction(report.reportable_type, report.reportable_id, 'delete_content')} 
                                className={`text-sm ${report.is_deleted ? 'text-text/30 cursor-not-allowed' : 'text-rose-400'}`}
                              >
                                {report.is_deleted ? 'Contenu déjà supprimé' : 'Supprimer le contenu'}
                              </button>
                            </li>

                            <div className="divider my-1 opacity-50"></div>
                            <li className="menu-title px-4 py-1 text-xs text-text/50 font-semibold uppercase tracking-wider">Gestion Panel</li>

                            <li>
                              <button 
                                onClick={() => handleAction(report.reportable_type, report.reportable_id, 'delete_report')} 
                                className="text-sm text-red-500 font-medium flex items-center gap-1.5 hover:bg-red-500/10"
                              >
                                <Trash2 size={14} /> Supprimer le signalement
                              </button>
                            </li>
                            <li>
                              <button 
                                onClick={() => handleAction(report.reportable_type, report.reportable_id, 'dismiss')} 
                                className="text-sm text-text/60"
                              >
                                Ignorer (Faux positif)
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              })
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

      {/* Modal pour afficher le contenu complet */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-accent border border-border/50 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-border/50 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <MessageSquare className="text-primary" size={24} />
                  Détails du Signalement ({getReportTypeBadge(selectedReport.reportable_type).label})
                </h3>
                <p className="text-xs text-text/50 mt-0.5">Raison : {selectedReport.latest_reason || 'Signalé par la communauté'}</p>
              </div>
              <button 
                onClick={() => setSelectedReport(null)}
                className="p-2 hover:bg-border/50 rounded-full transition-colors text-text/60 hover:text-text"
              >
                <XCircle size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              {/* Statuts info banners */}
              {selectedReport.author_warned && (
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-sm text-amber-300 flex items-center gap-2">
                  <AlertTriangle size={16} /> L&apos;auteur a déjà été averti et suspendu temporairement (30 minutes).
                </div>
              )}
              {selectedReport.is_deleted && (
                <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 text-sm text-rose-300 flex items-center gap-2">
                  <Trash2 size={16} /> Ce contenu a été supprimé de la plateforme (base de données et feed).
                </div>
              )}

              {selectedReport.target ? (
                <div className="space-y-4">
                  {selectedReport.target.user && (
                    <div className="flex items-center gap-3 pb-4 border-b border-border/30">
                      <div className="w-10 h-10 rounded-full bg-border overflow-hidden">
                        {selectedReport.target.user.avatar_url ? (
                          <img src={selectedReport.target.user.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-primary/20 text-primary font-bold">
                            {selectedReport.target.user.username?.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-bold">{selectedReport.target.user.username}</p>
                        <p className="text-xs text-text/50">Auteur du contenu signalé</p>
                      </div>
                    </div>
                  )}

                  {selectedReport.target.title && (
                    <div>
                      <label className="text-xs text-text/50 font-semibold uppercase tracking-wider block mb-1">Titre du sujet</label>
                      <div className="bg-background/60 p-3 rounded-xl text-text font-bold border border-border/30">
                        {selectedReport.target.title}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs text-text/50 font-semibold uppercase tracking-wider">Contenu du message</label>
                      {selectedReport.reportable_type === 'forum_topic' && !selectedReport.is_deleted && (
                        <a
                          href={`/forum/${selectedReport.reportable_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-medium"
                        >
                          <ExternalLink size={12} /> Voir sur le forum
                        </a>
                      )}
                      {selectedReport.reportable_type === 'post' && !selectedReport.is_deleted && (
                        <a
                          href={`/post/${selectedReport.reportable_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-medium"
                        >
                          <ExternalLink size={12} /> Voir le post
                        </a>
                      )}
                    </div>
                    <div className="bg-background/60 p-4 rounded-xl text-text whitespace-pre-wrap font-medium border border-border/30">
                      {selectedReport.target.content}
                    </div>
                  </div>

                  {selectedReport.latest_details && (
                    <div className="bg-accent/40 p-3 rounded-xl border border-border/30 text-xs text-text/70">
                      <span className="font-semibold text-text/90">Détails de la détection :</span> {selectedReport.latest_details}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-text/60 italic text-center py-8">Le contenu a probablement déjà été supprimé.</p>
              )}
            </div>
            
            <div className="p-4 border-t border-border/50 bg-background/30 flex flex-wrap items-center justify-between gap-3">
              <button 
                onClick={() => handleAction(selectedReport.reportable_type, selectedReport.reportable_id, 'delete_report')}
                className="btn btn-sm btn-ghost text-red-400 hover:bg-red-500/10 flex items-center gap-1.5"
                title="Supprimer ce signalement du panneau admin"
              >
                <Trash2 size={16} /> Supprimer le signalement
              </button>

              <div className="flex items-center gap-2">
                <button onClick={() => setSelectedReport(null)} className="btn btn-sm btn-ghost">
                  Fermer
                </button>
                
                <button 
                  onClick={() => handleAction(selectedReport.reportable_type, selectedReport.reportable_id, 'warn_user')} 
                  className={`btn btn-sm ${selectedReport.author_warned ? 'btn-ghost text-amber-400' : 'btn-warning'}`}
                >
                  <AlertTriangle size={14} /> {selectedReport.author_warned ? 'Avertir encore' : "Avertir l'auteur"}
                </button>

                {!selectedReport.is_deleted && (
                  <button 
                    onClick={() => handleAction(selectedReport.reportable_type, selectedReport.reportable_id, 'delete_content')} 
                    className="btn btn-sm btn-error"
                  >
                    Supprimer le contenu
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

