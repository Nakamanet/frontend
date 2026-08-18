import { getTranslations } from 'next-intl/server'
import HomePageClient from './components/home/HomePageClient'
import type { LandingTranslations } from './components/home/LandingPage'

export default async function Page() {
  const t = await getTranslations('landing')

  const tr: LandingTranslations = {
    heroLine1: t('heroLine1'), heroManga: t('heroManga'), heroAnime: t('heroAnime'),
    heroLine3: t('heroLine3'), heroSubtitle: t('heroSubtitle'),
    heroCta: t('heroCta'), heroCtaFeatures: t('heroCtaFeatures'),
    featurePosts: t('featurePosts'), featurePostsDesc: t('featurePostsDesc'),
    featureChat: t('featureChat'), featureChatDesc: t('featureChatDesc'),
    featureForum: t('featureForum'), featureForumDesc: t('featureForumDesc'),
    featureLibrary: t('featureLibrary'), featureLibraryDesc: t('featureLibraryDesc'),
    featureMyList: t('featureMyList'), featureMyListDesc: t('featureMyListDesc'),
    row1Title: t('row1Title'), row1TitleSub: t('row1TitleSub'), row1Desc: t('row1Desc'),
    row1b1: t('row1b1'), row1b2: t('row1b2'), row1b3: t('row1b3'),
    row2Title: t('row2Title'), row2TitleSub: t('row2TitleSub'), row2Desc: t('row2Desc'),
    row2b1: t('row2b1'), row2b2: t('row2b2'), row2b3: t('row2b3'),
    row3Title: t('row3Title'), row3TitleSub: t('row3TitleSub'), row3Desc: t('row3Desc'),
    row3b1: t('row3b1'), row3b2: t('row3b2'), row3b3: t('row3b3'),
    row4Title: t('row4Title'), row4TitleSub: t('row4TitleSub'), row4Desc: t('row4Desc'),
    row4b1: t('row4b1'), row4b2: t('row4b2'), row4b3: t('row4b3'),
    row5Title: t('row5Title'), row5TitleSub: t('row5TitleSub'), row5Desc: t('row5Desc'),
    row5b1: t('row5b1'), row5b2: t('row5b2'), row5b3: t('row5b3'),
    ctaTitle: t('ctaTitle'), ctaTitleSub: t('ctaTitleSub'),
    ctaSubtitle1: t('ctaSubtitle1'), ctaSubtitle2: t('ctaSubtitle2'),
    ctaButton: t('ctaButton'),
    ctaBadge1: t('ctaBadge1'), ctaBadge2: t('ctaBadge2'), ctaBadge3: t('ctaBadge3'),
  }

  return <HomePageClient tr={tr} />
}
