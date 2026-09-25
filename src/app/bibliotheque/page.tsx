'use client'

import AppLayout from '../components/layout/AppLayout'
import CarrousselPage from './components/Carroussel'

export default function BibliothequePage() {
  return (
    <AppLayout>
      <CarrousselPage title="Les titres que vous suivez" type="ma-bibliotheque" />
      <CarrousselPage title="Les titres que vos amis suivent" type="friends" />
      <CarrousselPage title="Les mangas" type="manga" />
      <CarrousselPage title="Les animes" type="anime" />
    </AppLayout>
  )
}
