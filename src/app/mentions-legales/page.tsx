import Link from 'next/link'
import type { Metadata } from 'next'
import LegalPage, { ContactLink, InfoCard, type LegalSection } from '@/app/components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description:
    'Mentions légales et conditions d’utilisation de NakamaNet, le réseau social des fans de manga et d’anime : éditeur, hébergeur, règles de la communauté et propriété intellectuelle.',
}

const SECTIONS: LegalSection[] = [
  {
    id: 'editeur',
    title: 'Éditeur du site',
    content: (
      <>
        <p>
          NakamaNet est un projet étudiant non commercial, réalisé dans le cadre de la formation Web@cademie by
          Epitech. Le site est édité à titre non professionnel par l’équipe du projet :
        </p>
        <InfoCard
          rows={[
            ['Équipe', 'Léa BALLESTER, Rémi BOUYEDA, Gauthier WATELAIN, Stefan‑Paris PADURARU'],
            ['Contact', <ContactLink key="contact" />],
          ]}
        />
        <p>
          Conformément à l’article 6, III-2 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie
          numérique (LCEN), les éditeurs, agissant à titre non professionnel, ont communiqué leurs coordonnées
          personnelles à l’hébergeur du site.
        </p>
      </>
    ),
  },
  {
    id: 'hebergement',
    title: 'Hébergement',
    content: (
      <>
        <p>Le site et ses services sont hébergés sur un serveur privé virtuel (VPS) fourni par :</p>
        <InfoCard
          rows={[
            ['Hébergeur', 'OVH SAS'],
            ['Adresse', '2 rue Kellermann, 59100 Roubaix, France'],
            ['Téléphone', '1007'],
            [
              'Site web',
              <a
                key="ovh"
                href="https://www.ovhcloud.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                ovhcloud.com
              </a>,
            ],
          ]}
        />
        <p>
          Certaines données sont stockées chez d’autres prestataires techniques (base de données, images, envoi
          d’e-mails). Ils sont présentés dans la page{' '}
          <Link href="/donnees-personnelles#destinataires" className="text-primary hover:underline">
            Données personnelles
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    id: 'objet',
    title: 'Objet du site',
    content: (
      <>
        <p>
          NakamaNet est un réseau social dédié aux fans de manga et d’anime. Il permet notamment de publier des posts,
          de discuter en direct dans des salons ou en messages privés, de participer au forum, de parcourir un
          catalogue de plus de 80 000 œuvres et de tenir à jour sa liste de suivi.
        </p>
        <p>
          L’accès au site et à ses fonctionnalités est gratuit. Le soutien financier via Ko-fi est facultatif et ne
          donne accès à aucune fonctionnalité supplémentaire.
        </p>
      </>
    ),
  },
  {
    id: 'compte',
    title: 'Compte utilisateur',
    content: (
      <>
        <p>
          Le catalogue est consultable sans compte. La publication de contenus, le chat, le forum et la liste de suivi
          nécessitent la création d’un compte.
        </p>
        <ul>
          <li>L’inscription est réservée aux personnes âgées d’au moins 15 ans.</li>
          <li>L’adresse e-mail doit être confirmée pour activer le compte.</li>
          <li>
            Vous êtes responsable de la confidentialité de votre mot de passe et des actions réalisées depuis votre
            compte.
          </li>
          <li>
            Vous pouvez à tout moment désactiver ou supprimer définitivement votre compte depuis les paramètres de
            votre profil.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'communaute',
    title: 'Règles de la communauté',
    content: (
      <>
        <p>
          Vous êtes responsable des contenus que vous publiez (posts, commentaires, sujets et réponses du forum,
          messages, images). Sont notamment interdits :
        </p>
        <ul>
          <li>les contenus illégaux, haineux, violents, discriminatoires ou à caractère pornographique ;</li>
          <li>le harcèlement, les menaces et l’usurpation d’identité ;</li>
          <li>le partage de liens vers des copies illégales d’œuvres (scans, streaming non autorisé) ;</li>
          <li>les spoilers non signalés comme tels ;</li>
          <li>le spam, la publicité non sollicitée et la collecte de données d’autres membres.</li>
        </ul>
        <p>
          Les textes des posts, des commentaires et des messages du forum font l’objet d’une analyse automatique destinée à repérer les
          contenus manifestement contraires à ces règles. L’équipe de modération peut masquer ou supprimer un
          contenu, adresser un avertissement et suspendre temporairement ou définitivement un compte.
        </p>
      </>
    ),
  },
  {
    id: 'propriete',
    title: 'Propriété intellectuelle',
    content: (
      <>
        <p>
          Le nom NakamaNet, le logo, la charte graphique, les illustrations et le code du site sont la propriété de
          l’équipe du projet. Toute reproduction sans autorisation est interdite.
        </p>
        <p>
          Les fiches du catalogue (titres, synopsis, personnages, épisodes, chapitres) sont constituées à partir de
          bases de données publiques. Les visuels des œuvres (affiches, couvertures, images de personnages)
          appartiennent à leurs ayants droit respectifs : auteurs, éditeurs et studios. Ils sont affichés uniquement
          pour identifier les œuvres. Tout ayant droit qui souhaite le retrait d’un élément peut écrire à{' '}
          <ContactLink />.
        </p>
        <p>
          Vous restez propriétaire des contenus que vous publiez. En les publiant, vous autorisez NakamaNet à les
          afficher sur le site, auprès des membres autorisés selon les paramètres de visibilité de votre profil, aussi
          longtemps qu’ils sont en ligne.
        </p>
      </>
    ),
  },
  {
    id: 'liens',
    title: 'Liens vers des sites tiers',
    content: (
      <p>
        Le site contient des liens vers des services tiers (Discord, GitHub, Ko-fi). NakamaNet n’a
        aucun contrôle sur ces services et n’est pas responsable de leur contenu ni de leurs pratiques en matière de
        données personnelles.
      </p>
    ),
  },
  {
    id: 'responsabilite',
    title: 'Disponibilité et responsabilité',
    content: (
      <>
        <p>
          NakamaNet étant un projet étudiant, le site est fourni en l’état, sans garantie de disponibilité
          permanente. Il peut être interrompu pour maintenance, mise à jour ou en raison d’un incident technique.
        </p>
        <p>
          Les informations du catalogue sont fournies à titre indicatif et peuvent contenir des erreurs. NakamaNet ne
          saurait être tenu responsable des contenus publiés par les membres, sous réserve de les retirer promptement
          lorsqu’ils lui sont signalés comme manifestement illicites.
        </p>
      </>
    ),
  },
  {
    id: 'signalement',
    title: 'Signaler un contenu',
    content: (
      <>
        <p>
          Les posts, commentaires, sujets et réponses du forum peuvent être signalés directement depuis le site. Vous pouvez aussi
          écrire à <ContactLink /> en précisant :
        </p>
        <ul>
          <li>l’adresse (URL) du contenu concerné ;</li>
          <li>la nature du problème et, le cas échéant, le droit auquel il porte atteinte ;</li>
          <li>vos coordonnées, pour que nous puissions vous répondre.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'donnees',
    title: 'Données personnelles',
    content: (
      <p>
        Les données collectées, leurs finalités, les prestataires concernés et vos droits sont détaillés dans la page{' '}
        <Link href="/donnees-personnelles" className="text-primary hover:underline">
          Données personnelles
        </Link>
        .
      </p>
    ),
  },
  {
    id: 'droit',
    title: 'Modifications et droit applicable',
    content: (
      <>
        <p>
          Ces mentions peuvent être modifiées pour suivre l’évolution du site ou de la réglementation. La version
          applicable est celle en ligne au moment de votre visite.
        </p>
        <p>
          Le site et les présentes conditions sont soumis au droit français. En cas de litige, une solution amiable sera
          recherchée avant toute action devant les juridictions compétentes.
        </p>
      </>
    ),
  },
]

export default function MentionsLegalesPage() {
  return (
    <LegalPage
      title={
        <>
          Mentions <span className="text-primary">légales</span>
        </>
      }
      updatedAt="31 octobre 2026"
      intro={
        <p>
          Cette page présente les informations légales du site NakamaNet et les conditions de son utilisation. En
          naviguant sur le site ou en créant un compte, vous acceptez ces conditions.
        </p>
      }
      sections={SECTIONS}
    />
  )
}
