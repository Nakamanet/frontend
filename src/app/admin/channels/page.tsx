'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getChannels, createChannel, updateChannel, deleteChannel, Channel } from '@/app/lib/channels'
import { useToast } from '@/app/context/ToastContext'
import Loader from '@/app/components/Loader'
import { Trash2, Pencil, Plus, Hash } from 'lucide-react'
import AdminGuard from '../components/AdminGuard'

const ICON_OPTIONS = ['hash', 'tag', 'book-open']
const GROUP_OPTIONS = ['Général', 'Genres', 'Œuvres']

export default function AdminChannelsPage() {
  const { showToast } = useToast()
  const queryClient = useQueryClient()

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({ room: '', label: '', group: 'Général', icon: 'hash' })

  const { data: channels = [], isLoading: loadingChannels } = useQuery<Channel[]>({
    queryKey: ['channels'],
    queryFn: getChannels,
    staleTime: 0,
    refetchOnMount: 'always',
  })

  const resetForm = () => {
    setForm({ room: '', label: '', group: 'Général', icon: 'hash' })
    setEditingId(null)
    setShowForm(false)
  }

  const { mutate: create, isPending: creating } = useMutation({
    mutationFn: () => createChannel({ room: form.room, label: form.label, group: form.group, icon: form.icon }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'channels'] })
      queryClient.invalidateQueries({ queryKey: ['channels'] })
      showToast('Channel créé', 'success')
      resetForm()
    },
    onError: (err: any) => showToast(err?.response?.data?.message ?? 'Erreur lors de la création', 'error'),
  })

  const { mutate: update, isPending: updating } = useMutation({
    mutationFn: () => updateChannel(editingId!, { label: form.label, group: form.group, icon: form.icon }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'channels'] })
      queryClient.invalidateQueries({ queryKey: ['channels'] })
      showToast('Channel mis à jour', 'success')
      resetForm()
    },
    onError: (err: any) => showToast(err?.response?.data?.message ?? 'Erreur lors de la mise à jour', 'error'),
  })

  const { mutate: remove } = useMutation({
    mutationFn: (id: string) => deleteChannel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'channels'] })
      queryClient.invalidateQueries({ queryKey: ['channels'] })
      showToast('Channel supprimé', 'success')
    },
    onError: (err: any) => showToast(err?.response?.data?.message ?? 'Erreur lors de la suppression', 'error'),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.room.trim() || !form.label.trim()) return
    if (editingId) {
      update()
    } else {
      create()
    }
  }

  const startEdit = (channel: Channel) => {
    setEditingId(channel._id)
    setForm({ room: channel.room, label: channel.label, group: channel.group, icon: channel.icon })
    setShowForm(true)
  }

  const handleDelete = (channel: Channel) => {
    if (channel.room === 'general') {
      showToast('Impossible de supprimer le channel general', 'error')
      return
    }
    if (confirm(`Supprimer le channel "${channel.label}" ?`)) {
      remove(channel._id)
    }
  }

  return (
    <AdminGuard>
      <div className="max-w-4xl mx-auto p-8 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Hash size={24} className="text-primary" />
            Gestion des channels
          </h1>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              resetForm()
              setShowForm(true)
            }}
          >
            <Plus size={16} />
            Nouveau channel
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-accent border border-border rounded-[15px] p-5 flex flex-col gap-3">
            <h2 className="font-semibold">{editingId ? 'Modifier le channel' : 'Nouveau channel'}</h2>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-text/60">Room ID (identifiant unique, ex: one-piece)</label>
              <input
                className="input input-bordered"
                value={form.room}
                onChange={(e) => setForm((f) => ({ ...f, room: e.target.value }))}
                disabled={!!editingId}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-text/60">Label affiché</label>
              <input
                className="input input-bordered"
                value={form.label}
                onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
                required
              />
            </div>

            <div className="flex gap-3">
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-sm text-text/60">Groupe</label>
                <select
                  className="select select-bordered"
                  value={form.group}
                  onChange={(e) => setForm((f) => ({ ...f, group: e.target.value }))}
                >
                  {GROUP_OPTIONS.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1 flex-1">
                <label className="text-sm text-text/60">Icône</label>
                <select
                  className="select select-bordered"
                  value={form.icon}
                  onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
                >
                  {ICON_OPTIONS.map((i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-2 justify-end mt-2">
              <button type="button" className="btn btn-ghost btn-sm" onClick={resetForm}>
                Annuler
              </button>
              <button type="submit" className="btn btn-primary btn-sm" disabled={creating || updating}>
                {editingId ? 'Mettre à jour' : 'Créer'}
              </button>
            </div>
          </form>
        )}

        {loadingChannels ? (
          <Loader />
        ) : (
          <div className="overflow-x-auto bg-accent border border-border rounded-[15px]">
            <table className="table">
              <thead>
                <tr>
                  <th>Room</th>
                  <th>Label</th>
                  <th>Groupe</th>
                  <th>Icône</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {channels.map((channel) => (
                  <tr key={channel._id}>
                    <td className="font-mono text-sm">{channel.room}</td>
                    <td>{channel.label}</td>
                    <td>{channel.group}</td>
                    <td>{channel.icon}</td>
                    <td className="flex gap-1">
                      <button className="btn btn-ghost btn-sm" onClick={() => startEdit(channel)}>
                        <Pencil size={14} />
                      </button>
                      <button
                        className="btn btn-ghost btn-sm text-error"
                        onClick={() => handleDelete(channel)}
                        disabled={channel.room === 'general'}
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminGuard>
  )
}
