'use client';

import { useState, useEffect } from "react";
import { getAnimes } from "../../lib/catalogue";
import type { Anime } from "../../types/catalog"
import { Loader2, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Anime() {
    const [animesList, setAnimesList] = useState<Anime[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        getAnimes()
            .then((res) => setAnimesList(res.data))
            .catch((err) => setError(err?.response?.data?.message ?? err?.message ?? 'Erreur lors du chargement du catalogue'))
            .finally(() => setIsLoading(false));
    }, []);

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
                        {animesList.map((item) => (
                            <div key={item.id}>
                                {item.posterImage ? (
                                    <Link href={`/bibliotheque/anime/${item.slug}`}>
                                        <Image
                                            src={item.posterImage}
                                            alt={item.titleEn}
                                            width={145} 
                                            height={100} 
                                            className="object-cover rounded-[15px] min-w-[145px] min-h-[100px]" 
                                            priority
                                        />
                                    </Link>
                                ) : null }
                            </div>
                        ))}
                    </div>
                    <Link href="/bibliotheque/anime">
                        <div className="flex flex-col border border-border gap-2 rounded-[15px] items-center justify-center w-[145px] h-full">
                            <Plus size={35} />
                            <p>Tous les animes</p>
                        </div>
                    </Link>
                </div>
            )}
        </div>
      )
}