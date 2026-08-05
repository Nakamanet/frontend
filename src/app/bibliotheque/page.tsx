'use client'
import AppLayout from '../components/layout/AppLayout'
import SearchBarPage from './components/SearchBar'
import CarrousselPage from './components/Carroussel'
import { useTranslations } from 'next-intl'

export default function BibliothequePage() {
  const t = useTranslations('bibliotheque')

  return (
    <AppLayout>
      <SearchBarPage />
      <CarrousselPage title={t('myLibrary')} type="ma-bibliotheque" />
      <CarrousselPage title={t('friendsLibrary')} type="friends" />
      <CarrousselPage title={t('manga')} type="manga" />
      <CarrousselPage title={t('anime')} type="anime" />
    </AppLayout>
  )
}