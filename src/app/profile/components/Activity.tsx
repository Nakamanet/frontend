'use client';

import PostCards from "../../components/PostCards";
import { User } from "../../types/auth";
import { useState } from "react";
import { Flame, ThumbsUp, Bookmark, Trash } from "lucide-react";

export default function Activity({ user }: { user: User }) {
    const [filter, setFilter] = useState('all');

    // A modifier quand les routes seront intégrées
    const posts = [
        {
            id: 1,
            avatar_url: "/logo.png",
            username: user.username,
            content: "Bonjour, comment ça va ?",
            created_at: "2026-03-10T12:00:00.000000Z",
            updated_at: "2026-03-10T12:00:00.000000Z",
        },
        {
            id: 2,
            avatar_url: "/logo.png",
            username: user.username,
            content: "Aujourd'hui j'ai fini la nouvelle saison de #SNK et c'etait vraiment lourd !",
            created_at: "2026-03-06T12:00:00.000000Z",
            updated_at: "2026-03-06T12:00:00.000000Z",
        },
        {
            id: 3,
            avatar_url: "/logo.png",
            username: user.username,
            content: "Mais qu'es ce qui lui arrive a Erenn ? Il a pété son crane ou quoi ?",
            created_at: "2026-03-01T12:00:00.000000Z",
            updated_at: "2026-03-01T12:00:00.000000Z",
        },
        {
            id: 4,
            avatar_url: "/logo.png",
            username: user.username,
            content: "Woaw le Gear 5 c'est quoi cette dinguerie ?!",
            created_at: "2026-02-25T12:00:00.000000Z",
            updated_at: "2026-02-25T12:00:00.000000Z",
        },
        {
            id: 5,
            avatar_url: "/logo.png",
            username: user.username,
            content: "Je viens de commencer la nouvelle saison de #OnePiece et c'est vraiment une bombe !",
            created_at: "2026-02-18T12:00:00.000000Z",
            updated_at: "2026-02-18T12:00:00.000000Z",
        },
    ];

    return (
        <div className="flex flex-col gap-8 p-7 ">
            <div className="flex justify-center border border-border bg-accent rounded-full py-1 px-6">
                <div className="flex gap-5">
                    <button
                        onClick={() => {
                            if (filter === 'mine') {
                                setFilter('all');
                            } else {
                                setFilter('mine');
                            }
                        }}
                        className={`flex px-4 gap-2 btn btn-ghost border-none btn-xs text-[15px] py-2 font-normal hover:bg-alerts rounded-full ${filter === 'mine' ? 'bg-alerts text-white' : 'text-border'}`}
                    >
                        <Flame size={18} />
                        <span className="hidden md:inline">Mes Posts</span>
                    </button>
                    <button
                        onClick={() => {
                            if (filter === 'save') {
                                setFilter('all');
                            } else {
                                setFilter('save');
                            }
                        }}
                        className={`flex px-4 gap-2 btn btn-ghost border-none btn-xs text-[15px] py-2 font-normal hover:bg-alerts rounded-full ${filter === 'save' ? 'bg-alerts text-white' : 'text-border'}`}
                    >
                        <Bookmark size={18} />
                        <span className="hidden md:inline">Sauvegardés</span>
                    </button>
                    <button
                        onClick={() => {
                            if (filter === 'liked') {
                                setFilter('all');
                            } else {
                                setFilter('liked');
                            }
                        }}
                        className={`flex px-4 gap-2 btn btn-ghost border-none btn-xs text-[15px] py-2 font-normal hover:bg-alerts rounded-full ${filter === 'liked' ? 'bg-alerts text-white' : 'text-border'}`}
                    >
                        <ThumbsUp size={18} />
                        <span className="hidden md:inline">Liké</span>
                    </button>
                    <button
                        onClick={() => {
                            if (filter === 'deleted') {
                                setFilter('all');
                            } else {
                                setFilter('deleted');
                            }
                        }}
                        className={`flex px-4 gap-2 btn btn-ghost border-none btn-xs text-[15px] py-2 font-normal hover:bg-alerts rounded-full ${filter === 'deleted' ? 'bg-alerts text-white' : 'text-border'}`}
                    >
                        <Trash size={18} />
                        <span className="hidden md:inline">Archivés</span>
                    </button>
                </div>
            </div>
            {posts.map((post) => (
                <PostCards key={post.id} post={post} />
            ))}
        </div>
    );
}
