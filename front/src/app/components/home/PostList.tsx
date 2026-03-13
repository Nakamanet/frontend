'use client';

import { useState } from "react";
import { 
    Flame, 
    Clock, 
    Users, 
    SlidersHorizontal, 
    CircleUser, 
    Heart, 
    MessageCircle, 
    Bookmark, 
    Image as ImageIcon, 
    SendHorizonal, 
    Smile,
} from "lucide-react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { User } from "../../types/auth";

export default function PostList({ isLoggedIn, user }: { isLoggedIn: boolean, user: User | null }) {
    const [filter, setFilter] = useState('all');

    // A modifier quand les routes seront intégrées
    const posts = [
        {
        id: 1,
        avatar_url: "/logo.png",
        username: "John Doe",
        content: "Bonjour, comment ça va ?",
        created_at: "2026-03-10T12:00:00.000000Z",
        updated_at: "2026-03-10T12:00:00.000000Z",
        },
        {
        id: 2,
        avatar_url: "",
        username: "Jane Doe",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        created_at: "2026-02-25T12:00:00.000000Z",
        updated_at: "2026-02-25T12:00:00.000000Z",
        },
        {
        id: 3,
        avatar_url: "",
        username: "Jane Doe",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        created_at: "2026-02-25T12:00:00.000000Z",
        updated_at: "2026-02-25T12:00:00.000000Z",
        },
        {
        id: 4,
        avatar_url: "",
        username: "Jane Doe",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        created_at: "2026-02-25T12:00:00.000000Z",
        updated_at: "2026-02-25T12:00:00.000000Z",
        },
        {
        id: 5,
        avatar_url: "",
        username: "Jane Doe",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        created_at: "2026-02-25T12:00:00.000000Z",
        updated_at: "2026-02-25T12:00:00.000000Z",
        },
        {
        id: 6,
        avatar_url: "/logo.png",
        username: "Jane Doe",
        content: "Je suis content de voir que vous êtes de retour !",
        created_at: "2026-02-20T12:00:00.000000Z",
        updated_at: "2026-02-20T12:00:00.000000Z",
        },
    ];


    return (
        <div className="flex flex-col w-full max-w-[1500px] mx-auto h-full gap-5">
            {/* Ajouter un post */}
            {isLoggedIn && user ? (
            <div className="flex flex-col bg-accent border border-border rounded-[15px] gap-2 px-6 py-4">
                <div className="flex gap-2">
                <div className="w-12 h-12 rounded-[10px] bg-muted border-2 border-border flex items-center justify-center shrink-0 overflow-hidden text-base-content/70">
                    {user.avatar_url ? (
                    <Image
                        src={user.avatar_url}
                        alt="Avatar"
                        width={35}
                        height={35}
                        className="w-full h-full object-cover"
                    />
                    ) : (
                    <CircleUser size={35} strokeWidth={1.5} />
                    )}
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <div>
                    <input type="text" placeholder="Partage ton avis sur un manga, un anime, etc" className="input text-border input-ghost w-full h-10"/>
                    </div>
                    <div className="flex justify-between gap-2">
                    <div className="flex gap-2 pt-2">
                        <ImageIcon size={20} />
                        <Smile size={20} />
                    </div>
                    <button className="btn btn-ghost px-4 border border-border text-border rounded-[15px]"><SendHorizonal size={17} /> Poster</button>
                    </div>
                </div>
                </div>
            </div>
            ) : null }
            {/* Filtre/Tendances/... */}
            <div className="flex justify-between border border-border bg-accent rounded-full py-1 px-6">
            <div className="flex gap-5">
                <button 
                onClick={() => {
                    if(filter === 'trends') {
                    setFilter('all');
                    } else {
                    setFilter('trends');
                    }
                }} 
                className={`flex px-4 gap-2 btn btn-ghost border-none btn-xs text-[15px] py-2 font-normal hover:bg-alerts rounded-full ${filter === 'trends' ? 'bg-alerts text-white' : 'text-border'}`}
                >
                <Flame size={18} />
                Tendances
                </button>
                <button 
                onClick={() => {
                    if(filter === 'recent') {
                    setFilter('all');
                    } else {
                    setFilter('recent');
                    }
                }} 
                className={`flex px-4 gap-2 btn btn-ghost border-none btn-xs text-[15px] py-2 font-normal hover:bg-alerts rounded-full ${filter === 'recent' ? 'bg-alerts text-white' : 'text-border'}`}
                >
                <Clock size={18} />
                Récents
                </button>
                <button 
                onClick={() => {
                    if(filter === 'friends') {
                    setFilter('all');
                    } else {
                    setFilter('friends');
                    }
                }} 
                className={`flex px-4 gap-2 btn btn-ghost border-none btn-xs text-[15px] py-2 font-normal hover:bg-alerts rounded-full ${filter === 'friends' ? 'bg-alerts text-white' : 'text-border'}`}
                >
                <Users size={18} />
                Amis
                </button>
            </div>
            <div className="flex px-4 gap-2">
                <SlidersHorizontal size={20} />
                <p>Filtres</p>
            </div>
            </div>
            {/* Zone des posts */}
            {posts ? (
            posts.map((post) => (
                <div key={post.id} className="bg-accent shadow-sm place-items-center w-full border border-border rounded-[15px] p-6">
                <div className="flex gap-3">
                    <div>
                    {post.avatar_url ? (
                        <Image 
                        src={post.avatar_url} 
                        alt="Avatar" 
                        width={100} 
                        height={100} 
                        className="w-12 h-12 rounded-full"
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-[10px] bg-muted border-2 border-border flex items-center justify-center shrink-0 overflow-hidden text-base-content/70">
                        <CircleUser size={35} strokeWidth={1.5} />
                        </div>
                    )}
                    </div>
                    <div className="flex flex-col gap-3">
                    <div className="flex gap-2">
                        <p className="font-bold">{post.username}</p>
                        <p className="text-sm text-border">@{post.username}</p>
                        <p className="text-sm text-border">{formatDistanceToNow(new Date(post.updated_at), { locale: fr })}</p>
                    </div>
                    <p>{post.content}</p>
                    <div className="flex gap-2">
                        <div className="flex gap-2">
                        <Heart size={20} />
                        <p>0</p>
                        </div>
                        <div className="flex gap-2">
                        <MessageCircle size={20} />
                        <p>0</p>
                        </div>
                        <div className="flex gap-2">
                        <Bookmark size={20} />
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            ))
            ) : (
            <p>
                Aucun post trouvé
            </p>
            )}
        </div>
    );
}