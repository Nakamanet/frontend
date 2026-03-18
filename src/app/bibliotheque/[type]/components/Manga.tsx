'use client';

import { useState, useEffect } from "react";
import { getMangaCategories } from "@/app/lib/catalogue";
import { Genre } from "@/app/types/catalog";

export default function MangaPage() {
    const [genres, setGenres] = useState<Genre[]>([]);

    useEffect(() => {
        getMangaCategories()
            .then((res) => setGenres(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <main className="max-w-[1500px] mx-auto h-[90vh] p-13">
            <h1 className="text-2xl">Les mangas</h1>
            <p className="flex items-center justify-center h-full">Cette partie sera disponible dans une prochaine mise à jour</p>
        </main>
    );
}