'use client';

import Lists from "./Lists";
import FriendList from "./FriendList";
import Manga from "./Manga";
import Anime from "./Anime";
import Link from "next/link";

export default function CarrousselPage({ title, type }: { title: string, type: string }) {
    return (
        <div className="flex flex-col border border-border bg-accent rounded-[15px] gap-4 p-4">
            <Link href={`/bibliotheque/${type}`}><h1 className="text-xl">{title}</h1></Link>
            <div>
                {type == "ma-bibliotheque" ? (
                    <Lists />
                ) : type == "friends" ? (
                    <FriendList />
                ) : type == "manga" ? (
                    <Manga />
                ) : type == "anime" ? (
                    <Anime />
                ) : null}
            </div>
        </div>
    );
}