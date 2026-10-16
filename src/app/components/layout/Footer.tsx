'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useQueries, useQuery } from '@tanstack/react-query'
import { Flame } from 'lucide-react'
import { getPopularity } from '@/app/lib/library'
import { getAnimeById, getMangaById } from '@/app/lib/catalogue'
import { Blossom } from '@/app/components/ui/Blossom'
import { SOCIAL_LINKS } from '@/app/components/ui/SocialLinks'

const COLUMNS = [
  {
    title: 'Explorer',
    links: [
      { href: '/bibliotheque', label: 'Bibliothèque' },
      { href: '/forum', label: 'Forum' },
      { href: '/chat', label: 'Chat' },
    ],
  },
  {
    title: 'Mon espace',
    links: [
      { href: '/profil', label: 'Profil' },
    ],
  },
]

const LEGAL = [
  { href: '/mentions-legales', label: 'Mentions légales' },
  { href: '/donnees-personnelles', label: 'Données personnelles', prefetch: false },
]

function MostFollowed({ type, title }: { type: 'anime' | 'manga'; title: string }) {
  const { data: popularity = [] } = useQuery({
    queryKey: ['library', 'popularity', type],
    queryFn: () => getPopularity(type),
    staleTime: 5 * 60 * 1000,
    retry: false,
  })

  const works = useQueries({
    queries: popularity.slice(0, 3).map((entry) => ({
      queryKey: [type, entry.id],
      queryFn: () => (type === 'anime' ? getAnimeById(entry.id) : getMangaById(entry.id)),
      staleTime: 5 * 60 * 1000,
    })),
  })
    .map((result) => result.data)
    .filter((work) => work !== undefined)

  if (works.length === 0) return null

  return (
    <div className="col-span-2 md:col-span-1 min-w-0">
      <h3 className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/40 font-semibold mb-3">
        <Flame size={14} className="text-primary" />
        {title}
      </h3>
      <ul className="flex flex-col gap-1">
        {works.map((work, i) => (
          <li key={work.id}>
            <Link
              href={`/bibliotheque/${type}/${work.slug}`}
              className="flex items-center gap-3 hover:bg-base-200/50 rounded-[8px] p-1 transition-colors"
            >
              <span className="text-sm font-bold text-primary w-4 text-center">{i + 1}</span>
              <Image
                src={work.posterImage || '/bg.png'}
                alt={work.titleEn || work.titleJp || ''}
                width={32}
                height={45}
                className="rounded object-cover shrink-0"
              />
              <span className="text-sm text-white/70 truncate">{work.titleEn || work.titleJp}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="relative overflow-clip border-t border-border bg-bg shrink-0 mt-auto">
      <div className="relative max-w-[1500px] mx-auto px-6 md:px-10 pt-12">
        <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-10 xl:gap-20">
          <div className="flex items-center gap-5">
            <Link href="/" className="shrink-0">
              <Image src="/logo.png" alt="NakamaNet" width={72} height={90} />
            </Link>
            <div className="flex flex-col gap-3">
              <p className="text-sm text-white/60 leading-relaxed">
                La communauté des fans de <span className="text-manga font-semibold">manga</span> et d&apos;
                <span className="text-anime font-semibold">anime</span>
              </p>
              <div className="flex items-center gap-4 text-white/60">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-label={link.label}
                    {...(link.href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                    className="hover:text-primary transition-colors"
                  >
                    {link.icon(20)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-[auto_auto_auto_auto] gap-x-10 gap-y-8 xl:gap-x-12">
            {COLUMNS.map((column) => (
              <div key={column.title}>
                <h3 className="text-xs uppercase tracking-[0.2em] text-white/40 font-semibold mb-4">{column.title}</h3>
                <ul className="flex flex-col gap-3 text-sm text-white/70">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="hover:text-primary transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <MostFollowed type="manga" title="Top Mangas" />
            <MostFollowed type="anime" title="Top Animes" />
          </div>
        </div>

        <div className="flex justify-center mt-12 pb-24 md:pb-10 z-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-2 text-sm">
            <p className="w-fit bg-bg px-2 -mx-2 rounded text-white/30">© {new Date().getFullYear()} NakamaNet</p>
            {LEGAL.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={link.prefetch}
                className="w-fit bg-bg px-2 -mx-2 rounded text-white/50 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <Blossom
          className="pointer-events-none absolute -bottom-40 -left-20 w-96 h-96 z-0"
          style={{ transform: 'rotate(18deg)' }}
        />
      </div>
    </footer>
  )
}
