'use client';

import { useState } from "react";
import { Loader2, Plus } from "lucide-react";
import Image from "next/image";
import { useAuth } from "../../context/AuthContext";

export default function FriendList() {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const friendsList =[
        {
            id: 1,
            slug: "cowboy-bebop",
            titleEn: "Cowboy Bebop",
            titleJp: "冒険王ビィト",
            synopsis: "Cowboy Bebop est un anime de shonen créé par Yoshihiro Takahashi. Il est publié depuis 1998 dans Weekly Shōnen Jump.",
            type: "manga",
            status: "En cours",
            volumeCount: 1,
            chapterCount: 1,
            startDate: "1998-04-03",
            endDate: "1999-04-24",
            posterImage: "https://media.kitsu.app/anime/poster_images/5/large.jpg",
            coverImage: "https://media.kitsu.app/anime/cover_images/5/large.jpg",
            createdAt: "1998-04-03",
        },  
        {
            id: 2,
            slug: "one-piece",
            titleEn: "One Piece",
            titleJp: "ワンピース",
            synopsis: "One Piece est un manga de shonen créé par Eiichiro Oda. Il est publié depuis 1997 dans Weekly Shōnen Jump.",
            type: "anime",
            subtype: "TV",
            status: "En cours",
            startDate: "1998-04-03",
            endDate: "1999-04-24",
            nsfw: false,
            posterImage: "https://media.kitsu.app/anime/poster_images/5/large.jpg",
            coverImage: "https://media.kitsu.app/anime/cover_images/5/large.jpg",
            ageRating: "R17+",
            episodeCount: 100,
            episodeLength: 24,
            createdAt: "1998-04-03",
            updatedAt: "1999-04-24",
        } 
    ];

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
                            {friendsList.map((item) => (
                                <div key={item.id}>
                                    {item.posterImage ? (
                                        <Image 
                                            src={item.posterImage} 
                                            alt={item.titleEn} 
                                            width={145} 
                                            height={100} 
                                            className="object-cover rounded-[15px]" 
                                            priority
                                        />
                                    ) : null }
                                </div>
                            ))}
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
    );
}