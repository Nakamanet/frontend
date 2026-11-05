'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Users, Hash, Shield, Flag, LayoutDashboard, ChevronLeft } from 'lucide-react'
import AdminGuard from './components/AdminGuard'

const SIDEBAR_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Utilisateurs', icon: Users },
  { href: '/admin/channels', label: 'Channels', icon: Hash },
  { href: '/admin/reports', label: 'Signalements', icon: Flag },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AdminGuard>
      <div className="flex min-h-[calc(100vh-80px)] bg-background">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border/50 bg-accent/30 hidden md:flex flex-col">
          <div className="p-6">
            <h2 className="text-xl font-bold flex items-center gap-2 text-primary">
              <Shield size={24} />
              <span>Admin Panel</span>
            </h2>
          </div>
          
          <nav className="flex-1 px-4 flex flex-col gap-2">
            {SIDEBAR_ITEMS.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-[12px] transition-all duration-200 ${
                    isActive 
                      ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20' 
                      : 'hover:bg-accent/80 text-text/70 hover:text-text'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t border-border/50">
            <Link 
              href="/"
              className="flex items-center gap-2 text-text/60 hover:text-text px-4 py-2 transition-colors"
            >
              <ChevronLeft size={20} />
              <span>Retour au site</span>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {/* Subtle background glow effect */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />
          
          <div className="flex-1 overflow-y-auto p-6 lg:p-10">
            <div className="max-w-6xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
    </AdminGuard>
  )
}
