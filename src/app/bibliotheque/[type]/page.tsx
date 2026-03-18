import MaBibliothequePage from "./components/MaBibliotheque";
import FriendsPage from "./components/Friends";
import MangaPage from "./components/Manga";
import AnimePage from "./components/Anime";

export default async function BibliothequePage({ params }: { params: Promise<{ type: string }> }) {
    const { type } = await params;

    return (
        <>
            {type === "ma-bibliotheque" ? (
                <MaBibliothequePage />
            ) : type === "friends" ? (
                <FriendsPage />
            ) : type === "manga" ? (
                <MangaPage />
            ) : type === "anime" ? (
                <AnimePage />
            ) : null }
        </>
    );
}