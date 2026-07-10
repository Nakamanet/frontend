'use client'

import Link from 'next/link'
import { Users, Hash, Shield } from 'lucide-react'
import AdminGuard from './components/AdminGuard'

const SECTIONS = [
  { href: '/admin/users', label: 'Utilisateurs', icon: Users, description: 'Gérer les comptes, rôles et accès' },
  { href: '/admin/channels', label: 'Channels', icon: Hash, description: 'Gérer les salons de discussion' },
]

export default function AdminPage() {
  return (
    <AdminGuard>
      <div className="max-w-4xl mx-auto p-8 flex flex-col gap-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Shield size={24} className="text-primary" />
          Panneau d&apos;administration
        </h1>

        <div className="grid grid-cols-2 gap-4">
          {SECTIONS.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="bg-accent border border-border rounded-[15px] p-5 flex flex-col gap-2 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <section.icon size={20} className="text-primary" />
                <span className="font-semibold">{section.label}</span>
              </div>
              <p className="text-sm text-text/60">{section.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </AdminGuard>
  )
}
