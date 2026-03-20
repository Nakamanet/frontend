'use client';

import { useAuth } from "./context/AuthContext";
import SideBar from "./components/home/Sidebar";
import PostList from "./components/home/PostList";
import Chat from "./components/home/Chat";
import Calendar from "./components/home/Calendar";
import Link from "next/link";
import { Home, BookOpen, MessageSquare, MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

export default function HomePage() {
  const { isLoggedIn, user } = useAuth();
  const pathname = usePathname();

  return (
    <>
      <main className="md:grid md:grid-cols-5 md:place-items-center md:h-screen px-4 md:px-15 py-5 md:py-10 max-w-[1500px] mx-auto pb-20 md:pb-10">
        {/* Gauche de l'écran - desktop only */}
        <section className="hidden md:flex flex-col w-full h-full gap-5">
          <SideBar isLoggedIn={isLoggedIn} user={user} />
        </section>

        {/* Centre de l'écran */}
        <section className="flex flex-col md:col-span-3 w-full h-full min-h-0 md:px-6 gap-3 overflow-y-auto scrollbar-hide">
          <PostList isLoggedIn={isLoggedIn} user={user} />
        </section>

        {/* Droite de l'écran - desktop only */}
        <section className="hidden md:flex flex-col w-full mx-auto h-full gap-5">
          <Chat user={user} />
          <Calendar user={user} />
        </section>
      </main>

      {/* Footer mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-accent border-t border-border flex justify-around items-center h-16 z-50">
        <Link href="/" className={`flex flex-col items-center gap-1 text-xs ${pathname === '/' ? 'text-primary' : 'text-border'}`}>
          <Home size={22} />
          Accueil
        </Link>
        <Link href="/list" className={`flex flex-col items-center gap-1 text-xs ${pathname === '/list' ? 'text-primary' : 'text-border'}`}>
          <BookOpen size={22} />
          Bibliothèque
        </Link>
        <Link href="/forum" className={`flex flex-col items-center gap-1 text-xs ${pathname === '/forum' ? 'text-primary' : 'text-border'}`}>
          <MessageSquare size={22} />
          Forum
        </Link>
        <Link href="/chat" className={`flex flex-col items-center gap-1 text-xs ${pathname === '/chat' ? 'text-primary' : 'text-border'}`}>
          <MessageCircle size={22} />
          Chat
        </Link>
      </nav>
    </>
  );
}
