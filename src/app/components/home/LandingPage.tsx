import Link from 'next/link'
import { PenLine, MessageCircle, Users, BookOpen, Star, Check } from 'lucide-react'

const FEATURES = [
  { icon: PenLine, title: 'Posts', desc: 'Partage & découverte' },
  { icon: MessageCircle, title: 'Chat temps réel', desc: 'En direct' },
  { icon: Users, title: 'Forum', desc: 'Discussions longues' },
  { icon: BookOpen, title: 'Bibliothèque', desc: 'Catalogue complet' },
  { icon: Star, title: 'Ma liste', desc: 'Suivi personnel' },
]

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
      <span className="text-text/70 text-[15px]">{children}</span>
    </div>
  )
}

function IllustrationPlaceholder({ className = '' }: { className?: string }) {
  return <div className={`w-full aspect-4/3 rounded-2xl bg-primary ${className}`} />
}

function FeatureRow({
  id,
  reverse,
  title,
  description,
  bullets,
  tinted,
}: {
  id: string
  reverse?: boolean
  title: React.ReactNode
  description: string
  bullets: string[]
  tinted?: boolean
}) {
  return (
    <section id={id} className={tinted ? 'bg-accent/30' : ''}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-28 grid md:grid-cols-5 gap-14 md:gap-16 items-center">
        <div className={`md:col-span-3 ${reverse ? 'md:order-2' : ''}`}>
          <h2 className="text-3xl md:text-[44px] font-extrabold leading-[1.1] mb-5">{title}</h2>
          <p className="text-text/55 leading-relaxed mb-9 max-w-lg">{description}</p>
          <div className="flex flex-col gap-3">
            {bullets.map((b) => (
              <Bullet key={b}>{b}</Bullet>
            ))}
          </div>
        </div>
        <div className={`md:col-span-2 ${reverse ? 'md:order-1' : ''}`}>
          <IllustrationPlaceholder />
        </div>
      </div>
    </section>
  )
}

export default function LandingPage() {
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
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-28 grid md:grid-cols-5 gap-14 items-center">
          <div className="md:col-span-3">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05] mb-6">
              Toute ta culture
              <br />
              <span className="text-manga">manga</span> &amp; <span className="text-anime">anime</span>,
              <br />
              en un seul lieu.
            </h1>
            <p className="text-text/55 text-lg leading-relaxed mb-10 max-w-md">
              Suis tes œuvres, partage avec la communauté en temps réel et découvre ta prochaine série préférée.
              Gratuit, pour toujours.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/register"
                className="inline-flex items-center rounded-full px-8 py-3.5 text-base bg-primary hover:bg-primary/85 text-white font-bold transition-colors"
              >
                Rejoindre Nakamanet
              </Link>
              <a
                href="#features"
                className="inline-flex items-center rounded-full px-8 py-3.5 text-base border border-border text-text font-bold hover:border-primary hover:bg-primary/10 transition-colors"
              >
                Voir les fonctionnalités
              </a>
            </div>
          </div>

          <div className="hidden md:block md:col-span-2">
            <IllustrationPlaceholder />
          </div>
        </div>
      </section>

      {/* Features strip */}
      <div id="features" className="border-y border-border bg-accent/30">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-5">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className={`flex items-center gap-3 py-6 px-2 md:px-4 ${
                i !== 0 ? 'md:border-l border-border' : ''
              }`}
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <f.icon size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold">{f.title}</p>
                <p className="text-xs text-text/40">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FeatureRow
        id="feat-posts"
        title={
          <>
            Partage tes coups de cœur en temps réel
            <br />
            <span className="text-text/30">avec la communauté.</span>
          </>
        }
        description="Poste tes réactions à chaud, partage des panels marquants et explore le feed de ta communauté en temps réel."
        bullets={[
          'Feed personnalisé selon tes abonnements',
          'Tags automatiques par série et catégorie',
          'Tendances et classements en direct',
        ]}
      />

      <FeatureRow
        id="feat-chat"
        tinted
        reverse
        title={
          <>
            Échange en direct avec des fans
            <br />
            <span className="text-text/30">du monde entier.</span>
          </>
        }
        description="Des salons thématiques organisés par série, genre ou événement. Rejoins la conversation live pendant les sorties de chapitres et d'épisodes."
        bullets={[
          'Canaux organisés par série et genre',
          'Messages en temps réel sans délai',
          'Notifications live lors des sorties',
        ]}
      />

      <FeatureRow
        id="feat-forum"
        title={
          <>
            Des débats en profondeur
            <br />
            <span className="text-text/30">sur tes séries préférées.</span>
          </>
        }
        description="Crée des fils de discussion détaillés, vote pour les meilleures analyses et retrouve toutes les théories de la communauté organisées par série."
        bullets={[
          'Fils de discussion longs et structurés',
          'Catégories : Anime, Manga, Sorties, Théories',
          'Système de votes et top contributeurs',
        ]}
      />

      <FeatureRow
        id="feat-library"
        tinted
        reverse
        title={
          <>
            48 000 manga &amp; anime
            <br />
            <span className="text-text/30">dans une seule base de données.</span>
          </>
        }
        description="Explore le catalogue complet, filtre par genre, statut ou popularité et accède aux fiches détaillées avec synopsis, personnages, épisodes et liens de streaming."
        bullets={[
          'Fiches détaillées manga et anime',
          'Synopsis, personnages et épisodes',
          'Liens streaming, calendrier des sorties',
        ]}
      />

      <FeatureRow
        id="feat-mylib"
        title={
          <>
            Gère ta collection,
            <br />
            <span className="text-text/30">série par série.</span>
          </>
        }
        description="Marque tes œuvres comme « en cours », « terminées » ou « à voir », note chaque chapitre et retrouve d'un coup d'œil où tu en es dans chaque série."
        bullets={[
          'Statuts : En cours, Terminé, À voir, Abandonné',
          'Suivi du chapitre ou épisode actuel',
          'Statistiques personnelles de visionnage',
        ]}
      />

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-border">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse 60% 60% at 50% 0%, rgba(225,16,72,0.18) 0%, transparent 65%)',
          }}
        />
        <div className="max-w-2xl mx-auto px-6 py-24 md:py-32 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-[1.08] mb-6">
            Ta communauté otaku
            <br />
            t&apos;attend déjà.
          </h2>
          <p className="text-text/55 text-lg leading-relaxed mb-12">
            Gratuit pour toujours. Aucune carte requise.
            <br />
            Lance-toi en moins de 30 secondes.
          </p>
          <div className="flex justify-center mb-10">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-base bg-primary hover:bg-primary/85 text-white font-bold transition-colors"
            >
              Créer mon compte gratuit
            </Link>
          </div>
          <div className="flex items-center justify-center gap-6 flex-wrap text-text/45 text-sm">
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-primary" /> 100% gratuit
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-primary" /> Sans carte bancaire
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-primary" /> Inscription en 30 secondes
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
