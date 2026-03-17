'use client';

import Lists from "./Lists";
import FriendList from "./FriendList";
import Manga from "./Manga";
import Anime from "./Anime";

export default function CarrousselPage({ title, type }: { title: string, type: string }) {
    return (
        <div className="flex flex-col border border-border bg-accent rounded-[15px] gap-4 p-4">
            <h1 className="text-xl">{title}</h1>
            <div>
                {type == "followed" ? (
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