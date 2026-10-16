'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAnimes, getMangas } from '@/app/lib/catalogue'
import { getUserCount } from '@/app/lib/user'
import Loader from '@/app/components/Loader'
import Chat from '@/app/components/home/Chat'
import SocialGrid from '@/app/components/home/SocialGrid'
import {
  ChannelsPreview,
  ForumPreview,
  LibraryPreview,
  MyListPreview,
  PostsPreview,
} from '@/app/components/home/LandingPreviews'
import HaloBackdrop from '@/app/components/ui/HaloBackdrop'
import { FLOWER_PATH, PETAL_PATH, PeekingBlossoms } from '@/app/components/ui/Blossom'

function useCatalogTotal(type: 'anime' | 'manga') {
  return useQuery({
    queryKey: [type, 'total'],
    queryFn: async () => (await (type === 'anime' ? getAnimes(1, 1) : getMangas(1, 1))).meta.total,
    staleTime: 60 * 60 * 1000,
  })
}

function Figure({ value, label, isLoading }: { value?: number; label: string; isLoading?: boolean }) {
  return (
    <div className="px-3">
      <p className="text-2xl md:text-3xl font-extrabold">
        {isLoading ? <Loader variant="inline" size="sm" /> : value !== undefined ? value.toLocaleString('fr-FR') : '—'}
      </p>
      <p className="text-xs md:text-sm text-text/45 mt-1">{label}</p>
    </div>
  )
}

const BLOSSOMS = [
  { x: 70, y: 290, size: 1.5, rotate: 12 },
  { x: 40, y: 172, size: 1, rotate: -20 },
  { x: 128, y: 205, size: 0.7, rotate: 36 },
  { x: 62, y: 85, size: 0.55, rotate: 8 },
  { x: 190, y: 336, size: 1.1, rotate: -8 },
  { x: 292, y: 332, size: 0.8, rotate: 24 },
  { x: 372, y: 342, size: 0.5, rotate: -30 },
]

const PETALS = [
  { x: 150, y: 120, rotate: 35 },
  { x: 245, y: 300, rotate: -40 },
  { x: 440, y: 336, rotate: 70 },
  { x: 22, y: 30, rotate: 15 },
]

function Blossoms() {
  return (
    <svg viewBox="0 0 560 360" className="w-full h-full" fill="none">
      {BLOSSOMS.map((blossom, i) => (
        <g key={i} transform={`translate(${blossom.x} ${blossom.y}) rotate(${blossom.rotate}) scale(${blossom.size})`}>
          <path
            d={FLOWER_PATH}
            stroke="var(--yellow)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            strokeLinejoin="round"
          />
          <circle r="5" stroke="var(--primary)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </g>
      ))}
      {PETALS.map((petal, i) => (
        <path
          key={i}
          d={PETAL_PATH}
          transform={`translate(${petal.x} ${petal.y}) rotate(${petal.rotate}) scale(0.45)`}
          stroke="var(--yellow)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          opacity="0.7"
        />
      ))}
    </svg>
  )
}

function Reveal({ className = '', children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`${visible ? 'reveal-load' : 'reveal-pending'} ${className}`}>
      {children}
    </div>
  )
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
      <span className="text-text/70 text-[15px]">{children}</span>
    </div>
  )
}

function FeatureRow({
  id,
  reverse,
  title,
  description,
  bullets,
  tinted,
  visual,
}: {
  id: string
  reverse?: boolean
  title: React.ReactNode
  description: string
  bullets: string[]
  tinted?: boolean
  visual: React.ReactNode
}) {
  return (
    <section id={id} className={tinted ? 'bg-accent' : 'bg-bg'}>
      <Reveal className="max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-28 grid md:grid-cols-5 gap-14 md:gap-16 items-center">
        <div className={`md:col-span-3 ${reverse ? 'md:order-2' : ''}`}>
          <h2 className="text-3xl md:text-[44px] font-extrabold leading-[1.1] mb-5">{title}</h2>
          <p className="text-text/55 leading-relaxed mb-9 max-w-lg">{description}</p>
          <div className="flex flex-col gap-3">
            {bullets.map((b) => (
              <Bullet key={b}>{b}</Bullet>
            ))}
          </div>
        </div>
        <div className={`md:col-span-2 ${reverse ? 'md:order-1' : ''}`}>{visual}</div>
      </Reveal>
    </section>
  )
}

