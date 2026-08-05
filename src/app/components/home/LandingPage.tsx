
import Link from 'next/link'
import { PenLine, MessageCircle, Users, BookOpen, Star, Check } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

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

export default async function LandingPage() {
  const t = await getTranslations('landing')

  const FEATURES = [
    { icon: PenLine,       title: t('featurePosts'),   desc: t('featurePostsDesc') },
    { icon: MessageCircle, title: t('featureChat'),    desc: t('featureChatDesc') },
    { icon: Users,         title: t('featureForum'),   desc: t('featureForumDesc') },
    { icon: BookOpen,      title: t('featureLibrary'), desc: t('featureLibraryDesc') },
    { icon: Star,          title: t('featureMyList'),  desc: t('featureMyListDesc') },
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
              {t('heroLine1')}
              <br />
              <span className="text-manga">{t('heroManga')}</span>
              {' & '}
              <span className="text-anime">{t('heroAnime')}</span>,
              <br />
              {t('heroLine3')}
            </h1>
            <p className="text-text/55 text-lg leading-relaxed mb-10 max-w-md">
              {t('heroSubtitle')}
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/register"
                className="inline-flex items-center rounded-full px-8 py-3.5 text-base bg-primary hover:bg-primary/85 text-white font-bold transition-colors"
              >
                {t('heroCta')}
              </Link>
              <a
                href="#features"
                className="inline-flex items-center rounded-full px-8 py-3.5 text-base border border-border text-text font-bold hover:border-primary hover:bg-primary/10 transition-colors"
              >
                {t('heroCtaFeatures')}
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
            {t('row1Title')}
            <br />
            <span className="text-text/30">{t('row1TitleSub')}</span>
          </>
        }
        description={t('row1Desc')}
        bullets={[t('row1b1'), t('row1b2'), t('row1b3')]}
      />

      <FeatureRow
        id="feat-chat"
        tinted
        reverse
        title={
          <>
            {t('row2Title')}
            <br />
            <span className="text-text/30">{t('row2TitleSub')}</span>
          </>
        }
        description={t('row2Desc')}
        bullets={[t('row2b1'), t('row2b2'), t('row2b3')]}
      />

      <FeatureRow
        id="feat-forum"
        title={
          <>
            {t('row3Title')}
            <br />
            <span className="text-text/30">{t('row3TitleSub')}</span>
          </>
        }
        description={t('row3Desc')}
        bullets={[t('row3b1'), t('row3b2'), t('row3b3')]}
      />

      <FeatureRow
        id="feat-library"
        tinted
        reverse
        title={
          <>
            {t('row4Title')}
            <br />
            <span className="text-text/30">{t('row4TitleSub')}</span>
          </>
        }
        description={t('row4Desc')}
        bullets={[t('row4b1'), t('row4b2'), t('row4b3')]}
      />

      <FeatureRow
        id="feat-mylib"
        title={
          <>
            {t('row5Title')}
            <br />
            <span className="text-text/30">{t('row5TitleSub')}</span>
          </>
        }
        description={t('row5Desc')}
        bullets={[t('row5b1'), t('row5b2'), t('row5b3')]}
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
            {t('ctaTitle')}
            <br />
            {t('ctaTitleSub')}
          </h2>
          <p className="text-text/55 text-lg leading-relaxed mb-12">
            {t('ctaSubtitle1')}
            <br />
            {t('ctaSubtitle2')}
          </p>
          <div className="flex justify-center mb-10">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-base bg-primary hover:bg-primary/85 text-white font-bold transition-colors"
            >
              {t('ctaButton')}
            </Link>
          </div>
          <div className="flex items-center justify-center gap-6 flex-wrap text-text/45 text-sm">
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-primary" /> {t('ctaBadge1')}
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-primary" /> {t('ctaBadge2')}
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-primary" /> {t('ctaBadge3')}
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
