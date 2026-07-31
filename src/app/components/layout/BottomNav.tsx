'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, MessageSquare, MessageCircle, Mail } from 'lucide-react'

const ITEMS = [
  { href: '/', label: 'Accueil', icon: Home },
  { href: '/bibliotheque', label: 'Bibliothèque', icon: BookOpen },
  { href: '/forum', label: 'Forum', icon: MessageSquare },
  { href: '/chat', label: 'Chat', icon: MessageCircle },
  { href: '/messages', label: 'Messages', icon: Mail },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-accent border-t border-border flex justify-around items-center h-16 z-50">
      {ITEMS.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={`flex flex-col items-center gap-1 text-xs ${pathname === href ? 'text-primary' : 'text-text-muted'}`}
        >
          <Icon size={22} />
          {label}
        </Link>
      ))}
    </nav>
  )
}
