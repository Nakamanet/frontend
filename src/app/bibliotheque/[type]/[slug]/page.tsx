'use client';

import { useAuth } from "@/app/context/AuthContext";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getAnimeById, getMangaById, getAnimeGenres, getMangaGenres, getAnimeCategories, getMangaCategories } from "@/app/lib/catalogue";
import { Anime, Manga, Genre, Category } from "@/app/types/catalog";
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
    const [itemGenre, setItemGenre] = useState<Genre[]>([]);
    const [itemCategories, setItemCategories] = useState<Category[]>([]);
    const [voirPlus, setVoirPlus] = useState(false);

    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    useEffect(() => {
        if (!type || !slug) return;
        const load = async () => {
            if (type === 'anime') {
                try {
                    const res = await getAnimeById(slug as string);
                    setItem(res);
                    getAnimeGenres(res.id)
                        .then((genres) => setItemGenre(genres))
                        .catch((err) => console.error(err));
                    getAnimeCategories(res.id)
                        .then((categories) => setItemCategories(categories))
                        .catch((err) => console.error(err));
                } catch (err) {
                    console.error(err);
                }
            } else if (type === 'manga') {
                try {
                    const res = await getMangaById(slug as string);
                    setItem(res);
                    getMangaGenres(res.id)
                        .then((genres) => setItemGenre(genres))
                        .catch((err) => console.error(err));
                    getMangaCategories(res.id)
                        .then((categories) => setItemCategories(categories))
                        .catch((err) => console.error(err));
                } catch (err) {
                    console.error(err);
                }
            }
        }
        load();
    }, [type, slug]);

    console.log('genre: ', itemGenre);
    console.log('categories: ', itemCategories);
    return (
        <main className="md:grid md:grid-cols-5 max-w-[1500px] mx-auto py-10 px-15">
            <section className="col-span-4 pr-6 m-0">
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
                <div className="flex w-full px-5 gap-5" style={{ marginTop: '-80px' }}>
                    <div className="w-1/4 shrink-0 self-start gap-4 flex flex-col items-center">
                        {item?.posterImage ? (
                            <Image
                                src={item.posterImage}
                                alt="Avatar"
                                width={250}
                                height={390}
                                className="w-full object-cover rounded-[15px]"
                            />
                        ) : null}
                        <button className="btn btn-ghost border-none rounded-full bg-primary text-primary-content">
                            Ajouter à la liste
                        </button>
                    </div>
                    <div className="w-3/4 flex flex-col gap-10 min-w-0">
                        <div>
                            <p className="text-2xl font-bold">{item?.titleEn}</p>
                            <p className="text-lg">{item?.titleJp}</p>
                        </div>
                        <div className="bg-accent rounded-[15px] p-5 gap-3 flex flex-col min-w-0 overflow-hidden">
                            <p className="text-xl">Synopsis</p>
                            {item?.synopsis ? (
                                <>
                                    {voirPlus ? (
                                        <div className="flex flex-col gap-2 overflow-hidden min-w-0">
                                            <p>{item?.synopsis}</p>
                                            <div className="flex flex-wrap gap-2 min-w-0 w-full">
                                                {itemGenre.map((g) => (
                                                    <div key={g.id} className="badge badge-outline">{g.name}</div>
                                                ))}
                                                {itemCategories.map((c) => (
                                                    <div key={c.id} className="border border-border rounded-full px-2 py-1 w-auto">{c.name}</div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <p>{item?.synopsis.length > 300 ? item?.synopsis.substring(0, 300) + '...' : item?.synopsis}</p>
                                    )}
                                    <button onClick={() => setVoirPlus(!voirPlus)}>
                                        {voirPlus ? 'Voir moins' : 'Voir plus'}
                                    </button>
                                </>
                            ) : null}
                        </div>
                    </div>
                </div>
            </section>
            {/* <section className="flex flex-col gap-5 py-6">
                <Chat user={user} />
                <Calendar user={user} />
            </section> */}
        </main>
    );
}