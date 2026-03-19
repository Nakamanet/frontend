'use client';

import { useAuth } from "@/app/context/AuthContext";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getAnimeById, getMangaById } from "@/app/lib/catalogue";
import { Anime, Manga } from "@/app/types/catalog";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Chat from "@/app/components/home/Chat";
import Calendar from "@/app/components/home/Calendar";

export default function AnimePage() {
    const { type } = useParams();
    const { slug } = useParams();
    const { user } = useAuth();
    const [item, setItem] = useState<Manga | Anime | null>(null);

    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    useEffect(() => {
        if (type === 'anime') {
            getAnimeById(slug as string)
                .then((res) => setItem(res))
                .catch((err) => console.error(err));
        } else if (type === 'manga') {
            getMangaById(slug as string)
                .then((res) => setItem(res))
                .catch((err) => console.error(err));
        }
    })

    return (
        <main className="md:grid md:grid-cols-5 max-w-[1500px] mx-auto py-10 px-15">
            <section className="flex flex-col w-full h-full col-span-4 pr-6">
                {/* Section Header */}
                <div className="flex flex-col w-full h-auto gap-2">
                    {/* Breadcrumb */}
                    <div className="flex gap-1 text-sm items-center">
                        <Link href="/bibliotheque/" className="flex gap-1 text-sm items-center">Bibliothèque</Link>
                        <ChevronRight size={16} />
                        <Link href={`/bibliotheque/${type}`} className="flex gap-1 text-sm items-center">{capitalize(type as string)}</Link>
                        <ChevronRight size={16} />
                        <Link href={`/bibliotheque/${type}/${slug}`} className="flex gap-1 text-sm items-center">{capitalize(slug as string)}</Link>
                    </div>
                    {/* Fond */}
                    <div className="w-full h-40 shrink-0 rounded-[15px] overflow-hidden bg-primary">
                        {item?.coverImage ? (
                            <Image
                                src={item.coverImage}
                                alt="Bannière"
                                width={100}
                                height={100}
                                className="object-cover w-full h-full"
                            />
                        ) : null}
                    </div>  
                </div>
                {/* Section Content */}
                <div className="grid grid-cols-4 gap-3">
                    <div className="flex gap-3">
                        <div>
                            {item?.posterImage ? (
                                <Image
                                    src={item.posterImage}
                                    alt="Avatar"
                                    width={100}
                                    height={150}
                                    className="object-cover"
                                />
                            ) : null}
                        </div>
                        <div>
                            <p>{item?.titleEn}</p>
                            <p>{item?.titleJp}</p>
                        </div>
                    </div>
                    <div>
                        <p>{item?.synopsis}</p>
                    </div>
                </div>
            </section>
            <section className="flex flex-col gap-5 py-6">
                <Chat user={user} />
                <Calendar user={user} />
            </section>
        </main>
    );
}