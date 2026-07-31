'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAdminUsers, updateAdminUser, deleteAdminUser, restoreAdminUser, forceDeleteAdminUser, AdminUser } from '@/app/lib/admin'
import { useToast } from '@/app/context/ToastContext'
import Loader from '@/app/components/Loader'
import { Trash2, RotateCcw, Shield, CheckCircle2, XCircle } from 'lucide-react'
import AdminGuard from '../components/AdminGuard'

export default function AdminUsersPage() {
  const { showToast } = useToast()
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'users', { search, page }],
    queryFn: () => getAdminUsers({ search, page }),
  })

  const users = data?.data ?? []
  const allSelected = users.length > 0 && users.every((u) => selectedIds.has(u.id))
  const someSelected = selectedIds.size > 0

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(users.map((u) => u.id)))
    }
  }

  const toggleOne = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const clearSelection = () => setSelectedIds(new Set())

  const { mutate: updateRole } = useMutation({
    mutationFn: ({ id, role }: { id: number; role: string }) => updateAdminUser(id, { role: role as AdminUser['role'] }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] })
      showToast('Rôle mis à jour', 'success')
    },
    onError: () => showToast('Erreur lors de la mise à jour du rôle', 'error'),
  })

  const { mutate: removeUser } = useMutation({
    mutationFn: (id: number) => deleteAdminUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] })
      showToast('Utilisateur désactivé', 'success')
    },
    onError: () => showToast('Erreur lors de la désactivation', 'error'),
  })

  const { mutate: restoreUser } = useMutation({
    mutationFn: (id: number) => restoreAdminUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] })
      showToast('Utilisateur restauré', 'success')
    },
    onError: () => showToast('Erreur lors de la restauration', 'error'),
  })

  const { mutate: forceDeleteUser } = useMutation({
    mutationFn: (id: number) => forceDeleteAdminUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] })
      showToast('Utilisateur supprimé définitivement', 'success')
    },
    onError: () => showToast('Erreur lors de la suppression définitive', 'error'),
  })

  const { mutate: bulkDisable, isPending: bulkDisabling } = useMutation({
    mutationFn: async (ids: number[]) => {
      await Promise.all(ids.map((id) => deleteAdminUser(id)))
    },
    onSuccess: (_data, ids) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] })
      showToast(`${ids.length} compte(s) désactivé(s)`, 'success')
      clearSelection()
    },
    onError: () => showToast('Erreur lors de la désactivation groupée', 'error'),
  })

  const { mutate: bulkForceDelete, isPending: bulkForceDeleting } = useMutation({
    mutationFn: async (ids: number[]) => {
      await Promise.all(ids.map((id) => forceDeleteAdminUser(id)))
    },
    onSuccess: (_data, ids) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] })
      showToast(`${ids.length} compte(s) supprimé(s) définitivement`, 'success')
      clearSelection()
    },
    onError: () => showToast('Erreur lors de la suppression groupée', 'error'),
  })

  const handleBulkDisable = () => {
    const ids = Array.from(selectedIds)
    if (confirm(`Désactiver ${ids.length} compte(s) sélectionné(s) ?`)) {
      bulkDisable(ids)
    }
  }

  const handleBulkForceDelete = () => {
    const eligibleIds = users.filter((u) => selectedIds.has(u.id) && u.is_deleted).map((u) => u.id)

    if (eligibleIds.length === 0) {
      showToast('Seuls les comptes déjà désactivés peuvent être supprimés définitivement', 'error')
      return
    }

    if (confirm(`Supprimer DÉFINITIVEMENT ${eligibleIds.length} compte(s) ? Cette action est irréversible.`)) {
      bulkForceDelete(eligibleIds)
    }
  }

  return (
    <AdminGuard>
      <div className="max-w-6xl mx-auto p-8 flex flex-col gap-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Shield size={24} className="text-primary" />
          Gestion des utilisateurs
        </h1>

        <input
          type="text"
          placeholder="Rechercher par nom ou email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
          className="input input-bordered w-full max-w-md"
        />

        {someSelected && (
          <div className="flex items-center gap-3 bg-base-200 border border-border rounded-[15px] px-4 py-2">
            <span className="text-sm font-medium">{selectedIds.size} sélectionné(s)</span>
            <button
              className="btn btn-ghost btn-sm text-primary"
              onClick={handleBulkDisable}
              disabled={bulkDisabling}
            >
              Désactiver la sélection
            </button>
            <button
              className="btn btn-ghost btn-sm text-error"
              onClick={handleBulkForceDelete}
              disabled={bulkForceDeleting}
            >
              Supprimer définitivement
            </button>
            <button className="btn btn-ghost btn-sm ml-auto" onClick={clearSelection}>
              Annuler
            </button>
          </div>
        )}

        {isLoading ? (
          <Loader />
        ) : (
          <div className="overflow-x-auto bg-accent border border-border rounded-[15px]">
            <table className="table">
              <thead>
                <tr>
                  <th>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-primary border-2 border-border"
                    checked={allSelected}
                    onChange={toggleAll}
                  />
                  </th>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Rôle</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className={u.is_deleted ? 'opacity-50' : ''}>
                    <td>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm checkbox-primary border-2 border-border"
                        checked={selectedIds.has(u.id)}
                        onChange={() => toggleOne(u.id)}
                      />
                    </td>
                    <td>{u.id}</td>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                    <td>
                      <select
                        className="select select-bordered select-sm"
                        value={u.role}
                        onChange={(e) => updateRole({ id: u.id, role: e.target.value })}
                        disabled={u.is_deleted}
                      >
                        <option value="user">User</option>
                        <option value="moderator">Moderator</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          u.is_deleted
                            ? 'bg-error/10 text-error'
                            : 'bg-success/10 text-success'
                        }`}
                      >
                        {u.is_deleted ? <XCircle size={13} /> : <CheckCircle2 size={13} />}
                        {u.is_deleted ? 'Désactivé' : 'Actif'}
                      </span>
                    </td>
                    <td className="flex gap-1">
                      {u.is_deleted ? (
                        <>
                          <button
                            onClick={() => restoreUser(u.id)}
                            className="btn btn-ghost btn-sm text-success"
                            title="Restaurer"
                          >
                            <RotateCcw size={16} />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Supprimer DÉFINITIVEMENT le compte de ${u.username} ? Cette action est irréversible.`)) {
                                forceDeleteUser(u.id)
                              }
                            }}
                            className="btn btn-ghost btn-sm text-error"
                            title="Supprimer définitivement"
                          >
                            <Trash2 size={16} />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            if (confirm(`Désactiver le compte de ${u.username} ?`)) removeUser(u.id)
                          }}
                          className="btn btn-ghost btn-sm text-primary"
                          title="Désactiver"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {data && data.last_page > 1 && (
          <div className="flex justify-center gap-2">
            <button
              className="btn btn-sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Précédent
            </button>
            <span className="flex items-center px-3 text-sm">
              Page {data.current_page} / {data.last_page}
            </span>
            <button
              className="btn btn-sm"
              disabled={page >= data.last_page}
              onClick={() => setPage((p) => p + 1)}
            >
              Suivant
            </button>
          </div>
        )}
      </div>
    </AdminGuard>
  )
}
