'use client';

import { useAuth } from "../../context/AuthContext";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getPostById } from "../../lib/post";
import { Post } from "../../types/post";
import SideBar from "../../components/home/Sidebar";
import Chat from "../../components/home/Chat";
import Calendar from "../../components/home/Calendar";
import PostCards from "../../components/PostCards";

export default function PostPage() {
    const { id } = useParams();
    const { user, isLoggedIn } = useAuth();
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        getPostById(Number(id)).then((res) => setPost(res));
    }, [id]);

    if (!post) return null;
    
    return (
        <main className="md:grid md:grid-cols-5 md:place-items-center md:h-screen px-4 md:px-15 py-5 md:py-10 max-w-[1500px] mx-auto pb-20 md:pb-10">
            {/* Gauche de l'écran - desktop only */}
            <section className="hidden md:flex flex-col w-full h-full gap-5">
                <SideBar isLoggedIn={isLoggedIn} user={user} />
            </section>

            {/* Centre de l'écran */}
            <section className="flex flex-col md:col-span-3 w-full h-full min-h-0 md:px-6 gap-3 overflow-y-auto scrollbar-hide">
                <PostCards post={post} />
            </section>

            {/* Droite de l'écran - desktop only */}
            <section className="hidden md:flex flex-col w-full mx-auto h-full gap-5">
                <Chat user={user} />
                <Calendar user={user} />
            </section>
        </main>
    );
}