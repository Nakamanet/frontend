'use client';

import Chat from "../components/home/Chat";
import Calendar from "../components/home/Calendar";
import { useAuth } from "../context/AuthContext";
import SearchBarPage from "./components/SearchBar";
import CarrousselPage from "./components/Carroussel";

export default function BibliothequePage() {
    const { user } = useAuth();

    return (
        <main className="md:grid md:grid-cols-5 max-w-[1500px] mx-auto py-10 px-15">
            <section className="flex flex-col gap-10 w-full h-full col-span-4 pr-6 overflow-y-auto scrollbar-hide">
                <SearchBarPage />
                <CarrousselPage title="Les titres que vous suivez" type="ma-bibliotheque" />
                <CarrousselPage title="Les titres que vos amis suivent" type="friends" />
                <CarrousselPage title="Les mangas" type="manga" />
                <CarrousselPage title="Les animes" type="anime" />
            </section>
            <section className="flex flex-col gap-5">
                <Chat user={user} />
                <Calendar user={user} />
            </section>
        </main>
    );
}