import { Info } from "lucide-react";
import { Manga, Anime, Genre, Category } from "@/app/types/catalog";
import { useState, useEffect } from "react";
import { getAnimeGenres, getMangaCategories } from "@/app/lib/catalogue";

export default function Information({ type, item }: { type: "anime" | "manga", item: Manga | Anime }) {
    const [itemGenre, setItemGenre] = useState<Genre[]>([]);
    const [itemCategories, setItemCategories] = useState<Category[]>([]);

    useEffect(() => {
        getAnimeGenres(item.id)
            .then((res) => setItemGenre(res))
            .catch((err) => console.error(err));
        getMangaCategories(item.id)
            .then((res) => setItemCategories(res))
            .catch((err) => console.error(err));
    }, [item]);

    return (
        <div>
            <div>
                <Info />
                <p>Informations</p>
            </div>
            {type === "anime" ? (
                <table>
                    <tbody>
                        <tr>
                            <td>Type</td>
                            <td>{item.subtype}</td>
                        </tr>
                        <tr>
                            <td>Nombre d&apos;épisodes</td>
                            <td>{item.episodeCount}</td>
                        </tr>
                        <tr>
                            <td>Durée d&apos;épisode</td>
                            <td>{item.episodeLength} min</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>{item.status}</td>
                        </tr>
                        <tr>
                            <td>Date de </td>
                            <td></td>
                        </tr>
                        <tr></tr>
                        <tr></tr>
                        <tr></tr>
                        <tr></tr>
                    </tbody>
                </table> 
            ) : null}
        </div>
    );
}