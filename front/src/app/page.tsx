'use client';

import { useAuth } from "./context/AuthContext";
import SideBar from "./components/home/Sidebar";
import PostList from "./components/home/PostList";
import Chat from "./components/home/Chat";
import Calendar from "./components/home/Calendar";

export default function Home() {
  const { isLoggedIn, user } = useAuth();

  return (
    <main className="grid grid-cols-5 place-items-center h-screen px-20 py-10">
      {/* Gauche de l'écran */}
      <section className="flex flex-col w-full max-w-[1500px] mx-auto h-full gap-5">
        <SideBar isLoggedIn={isLoggedIn} user={user} />
      </section>

      {/* Centre de l'écran */}
      <section className="flex flex-col col-span-3 w-full max-w-[1500px] mx-auto h-full min-h-0 px-6 gap-3 overflow-y-auto scrollbar-hide">        
        <PostList isLoggedIn={isLoggedIn} user={user} />
      </section>

      {/* Droite de l'écran */}
      <section className="flex flex-col w-full max-w-[1500px] mx-auto h-full gap-5">
        {/* Chat */}
        <Chat user={user} />
        {/* Agenda */}
        <div>
          <Calendar />
        </div>
      </section>
    </main>
  ); 
}
