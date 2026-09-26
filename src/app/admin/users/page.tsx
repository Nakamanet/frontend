'use client'

import { useState, useEffect } from 'react'
import { Search, Shield, Ban, CheckCircle2, XCircle, MoreVertical } from 'lucide-react'
import api from '@/app/lib/axios'

export default function AdminUsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)

  useEffect(() => {
    fetchUsers(search, currentPage)
  }, [currentPage])

  const fetchUsers = async (query = '', page = 1) => {
    setLoading(true)
    setError('')
    try {
      const { data } = await api.get(`/admin/users?search=${query}&page=${page}`)
      setUsers(data.data || [])
      setCurrentPage(data.current_page || 1)
      setLastPage(data.last_page || 1)
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchUsers(search, 1)
  }

  const toggleBan = async (user: any) => {
    try {
      if (user.is_deleted) {
        await api.post(`/admin/users/${user.id}/restore`)
      } else {
        await api.delete(`/admin/users/${user.id}`)
      }
      fetchUsers(search, currentPage)
    } catch (err) {
      alert("Erreur lors de la modification du statut")
    }
  }

  const changeRole = async (userId: number, role: string) => {
    try {
      await api.patch(`/admin/users/${userId}`, { role })
      fetchUsers(search, currentPage)
    } catch (err) {
      alert("Erreur lors de la modification du rôle")
    }
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Utilisateurs</h1>
          <p className="text-text/60 mt-1">Gérez les accès, les rôles et les sanctions des membres.</p>
        </div>
      </div>

      <div className="bg-accent/30 border border-border/50 rounded-2xl overflow-hidden shadow-sm pb-4">
        <div className="p-4 border-b border-border/50 bg-accent/50 flex justify-between items-center">
          <form onSubmit={handleSearch} className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text/40" size={18} />
            <input 
              type="text" 
              placeholder="Rechercher par pseudo ou email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-background border border-border/50 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary/50 transition-colors"
            />
          </form>
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-accent/40 text-text/60 text-sm">
                <th className="px-6 py-4 font-medium">Utilisateur</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Rôle</th>
                <th className="px-6 py-4 font-medium">Statut</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-text/60">
                    <div className="inline-block w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mb-2" />
                    <p>Chargement des utilisateurs...</p>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-red-400">
                    <XCircle className="mx-auto mb-2 opacity-50" size={32} />
                    <p>{error}</p>
                    <button onClick={() => fetchUsers(search, currentPage)} className="mt-4 text-primary hover:underline text-sm">
                      Réessayer
                    </button>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-text/60">
                    <Search className="mx-auto mb-2 opacity-50" size={32} />
                    <p>Aucun utilisateur trouvé.</p>
                  </td>
                </tr>
              ) : (
                users.map((user: any) => (
                  <tr key={user.id} className="hover:bg-accent/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center font-bold text-primary overflow-hidden shrink-0">
                          {user.avatar_url ? (
                            <img src={user.avatar_url} alt={user.username} className="w-full h-full object-cover" />
                          ) : (
                            user.username.charAt(0).toUpperCase()
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold">{user.username}</span>
                          <span className="text-xs text-text/50">@{user.handle || user.username}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.is_admin 
                          ? 'bg-red-500/10 text-red-500 border border-red-500/20' 
                          : user.is_moderator 
                          ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                          : 'bg-accent text-text/70 border border-border/50'
                      }`}>
                        {user.is_admin ? 'Admin' : user.is_moderator ? 'Modérateur' : 'Utilisateur'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {user.is_deleted ? (
                        <span className="inline-flex items-center gap-1 text-red-400 text-sm">
                          <Ban size={14} /> Banni
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-green-500 text-sm">
                          <CheckCircle2 size={14} /> Actif
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="p-2 hover:bg-accent rounded-full transition-colors text-text/60 hover:text-text cursor-pointer">
                          <MoreVertical size={18} />
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-10 menu p-2 shadow bg-accent border border-border/50 rounded-box w-48 text-left mt-1">
                          <li className="menu-title px-4 py-1 text-xs text-text/50 font-semibold uppercase tracking-wider">Changer rôle</li>
                          <li><button onClick={() => changeRole(user.id, 'user')} className="text-sm">Utilisateur</button></li>
                          <li><button onClick={() => changeRole(user.id, 'moderator')} className="text-sm">Modérateur</button></li>
                          <li><button onClick={() => changeRole(user.id, 'admin')} className="text-sm">Admin</button></li>
                          <div className="divider my-1 opacity-50"></div>
                          <li>
                            <button onClick={() => toggleBan(user)} className={`text-sm ${user.is_deleted ? 'text-green-500' : 'text-red-500'}`}>
                              {user.is_deleted ? 'Débannir' : 'Bannir'}
                            </button>
                          </li>
                        </ul>
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
