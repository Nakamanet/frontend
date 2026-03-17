'use client';

import { useState, useEffect } from "react";
import { getAnimes } from "../../lib/catalogue";
import type { Anime } from "../../types/catalog"
import { Loader2, Plus } from "lucide-react";
import Image from "next/image";

export default function Anime() {
    const [animesList, setAnimesList] = useState<Anime[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        Promise.all([getAnimes()])
          .then(([animes]) => {
            setAnimesList(animes);
          })
          .catch((err) => setError(err?.response?.data?.message ?? err?.message ?? 'Erreur lors du chargement du catalogue'))
          .finally(() => setIsLoading(false));
      }, []);

      const fiveFirstAnime = animesList.slice(0, 6);

      return (
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
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
                        {fiveFirstAnime.map((item) => (
                            <div key={item.id}>
                                {item.posterImage ? (
                                    <Image 
                                        src={item.posterImage} 
                                        alt={item.titleEn} 
                                        width={145} 
                                        height={100} 
                                        className="object-cover rounded-[15px] min-w-[145px] min-h-[100px]" 
                                        priority
                                    />
                                ) : null }
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col border border-border gap-2 rounded-[15px] items-center justify-center w-[145px] h-full">
                        <Plus size={35}/>
                        <p>Tous les animes</p>
                    </div>
                </div>
            )}
        </div>
      )
}