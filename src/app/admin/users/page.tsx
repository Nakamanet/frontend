'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAdminUsers, updateAdminUser, deleteAdminUser, restoreAdminUser, AdminUser } from '@/app/lib/admin'
import { useAuth } from '@/app/context/AuthContext'
import { useToast } from '@/app/context/ToastContext'
import Loader from '@/app/components/Loader'
import { Trash2, RotateCcw, Shield } from 'lucide-react'

export default function AdminUsersPage() {
  const { user, isAuthLoading } = useAuth()
  const { showToast } = useToast()
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'users', { search, page }],
    queryFn: () => getAdminUsers({ search, page }),
    enabled: !isAuthLoading && !!user?.is_admin,
  })

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

  if (isAuthLoading) return <Loader />

  if (!user?.is_admin) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-text/60">Accès refusé.</p>
      </div>
    )
  }

  return (
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

      {isLoading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto bg-accent border border-border rounded-[15px]">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Rôle</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((u) => (
                <tr key={u.id} className={u.is_deleted ? 'opacity-50' : ''}>
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
                    {u.is_deleted ? (
                      <span className="badge badge-error">Désactivé</span>
                    ) : (
                      <span className="badge badge-success">Actif</span>
                    )}
                  </td>
                  <td>
                    {u.is_deleted ? (
                      <button
                        onClick={() => restoreUser(u.id)}
                        className="btn btn-ghost btn-sm text-success"
                        title="Restaurer"
                      >
                        <RotateCcw size={16} />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          if (confirm(`Désactiver le compte de ${u.username} ?`)) removeUser(u.id)
                        }}
                        className="btn btn-ghost btn-sm text-error"
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
  )
}
