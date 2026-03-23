'use client'

import { useState } from 'react'
import { Loader2, Plus } from 'lucide-react'
import Image from 'next/image'
import { useAuth } from '../../context/AuthContext'
import Link from 'next/link'

export default function Lists() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [list, setList] = useState<any[]>([])

  return (
    <div className="flex gap-4">
      {user ? (
        <>
          {isLoading ? (
            <div className="flex justify-center items-center h-full mx-auto my-[90px]">
              <Loader2 className="animate-spin" />
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <div className="flex gap-4">
              <div className="flex gap-4">
                {list && list.length > 0 ? (
                  <div>
                    {list.map((item) => (
                      <div key={item.id}>
                        {item.posterImage ? (
                          // A changer l'url plus tard
                          <Link href={`/bibliotheque/${item.type}/${item.slug}`}>
                            <Image
                              src={item.posterImage}
                              alt={item.titleEn}
                              width={145}
                              height={100}
                              className="object-cover rounded-[15px]"
                              priority
                            />
                          </Link>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col border border-border gap-2 rounded-[15px] items-center justify-center w-[145px] h-full">
                <Plus size={35} />
                <p>Ajouter un titre</p>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-center items-center h-full mx-auto my-3">
          <p>Vous devez être connecté pour voir votre bibliothèque</p>
        </div>
      )}
    </div>
  )
}
