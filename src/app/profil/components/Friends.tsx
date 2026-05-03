'use client'

import { useEffect, useState } from 'react'
import { User } from '../../types/auth'
import { Friendship } from '@/app/types/friends'
import { getFriends } from '@/app/lib/friends'
import Image from 'next/image'
import { User2 } from 'lucide-react'

export default function Friends({ user }: { user: User }) {
  const [friends, setFriends] = useState<Friendship[]>([])

  useEffect(() => {
    getFriends()
      .then(res => setFriends(res))
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      {friends && friends.length > 0 ? (
        <div className='flex flex-col gap-8 p-5 m-8 bg-accent border border-border rounded-[15px]'>
          {friends.map((f) => {
            const friend = f.requester_id === user.id ? f.addressee : f.requester

            return (
              <div key={friend.id} className="flex gap-8 p-5 m-8 bg-accent border border-border rounded-[15px]">
                {friend.avatar_url ? (
                  <Image
                    src={friend.avatar_url}
                    alt="pp"
                    width={50}
                    height={50}
                  />
                ) : (
                  <div className='p-2 bg-accent rounded-full'>
                    <User2 size={30}/>
                  </div>
                )}
                <p>{friend.username}</p>
                <p>{f.status === "pending" ? "Invitation en cours" : f.status === "blocked" ? "Bloqué" : ""}</p>
                <p>{f.created_at}</p>
              </div>
            )
          })}
        </div>
      ) : (
        <div className='flex flex-col gap-8 p-5 m-8 bg-accent border border-border rounded-[15px]'>
          <p>Vous n&apos;avez pas encore d&apos;ami, n&apos;hésitez pas a en ajouter afin de pouvoir discuter avec eux ou encore voir leurs oeuvres préférés</p>
        </div>
      )}
    </div>
  )
}
