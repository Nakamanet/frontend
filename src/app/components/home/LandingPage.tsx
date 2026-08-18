import Link from 'next/link'
import { PenLine, MessageCircle, Users, BookOpen, Star, Check } from 'lucide-react'

export type LandingTranslations = {
  heroLine1: string
  heroManga: string
  heroAnime: string
  heroLine3: string
  heroSubtitle: string
  heroCta: string
  heroCtaFeatures: string
  featurePosts: string
  featurePostsDesc: string
  featureChat: string
  featureChatDesc: string
  featureForum: string
  featureForumDesc: string
  featureLibrary: string
  featureLibraryDesc: string
  featureMyList: string
  featureMyListDesc: string
  row1Title: string
  row1TitleSub: string
  row1Desc: string
  row1b1: string
  row1b2: string
  row1b3: string
  row2Title: string
  row2TitleSub: string
  row2Desc: string
  row2b1: string
  row2b2: string
  row2b3: string
  row3Title: string
  row3TitleSub: string
  row3Desc: string
  row3b1: string
  row3b2: string
  row3b3: string
  row4Title: string
  row4TitleSub: string
  row4Desc: string
  row4b1: string
  row4b2: string
  row4b3: string
  row5Title: string
  row5TitleSub: string
  row5Desc: string
  row5b1: string
  row5b2: string
  row5b3: string
  ctaTitle: string
  ctaTitleSub: string
  ctaSubtitle1: string
  ctaSubtitle2: string
  ctaButton: string
  ctaBadge1: string
  ctaBadge2: string
  ctaBadge3: string
}

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

export default function LandingPage({ tr }: { tr: LandingTranslations }) {
  const FEATURES = [
    { icon: PenLine,       title: tr.featurePosts,   desc: tr.featurePostsDesc },
    { icon: MessageCircle, title: tr.featureChat,    desc: tr.featureChatDesc },
    { icon: Users,         title: tr.featureForum,   desc: tr.featureForumDesc },
    { icon: BookOpen,      title: tr.featureLibrary, desc: tr.featureLibraryDesc },
    { icon: Star,          title: tr.featureMyList,  desc: tr.featureMyListDesc },
  ]

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
              {tr.heroLine1}
              <br />
              <span className="text-manga">{tr.heroManga}</span>
              {' & '}
              <span className="text-anime">{tr.heroAnime}</span>,
              <br />
              {tr.heroLine3}
            </h1>
            <p className="text-text/55 text-lg leading-relaxed mb-10 max-w-md">
              {tr.heroSubtitle}
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/register"
                className="inline-flex items-center rounded-full px-8 py-3.5 text-base bg-primary hover:bg-primary/85 text-white font-bold transition-colors"
              >
                {tr.heroCta}
              </Link>
              <a
                href="#features"
                className="inline-flex items-center rounded-full px-8 py-3.5 text-base border border-border text-text font-bold hover:border-primary hover:bg-primary/10 transition-colors"
              >
                {tr.heroCtaFeatures}
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
            {tr.row1Title}
            <br />
            <span className="text-text/30">{tr.row1TitleSub}</span>
          </>
        }
        description={tr.row1Desc}
        bullets={[tr.row1b1, tr.row1b2, tr.row1b3]}
      />

      <FeatureRow
        id="feat-chat"
        tinted
        reverse
        title={
          <>
            {tr.row2Title}
            <br />
            <span className="text-text/30">{tr.row2TitleSub}</span>
          </>
        }
        description={tr.row2Desc}
        bullets={[tr.row2b1, tr.row2b2, tr.row2b3]}
      />

      <FeatureRow
        id="feat-forum"
        title={
          <>
            {tr.row3Title}
            <br />
            <span className="text-text/30">{tr.row3TitleSub}</span>
          </>
        }
        description={tr.row3Desc}
        bullets={[tr.row3b1, tr.row3b2, tr.row3b3]}
      />

      <FeatureRow
        id="feat-library"
        tinted
        reverse
        title={
          <>
            {tr.row4Title}
            <br />
            <span className="text-text/30">{tr.row4TitleSub}</span>
          </>
        }
        description={tr.row4Desc}
        bullets={[tr.row4b1, tr.row4b2, tr.row4b3]}
      />

      <FeatureRow
        id="feat-mylib"
        title={
          <>
            {tr.row5Title}
            <br />
            <span className="text-text/30">{tr.row5TitleSub}</span>
          </>
        }
        description={tr.row5Desc}
        bullets={[tr.row5b1, tr.row5b2, tr.row5b3]}
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
            {tr.ctaTitle}
            <br />
            {tr.ctaTitleSub}
          </h2>
          <p className="text-text/55 text-lg leading-relaxed mb-12">
            {tr.ctaSubtitle1}
            <br />
            {tr.ctaSubtitle2}
          </p>
          <div className="flex justify-center mb-10">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-base bg-primary hover:bg-primary/85 text-white font-bold transition-colors"
            >
              {tr.ctaButton}
            </Link>
          </div>
          <div className="flex items-center justify-center gap-6 flex-wrap text-text/45 text-sm">
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-primary" /> {tr.ctaBadge1}
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-primary" /> {tr.ctaBadge2}
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-primary" /> {tr.ctaBadge3}
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
