import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique des cookies — NakamaNet',
  description: 'Politique de gestion des cookies du site NakamaNet.',
}

export default function PolitiqueCookiesPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12 text-white">
      <Link href="/" className="text-sm text-white/50 hover:text-white transition-colors">
        ← Retour à l&apos;accueil
      </Link>

      <h1 className="mt-6 text-3xl font-bold">Politique des cookies</h1>
      <p className="mt-2 text-sm text-white/40">
        Dernière mise à jour : [À COMPLÉTER]
      </p>

      <section className="mt-10 flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Qu&apos;est-ce qu&apos;un cookie ?</h2>
        <p className="text-white/70 leading-relaxed">
          Un cookie est un petit fichier déposé sur votre appareil lors de la
          visite d&apos;un site. Il permet notamment de mémoriser des
          informations liées à votre navigation.
        </p>
      </section>

      <section className="mt-8 flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Cookies utilisés</h2>
        <p className="text-white/70 leading-relaxed">
          {/* TODO: lister précisément ce que tu utilises réellement.
              Ex : token d'authentification en localStorage, session AdonisJS
              (adonis-session), éventuels outils de mesure d'audience. */}
          NakamaNet utilise les éléments suivants :
        </p>
        <ul className="list-disc pl-6 text-white/70 leading-relaxed flex flex-col gap-1">
          <li>
            <strong>Authentification</strong> : conservation de votre session de
            connexion. [À COMPLÉTER — préciser localStorage / cookie de session]
          </li>
          <li>
            <strong>Fonctionnels</strong> : [À COMPLÉTER — préférences, thème, etc.]
          </li>
          <li>
            <strong>Mesure d&apos;audience</strong> : [À COMPLÉTER — si applicable,
            sinon retirer cette ligne]
          </li>
        </ul>
      </section>

      <section className="mt-8 flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Finalité et durée</h2>
        <p className="text-white/70 leading-relaxed">
          [À COMPLÉTER — pour chaque catégorie : à quoi elle sert et combien de
          temps les données sont conservées.]
        </p>
      </section>

      <section className="mt-8 flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Gestion de votre consentement</h2>
        <p className="text-white/70 leading-relaxed">
          [À COMPLÉTER — comment l&apos;utilisateur peut accepter/refuser ou
          supprimer les cookies (paramètres du navigateur, bandeau de
          consentement, etc.).]
        </p>
      </section>

      <section className="mt-8 flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Contact</h2>
        <p className="text-white/70 leading-relaxed">
          Pour toute question relative aux cookies : [À COMPLÉTER — email].
        </p>
      </section>
    </main>
  )
}
