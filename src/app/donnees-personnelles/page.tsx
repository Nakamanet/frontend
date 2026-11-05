import Link from 'next/link'
import type { Metadata } from 'next'
import LegalPage, { ContactLink, InfoCard, LegalTable, type LegalSection } from '@/app/components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Données personnelles',
  description:
    'Politique de confidentialité de NakamaNet : données collectées, finalités, prestataires, durées de conservation, stockage local et exercice de vos droits.',
}

const SECTIONS: LegalSection[] = [
  {
    id: 'responsable',
    title: 'Responsable du traitement',
    content: (
      <>
        <p>
          Les données personnelles traitées sur NakamaNet le sont par l’équipe du projet, responsable du traitement
          au sens du Règlement général sur la protection des données (RGPD).
        </p>
        <InfoCard
          rows={[
            ['Responsable', 'L’équipe NakamaNet'],
            ['Contact', <ContactLink key="contact" />],
          ]}
        />
      </>
    ),
  },
  {
    id: 'donnees',
    title: 'Données collectées',
    content: (
      <>
        <p>Nous ne collectons que les données nécessaires au fonctionnement du réseau social.</p>
        <LegalTable
          head={['Catégorie', 'Données']}
          rows={[
            ['Compte', 'Nom d’utilisateur, identifiant (@handle), adresse e-mail, mot de passe (stocké chiffré), date de naissance'],
            ['Profil', 'Photo de profil, bannière, bio, localisation (facultative), paramètre de visibilité du profil'],
            [
              'Activité',
              'Posts, commentaires, sujets et réponses du forum, images publiées, likes et votes, posts sauvegardés, sujets épinglés, liste de suivi et statuts des œuvres',
            ],
            ['Relations', 'Demandes d’ami, amis, membres bloqués, notifications et préférences de notification'],
            ['Messages', 'Messages envoyés dans les salons de discussion et en messages privés'],
            ['Modération', 'Signalements effectués ou reçus, avertissements, suspensions'],
            ['Technique', 'Adresse IP lors de l’inscription (vérification anti-robot), jeton de connexion'],
          ]}
        />
        <p>
          La date de naissance sert uniquement à vérifier que vous avez au moins 15 ans. Elle n’est pas affichée sur
          votre profil public.
        </p>
      </>
    ),
  },
  {
    id: 'finalites',
    title: 'Finalités et bases légales',
    content: (
      <LegalTable
        head={['Finalité', 'Base légale']}
        rows={[
          ['Créer et gérer votre compte, afficher votre profil', 'Exécution des conditions d’utilisation'],
          ['Publier vos contenus, le chat, le forum et la liste de suivi', 'Exécution des conditions d’utilisation'],
          ['Vous envoyer les e-mails liés au compte (confirmation de l’adresse)', 'Exécution des conditions d’utilisation'],
          ['Modérer les contenus et traiter les signalements', 'Intérêt légitime : assurer la sécurité de la communauté'],
          ['Protéger le site contre les robots et les abus', 'Intérêt légitime : sécurité du service'],
          ['Proposer la recherche sur le site (œuvres, membres, posts)', 'Intérêt légitime : faciliter la navigation'],
        ]}
      />
    ),
  },
  {
    id: 'visibilite',
    title: 'Ce que voient les autres membres',
    content: (
      <>
        <p>
          Votre nom d’utilisateur, votre identifiant et votre photo de profil sont visibles des autres membres. Le reste
          de votre profil (bio, bibliothèque, activité) suit le paramètre de visibilité que vous choisissez :
        </p>
        <ul>
          <li>
            <strong>Public</strong> : visible par tous ;
          </li>
          <li>
            <strong>Amis uniquement</strong> : visible par vos amis ;
          </li>
          <li>
            <strong>Privé</strong> : visible par vous seul.
          </li>
        </ul>
        <p>Votre adresse e-mail n’est jamais affichée aux autres membres.</p>
      </>
    ),
  },
  {
    id: 'destinataires',
    title: 'Destinataires et prestataires',
    content: (
      <>
        <p>
          Vos données ne sont ni vendues ni utilisées à des fins publicitaires. Elles sont accessibles à l’équipe du
          projet et, pour les besoins de la modération, aux modérateurs. Nous faisons aussi appel aux prestataires
          techniques suivants :
        </p>
        <LegalTable
          head={['Prestataire', 'Rôle', 'Localisation']}
          rows={[
            ['OVHcloud', 'Hébergement du site, du chat et de la recherche', 'France'],
            ['Neon', 'Base de données (comptes, contenus, catalogue)', 'Allemagne (Francfort)'],
            ['Cloudflare', 'Stockage des images publiées, vérification anti-robot à l’inscription (Turnstile)', 'États-Unis'],
            ['Resend', 'Envoi des e-mails de confirmation', 'États-Unis'],
            ['OpenAI', 'Analyse automatique du texte des posts, commentaires, sujets et réponses du forum pour la modération', 'États-Unis'],
          ]}
        />
        <p>
          Les transferts vers les États-Unis sont encadrés par les garanties prévues par le RGPD (Data Privacy
          Framework ou clauses contractuelles types de la Commission européenne).
        </p>
        <p>
          La recherche du site fonctionne sur nos propres serveurs : les textes indexés (œuvres, membres, posts) ne
          sont transmis à aucun service tiers. La traduction des fiches du catalogue fait appel à des services
          externes, mais ne porte que sur les textes du catalogue et jamais sur vos données.
        </p>
      </>
    ),
  },
  {
    id: 'conservation',
    title: 'Durées de conservation',
    content: (
      <LegalTable
        head={['Données', 'Durée']}
        rows={[
          ['Compte, profil et contenus', 'Tant que votre compte existe'],
          ['Compte désactivé', 'Conservé, masqué des autres membres, jusqu’à sa réactivation ou sa suppression'],
          ['Compte supprimé', 'Effacement définitif du compte (voir « Vos droits » pour les autres contenus)'],
          ['Jeton de connexion', 'Durée limitée, puis expiration automatique ; supprimé à la déconnexion'],
          ['Signalements et sanctions', 'Le temps nécessaire au traitement du signalement et à la sécurité de la communauté'],
        ]}
      />
    ),
  },
  {
    id: 'stockage',
    title: 'Cookies et stockage local',
    content: (
      <>
        <p>
          NakamaNet n’utilise aucun cookie publicitaire ni outil de mesure d’audience. Le site enregistre seulement
          dans votre navigateur les éléments nécessaires à son fonctionnement :
        </p>
        <LegalTable
          head={['Élément', 'Utilité', 'Durée']}
          rows={[
            ['token, expires_at', 'Garder votre session de connexion ouverte', 'Jusqu’à la déconnexion ou l’expiration du jeton'],
            ['nakamanet_lang_preference', 'Mémoriser la langue choisie', 'Jusqu’à suppression par vous'],
            ['trans_…', 'Éviter de retraduire les mêmes textes du catalogue', 'Jusqu’à la fermeture de l’onglet'],
          ]}
        />
        <p>
          Lors de l’inscription, le service Turnstile de Cloudflare peut utiliser des données techniques de votre
          navigateur pour vérifier que vous n’êtes pas un robot.
        </p>
        <p>
          Ces éléments étant strictement nécessaires au service, ils ne requièrent pas votre consentement. Vous pouvez
          les effacer à tout moment depuis les paramètres de votre navigateur ; vous serez alors déconnecté.
        </p>
      </>
    ),
  },
  {
    id: 'securite',
    title: 'Sécurité',
    content: (
      <ul>
        <li>Les mots de passe sont chiffrés avec un algorithme de hachage (bcrypt) et ne sont jamais stockés en clair.</li>
        <li>Les échanges entre votre navigateur et le site sont chiffrés (HTTPS).</li>
        <li>L’adresse e-mail est vérifiée à l’inscription, et un contrôle anti-robot protège la création de compte.</li>
        <li>L’accès aux outils de modération et d’administration est réservé aux membres habilités.</li>
      </ul>
    ),
  },
  {
    id: 'droits',
    title: 'Vos droits',
    content: (
      <>
        <p>Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants :</p>
        <ul>
          <li>
            <strong>Accès et rectification</strong> : consultez et modifiez vos informations depuis votre profil ;
          </li>
          <li>
            <strong>Effacement</strong> : supprimez définitivement votre compte depuis les paramètres de votre profil ;
          </li>
          <li>
            <strong>Portabilité</strong> : recevez une copie de vos données dans un format lisible ;
          </li>
          <li>
            <strong>Opposition et limitation</strong> : opposez-vous à un traitement fondé sur notre intérêt légitime ou
            demandez sa limitation ;
          </li>
          <li>
            <strong>Directives post-mortem</strong> : indiquez ce que deviennent vos données après votre décès.
          </li>
        </ul>
        <p>
          Pour exercer ces droits, ou pour vous assurer que l’ensemble de vos contenus, y compris vos messages de chat,
          a bien été effacé, écrivez à <ContactLink />. Nous répondons dans un délai d’un mois.
        </p>
        <p>
          Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL sur{' '}
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            cnil.fr
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: 'mineurs',
    title: 'Mineurs',
    content: (
      <p>
        L’inscription est réservée aux personnes âgées d’au moins 15 ans, âge à partir duquel un mineur peut consentir
        seul au traitement de ses données en France. Si vous pensez qu’un enfant de moins de 15 ans a créé un compte,
        écrivez-nous pour que nous le supprimions.
      </p>
    ),
  },
  {
    id: 'modifications',
    title: 'Modifications',
    content: (
      <p>
        Cette page peut évoluer avec le site. La date de dernière mise à jour figure en haut de page. Les informations
        légales générales du site se trouvent dans les{' '}
        <Link href="/mentions-legales" className="text-primary hover:underline">
          mentions légales
        </Link>
        .
      </p>
    ),
  },
]

export default function DonneesPersonnellesPage() {
  return (
    <LegalPage
      title={
        <>
          Données <span className="text-primary">personnelles</span>
        </>
      }
      updatedAt="31 octobre 2026"
      intro={
        <p>
          Cette page explique quelles données NakamaNet collecte, pourquoi, avec qui elles sont partagées, combien de
          temps elles sont conservées et comment exercer vos droits.
        </p>
      }
      sections={SECTIONS}
    />
  )
}