export default function LandingPage() {
  const mangaTotal = useCatalogTotal('manga')
  const animeTotal = useCatalogTotal('anime')
  const memberCount = useQuery({ queryKey: ['users', 'count'], queryFn: getUserCount, staleTime: 5 * 60 * 1000 })

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(225,16,72,0.22) 0%, rgba(225,16,72,0.06) 45%, transparent 70%)',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse 45% 60% at 0% 100%, color-mix(in srgb, var(--yellow) 26%, transparent) 0%, color-mix(in srgb, var(--yellow) 8%, transparent) 45%, transparent 75%)',
          }}
        />
        <div
          aria-hidden
          className="hidden min-[1440px]:block pointer-events-none absolute -bottom-6 -left-6 w-[35rem] h-[22.5rem]"
        >
          <Blossoms />
        </div>
        <div className="reveal-load max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-28 grid md:grid-cols-5 gap-14 items-center">
          <div className="md:col-span-3">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05] mb-6">
              Le réseau des fans
              <br />
              de <span className="text-manga">manga</span> &amp; d&apos;<span className="text-anime">anime</span>
            </h1>
            <p className="text-text/55 text-lg leading-relaxed mb-10 max-w-md">
              Suivez les œuvres que vous lisez et regardez, échangez avec d&apos;autres passionnés et trouvez votre
              prochaine série dans un catalogue de plus de 80 000 titres.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/register"
                className="inline-flex items-center rounded-full px-8 py-3.5 text-base bg-primary hover:bg-primary/85 text-white font-bold transition-colors"
              >
                Créer un compte
              </Link>
              <a
                href="#feat-posts"
                className="inline-flex items-center rounded-full px-8 py-3.5 text-base border border-border text-text font-bold hover:border-primary hover:bg-primary/10 transition-colors"
              >
                Découvrir le site
              </a>
            </div>
            <p className="text-sm text-text/45 mt-6">
              Déjà membre ?{' '}
              <Link href="/login" className="text-text/80 font-semibold hover:text-primary transition-colors">
                Se connecter
              </Link>
            </p>
          </div>

          <div className="relative md:col-span-2">
            <HaloBackdrop solid={false} fade className="absolute -inset-24" />
            <PeekingBlossoms />
            <div className="relative z-10">
              <Chat user={null} />
            </div>
          </div>
        </div>
      </section>

      <FeatureRow
        id="feat-posts"
        visual={<PostsPreview />}
        tinted
        title={
          <>
            Partagez ce que vous lisez
            <br />
            <span className="text-text/30">et ce que vous regardez</span>
          </>
        }
        description="Publiez vos réactions sur un chapitre ou un épisode, mentionnez vos amis et répondez aux posts des autres membres."
        bullets={[
          'Fil d’actualité : tendances, récents ou amis uniquement',
          'Likes, commentaires et mentions avec @',
          'Posts sauvegardés pour les retrouver plus tard',
        ]}
      />

      <FeatureRow
        id="feat-chat"
        visual={<ChannelsPreview />}
        reverse
        title={
          <>
            Discutez en direct,
            <br />
            <span className="text-text/30">en salon ou en privé</span>
          </>
        }
        description="Rejoignez les salons pour échanger en temps réel avec la communauté, ou écrivez directement à vos amis."
        bullets={[
          'Salons de discussion classés par thème',
          'Messages privés avec vos amis',
          'Notifications pour les demandes d’ami',
        ]}
      />

      <FeatureRow
        id="feat-forum"
        visual={<ForumPreview />}
        tinted
        title={
          <>
            Des discussions qui durent,
            <br />
            <span className="text-text/30">sujet par sujet</span>
          </>
        }
        description="Ouvrez un sujet, répondez aux autres membres et votez pour les messages qui font avancer la discussion."
        bullets={[
          'Catégories : Général, Anime, Manga, Recommandations, Spoilers',
          'Votes sur les sujets et les réponses',
          'Sujets épinglés pour garder vos favoris sous la main',
        ]}
      />

      <FeatureRow
        id="feat-library"
        visual={<LibraryPreview />}
        reverse
        title={
          <>
            Plus de 80 000 mangas et animes
            <br />
            <span className="text-text/30">à explorer</span>
          </>
        }
        description="Parcourez le catalogue par genre et ouvrez la fiche de chaque œuvre : synopsis, personnages, doubleurs, épisodes et chapitres."
        bullets={[
          'Une fiche détaillée pour chaque manga et anime',
          'Personnages et doubleurs de chaque œuvre',
          'Les œuvres les plus suivies par la communauté en tête',
        ]}
      />

      <FeatureRow
        id="feat-mylib"
        visual={<MyListPreview />}
        tinted
        title={
          <>
            Gardez le fil
            <br />
            <span className="text-text/30">de tout ce que vous suivez</span>
          </>
        }
        description="Ajoutez une œuvre à votre liste en un clic, indiquez où vous en êtes et retrouvez votre bibliothèque sur votre profil."
        bullets={[
          'Statuts : à lire ou à regarder, en cours, terminé, en pause, abandonné',
          'Bibliothèque visible sur votre profil',
          'Profil public, réservé à vos amis ou privé',
        ]}
      />

      <section>
        <Reveal className="max-w-2xl mx-auto px-6 py-24 md:py-32 text-center">
          <SocialGrid />
        </Reveal>
      </section>

      {/* CTA */}
      <section className="relative overflow-clip border-t border-border bg-accent">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: 'radial-gradient(ellipse 60% 60% at 50% 0%, rgba(225,16,72,0.18) 0%, transparent 65%)',
          }}
        />
        <Reveal className="max-w-2xl mx-auto px-6 py-24 md:py-32 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-[1.08] mb-6">
            Trouvez vos
            <br />
            <span className="text-primary">nakama</span>
          </h2>
          <p className="text-text/55 text-lg leading-relaxed mb-12">
            Créez votre compte, ajoutez vos premières œuvres
            <br className="hidden md:block" /> et retrouvez des membres qui partagent vos goûts.
          </p>
          <div className="flex justify-center gap-3 flex-wrap mb-14">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-base bg-primary hover:bg-primary/85 text-white font-bold transition-colors"
            >
              Créer un compte
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center rounded-full px-8 py-3.5 text-base border border-border text-text font-bold hover:border-primary hover:bg-primary/10 transition-colors"
            >
              Se connecter
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
