import { permanentRedirect } from 'next/navigation'

// Les cookies et le stockage local sont décrits dans la page Données personnelles
export default function PolitiqueCookiesPage() {
  permanentRedirect('/donnees-personnelles#stockage')
}
