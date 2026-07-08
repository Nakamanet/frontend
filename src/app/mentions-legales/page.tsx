import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales — NakamaNet',
  description: 'Mentions légales du site NakamaNet.',
}

export default function MentionsLegalesPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12 text-white">
      <Link href="/" className="text-sm text-white/50 hover:text-white transition-colors">
        ← Retour à l&apos;accueil
      </Link>

      <h1 className="mt-6 text-3xl font-bold">Mentions légales</h1>
      <p className="mt-2 text-sm text-white/40">
        Dernière mise à jour : [À COMPLÉTER]
      </p>

      <section className="mt-10 flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Éditeur du site</h2>
        <p className="text-white/70 leading-relaxed">
          {/* TODO: raison sociale / nom, statut, SIRET si applicable */}
          Le site NakamaNet est édité par [À COMPLÉTER — nom / raison sociale].
          <br />
          Statut : [À COMPLÉTER]
          <br />
          Adresse : [À COMPLÉTER]
          <br />
          Contact : [À COMPLÉTER — email]
        </p>
      </section>

      <section className="mt-8 flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Directeur de la publication</h2>
        <p className="text-white/70 leading-relaxed">[À COMPLÉTER — nom]</p>
      </section>

      <section className="mt-8 flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Hébergeur</h2>
        <p className="text-white/70 leading-relaxed">
          {/* TODO: vérifier les coordonnées exactes de ton hébergeur (OVH) */}
          OVH SAS
          <br />
          2 rue Kellermann, 59100 Roubaix, France
          <br />
          Téléphone : 1007
        </p>
      </section>

      <section className="mt-8 flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Propriété intellectuelle</h2>
        <p className="text-white/70 leading-relaxed">
          [À COMPLÉTER — mention sur les droits, marques, contenus tiers
          (visuels de mangas/animes) et leurs sources.]
        </p>
      </section>

      <section className="mt-8 flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Contact</h2>
        <p className="text-white/70 leading-relaxed">
          Pour toute question : [À COMPLÉTER — email de contact].
        </p>
      </section>
    </main>
  )
}
