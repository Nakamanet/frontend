'use client'

import Lists from './Lists'
import FriendList from './FriendList'
import Manga from './Manga'
import Anime from './Anime'
import Link from 'next/link'

export default function CarrousselPage({ title, type }: { title: string; type: string }) {
  return (
    <div className="flex flex-col border border-border bg-accent rounded-card gap-4 p-4">
      <Link href={type === 'ma-bibliotheque' ? '/profil#bibliotheque' : type === 'friends' ? '/profil#amis' : `/bibliotheque/${type}`}>
        <h3 className="text-xl">{title}</h3>
      </Link>
      <div>
        {type == 'ma-bibliotheque' ? (
          <Lists />
        ) : type == 'friends' ? (
          <FriendList />
        ) : type == 'manga' ? (
          <Manga />
        ) : type == 'anime' ? (
          <Anime />
        ) : null}
      </div>
    </div>
  )
}
